import React, { useState } from 'react';
import { 
  Home, 
  ShoppingBag, 
  Sparkles, 
  Heart, 
  Phone, 
  Download, 
  Search, 
  Menu, 
  X, 
  MessageCircle,
  Settings,
  Share2
} from 'lucide-react';
import { useBusiness } from '../context/BusinessContext';
import { usePWAInstall } from '../hooks/usePWAInstall';
import { IOSInstallModal } from './IOSInstallModal';

interface NavbarProps {
  onSearchClick: () => void;
  activeSection: string;
  setActiveSection: (sec: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onSearchClick, activeSection, setActiveSection }) => {
  const { config, savedInquiries, openInquiryDrawer, openCustomOrderModal, openWhatsAppConfig, isCustomized } = useBusiness();
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [showIOSModal, setShowIOSModal] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleInstallClick = () => {
    if (isInstallable) {
      install();
    } else if (isIOS) {
      setShowIOSModal(true);
    }
  };

  const navLinks = [
    { label: 'Home', href: '#home', id: 'home' },
    { label: 'Catalogue', href: '#catalogue', id: 'catalogue' },
    { label: 'Reviews', href: '#reviews', id: 'reviews' },
    { label: 'Custom Orders', href: '#custom-orders', id: 'custom-orders' },
    { label: 'About Us', href: '#about', id: 'about' },
    { label: 'Facebook', href: '#facebook', id: 'facebook' },
    { label: 'Contact', href: '#contact', id: 'contact' },
  ];

  const scrollTo = (id: string) => {
    setActiveSection(id);
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header className="sticky top-0 z-40 bg-[#FAF7F2]/90 backdrop-blur-md border-b border-[#ECC3BD]/50 transition-all">
        {/* Top mini announcement bar */}
        <div className="bg-[#4A2E2B] text-[#FAF7F2] py-1.5 px-4 text-center text-[11px] sm:text-xs font-medium flex items-center justify-between">
          <div className="hidden sm:flex items-center gap-2 text-[#ECC3BD]">
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>Handmade with love, crafted with care.</span>
          </div>

          <div className="mx-auto sm:mx-0 flex items-center gap-4">
            <span className="text-[#ECC3BD]">
              Custom orders open for birthdays, weddings &amp; keepsakes
            </span>
          </div>

          <button
            onClick={openWhatsAppConfig}
            className="hidden md:flex items-center gap-1.5 text-[#D4AF37] hover:text-white transition text-[11px] underline"
            title="Configure WhatsApp Phone Number"
          >
            <Settings className="w-3 h-3" />
            <span>{isCustomized ? 'WhatsApp Set' : 'Configure WhatsApp'}</span>
          </button>
        </div>

        {/* Main Header Bar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between">
          {/* Brand Identity Logo */}
          <div 
            onClick={() => scrollTo('home')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white p-0.5 border-2 border-[#ECC3BD] shadow-md group-hover:border-[#D4AF37] transition-all overflow-hidden shrink-0">
              <img 
                src={config.logoUrl} 
                alt="B & M Crochet House Official Logo" 
                className="w-full h-full object-cover rounded-full" 
              />
            </div>
            <div>
              <div className="font-serif font-bold text-lg sm:text-2xl tracking-wide text-[#2C1810] flex items-center gap-1.5 leading-tight">
                <span>B &amp; M</span>
                <span className="text-xs sm:text-sm font-sans tracking-widest uppercase font-semibold text-[#8C533C]">
                  Crochet House
                </span>
              </div>
              <p className="hidden sm:block text-[10px] text-[#6D4C41] tracking-wider font-medium">
                {config.instituteName} • <span className="italic font-serif text-[#8C533C]">{config.craftMotto}</span>
              </p>
            </div>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-7 text-xs font-semibold uppercase tracking-wider text-[#4E342E]">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className={`hover:text-[#AA7C11] transition relative py-1 ${
                  activeSection === link.id ? 'text-[#4A2E2B] font-bold' : ''
                }`}
              >
                {link.label}
                {activeSection === link.id && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#D4AF37] rounded-full" />
                )}
              </button>
            ))}
          </nav>

          {/* Right Action Icons & Buttons */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Search Button */}
            <button
              onClick={onSearchClick}
              aria-label="Search creations"
              className="p-2 sm:p-2.5 rounded-full text-[#4E342E] hover:bg-[#ECC3BD]/20 transition"
            >
              <Search className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>

            {/* Shortlist / Wishlist Button */}
            <button
              onClick={openInquiryDrawer}
              aria-label="View shortlisted inquiries"
              className="p-2 sm:p-2.5 rounded-full text-[#4E342E] hover:bg-[#ECC3BD]/20 transition relative"
            >
              <Heart className="w-4 h-4 sm:w-5 sm:h-5" />
              {savedInquiries.length > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-[#8C533C] text-white text-[9px] font-bold flex items-center justify-center">
                  {savedInquiries.length}
                </span>
              )}
            </button>

            {/* In-App PWA Install Button (Chromium / Android / iOS) */}
            {!isInstalled && (isInstallable || isIOS) && (
              <button
                onClick={handleInstallClick}
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#FAF5EE] hover:bg-[#FAF7F2] text-[#4A2E2B] border border-[#D4AF37]/70 text-xs font-semibold shadow-xs transition active:scale-95"
              >
                <Download className="w-3.5 h-3.5 text-[#AA7C11]" />
                <span>Install App</span>
              </button>
            )}

            {/* Custom Commission CTA button */}
            <button
              onClick={openCustomOrderModal}
              className="hidden md:inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#4A2E2B] hover:bg-[#3E2723] text-[#FAF7F2] text-xs font-semibold shadow-sm transition active:scale-95"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Custom Order</span>
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-[#4E342E] hover:bg-[#ECC3BD]/20 transition"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#FAF7F2] border-b border-[#ECC3BD] px-6 py-5 space-y-4 shadow-xl animate-fade-in">
            <div className="flex flex-col space-y-3 text-sm font-medium text-[#4E342E]">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollTo(link.id)}
                  className="text-left py-2 border-b border-[#ECC3BD]/30 hover:text-[#AA7C11] flex items-center justify-between"
                >
                  <span>{link.label}</span>
                  <span className="text-xs text-[#8C533C]">→</span>
                </button>
              ))}
            </div>

            <div className="pt-2 flex flex-col gap-2">
              {!isInstalled && (isInstallable || isIOS) && (
                <button
                  onClick={handleInstallClick}
                  className="w-full py-2.5 px-4 rounded-xl bg-[#FAF5EE] border border-[#D4AF37] text-[#4A2E2B] font-semibold text-xs flex items-center justify-center gap-2"
                >
                  <Download className="w-4 h-4 text-[#AA7C11]" />
                  Install B &amp; M App on Home Screen
                </button>
              )}

              <button
                onClick={openWhatsAppConfig}
                className="w-full py-2 px-4 rounded-xl bg-white border border-[#ECC3BD] text-[#6D4C41] text-xs flex items-center justify-center gap-2"
              >
                <Settings className="w-3.5 h-3.5" />
                Store Settings / WhatsApp Number
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Mobile-First Bottom Navigation Bar (Android & Mobile Native Feel) */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 lg:hidden bg-[#FAF7F2]/95 backdrop-blur-md border-t border-[#ECC3BD]/60 pb-safe shadow-lg">
        <div className="flex items-center justify-around h-14 px-2">
          <button
            onClick={() => scrollTo('home')}
            className={`flex flex-col items-center justify-center flex-1 py-1 transition ${
              activeSection === 'home' ? 'text-[#4A2E2B] font-bold' : 'text-[#8C533C]'
            }`}
          >
            <Home className="w-5 h-5" />
            <span className="text-[10px] mt-0.5">Home</span>
          </button>

          <button
            onClick={() => scrollTo('catalogue')}
            className={`flex flex-col items-center justify-center flex-1 py-1 transition ${
              activeSection === 'catalogue' ? 'text-[#4A2E2B] font-bold' : 'text-[#8C533C]'
            }`}
          >
            <ShoppingBag className="w-5 h-5" />
            <span className="text-[10px] mt-0.5">Shop</span>
          </button>

          {/* Central Highlighted Custom Order Action */}
          <button
            onClick={openCustomOrderModal}
            className="flex flex-col items-center justify-center flex-1 -mt-4"
          >
            <div className="w-11 h-11 rounded-full bg-[#4A2E2B] text-[#FAF7F2] flex items-center justify-center shadow-lg border-2 border-[#FAF7F2] active:scale-95 transition">
              <Sparkles className="w-5 h-5 text-[#D4AF37]" />
            </div>
            <span className="text-[10px] font-semibold text-[#4A2E2B] mt-0.5">Custom</span>
          </button>

          <button
            onClick={openInquiryDrawer}
            className="flex flex-col items-center justify-center flex-1 py-1 text-[#8C533C] relative"
          >
            <Heart className="w-5 h-5" />
            <span className="text-[10px] mt-0.5">Saved</span>
            {savedInquiries.length > 0 && (
              <span className="absolute top-1 right-3 w-4 h-4 rounded-full bg-[#8C533C] text-white text-[9px] font-bold flex items-center justify-center">
                {savedInquiries.length}
              </span>
            )}
          </button>

          <button
            onClick={() => scrollTo('contact')}
            className={`flex flex-col items-center justify-center flex-1 py-1 transition ${
              activeSection === 'contact' ? 'text-[#4A2E2B] font-bold' : 'text-[#8C533C]'
            }`}
          >
            <Phone className="w-5 h-5" />
            <span className="text-[10px] mt-0.5">Contact</span>
          </button>
        </div>
      </nav>

      {/* iOS Safari Guided Install Sheet */}
      <IOSInstallModal isOpen={showIOSModal} onClose={() => setShowIOSModal(false)} />
    </>
  );
};
