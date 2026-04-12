import HeroSection from '@/components/HeroSection';
import LeadMagnetBadge from '@/components/LeadMagnetBadge';
import EmailForm from '@/components/EmailForm';

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen w-full bg-[#0f1419]">
      {/* Everything above the fold */}
      <section className="min-h-screen flex flex-col justify-center py-8 md:py-12">
        {/* Hero Section */}
        <div className="mb-4">
          <HeroSection />
        </div>

        {/* Email Form */}
        <div className="mb-4">
          <EmailForm />
        </div>

        {/* Guide Preview - shows what they'll receive */}
        <LeadMagnetBadge />
      </section>
    </main>
  );
}
