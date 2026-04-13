import HeroSection from '@/components/HeroSection';
import EmailForm from '@/components/EmailForm';

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen w-full bg-[#08090e] bg-dot-grid">
      <section className="min-h-screen flex flex-col justify-center py-8 md:py-12">
        <HeroSection />
        <EmailForm />
      </section>
    </main>
  );
}
