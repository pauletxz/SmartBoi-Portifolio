import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PrototypePortal } from "../portal";

export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  title: "Área do produtor | SmartBoi",
  robots: { index: false, follow: false },
};

export default function ProducerAccessPage() {
  if (process.env.PROTOTYPE_PORTAL_ENABLED !== "true") notFound();
  return <main id="main-content"><PrototypePortal
    url={process.env.NEXT_PUBLIC_SUPABASE_URL}
    apiKey={process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}
  /></main>;
}
