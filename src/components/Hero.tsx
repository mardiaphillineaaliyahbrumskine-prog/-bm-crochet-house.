import React from 'react';
import { Sparkles, MessageCircle, ArrowRight, Heart, ShieldCheck, Download } from 'lucide-react';
import { useBusiness } from '../context/BusinessContext';
import { usePWAInstall } from '../hooks/usePWAInstall';
import { buildWhatsAppLink } from '../data/businessConfig';
import { PRODUCTS } from '../data/products';

interface HeroProps {
  onExploreClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreClick }) => {
  const { config, openCustomOrderModal, activeWhatsApp } = useBusiness();
  const { isInstallable, install } = usePWAInstall();

  const handleWhatsAppGeneralChat = () => {
    const link = buildWhatsAppLink(
      'Hello B & M Crochet House! I am visiting your boutique website and would love to ask about your custom crochet collections.',
      activeWhatsApp
    );
    window.open(link, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="home" className="relative pt-6 sm:pt-12 pb-12 sm:pb-20 px-4 sm:px-6 overflow-hidden">
      {/* Decorative Warm Ambient Glows */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#ECC3BD]/25 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-36 -left-20 w-72 h-72 bg-[#D4AF37]/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Brand Copy & CTAs */}
          <div className="lg:col-span-7 space-y-5 text-center lg:text-left relative z-10">
            
            {/* Tagline Pill with Official Logo Symbol */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FAF5EE] border border-[#ECC3BD] shadow-xs text-[#8C533C] text-xs font-semibold tracking-wide">
              <img 
                src={config.logoUrl} 
                alt="Logo Icon" 
                className="w-4 h-4 rounded-full object-cover" 
              />
              <span>{config.instituteName}</span>
              <span className="text-[#D4AF37]">•</span>
              <span className="italic">{config.craftMotto}</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-bold text-[#2C1810] tracking-tight leading-[1.12]">
              Handmade with Love,{' '}
              <span className="italic font-normal text-[#8C533C] block sm:inline">
                Crafted with Care.
              </span>
            </h1>

            {/* Subheading */}
            <p className="text-sm sm:text-base text-[#4E342E] leading-relaxed max-w-xl mx-auto lg:mx-0">
              Welcome to <strong>B &amp; M Crochet House</strong>. We handcraft bespoke couture evening gowns, bodycon dresses, summer two-piece sets, heirloom baby keepsakes, and luxury handbags with meticulous hand-stitch tension.
            </p>

            {/* Quality Statement */}
            <div className="p-3 bg-[#FAF5EE]/90 rounded-2xl border border-[#ECC3BD]/70 text-left text-[11px] text-[#6D4C41] max-w-lg mx-auto lg:mx-0 flex items-start gap-2.5">
              <div className="p-1.5 bg-[#ECC3BD]/30 rounded-lg text-[#8C533C] shrink-0 mt-0.5">
                <Heart className="w-3.5 h-3.5 fill-current" />
              </div>
              <p>
                <strong>Artisan Note:</strong> Every piece in our catalogue is 100% genuine B &amp; M Crochet House work. Select any creation to request a personalized price quotation or custom colorway via WhatsApp.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 pt-2">
              <button
                onClick={onExploreClick}
                className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-[#4A2E2B] hover:bg-[#3E2723] text-[#FAF7F2] font-semibold text-sm transition shadow-md hover:shadow-lg flex items-center justify-center gap-2 active:scale-[0.99]"
              >
                <span>View Creations ({PRODUCTS.length})</span>
                <ArrowRight className="w-4 h-4 text-[#D4AF37]" />
              </button>

              <button
                onClick={openCustomOrderModal}
                className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-white hover:bg-[#ECC3BD]/20 text-[#4E342E] border border-[#ECC3BD] font-semibold text-sm transition shadow-xs flex items-center justify-center gap-2 active:scale-[0.99]"
              >
                <Sparkles className="w-4 h-4 text-[#AA7C11]" />
                <span>Custom Order</span>
              </button>

              <button
                onClick={handleWhatsAppGeneralChat}
                className="w-full sm:w-auto px-5 py-3.5 rounded-2xl bg-[#25D366]/15 hover:bg-[#25D366]/25 text-[#1b8a42] border border-[#25D366]/40 font-semibold text-sm transition flex items-center justify-center gap-2"
                title="Direct WhatsApp Chat"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp Us</span>
              </button>
            </div>

            {/* Trust Badges */}
            <div className="pt-4 border-t border-[#ECC3BD]/50 flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs text-[#6D4C41]">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#AA7C11]" />
                <span>100% Hand-Crocheted</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-[#AA7C11]" />
                <span>We Craft with Hands</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Heart className="w-4 h-4 text-[#AA7C11]" />
                <span>Custom Sizing Available</span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual Showcase with Real Photograph */}
          <div className="lg:col-span-5 relative mt-4 lg:mt-0">
            <div className="relative mx-auto max-w-sm sm:max-w-md">
              {/* Outer Golden/Blush Frame */}
              <div className="absolute -inset-3 rounded-4xl bg-gradient-to-tr from-[#D4AF37]/30 via-[#ECC3BD]/40 to-[#4A2E2B]/10 blur-md transform -rotate-1" />
              
              <div className="relative bg-[#FAF5EE] p-3 rounded-4xl border border-[#ECC3BD] shadow-2xl overflow-hidden">
                <img
                  src={config.heroModelImageUrl}
                  alt="Blush Ruffled Off-Shoulder Mermaid Gown - Real B & M Crochet House Creation"
                  className="w-full h-96 sm:h-[460px] object-cover object-top rounded-3xl"
                />

                {/* Floating Official Logo Badge */}
                <div className="absolute top-6 right-6 w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white p-1 border-2 border-[#D4AF37] shadow-xl overflow-hidden animate-pulse">
                  <img 
                    src={config.logoUrl} 
                    alt="B & M Crochet House Official Logo" 
                    className="w-full h-full object-cover rounded-full" 
                  />
                </div>

                {/* Floating Inset Product Badge */}
                <div className="absolute bottom-6 left-6 right-6 p-4 bg-[#FAF7F2]/95 backdrop-blur-md rounded-2xl border border-[#ECC3BD]/60 shadow-lg flex items-center justify-between">
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-wider text-[#AA7C11] flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-[#D4AF37]" />
                      Real Atelier Creation
                    </span>
                    <h3 className="font-serif font-bold text-sm text-[#2C1810]">
                      Blush Ruffled Mermaid Gown
                    </h3>
                    <p className="text-[11px] text-[#6D4C41]">
                      Price Upon Request • Handcrafted
                    </p>
                  </div>
                  <button
                    onClick={onExploreClick}
                    className="p-2.5 rounded-xl bg-[#4A2E2B] text-white hover:bg-[#3E2723] transition shrink-0 shadow-xs"
                    title="Explore Catalogue"
                  >
                    <ArrowRight className="w-4 h-4 text-[#D4AF37]" />
                  </button>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
