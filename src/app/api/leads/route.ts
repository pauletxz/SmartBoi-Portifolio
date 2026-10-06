import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase/server";
import { leadSchema } from "@/lib/validations/lead";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Validar os dados
    const validatedData = leadSchema.safeParse(body);
    
    if (!validatedData.success) {
      return NextResponse.json(
        { error: "Dados invalidos.", details: validatedData.error.format() },
        { status: 400 }
      );
    }

    // Inserir no Supabase
    const { data, error } = await supabaseServer
      .from("leads")
      .insert([
        {
          name: validatedData.data.name,
          email: validatedData.data.email,
          phone: validatedData.data.phone,
          farm_name: validatedData.data.farm_name || null,
          daily_liters: validatedData.data.daily_liters || null,
          herd_size: validatedData.data.herd_size || null,
          status: "new",
          utm_source: validatedData.data.utm_source || null,
          utm_medium: validatedData.data.utm_medium || null,
          utm_campaign: validatedData.data.utm_campaign || null,
        },
      ])
      .select();

    if (error) {
      console.error("Supabase Error:", error);
      return NextResponse.json(
        { error: "Erro ao registrar o contato." },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, data }, { status: 201 });
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { error: "Erro interno no servidor." },
      { status: 500 }
    );
  }
}
