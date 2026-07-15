import Link from "next/link";
import { CheckCircle2, BrainCircuit, BookOpen, Video, Layers, Trophy } from "lucide-react";

const PLANOS = [
  {
    nome: "Mensal",
    preco: "R$ 80",
    periodo: "/mês",
    destaque: null,
    beneficios: ["Acesso total ao banco de questões", "Simulados ilimitados", "Videoaulas", "Revalida IA"],
  },
  {
    nome: "Trimestral",
    preco: "R$ 200",
    periodo: "/3 meses",
    destaque: "Mais Popular",
    beneficios: ["Tudo do plano Mensal", "Flashcards inteligentes", "Plano de estudos personalizado", "Suporte prioritário"],
  },
  {
    nome: "Anual",
    preco: "R$ 600",
    periodo: "/ano",
    destaque: "Melhor Oferta",
    beneficios: ["Tudo do plano Trimestral", "2 meses grátis", "Relatórios avançados de evolução", "Acesso antecipado a novidades"],
  },
];

const RECURSOS = [
  { icone: BookOpen, titulo: "Banco de Questões", texto: "Mais de 10.000 questões do Revalida e ENARE, comentadas e filtráveis por especialidade, tema e dificuldade." },
  { icone: Layers, titulo: "Simulados Completos", texto: "Simulados oficiais e personalizados com correção automática, ranking e relatório de desempenho." },
  { icone: Video, titulo: "Videoaulas", texto: "Aulas organizadas por especialidade, com PDF de apoio e controle de progresso." },
  { icone: BrainCircuit, titulo: "Revalida IA", texto: "Assistente de IA que explica alternativas, gera resumos, flashcards e planos de estudo sob medida." },
  { icone: Trophy, titulo: "Gamificação", texto: "Ranking, conquistas, sequência diária de estudos e níveis para manter sua motivação." },
  { icone: CheckCircle2, titulo: "Plano de Estudos", texto: "Cronograma personalizado com metas, checklist e lembretes até o dia da prova." },
];

export default function LandingPage() {
  return (
    <main className="bg-slate-950 text-white">
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/40 via-slate-950 to-slate-950" />
        <div className="relative max-w-6xl mx-auto px-6 pt-8 pb-24">
          <nav className="flex items-center justify-between py-4">
            <span className="text-xl font-bold tracking-tight">
              Revalida<span className="text-blue-400">Live</span>
            </span>
            <div className="flex gap-3">
              <Link href="/login" className="px-4 py-2 text-sm font-medium text-slate-200 hover:text-white">
                Entrar
              </Link>
              <Link
                href="/cadastro"
                className="px-4 py-2 text-sm font-semibold bg-blue-600 hover:bg-blue-500 rounded-lg transition"
              >
                Começar agora
              </Link>
            </div>
          </nav>

          <div className="mt-20 text-center max-w-3xl mx-auto">
            <span className="inline-block px-4 py-1 rounded-full bg-blue-500/10 border border-blue-400/30 text-blue-300 text-sm font-medium mb-6">
              Foco • Evolução • Aprovação
            </span>
            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
              Sua aprovação no <span className="text-blue-400">Revalida</span> e{" "}
              <span className="text-blue-400">ENARE</span> começa aqui
            </h1>
            <p className="mt-6 text-lg text-slate-300">
              Banco de questões, simulados, videoaulas, flashcards e um assistente de IA feito
              para quem não pode perder tempo. Tudo em uma única plataforma.
            </p>
            <div className="mt-8 flex justify-center gap-4">
              <Link
                href="/cadastro"
                className="px-6 py-3 bg-blue-600 hover:bg-blue-500 rounded-lg font-semibold transition"
              >
                Criar conta grátis
              </Link>
              <Link
                href="#planos"
                className="px-6 py-3 border border-slate-600 hover:border-slate-400 rounded-lg font-semibold transition"
              >
                Ver planos
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* RECURSOS */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <h2 className="text-3xl font-bold text-center mb-4">Tudo que você precisa para revalidar</h2>
        <p className="text-slate-400 text-center max-w-2xl mx-auto mb-14">
          Uma plataforma completa, pensada para o médico que estuda com pouco tempo e precisa de resultado.
        </p>
        <div className="grid md:grid-cols-3 gap-6">
          {RECURSOS.map((r) => (
            <div key={r.titulo} className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6">
              <r.icone className="w-8 h-8 text-blue-400 mb-4" />
              <h3 className="text-lg font-semibold mb-2">{r.titulo}</h3>
              <p className="text-slate-400 text-sm">{r.texto}</p>
            </div>
          ))}
        </div>
      </section>

      {/* PLANOS */}
      <section id="planos" className="max-w-6xl mx-auto px-6 py-20">
        <h2 className="text-3xl font-bold text-center mb-4">Escolha seu plano</h2>
        <p className="text-slate-400 text-center max-w-2xl mx-auto mb-14">
          Cancele quando quiser. Sem taxas escondidas.
        </p>
        <div className="grid md:grid-cols-3 gap-6">
          {PLANOS.map((p) => (
            <div
              key={p.nome}
              className={`relative rounded-2xl p-8 border ${
                p.destaque
                  ? "border-blue-500 bg-blue-500/5 scale-105"
                  : "border-slate-800 bg-slate-900/50"
              }`}
            >
              {p.destaque && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-600 text-xs font-bold px-3 py-1 rounded-full">
                  {p.destaque}
                </span>
              )}
              <h3 className="text-xl font-bold mb-1">{p.nome}</h3>
              <div className="mb-6">
                <span className="text-4xl font-extrabold">{p.preco}</span>
                <span className="text-slate-400">{p.periodo}</span>
              </div>
              <ul className="space-y-3 mb-8">
                {p.beneficios.map((b) => (
                  <li key={b} className="flex gap-2 text-sm text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" />
                    {b}
                  </li>
                ))}
              </ul>
              <Link
                href={`/cadastro?plano=${p.nome.toLowerCase()}`}
                className={`block text-center py-2.5 rounded-lg font-semibold transition ${
                  p.destaque ? "bg-blue-600 hover:bg-blue-500" : "border border-slate-600 hover:border-slate-400"
                }`}
              >
                Assinar {p.nome}
              </Link>
            </div>
          ))}
        </div>
      </section>

      <footer className="border-t border-slate-800 py-10 text-center text-slate-500 text-sm">
        © {new Date().getFullYear()} Revalida Live. Todos os direitos reservados.
      </footer>
    </main>
  );
}
