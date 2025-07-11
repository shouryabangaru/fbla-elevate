import { Navbar } from '@/components/homepage/Navbar';
import { Hero } from '@/components/homepage/Hero';
import { FeaturesSection } from '@/components/homepage/FeaturesSection';
import { Footer } from '@/components/homepage/Footer';
import './HomePage.css';

export default function HomePage() {
  return (
    <div className="homepage">
      <Navbar />
      <Hero />
      <FeaturesSection />
      <Footer />
    </div>
  );
}