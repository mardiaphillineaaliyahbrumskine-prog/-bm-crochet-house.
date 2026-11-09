import React from 'react';
import { 
  Heart, 
  MessageCircle, 
  Sparkles, 
  Smartphone, 
  ShieldCheck, 
  ArrowUp,
  Download,
  Mail
} from 'lucide-react';
import { useBusiness } from '../context/BusinessContext';
import { usePWAInstall } from '../hooks/usePWAInstall';
import { NewsletterSignup } from './NewsletterSignup';

export const Footer: React.FC = () => {
  const { config, openWhatsAppConfig, openCustomOrderModal } = useBusiness();
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#2C1810] text-[#FAF7F2] pt-14 pb-24 lg:pb-12 border-t border-[#4A2E2B] relative overflow-hidden">
      {/* Decorative top gold gradient accent line */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#D4AF37] via-[#ECC3BD] to-[#AA7C11]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Newsletter Signup Section */}
        <NewsletterSignup />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-10 pb-12 border-b border-[#4A2E2B]/80">
          
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 rounded-full bg-white p-1 border-2 border-[#D4AF37] shadow-md overflow-hidden shrink-0">
                <img 
                  src={config.logoUrl} 
                  alt="B & M Crochet House Official Logo" 
                  className="w-full h-full object-cover rounded-full" 
                />
              </div>
              <div>
                <span className="font-serif text-xl sm:text-2xl font-bold tracking-wide text-[#FAF7F2] block">
                  B &amp; M Crochet House
                </span>
                <span className="text-xs text-[#D4AF37] block font-medium">
                  {config.instituteName}
                </span>
                <span className="text-xs text-[#ECC3BD] font-serif italic">
                  &quot;{config.craftMotto}&quot;
                </span>
              </div>
            </div>

            <p className="text-xs text-[#FAF7F2]/80 leading-relaxed max-w-sm">
              Artisanal slow-fashion crochet studio crafting custom wearables, heirloom nursery blankets, and textured everyday bags from gentle natural fibers.
            </p>

            {/* Social Buttons (Direct real channels) */}
            <div className="flex items-center gap-3 pt-1">
              <a
                href={config.facebookUrl || '#facebook'}
                target={config.facebookUrl ? '_blank' : '_self'}
                rel={config.facebookUrl ? 'noopener noreferrer' : undefined}
                className="w-9 h-9 rounded-xl bg-[#4A2E2B] hover:bg-[#1877F2] text-[#FAF7F2] flex items-center justify-center transition shadow-xs"
                title={config.facebookUrl ? 'Follow on Facebook' : 'View Facebook & Social Showcase'}
              >
                <span className="font-bold text-sm">f</span>
              </a>

              <a
                href={`https://wa.me/${config.whatsAppNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent('Hello B & M Crochet House! I am contacting you regarding your handmade creations.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-[#4A2E2B] hover:bg-[#25D366] text-[#FAF7F2] flex items-center justify-center transition shadow-xs"
                title={`Chat on WhatsApp (${config.whatsAppDisplay})`}
              >
                <MessageCircle className="w-4 h-4" />
              </a>

              <a
                href={`mailto:${config.email}`}
                className="w-9 h-9 rounded-xl bg-[#4A2E2B] hover:bg-[#D4AF37] hover:text-[#2C1810] text-[#FAF7F2] flex items-center justify-center transition shadow-xs"
                title={`Email: ${config.email}`}
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="font-serif font-bold text-sm uppercase tracking-wider text-[#D4AF37]">
              Explore
            </h4>
            <ul className="space-y-2 text-xs text-[#FAF7F2]/80">
              <li>
                <a href="#catalogue" className="hover:text-[#ECC3BD] transition">
                  Wearables &amp; Tops
                </a>
              </li>
              <li>
                <a href="#catalogue" className="hover:text-[#ECC3BD] transition">
                  Bags &amp; Totes
                </a>
              </li>
              <li>
                <a href="#catalogue" className="hover:text-[#ECC3BD] transition">
                  Heirloom Baby Blankets
                </a>
              </li>
              <li>
                <a href="#catalogue" className="hover:text-[#ECC3BD] transition">
                  Amigurumi &amp; Toys
                </a>
              </li>
              <li>
                <a href="#catalogue" className="hover:text-[#ECC3BD] transition">
                  Hair &amp; Living Accessories
                </a>
              </li>
            </ul>
          </div>

          {/* Customer Care & Bespoke */}
          <div className="space-y-3">
            <h4 className="font-serif font-bold text-sm uppercase tracking-wider text-[#D4AF37]">
              Commissions
            </h4>
            <ul className="space-y-2 text-xs text-[#FAF7F2]/80">
              <li>
                <button
                  onClick={openCustomOrderModal}
                  className="hover:text-[#ECC3BD] transition text-left"
                >
                  Custom Order Request
                </button>
              </li>
              <li>
                <a href="#contact" className="hover:text-[#ECC3BD] transition">
                  Order Status Lookup
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-[#ECC3BD] transition">
                  Crochet Care &amp; Washing
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-[#ECC3BD] transition">
                  Shipping &amp; Delivery Info
                </a>
              </li>
              <li>
                <button
                  onClick={openWhatsAppConfig}
                  className="hover:text-[#ECC3BD] transition text-left text-[11px] text-[#ECC3BD]"
                >
                  Owner WhatsApp Settings
                </button>
              </li>
            </ul>
          </div>

          {/* App & Mobile Info */}
          <div className="space-y-3">
            <h4 className="font-serif font-bold text-sm uppercase tracking-wider text-[#D4AF37]">
              Mobile PWA
            </h4>
            <p className="text-xs text-[#FAF7F2]/80 leading-relaxed">
              Install B &amp; M Crochet House directly on your Android phone or iPhone for offline browsing and instant WhatsApp ordering.
            </p>
            {!isInstalled && isInstallable && (
              <button
                onClick={install}
                className="w-full py-2.5 px-3 bg-[#4A2E2B] hover:bg-[#3E2723] border border-[#D4AF37]/50 rounded-xl text-xs font-semibold text-[#FAF7F2] flex items-center justify-center gap-1.5 transition"
              >
                <Download className="w-3.5 h-3.5 text-[#D4AF37]" />
                Install Mobile App
              </button>
            )}
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#4A2E2B]/80 text-[10px] text-[#ECC3BD] border border-[#ECC3BD]/20">
              <Smartphone className="w-3 h-3 text-[#D4AF37]" />
              <span>Android TWA Compatible</span>
            </div>
          </div>

        </div>

        {/* Bottom sub-footer */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#FAF7F2]/70">
          <p>
            &copy; {new Date().getFullYear()} B &amp; M Crochet House. All rights reserved. Handcrafted with love.
          </p>

          <div className="flex items-center gap-4">
            <span className="text-[11px] text-[#ECC3BD]">
              Handmade Slow Fashion
            </span>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-xl bg-[#4A2E2B] hover:bg-[#3E2723] text-[#FAF7F2] transition flex items-center gap-1"
              title="Back to Top"
            >
              <ArrowUp className="w-3.5 h-3.5" />
              <span className="text-[10px]">Top</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
