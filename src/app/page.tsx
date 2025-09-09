import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import Registration from '@/components/Registration';
import SportsSection from '@/components/SportsSection';

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <Hero />
      <Registration />
      <SportsSection />
    </div>
  );
}
