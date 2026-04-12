export default function LeadMagnetBadge() {
  return (
    <section className="relative py-3 md:py-4">
      <div className="max-w-3xl mx-auto px-4 md:px-6">
        {/* Compact Guide Preview */}
        <div
          className="relative"
          style={{
            animation: 'fadeInUp 0.8s ease-out 0.5s both',
          }}
        >
          {/* Main content */}
          <div className="relative bg-gradient-to-r from-[#0f1419] to-[#1a1f28] rounded-lg border border-[#2d3340]/60 p-4 md:p-5 overflow-hidden">
            {/* Content */}
            <div className="relative z-10">
              {/* Title - no "BONUS" label */}
              <h3 className="text-sm md:text-base font-black text-foreground mb-3">
                Déverrouillez : <span className="text-[#00d9ff]">Guide des 16 conseils Claude Code</span>
              </h3>

              {/* Tier Grid - 4 columns with improved labels */}
              <div className="grid grid-cols-4 gap-2 mb-3">
                {[
                  { tier: 'S', color: '#ff6b35', label: 'Game-changer' },
                  { tier: 'A', color: '#00d9ff', label: 'À connaître' },
                  { tier: 'B', color: '#76ff03', label: 'Boost rapide' },
                  { tier: 'C', color: '#a0a8b8', label: 'Cerise sur le gâteau' },
                ].map(({ tier, color, label }) => (
                  <div
                    key={tier}
                    className="p-2 rounded-lg border border-[#2d3340] bg-[#0f1419]/50 text-center"
                    style={{
                      borderLeftColor: color,
                      borderLeftWidth: '3px',
                    }}
                  >
                    <div className="text-lg font-black mb-0.5" style={{ color }}>
                      {tier}
                    </div>
                    <div className="text-xs text-muted-foreground line-clamp-2">{label}</div>
                  </div>
                ))}
              </div>

              {/* Trust message */}
              <p className="text-xs text-muted-foreground">
                ✓ Reçu immédiatement après inscription · Aucun engagement requis
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
