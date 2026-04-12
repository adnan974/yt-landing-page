import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Le filtre anti-bruit pour devs | Newsletter AI & Dev",
  description:
    "Chaque semaine, une sélection curatée des insights IA & Dev qui comptent vraiment. Pas de hype. Pas de thread Twitter. Juste les pépites.",
  keywords: [
    "newsletter",
    "AI",
    "développement",
    "Claude Code",
    "IA",
    "dev",
    "France",
  ],
  authors: [{ name: "Dev Newsletter Team" }],
  openGraph: {
    title: "Le filtre anti-bruit pour devs | Newsletter AI & Dev",
    description:
      "Chaque semaine, une sélection curatée des insights IA & Dev qui comptent vraiment.",
    type: "website",
    url: "https://yourdomain.com",
    siteName: "Newsletter Dev AI",
    locale: "fr_FR",
  },
  twitter: {
    card: "summary_large_image",
    title: "Le filtre anti-bruit pour devs",
    description: "La newsletter AI & Dev que vous attendiez",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="h-full scroll-smooth">
      <body className="min-h-screen bg-[#0f1419] text-foreground antialiased flex flex-col">
        {children}
        <footer className="mt-auto py-8 border-t border-[#2d3340]">
          <div className="max-w-4xl mx-auto px-4 md:px-6 text-center text-sm text-muted-foreground">
            <p>© 2026 Dev Newsletter. Tous droits réservés.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
