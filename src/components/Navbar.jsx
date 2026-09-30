'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Home, BookOpen, HeartPulse, HelpCircle, Layers, 
  Menu, X, ArrowRight, ShieldAlert, Award, PlayCircle, Users 
} from 'lucide-react';

const NAV_ITEMS = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/tracks', label: 'Tracks', icon: Layers },
  { href: '/register', label: 'Register', icon: Users },
  { href: '/how-it-works', label: 'How It Works', icon: HelpCircle },
  { href: '/classroom', label: 'Classroom', icon: PlayCircle },
  { href: '/progress', label: 'Progress', icon: Award },
  { href: '/daily-checkin', label: 'Check-In', icon: HeartPulse },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (path) => {
    if (path === '/') return pathname === '/';
    return pathname.startsWith(path);
  };

  return (
    <header className={`site-header sticky top-0 z-40 transition-all ${scrolled ? 'bg-[#F8F7F2]/95 backdrop-blur-md border-b border-[#D3DFD7] shadow-sm' : 'bg-[#F8F7F2]/80 backdrop-blur-sm border-b border-[#D3DFD7]/60'}`}>
      <div className="header-inner container py-2.5 sm:py-3 px-3 sm:px-4 flex items-center justify-between max-w-full">
        {/* Brand Logo with Mascot */}
        <Link href="/" className="brand-logo-group flex items-center gap-2 sm:gap-2.5 flex-shrink-0" aria-label="Everyday Mental Wellness Home">
          <div className="mascot-badge-wrapper relative flex-shrink-0">
            <Image
              src="/images/mascot.png"
              alt="Everyday Mental Wellness Mascot"
              width={34}
              height={34}
              className="mascot-img rounded-full"
              priority
            />
          </div>
          <div className="brand-text-block">
            <span className="brand-name font-black tracking-tight text-[#29443A] text-sm sm:text-base leading-tight block">
              Everyday<span className="text-[#4F7462]">Wellness</span>
            </span>
            <span className="brand-sub hidden sm:block text-[10px] text-[#5F746B] font-medium leading-none mt-0.5">Adult Micro-Learning</span>
          </div>
        </Link>

        {/* Desktop Multi-Page Navigation Bar */}
        <nav className="desktop-nav hidden lg:flex items-center gap-1 bg-[#FFFFFF] p-1 rounded-full border border-[#D3DFD7] shadow-xs" aria-label="Main Navigation">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all ${
                  isActive(item.href) 
                    ? 'bg-[#DDE9E2] text-[#4F7462] font-bold shadow-xs' 
                    : 'text-[#5F746B] hover:text-[#29443A] hover:bg-[#EEF3EF]'
                }`}
              >
                <Icon className="w-3.5 h-3.5 opacity-80" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Action Controls */}
        <div className="header-actions flex items-center gap-1.5 sm:gap-2.5 flex-shrink-0">
          <Link
            href="/safety#crisis"
            className="btn-crisis-pill flex items-center gap-1 px-2 sm:px-3 py-1.5 rounded-full bg-[#FDF4F4] border border-[#E8B8B8] text-[#A94E4E] text-[11px] sm:text-xs font-bold hover:bg-[#FAE8E8] transition-colors shadow-xs flex-shrink-0"
            title="Immediate 24/7 Crisis Support (India Tele-MANAS: 14416 / 112)"
          >
            <ShieldAlert className="w-3.5 h-3.5 text-[#B85C5C] animate-pulse flex-shrink-0" />
            <span className="hidden sm:inline">Crisis: 14416</span>
            <span className="sm:hidden">14416</span>
          </Link>

          <Link 
            href="/register" 
            className="btn-primary-glow text-xs py-2 px-3.5 sm:px-4 rounded-full font-bold hidden sm:inline-flex items-center gap-1.5 shadow-sm flex-shrink-0"
          >
            <Users className="w-3.5 h-3.5" />
            <span>Register</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>

          <button
            className="mobile-menu-toggle lg:hidden p-2 rounded-lg bg-[#FFFFFF] border border-[#D3DFD7] text-[#263832] shadow-xs flex-shrink-0"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="mobile-drawer lg:hidden p-4 bg-[#FFFFFF] border-b border-[#D3DFD7] shadow-xl animate-fade-in">
          <nav className="mobile-nav-links space-y-2">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center justify-between p-2.5 rounded-xl text-xs font-semibold ${
                    isActive(item.href) ? 'bg-[#DDE9E2] text-[#4F7462] font-bold' : 'text-[#5F746B] hover:bg-[#EEF3EF] hover:text-[#29443A]'
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className="w-4 h-4 text-[#4F7462]" />
                    <span>{item.label}</span>
                  </div>
                  {isActive(item.href) && <span className="text-[10px] text-[#4F7462] font-mono">Active</span>}
                </Link>
              );
            })}
            <div className="pt-3 border-t border-[#D3DFD7] space-y-2">
              <Link
                href="/register"
                className="w-full py-3 rounded-xl btn-primary-glow text-xs font-bold flex items-center justify-center gap-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                <Users className="w-4 h-4" />
                <span>Register for Group</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
