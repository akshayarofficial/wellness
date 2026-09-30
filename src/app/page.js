import React from 'react';
import AmbientSparks from '../components/AmbientSparks';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import FourPathsSection from '../components/FourPathsSection';
import TenMinuteFlowSection from '../components/TenMinuteFlowSection';
import CtaBanner from '../components/CtaBanner';
import Footer from '../components/Footer';

export default function HomePage() {
  return (
    <div className="mindbloom-app-shell bg-[#F8F7F2] text-[#29443A] min-h-screen">
      <AmbientSparks />
      <Navbar />

      <main>
        {/* Concise Product Overview with Cinematic 3D Hero Video Preview */}
        <Hero />

        {/* Short 4-Track Summary */}
        <FourPathsSection />

        {/* Brief 10-Minute Weekend Flow */}
        <TenMinuteFlowSection />

        {/* One Main CTA */}
        <CtaBanner />
      </main>

      <Footer />
    </div>
  );
}
