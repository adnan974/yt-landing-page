export default function HeroSection() {
  return (
    <section className="relative overflow-hidden pt-12 pb-8 md:pt-16 md:pb-12">
      {/* Geometric Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Cyan accent line top-left */}
        <div
          className="absolute w-96 h-1 bg-gradient-to-r from-transparent via-[#00d9ff] to-transparent"
          style={{
            top: '10%',
            left: '-50px',
            animation: 'slideInDown 0.8s ease-out',
          }}
        />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 md:px-6">
        {/* Overline badge */}
        <div
          className="inline-flex items-center gap-2 mb-8 px-4 py-2 rounded-full border border-[#00d9ff]/30 bg-[#00d9ff]/5 text-[#00d9ff] text-sm font-medium"
          style={{ animation: 'fadeInUp 0.6s ease-out' }}
        >
          <span className="w-2 h-2 rounded-full bg-[#00d9ff] animate-pulse"></span>
          NEWSLETTER AI & DEV
        </div>

        {/* Main Headline */}
        <h1
          className="text-4xl md:text-5xl font-black text-foreground mb-4 leading-tight tracking-tight"
          style={{
            animation: 'fadeInUp 0.8s ease-out 0.1s both',
          }}
        >
          Le filtre <span className="text-[#00d9ff]">anti-bruit</span> pour devs IA
        </h1>

        {/* Description */}
        <p
          className="text-base md:text-lg text-muted-foreground max-w-2xl leading-relaxed mb-6"
          style={{
            animation: 'fadeInUp 0.8s ease-out 0.2s both',
          }}
        >
          Chaque semaine : la sélection curatée des insights IA & Dev qui comptent vraiment. <span className="text-[#76ff03]">+ Guide des 16 conseils Claude Code gratuit dès l'inscription.</span>
        </p>

        {/* CTA Preview */}
        <div
          className="flex flex-col md:flex-row items-center gap-3 text-xs md:text-sm text-muted-foreground"
          style={{
            animation: 'fadeInUp 0.8s ease-out 0.3s both',
          }}
        >
          <div className="flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-[#76ff03]"></div>
            <span>1 email/semaine</span>
          </div>
          <div className="hidden md:block w-1 h-1 rounded-full bg-muted-foreground/30"></div>
          <div className="flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-[#ff6b35]"></div>
            <span>Annulation 1 clic</span>
          </div>
        </div>
      </div>
    </section>
  );
}
