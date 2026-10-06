import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SmartBoi | Lacta IA",
  description: "Conheça o Lacta IA, um protótipo que investiga como pH, alimentação e sinais do rebanho podem apoiar decisões mais conscientes no campo.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="pt-BR"
      className={`${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[var(--bg-primary)] text-[var(--text-primary)] font-sans">
        <a className="skip-link" href="#main-content">
          Ir para o conteúdo principal
        </a>
        {children}
      </body>
    </html>
  );
}
