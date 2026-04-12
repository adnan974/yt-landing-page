export default function MinimalHeroSection() {
  return (
    <section className="pt-24 pb-12 md:pt-32 md:pb-16">
      <div className="max-w-2xl mx-auto px-4 md:px-6">
        {/* Main Headline - Simple & Bold */}
        <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
          Le filtre anti-bruit pour devs IA
        </h1>

        {/* Description - Clean Copy */}
        <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed max-w-xl">
          Chaque semaine, les insights IA & Dev qui comptent vraiment.
          Sans hype. Sans threads Twitter. Juste les pépites.
        </p>

        {/* Value Proposition */}
        <div className="space-y-3 text-sm text-muted-foreground mb-10">
          <div className="flex items-start gap-3">
            <span className="text-accent font-bold">→</span>
            <span>Un email par semaine, jamais plus</span>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-accent font-bold">→</span>
            <span>Sélection curatée et sans spam</span>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-accent font-bold">→</span>
            <span>Bonus : guide gratuit des 16 conseils Claude Code</span>
          </div>
        </div>
      </div>
    </section>
  );
}
