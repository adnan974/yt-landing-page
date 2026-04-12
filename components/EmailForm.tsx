'use client';

import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function EmailForm() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Load MailerLite embed script
    const script = document.createElement('script');
    script.src = 'https://assets.mailerlite.com/js/universal.js';
    script.async = true;

    script.onload = () => {
      // Initialize MailerLite form
      if (window.ML) {
        window.ML('accounts', '699706', 'o6h8b3n5h5d1g7p5b2m1l9k8j7i6h5g4');
      }
    };

    document.body.appendChild(script);

    return () => {
      // Clean up
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate submission
    setTimeout(() => setIsLoading(false), 1000);
  };

  return (
    <section className="relative py-12 md:py-16 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Animated accent line */}
        <div
          className="absolute w-full h-1 bg-gradient-to-r from-transparent via-[#00d9ff] to-transparent opacity-20"
          style={{
            bottom: '10%',
            animation: 'slideInDown 1s ease-out 0.5s both',
          }}
        />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto px-4 md:px-6">
        {/* Section Title */}
        <div className="mb-8" style={{ animation: 'fadeInUp 0.8s ease-out 0.2s both' }}>
          <h2 className="text-2xl md:text-3xl font-black text-foreground mb-2">
            Restez dans la boucle <span className="text-[#76ff03]">+ bonus gratuit</span>
          </h2>
          <p className="text-muted-foreground">
            Inscrivez-vous et recevez immédiatement votre guide des 16 conseils Claude Code classés par impact
          </p>
        </div>

        {/* Form Container */}
        <div
          ref={containerRef}
          className="relative"
          style={{ animation: 'fadeInUp 0.8s ease-out 0.3s both' }}
        >
          {/* Gradient border wrapper */}
          <div className="absolute inset-0 rounded-xl p-px bg-gradient-to-r from-[#00d9ff] via-[#ff6b35] to-[#76ff03] opacity-20 pointer-events-none" />

          {/* Form wrapper */}
          <div className="relative bg-[#1a1f28] rounded-xl p-6 md:p-8 border border-[#2d3340]">
            {/* MailerLite embed will be injected here */}
            <div className="ml-embedded" data-form="o6h8b3n5h5d1g7p5b2m1l9k8j7i6h5g4" />

            {/* Fallback form using shadcn/ui */}
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-medium text-foreground">
                  Adresse email
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="toi@example.com"
                  className="bg-[#0f1419] border-[#2d3340] text-foreground placeholder:text-muted-foreground focus-visible:border-[#00d9ff] focus-visible:ring-2 focus-visible:ring-[#00d9ff]/20"
                  required
                />
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-[#00d9ff] hover:bg-[#00d9ff]/90 text-[#0f1419] font-bold h-11 rounded-lg transition-all duration-200 hover:shadow-lg hover:shadow-[#00d9ff]/30 active:scale-95"
              >
                {isLoading ? 'Inscription...' : 'Rejoins la newsletter →'}
              </Button>
            </form>

            {/* Trust badge */}
            <div className="mt-5 pt-5 border-t border-[#2d3340] flex items-center justify-center gap-3 text-xs text-muted-foreground">
              <span>🔒 Sécurisé</span>
              <span className="w-1 h-1 rounded-full bg-muted-foreground/30"></span>
              <span>📧 0 spam</span>
            </div>
          </div>
        </div>

        {/* Social Proof */}
        <div
          className="mt-6 text-center text-muted-foreground text-sm"
          style={{ animation: 'fadeInUp 0.8s ease-out 0.4s both' }}
        >
          <p>
            <span className="font-bold text-foreground">1 200+</span> devs déjà inscrits
          </p>
        </div>
      </div>
    </section>
  );
}

// Type for MailerLite global
declare global {
  interface Window {
    ML?: (action: string, account: string, form: string) => void;
  }
}
