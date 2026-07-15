import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Revalida Live | Foco, Evolução, Aprovação",
  description: "Plataforma completa de preparação para o Revalida INEP e ENARE.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
