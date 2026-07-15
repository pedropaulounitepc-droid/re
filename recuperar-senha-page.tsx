"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

export default function RecuperarSenhaPage() {
  const supabase = createClient();
  const [email, setEmail] = useState("");
  const [enviado, setEnviado] = useState(false);
  const [erro, setErro] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErro(null);

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/auth/callback?next=/redefinir-senha`,
    });

    if (error) {
      setErro("Não foi possível enviar o e-mail. Verifique o endereço informado.");
      return;
    }
    setEnviado(true);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8">
        <h1 className="text-2xl font-bold text-slate-900 mb-1">Recuperar senha</h1>
        <p className="text-slate-500 text-sm mb-6">
          Informe seu e-mail cadastrado para receber o link de redefinição.
        </p>

        {enviado ? (
          <div className="rounded-lg bg-green-50 border border-green-200 text-green-700 text-sm px-3 py-3">
            Se este e-mail estiver cadastrado, você receberá um link de redefinição em instantes.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {erro && (
              <div className="rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm px-3 py-2">
                {erro}
              </div>
            )}
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
            <button
              type="submit"
              className="w-full rounded-lg bg-blue-700 hover:bg-blue-800 text-white font-semibold py-2.5 transition"
            >
              Enviar link de recuperação
            </button>
          </form>
        )}

        <p className="text-center text-sm text-slate-500 mt-6">
          <a href="/login" className="text-blue-700 font-medium">
            Voltar para o login
          </a>
        </p>
      </div>
    </div>
  );
}
