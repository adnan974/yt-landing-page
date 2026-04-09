import { Button } from "@/components/ui/button";

export default function CTA() {
  return (
    <section className="bg-primary py-20 text-primary-foreground">
      <div className="container mx-auto max-w-4xl px-6 text-center">
        <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
          Ready to grow your channel?
        </h2>
        <p className="mb-8 text-primary-foreground/80 sm:text-lg">
          Join thousands of creators already using our platform to get more
          views, more subscribers, and more revenue.
        </p>
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Button
            size="lg"
            className="w-full bg-white text-primary hover:bg-white/90 sm:w-auto"
          >
            Start for Free
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="w-full border-white/40 bg-transparent text-white hover:bg-white/10 sm:w-auto"
          >
            Talk to Sales
          </Button>
        </div>
      </div>
    </section>
  );
}
