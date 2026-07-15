import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

// Rotas que exigem login
const ROTAS_ALUNO = ["/dashboard", "/questoes", "/simulados", "/videoaulas", "/flashcards", "/plano-de-estudos", "/revalida-ia", "/assinatura"];
const ROTAS_ADMIN = ["/admin"];
const ROTAS_PROFESSOR = ["/professor"];

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({ request: { headers: request.headers } });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          response.cookies.set({ name, value, ...options });
        },
        remove(name: string, options: CookieOptions) {
          response.cookies.set({ name, value: "", ...options });
        },
      },
    }
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const path = request.nextUrl.pathname;
  const precisaAuth = [...ROTAS_ALUNO, ...ROTAS_ADMIN, ...ROTAS_PROFESSOR].some((rota) =>
    path.startsWith(rota)
  );

  // Não autenticado tentando acessar área protegida → manda pro login
  if (!user && precisaAuth) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    url.searchParams.set("redirect", path);
    return NextResponse.redirect(url);
  }

  // Verifica role para áreas restritas (admin/professor)
  if (user && (path.startsWith("/admin") || path.startsWith("/professor"))) {
    // Busca a role via metadata do usuário Supabase (sincronizada no cadastro)
    const role = user.user_metadata?.role ?? "ALUNO";

    if (path.startsWith("/admin") && role !== "ADMIN") {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
    if (path.startsWith("/professor") && role !== "PROFESSOR" && role !== "ADMIN") {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
  }

  return response;
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/questoes/:path*",
    "/simulados/:path*",
    "/videoaulas/:path*",
    "/flashcards/:path*",
    "/plano-de-estudos/:path*",
    "/revalida-ia/:path*",
    "/assinatura/:path*",
    "/admin/:path*",
    "/professor/:path*",
  ],
};
