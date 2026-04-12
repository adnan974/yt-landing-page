'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

type FormState = 'idle' | 'loading' | 'success' | 'error';

export default function MinimalEmailForm() {
  const [email, setEmail] = useState('');
  const [state, setState] = useState<FormState>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setState('loading');
    setErrorMessage('');

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Une erreur est survenue');
      }

      setState('success');
      setEmail('');
      // Reset success message after 5 seconds
      setTimeout(() => setState('idle'), 5000);
    } catch (error) {
      setState('error');
      setErrorMessage(
        error instanceof Error ? error.message : 'Une erreur est survenue'
      );
    }
  };

  return (
    <section className="py-12 md:py-16">
      <div className="max-w-2xl mx-auto px-4 md:px-6">
        {/* Form Container - Minimal Style */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Input Group */}
          <div className="flex flex-col md:flex-row gap-3">
            <Input
              type="email"
              placeholder="votre@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={state === 'loading'}
              className="flex-1 bg-[#1a1f28] border border-[#2d3340] text-foreground placeholder:text-muted-foreground px-4 py-3 text-base focus-visible:border-primary focus-visible:ring-1 focus-visible:ring-primary/20 disabled:opacity-50"
            />
            <Button
              type="submit"
              disabled={state === 'loading' || state === 'success'}
              className="md:w-auto bg-accent hover:bg-accent/90 text-[#0f1419] font-bold px-6 py-3 rounded-md transition-colors disabled:opacity-50"
            >
              {state === 'loading' && 'Inscription...'}
              {state === 'success' && '✓ Inscrit !'}
              {state === 'idle' && 'S\'inscrire'}
              {state === 'error' && 'Réessayer'}
            </Button>
          </div>

          {/* Messages */}
          {state === 'success' && (
            <p className="text-sm text-accent font-medium">
              Bienvenue ! Vérifiez votre email pour confirmer votre inscription.
            </p>
          )}
          {state === 'error' && (
            <p className="text-sm text-red-400">
              {errorMessage}
            </p>
          )}
        </form>

        {/* Trust Signals - Simple Text */}
        <div className="mt-8 pt-8 border-t border-[#2d3340]">
          <p className="text-xs text-muted-foreground">
            🔒 Pas de spam · 📧 Désinscription facile · 🛡️ Vos données sont sécurisées
          </p>
        </div>
      </div>
    </section>
  );
}
