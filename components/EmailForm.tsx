'use client';

import { useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

type FormState = 'idle' | 'loading' | 'success' | 'error';

export default function EmailForm() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [email, setEmail] = useState('');
  const [state, setState] = useState<FormState>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setState('loading');
    setMessage('');

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok || response.status === 200) {
        setState('success');
        setEmail('');
        setMessage('✓ Inscription réussie !');
        // Reset after 5 seconds
        setTimeout(() => {
          setState('idle');
          setMessage('');
        }, 5000);
      } else {
        setState('error');
        setMessage(data.message || 'Une erreur est survenue');
      }
    } catch (error) {
      setState('error');
      setMessage('Une erreur est survenue');
    }
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
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-medium text-foreground">
                  Adresse email
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="toi@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={state === 'loading'}
                  className="bg-[#0f1419] border-[#2d3340] text-foreground placeholder:text-muted-foreground focus-visible:border-[#00d9ff] focus-visible:ring-2 focus-visible:ring-[#00d9ff]/20 disabled:opacity-50"
                  required
                />
              </div>

              <Button
                type="submit"
                disabled={state === 'loading' || state === 'success'}
                className="w-full bg-[#00d9ff] hover:bg-[#00d9ff]/90 text-[#0f1419] font-bold h-11 rounded-lg transition-all duration-200 hover:shadow-lg hover:shadow-[#00d9ff]/30 active:scale-95 disabled:opacity-50"
              >
                {state === 'loading' && 'Inscription...'}
                {state === 'success' && '✓ Inscrit !'}
                {state === 'idle' && 'Rejoins la newsletter →'}
                {state === 'error' && 'Réessayer'}
              </Button>

              {message && (
                <p className={`text-sm text-center ${state === 'success' ? 'text-[#76ff03]' : 'text-red-400'}`}>
                  {message}
                </p>
              )}
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
