"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type FormState = "idle" | "loading" | "success" | "error";

export default function EmailForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [state, setState] = useState<FormState>("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setState("loading");
    setMessage("");

    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok || response.status === 200) {
        router.push("/confirmation");
      } else {
        setState("error");
        setMessage(data.message || "Une erreur est survenue");
      }
    } catch {
      setState("error");
      setMessage("Une erreur est survenue");
    }
  };

  const isDisabled = state === "loading" || state === "success";

  return (
    <section className="relative py-6 md:py-8">
      <div className="max-w-3xl mx-auto px-4 md:px-6">
        <div style={{ animation: "fadeInUp 0.6s ease-out 0.4s both" }}>
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
          <div className="bg-[#111520] rounded-2xl p-6 md:p-8 border border-[#1e2535]">
            {/* Card header */}
            <div className="mb-6">
              <p className="font-mono text-xs text-[#8a94a6]/50 uppercase tracking-widest mb-1">
                Accès gratuit
              </p>
              <h2 className="font-display text-xl md:text-2xl font-bold text-[#eef2f7]">
                Recevez le guide gratuitement
              </h2>
            </div>

            <form onSubmit={handleSubmit}>
              <label htmlFor="email" className="sr-only">
                Adresse email
              </label>

              {/* Inline input + button on sm+ */}
              <div className="flex flex-col sm:flex-row gap-3">
                <Input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="toi@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isDisabled}
                  required
                  aria-describedby={message ? "form-status" : undefined}
                  className="flex-1 h-11 bg-[#08090e] border-[#1e2535] text-[#eef2f7] placeholder:text-[#8a94a6]/40 focus-visible:border-[#00d4ef] focus-visible:ring-[#00d4ef]/20 disabled:opacity-50 disabled:cursor-not-allowed"
                />

                <Button
                  type="submit"
                  disabled={isDisabled}
                  className="h-11 px-6 shrink-0 bg-[#00d4ef] hover:bg-[#00d4ef]/90 text-[#08090e] font-bold rounded-lg transition-colors duration-200 hover:shadow-[0_0_24px_rgba(0,212,239,0.25)] active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed disabled:shadow-none disabled:scale-100"
                >
                  {state === "loading" && (
                    <span className="flex items-center gap-2">
                      <span
                        className="inline-block w-4 h-4 border-2 border-current border-r-transparent rounded-full animate-spin"
                        aria-hidden="true"
                      />
                      Inscription&#8230;
                    </span>
                  )}
                  {state === "idle" && "Recevoir le guide \u2192"}
                  {state === "error" && "R\u00e9essayer \u2192"}
                </Button>
              </div>

              {/* Status message */}
              <p
                id="form-status"
                role="status"
                aria-live="polite"
                className={`mt-3 text-sm min-h-[1.25rem] transition-opacity duration-300 ${
                  message ? "opacity-100" : "opacity-0"
                } text-red-400`}
              >
                {message || "\u00a0"}
              </p>
            </form>

            {/* Trust badges */}
            <div className="mt-5 pt-5 border-t border-[#1e2535]">
              <ul
                className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-[#8a94a6]/60 list-none"
                aria-label="Garanties"
              >
                <li>1 email / semaine</li>
                <li>0 spam</li>
                <li>D\u00e9sinscription en 1 clic</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
