import React, { useState } from 'react';
import { 
  MessageCircle, 
  Sparkles, 
  Heart, 
  Tag, 
  Eye, 
  ExternalLink,
  ShieldCheck,
  Check,
  Share2
} from 'lucide-react';
import { useBusiness } from '../context/BusinessContext';
import { PRODUCTS, Product } from '../data/products';
import { ProductQuickViewModal } from './ProductQuickViewModal';

export const FacebookSection: React.FC = () => {
  const { config, openRequestModalFor, activeWhatsApp } = useBusiness();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [ownerFacebookUrl, setOwnerFacebookUrl] = useState<string>(() => {
    try {
      return localStorage.getItem('bm_crochet_custom_facebook_url') || config.facebookUrl || '';
    } catch {
      return config.facebookUrl || '';
    }
  });
  const [isEditingUrl, setIsEditingUrl] = useState(false);
  const [tempUrl, setTempUrl] = useState(ownerFacebookUrl);

  // Match genuine uploaded creations from PRODUCTS (no fake information or broken links)
  const featuredCreations = [
    PRODUCTS.find((p) => p.id === 'gown-waterfall-fringe') || PRODUCTS[0],
    PRODUCTS.find((p) => p.id === 'baby-dress-scalloped-mocha') || PRODUCTS[1],
    PRODUCTS.find((p) => p.id === 'cap-pearl-luxury-emerald') || PRODUCTS[2],
  ];

  const handleSaveFacebookUrl = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = tempUrl.trim();
    setOwnerFacebookUrl(clean);
    setIsEditingUrl(false);
    try {
      if (clean) {
        localStorage.setItem('bm_crochet_custom_facebook_url', clean);
      } else {
        localStorage.removeItem('bm_crochet_custom_facebook_url');
      }
    } catch {
      // ignore
    }
  };

  const handleShareSection = async () => {
    const shareData = {
      title: 'B & M Crochet House - Handmade Slow Fashion',
      text: 'Explore authentic slow-fashion crochet creations handcrafted with love by B & M Crochet House.',
      url: `${window.location.origin}/#facebook`,
    };
    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch {
        // user aborted
      }
    } else {
      navigator.clipboard.writeText(shareData.url);
      alert('Link copied to clipboard!');
    }
  };

  return (
    <section id="facebook" className="py-14 sm:py-20 px-4 sm:px-6 max-w-7xl mx-auto scroll-mt-20">
      <div className="bg-white rounded-3xl sm:rounded-4xl p-6 sm:p-10 border border-[#ECC3BD] shadow-lg space-y-8">
        
        {/* Header with Authentic Facebook & Social Status */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-[#ECC3BD]/50 pb-6">
          <div className="flex items-start sm:items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-[#1877F2] text-white flex items-center justify-center font-bold text-2xl shadow-sm shrink-0">
              f
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="font-serif font-bold text-xl sm:text-2xl text-[#2C1810]">
                  B &amp; M Crochet House Community
                </h3>
                <span className="px-2.5 py-0.5 rounded-full bg-[#FAF5EE] border border-[#ECC3BD] text-[10px] text-[#8C533C] font-semibold">
                  Official Atelier
                </span>
              </div>
              <p className="text-xs text-[#6D4C41]">
                {ownerFacebookUrl ? (
                  <span>
                    Official Page Connected: <strong className="text-[#1877F2]">{ownerFacebookUrl}</strong>
                  </span>
                ) : (
                  <span>
                    Official Social Community &bull; Direct orders &amp; bespoke inquiries handled on WhatsApp (<strong>{config.whatsAppDisplay}</strong>)
                  </span>
                )}
              </p>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex flex-wrap items-center gap-2.5">
            {ownerFacebookUrl ? (
              <a
                href={ownerFacebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2.5 rounded-xl bg-[#1877F2] hover:bg-[#166fe5] text-white font-semibold text-xs transition flex items-center gap-2 shadow-xs"
              >
                <span>Visit Our Facebook Page</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            ) : (
              <button
                onClick={() => setIsEditingUrl(!isEditingUrl)}
                className="px-3.5 py-2.5 rounded-xl bg-[#FAF5EE] hover:bg-[#ECC3BD]/30 text-[#4E342E] border border-[#ECC3BD] font-medium text-xs transition flex items-center gap-1.5"
              >
                <span>Connect Facebook Page URL</span>
              </button>
            )}

            <a
              href={`https://wa.me/${config.whatsAppNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                'Hello B & M Crochet House! I am reaching out from your community gallery to inquire about your slow-fashion crochet creations.'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white font-semibold text-xs transition flex items-center gap-1.5 shadow-xs"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>Chat on WhatsApp</span>
            </a>

            <button
              onClick={handleShareSection}
              className="p-2.5 rounded-xl border border-[#ECC3BD] hover:bg-[#FAF5EE] text-[#6D4C41] transition"
              title="Share Community Gallery"
            >
              <Share2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Optional Owner URL Editor */}
        {isEditingUrl && (
          <form 
            onSubmit={handleSaveFacebookUrl}
            className="p-4 rounded-2xl bg-[#FAF5EE] border border-[#ECC3BD] space-y-2 animate-fade-in text-xs"
          >
            <div className="flex items-center justify-between">
              <span className="font-semibold text-[#2C1810]">
                Enter Your Official Facebook Page Link:
              </span>
              <button 
                type="button" 
                onClick={() => setIsEditingUrl(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                Cancel
              </button>
            </div>
            <div className="flex gap-2">
              <input
                type="url"
                required
                value={tempUrl}
                onChange={(e) => setTempUrl(e.target.value)}
                placeholder="https://facebook.com/your-real-page-name"
                className="flex-1 px-3 py-2 rounded-xl bg-white border border-[#ECC3BD] text-xs text-[#2C1810] outline-none focus:ring-1 focus:ring-[#4A2E2B]"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-[#4A2E2B] text-[#FAF7F2] rounded-xl font-semibold hover:bg-[#3E2723] transition"
              >
                Save Real Link
              </button>
            </div>
            <p className="text-[11px] text-[#8C533C]">
              Once saved, visitors can click directly to your real Facebook profile or business page.
            </p>
          </form>
        )}

        {/* Genuine Handmade Creations Spotlight */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h4 className="text-sm font-semibold uppercase tracking-wider text-[#4E342E] flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-[#D4AF37]" />
                Featured Creations from Our Atelier
              </h4>
              <p className="text-xs text-[#6D4C41]">
                Real handmade crochet creations photographed directly in our studio.
              </p>
            </div>
            <span className="text-[11px] text-[#8C533C] font-medium bg-[#FAF5EE] px-2.5 py-1 rounded-full border border-[#ECC3BD]/60 self-start sm:self-auto">
              100% Genuine Studio Photography
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredCreations.map((prod) => (
              <div
                key={prod.id}
                className="bg-[#FAF7F2] rounded-3xl border border-[#ECC3BD]/70 overflow-hidden shadow-xs hover:shadow-lg transition-all flex flex-col justify-between group"
              >
                {/* Photo with direct quick-view trigger */}
                <div 
                  onClick={() => setSelectedProduct(prod)}
                  className="relative aspect-4/3 bg-[#FAF5EE] overflow-hidden cursor-pointer"
                  title={`View details for ${prod.name}`}
                >
                  <img
                    src={prod.imageUrl}
                    alt={prod.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="px-3 py-1.5 rounded-full bg-white/90 text-[#2C1810] font-semibold text-xs flex items-center gap-1.5 shadow-md">
                      <Eye className="w-3.5 h-3.5" />
                      View Creation
                    </span>
                  </div>
                  <span className="absolute top-3 left-3 bg-[#2C1810]/85 text-[#FAF7F2] text-[10px] font-semibold px-2.5 py-0.5 rounded-full backdrop-blur-xs border border-[#D4AF37]/40">
                    {prod.category}
                  </span>
                </div>

                {/* Details & Direct Actions */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    <h5 
                      onClick={() => setSelectedProduct(prod)}
                      className="font-serif font-bold text-base text-[#2C1810] line-clamp-1 hover:text-[#8C533C] cursor-pointer transition"
                    >
                      {prod.name}
                    </h5>
                    <p className="text-xs text-[#8C533C] font-medium mt-0.5 line-clamp-1">
                      {prod.subtitle}
                    </p>
                    <p className="text-xs text-[#6D4C41] leading-relaxed mt-2 line-clamp-2">
                      {prod.shortDescription}
                    </p>
                  </div>

                  {/* Materials & Sizing info */}
                  <div className="pt-2 border-t border-[#ECC3BD]/40 text-[11px] text-[#4E342E] space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-[#8C533C] font-semibold">Crafting Time:</span>
                      <span>{prod.estimatedCraftTime}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[#8C533C] font-semibold">Price:</span>
                      <span className="font-semibold text-[#3E2723]">{prod.priceDisplay}</span>
                    </div>
                  </div>

                  {/* Real Actions: Quick View & Request Price */}
                  <div className="grid grid-cols-2 gap-2 pt-1">
                    <button
                      onClick={() => setSelectedProduct(prod)}
                      className="py-2.5 px-3 rounded-xl border border-[#ECC3BD] bg-white hover:bg-[#ECC3BD]/20 text-[#4E342E] font-semibold text-xs transition flex items-center justify-center gap-1.5"
                    >
                      <Eye className="w-3.5 h-3.5 text-[#8C533C]" />
                      <span>Details</span>
                    </button>

                    <button
                      onClick={() => openRequestModalFor(prod)}
                      className="py-2.5 px-3 rounded-xl bg-[#4A2E2B] hover:bg-[#3E2723] text-[#FAF7F2] font-semibold text-xs transition flex items-center justify-center gap-1.5 shadow-xs"
                    >
                      <Tag className="w-3.5 h-3.5 text-[#D4AF37]" />
                      <span>Request Price</span>
                    </button>
                  </div>

                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Transparent Notice */}
        <div className="p-4 bg-[#FAF5EE] rounded-2xl border border-[#ECC3BD]/60 flex items-center justify-between flex-wrap gap-2 text-xs text-[#6D4C41]">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0" />
            <span>
              All product photos shown above are authentic B &amp; M Crochet House creations. Inquire directly on WhatsApp ({config.whatsAppDisplay}) for custom commissions.
            </span>
          </div>
        </div>

      </div>

      {/* Modal for Quick View when clicked */}
      {selectedProduct && (
        <ProductQuickViewModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </section>
  );
};
