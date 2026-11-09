import React from 'react';
import { Sparkles, Heart, ShieldCheck, RefreshCw, Feather, Scissors } from 'lucide-react';
import { useBusiness } from '../context/BusinessContext';

export const AboutSection: React.FC = () => {
  const { config, openCustomOrderModal } = useBusiness();

  const values = [
    {
      icon: Scissors,
      title: 'Handmade, Stitch by Stitch',
      desc: 'No automated machines or mass-produced short-cuts. Every loop and knot is crafted with intentional tension by our artisan hands.',
    },
    {
      icon: Feather,
      title: 'Gentle, Skin-Friendly Yarns',
      desc: 'We select soft milk cotton, bamboo-cotton blends, and hypoallergenic baby yarns that breathe comfortably against delicate skin.',
    },
    {
      icon: Heart,
      title: 'Sustainable Slow Fashion',
      desc: 'Made on demand to eradicate textile waste. Each cardigan, tote, or blanket is created to be cherished across seasons and passed down.',
    },
    {
      icon: Sparkles,
      title: 'Fully Custom Made-to-Measure',
      desc: 'Every body and nursery is unique. We customize bust dimensions, sleeve lengths, blanket dimensions, and specific color palettes.',
    },
  ];

  return (
    <section id="about" className="py-14 sm:py-20 px-4 sm:px-6 bg-[#FAF5EE] border-y border-[#ECC3BD]/50 scroll-mt-20">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Top Story Block */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-sm rounded-3xl overflow-hidden shadow-2xl border-2 border-[#ECC3BD]">
              <img
                src={config.makerImageUrl}
                alt="Meet the Artisan - B & M Crochet House Founder with Yarn & Crochet Hook"
                className="w-full h-96 sm:h-[480px] object-cover object-top"
              />

              {/* Official Logo Corner Stamp */}
              <div className="absolute top-4 left-4 w-16 h-16 rounded-full bg-white p-1 border-2 border-[#D4AF37] shadow-lg overflow-hidden">
                <img 
                  src={config.logoUrl} 
                  alt="Official Logo" 
                  className="w-full h-full object-cover rounded-full" 
                />
              </div>

              <div className="absolute inset-0 bg-gradient-to-t from-[#2C1810]/85 via-transparent to-transparent flex items-end p-6">
                <div className="text-white">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-[#D4AF37] flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-[#D4AF37]" />
                    {config.instituteName}
                  </span>
                  <p className="font-serif text-xl font-bold">
                    B &amp; M Crochet House
                  </p>
                  <p className="text-xs text-[#FAF7F2]/90 italic">
                    &quot;{config.craftMotto}&quot;
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-4 text-left">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-[#ECC3BD] text-xs font-semibold text-[#8C533C]">
              <Heart className="w-3.5 h-3.5 text-[#D4AF37] fill-current" />
              Our Story &amp; Craft
            </div>

            <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-[#2C1810] tracking-tight">
              Where Fiber Art Meets Everyday Elegance
            </h2>

            <p className="text-xs sm:text-sm text-[#4E342E] leading-relaxed">
              At <strong>B &amp; M Crochet House</strong>, crochet is more than just yarn and a hook—it is a celebration of warmth, patience, and bespoke artistic expression. 
            </p>

            <p className="text-xs sm:text-sm text-[#4E342E] leading-relaxed">
              Whether you are looking for an intricately stitched granny square cardigan for cooler evenings, a chic boho bag for sunny weekends, or an heirloom waffle blanket for a precious newborn, we pour care into every single stitch.
            </p>

            {/* Crochet Care Box */}
            <div className="p-4 bg-white rounded-2xl border border-[#ECC3BD] space-y-2 mt-4">
              <h4 className="text-xs font-serif font-bold uppercase tracking-wider text-[#3E2723] flex items-center gap-2">
                <RefreshCw className="w-4 h-4 text-[#AA7C11]" />
                How to Care for Your Handmade Crochet:
              </h4>
              <ul className="text-xs text-[#6D4C41] space-y-1 list-disc list-inside">
                <li>Hand wash gently in cool water using mild wool/delicate detergent.</li>
                <li>Do not wring or twist. Gently roll in a dry towel to absorb excess water.</li>
                <li>Lay flat on a drying rack to retain the garment&apos;s natural shape.</li>
                <li>Store folded rather than on wire hangers to preserve shoulder seams.</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Pillars / Values Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 pt-4">
          {values.map((v) => {
            const Icon = v.icon;
            return (
              <div
                key={v.title}
                className="p-5 bg-white rounded-2xl border border-[#ECC3BD]/60 shadow-xs space-y-2.5"
              >
                <div className="w-10 h-10 rounded-xl bg-[#FAF5EE] text-[#4A2E2B] flex items-center justify-center border border-[#ECC3BD]">
                  <Icon className="w-5 h-5" />
                </div>
                <h4 className="font-serif font-bold text-sm text-[#2C1810]">
                  {v.title}
                </h4>
                <p className="text-xs text-[#6D4C41] leading-relaxed">
                  {v.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
