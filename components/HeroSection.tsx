export default function HeroSection() {
  return (
    <section className="relative overflow-hidden pt-16 pb-6 md:pt-24 md:pb-8">
      {/* Atmospheric glows */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute -top-40 -left-40 w-[700px] h-[700px] rounded-full bg-[#00d4ef] opacity-[0.035] blur-[120px]" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-[#ff6640] opacity-[0.03] blur-[90px]" />
        {/* Top edge accent line */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00d4ef]/30 to-transparent" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 md:px-6">

        {/* Terminal-style badge */}
        <div
          className="inline-flex items-center gap-2 mb-10"
          style={{ animation: 'fadeInUp 0.5s ease-out both' }}
        >
          <span
            className="font-mono text-xs text-[#00d4ef]/50 select-none"
            aria-hidden="true"
          >
            {'>'}
          </span>
          <span className="font-mono text-xs text-[#8a94a6] tracking-widest uppercase">
            Newsletter AI &amp; Dev
          </span>
          <span
            className="inline-block w-[7px] h-[14px] bg-[#00d4ef]/40 animate-blink"
            aria-hidden="true"
          />
        </div>

        {/* Main headline */}
        <h1
          className="font-display text-5xl md:text-6xl lg:text-[4.5rem] font-extrabold text-[#eef2f7] mb-5 leading-[0.95] tracking-tight"
          style={{ animation: 'fadeInUp 0.6s ease-out 0.1s both' }}
        >
          Maîtrisez Claude Code
          <br />
          <span className="text-[#00d4ef]">comme ses créateurs</span>
        </h1>

        {/* Credibility subtitle */}
        <p
          className="text-base md:text-lg text-[#8a94a6] max-w-xl leading-relaxed mb-10"
          style={{ animation: 'fadeInUp 0.6s ease-out 0.2s both' }}
        >
          Les{' '}
          <strong className="text-[#eef2f7] font-semibold">
            16 techniques de Boris Cherny
          </strong>{' '}
          <span className="text-[#8a94a6]/50">(créateur de l&apos;outil)</span>
          {' '}&#8212; classées par impact, ignorées par 99&nbsp;% des devs.
        </p>

        {/* Value props */}
        <div
          className="space-y-3"
          style={{ animation: 'fadeInUp 0.6s ease-out 0.3s both' }}
        >
          <p className="font-mono text-xs text-[#8a94a6]/50 uppercase tracking-widest mb-5">
            Dès votre inscription :
          </p>

          <div className="flex items-start gap-4">
            <span
              className="font-mono text-xs text-[#00d4ef]/40 mt-0.5 shrink-0 w-5 text-right"
              aria-hidden="true"
            >
              01
            </span>
            <div className="w-4 shrink-0 mt-[0.55rem]">
              <div className="h-px w-full bg-[#1e2535]" />
            </div>
            <p className="text-sm text-[#8a94a6] leading-relaxed">
              <strong className="text-[#eef2f7] font-semibold">Le Guide PDF</strong>
              {' '}&#8212; Les 16 conseils structurés S&#8209;Tier à C&#8209;Tier, prêts à appliquer.
            </p>
          </div>

          <div className="flex items-start gap-4">
            <span
              className="font-mono text-xs text-[#00d4ef]/40 mt-0.5 shrink-0 w-5 text-right"
              aria-hidden="true"
            >
              02
            </span>
            <div className="w-4 shrink-0 mt-[0.55rem]">
              <div className="h-px w-full bg-[#1e2535]" />
            </div>
            <p className="text-sm text-[#8a94a6] leading-relaxed">
              <strong className="text-[#eef2f7] font-semibold">Le Signal</strong>
              {' '}&#8212; Un condensé hebdo. L&apos;essentiel de l&apos;IA Dev, sans le bruit.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
