import { NextResponse } from "next/server";
import { getSupabaseServer } from "@/lib/supabase/server";
import { leadSchema } from "@/lib/validations/lead";

export const runtime = "nodejs";

export async function POST(request: Request) {
  let body: unknown;
  if (!request.headers.get("content-type")?.includes("application/json")) {
    return NextResponse.json({ error: "Envie os dados em JSON." }, { status: 415 });
  }
  try {
    const text = await request.text();
    if (new TextEncoder().encode(text).length > 8192) {
      return NextResponse.json({ error: "Dados muito extensos." }, { status: 413 });
    }
    body = JSON.parse(text);
  } catch {
    return NextResponse.json({ error: "JSON inválido." }, { status: 400 });
  }
  try {
    
    // Validar os dados
    const validatedData = leadSchema.safeParse(body);
    
    if (!validatedData.success) {
      return NextResponse.json(
        { error: "Dados invalidos.", details: validatedData.error.format() },
        { status: 400 }
      );
    }

    const supabaseServer = await getSupabaseServer();
    if (!supabaseServer) {
      return NextResponse.json({ error: "Cadastro temporariamente indisponível." }, { status: 503 });
    }
    const { error } = await supabaseServer
      .from("leads")
      .insert([
        {
          name: validatedData.data.name,
          email: validatedData.data.email.toLowerCase(),
          phone: validatedData.data.phone.replace(/\D/g, ""),
          farm_name: validatedData.data.farm_name || null,
          daily_liters: validatedData.data.daily_liters ? Number(validatedData.data.daily_liters.replace(",", ".")) : null,
          herd_size: validatedData.data.herd_size ? Number(validatedData.data.herd_size) : null,
          status: "new",
          utm_source: validatedData.data.utm_source || null,
          utm_medium: validatedData.data.utm_medium || null,
          utm_campaign: validatedData.data.utm_campaign || null,
        },
      ])
      .abortSignal(AbortSignal.timeout(10000));

    if (error) {
      console.error("lead_insert_failed", { code: error.code });
      return NextResponse.json(
        { error: "Erro ao registrar o contato." },
        { status: 503 }
      );
    }

    return NextResponse.json({ success: true }, { status: 201 });
  } catch {
    console.error("lead_service_unavailable");
    return NextResponse.json(
      { error: "Erro interno no servidor." },
      { status: 503 }
    );
  }
}
