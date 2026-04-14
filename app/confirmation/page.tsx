import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Confirmation — Newsletter Dev AI",
  description: "Votre inscription est confirmée.",
};

export default function ConfirmationPage() {
  return (
    <main className="flex flex-col min-h-screen w-full bg-[#08090e] bg-dot-grid">
      <section className="flex-1 flex flex-col items-center justify-center py-12 px-4">
        <div
          className="w-full max-w-md"
          style={{ animation: "fadeInUp 0.6s ease-out both" }}
        >
          {/* Top accent shimmer */}
          <div
            className="relative h-px mx-8 mb-0 overflow-hidden"
            aria-hidden="true"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#00d4ef]/25 to-transparent" />
            <div
              className="absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-[#00d4ef]/60 to-transparent"
              style={{ animation: "shimmer 3s ease-in-out infinite" }}
            />
          </div>

          {/* Card */}
          <div className="bg-[#111520] rounded-2xl p-8 md:p-10 border border-[#1e2535] text-center">
            {/* Icon */}
            <div
              className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-[#00d4ef]/10 border border-[#00d4ef]/20 mb-6"
              aria-hidden="true"
            >
              <svg
                width="26"
                height="26"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#00d4ef"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>

            {/* Heading */}

            <h1 className="font-display text-2xl md:text-3xl font-bold text-[#eef2f7] mb-4">
              Inscription confirmée&nbsp;!
            </h1>

            {/* Message */}
            <p className="text-[#8a94a6] text-base leading-relaxed mb-2">
              Ton premier email arrive très bientôt.
            </p>
            <p className="text-[#8a94a6]/70 text-sm leading-relaxed">
              Si tu ne trouves pas,{" "}
              <span className="text-[#00d4ef]/80">vérifie tes spams</span> — il
              est peut-être coincé là-bas.
            </p>

            {/* Divider */}
            <div className="mt-8 pt-6 border-t border-[#1e2535]">
              <Link
                href="/"
                className="text-sm text-[#8a94a6]/50 hover:text-[#00d4ef] transition-colors duration-200"
              >
                ← Retour à l&rsquo;accueil
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
