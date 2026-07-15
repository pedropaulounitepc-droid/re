"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const supabase = createClient();

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState<string | null>(null);
  const [carregando, setCarregando] = useState(false);

  const mensagem = searchParams.get("mensagem");

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setErro(null);
    setCarregando(true);

    const { error } = await supabase.auth.signInWithPassword({ email, password: senha });

    if (error) {
      setErro("E-mail ou senha incorretos.");
      setCarregando(false);
      return;
    }

    const redirect = searchParams.get("redirect") || "/dashboard";
    router.push(redirect);
    router.refresh();
  }

  async function handleGoogleLogin() {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/auth/callback` },
    });
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8">
        <h1 className="text-2xl font-bold text-slate-900 mb-1">Entrar</h1>
        <p className="text-slate-500 text-sm mb-6">Acesse sua conta Revalida Live</p>

        {mensagem === "confirme-seu-email" && (
          <div className="mb-4 rounded-lg bg-blue-50 border border-blue-200 text-blue-700 text-sm px-3 py-2">
            Enviamos um link de confirmação para o seu e-mail.
          </div>
        )}
        {erro && (
          <div className="mb-4 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm px-3 py-2">
            {erro}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="text-sm font-medium text-slate-700">E-mail</label>
            <input
              required
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="voce@email.com"
            />
          </div>
          <div>
            <div className="flex justify-between items-center">
              <label className="text-sm font-medium text-slate-700">Senha</label>
              <a href="/recuperar-senha" className="text-xs text-blue-700 font-medium">
                Esqueceu a senha?
              </a>
            </div>
            <input
              required
              type="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="Sua senha"
            />
          </div>

          <button
            type="submit"
            disabled={carregando}
            className="w-full rounded-lg bg-blue-700 hover:bg-blue-800 text-white font-semibold py-2.5 transition disabled:opacity-50"
          >
            {carregando ? "Entrando..." : "Entrar"}
          </button>
        </form>

        <div className="flex items-center gap-3 my-5">
          <div className="h-px bg-slate-200 flex-1" />
          <span className="text-xs text-slate-400">ou</span>
          <div className="h-px bg-slate-200 flex-1" />
        </div>

        <button
          onClick={handleGoogleLogin}
          className="w-full rounded-lg border border-slate-300 py-2.5 font-medium text-slate-700 hover:bg-slate-50 transition"
        >
          Continuar com Google
        </button>

        <p className="text-center text-sm text-slate-500 mt-6">
          Não tem conta?{" "}
          <a href="/cadastro" className="text-blue-700 font-medium">
            Cadastre-se
          </a>
        </p>
      </div>
    </div>
  );
}
