import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-background">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-background to-background" />
      <div className="container mx-auto max-w-5xl px-6 py-24 text-center sm:py-32">
        <Badge variant="secondary" className="mb-6">
          🚀 Now in Beta — Join 10,000+ creators
        </Badge>
        <h1 className="mb-6 text-4xl font-bold tracking-tight text-foreground sm:text-6xl">
          Grow Your YouTube Channel{" "}
          <span className="text-primary">Faster Than Ever</span>
        </h1>
        <p className="mx-auto mb-10 max-w-2xl text-lg text-muted-foreground sm:text-xl">
          Powerful analytics, AI-powered content suggestions, and SEO tools
          built specifically for YouTube creators who want to scale their
          audience.
        </p>
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Button size="lg" className="w-full sm:w-auto">
            Get Started Free
          </Button>
          <Button size="lg" variant="outline" className="w-full sm:w-auto">
            Watch Demo
          </Button>
        </div>
        <p className="mt-4 text-sm text-muted-foreground">
          No credit card required · Free plan available
        </p>
      </div>
    </section>
  );
}
