import React, { useState } from 'react';
import { Tag, Heart, Eye, Sparkles, Clock, Star, Share2, Check } from 'lucide-react';
import { Product } from '../data/products';
import { useBusiness } from '../context/BusinessContext';

interface ProductCardProps {
  product: Product;
  onQuickView: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onQuickView }) => {
  const { 
    openRequestModalFor, 
    toggleSaveInquiry, 
    isInquirySaved,
    getRatingSummary,
    openReviewModalFor
  } = useBusiness();
  const isSaved = isInquirySaved(product.id);
  const ratingSummary = getRatingSummary(product.id);
  const [copied, setCopied] = useState(false);

  const handleShare = async (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }

    const shareUrl = `${window.location.origin}${window.location.pathname}#product-${product.id}`;
    const shareTitle = `${product.name} | B & M Crochet House`;
    const shareText = `Check out this handmade crochet "${product.name}" (${product.subtitle}) by B & M Crochet House! Custom sizing & colors crafted with love.`;

    const sharePayload = {
      title: shareTitle,
      text: shareText,
      url: shareUrl,
    };

    // 1. Try native Web Share API
    if (navigator.share) {
      try {
        await navigator.share(sharePayload);
        return;
      } catch (err: unknown) {
        if (err instanceof Error && err.name === 'AbortError') {
          return; // User dismissed share sheet
        }
      }
    }

    // 2. Fallback: Copy to clipboard with visual toast
    try {
      await navigator.clipboard.writeText(`${shareText} ${shareUrl}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2400);
    } catch {
      // 3. Ultimate fallback: open WhatsApp share intent
      const waUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(
        `${shareText} ${shareUrl}`
      )}`;
      window.open(waUrl, '_blank');
    }
  };

  return (
    <div className="group bg-white rounded-3xl border border-[#ECC3BD]/60 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between hover:border-[#D4AF37]/50 relative">
      {/* Top Image Container */}
      <div className="relative aspect-4/3 sm:aspect-square bg-[#FAF5EE] overflow-hidden">
        <img
          src={product.imageUrl}
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Gradient Overlay for luxury feel */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/10 opacity-60 group-hover:opacity-40 transition-opacity" />

        {/* Category & Handmade Tags */}
        <div className="absolute top-3 left-3 flex flex-col gap-1 items-start">
          <span className="px-2.5 py-1 rounded-full bg-[#FAF7F2]/95 backdrop-blur-xs text-[#4A2E2B] text-[10px] font-semibold tracking-wide shadow-xs border border-[#ECC3BD]/40">
            {product.category}
          </span>
          <span className="px-2 py-0.5 rounded-full bg-[#4A2E2B]/90 text-[#FAF7F2] text-[9px] uppercase tracking-wider font-semibold border border-[#D4AF37]/40 shadow-xs flex items-center gap-1">
            <Sparkles className="w-2.5 h-2.5 text-[#D4AF37]" />
            B&amp;M Original
          </span>
          {product.galleryImages && product.galleryImages.length > 0 && (
            <span className="px-2 py-0.5 rounded-full bg-white/90 text-[#2C1810] text-[9px] font-bold shadow-xs border border-[#ECC3BD]">
              +{product.galleryImages.length + 1} Angles
            </span>
          )}
        </div>

        {/* Wishlist & Quick View Buttons */}
        <div className="absolute top-3 right-3 flex flex-col gap-1.5">
          <button
            onClick={() => toggleSaveInquiry(product)}
            aria-label={isSaved ? 'Remove from shortlist' : 'Add to shortlist'}
            className={`w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-md transition shadow-sm ${
              isSaved
                ? 'bg-[#ECC3BD] text-[#4A2E2B]'
                : 'bg-white/80 text-[#4E342E] hover:bg-white'
            }`}
          >
            <Heart className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
          </button>

          <button
            onClick={() => onQuickView(product)}
            aria-label="Quick View"
            className="w-8 h-8 rounded-full bg-white/80 hover:bg-white text-[#4E342E] flex items-center justify-center backdrop-blur-md transition shadow-sm opacity-90 hover:opacity-100"
          >
            <Eye className="w-4 h-4" />
          </button>

          <button
            onClick={handleShare}
            aria-label={`Share ${product.name}`}
            title="Share with friends"
            className={`w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-md transition shadow-sm ${
              copied
                ? 'bg-[#D4AF37] text-[#2C1810]'
                : 'bg-white/80 hover:bg-white text-[#4E342E]'
            }`}
          >
            {copied ? <Check className="w-4 h-4" /> : <Share2 className="w-4 h-4" />}
          </button>
        </div>

        {/* Bottom image banner */}
        <div className="absolute bottom-2 left-3 right-3 flex items-center justify-between text-white text-[11px] font-medium drop-shadow-sm">
          <span className="flex items-center gap-1 text-[#F6DFDC]">
            <Clock className="w-3 h-3 text-[#D4AF37]" />
            {product.estimatedCraftTime}
          </span>
          <span className="text-[10px] bg-black/40 px-2 py-0.5 rounded-full">
            Customizable
          </span>
        </div>
      </div>

      {/* Card Info Content */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3">
        <div>
          <div className="flex items-center justify-between gap-1 mb-1">
            <button
              onClick={() => openReviewModalFor(product)}
              className="flex items-center gap-1 text-[11px] font-medium text-[#AA7C11] hover:underline"
              title="Click to see ratings or write a review"
            >
              <div className="flex text-[#D4AF37]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3 h-3 fill-current" />
                ))}
              </div>
              <span className="font-semibold text-[#2C1810]">
                {ratingSummary.count > 0 ? ratingSummary.average.toFixed(1) : '5.0'}
              </span>
              <span className="text-gray-400">
                ({ratingSummary.count})
              </span>
            </button>

            <button
              onClick={() => openReviewModalFor(product)}
              className="text-[10px] text-[#8C533C] hover:text-[#4A2E2B] font-semibold underline"
            >
              + Review
            </button>
          </div>

          <h3 
            onClick={() => onQuickView(product)}
            className="font-serif font-bold text-base sm:text-lg text-[#2C1810] leading-snug line-clamp-1 group-hover:text-[#8C533C] transition cursor-pointer"
          >
            {product.name}
          </h3>
          <p className="text-xs text-[#8C533C] line-clamp-1 mt-0.5 font-medium">
            {product.subtitle}
          </p>
          <p className="text-xs text-[#6D4C41] line-clamp-2 mt-1.5 leading-relaxed">
            {product.shortDescription}
          </p>
        </div>

        {/* Pricing indicator */}
        <div className="pt-2 border-t border-[#ECC3BD]/40 flex items-center justify-between">
          <div>
            <span className="text-[10px] uppercase tracking-wider text-[#8C533C] font-semibold block">
              Pricing Tier
            </span>
            <span className="text-xs sm:text-sm font-semibold text-[#3E2723]">
              {product.priceDisplay}
            </span>
          </div>

          {/* Color preview dots */}
          <div className="flex -space-x-1.5 items-center">
            {product.sampleColors.slice(0, 3).map((col) => (
              <span
                key={col.name}
                title={col.name}
                className="w-4 h-4 rounded-full border-2 border-white shadow-xs"
                style={{ backgroundColor: col.hex }}
              />
            ))}
            {product.sampleColors.length > 3 && (
              <span className="text-[10px] text-[#8C533C] pl-2 font-medium">
                +{product.sampleColors.length - 3}
              </span>
            )}
          </div>
        </div>

        {/* Primary Action Buttons: Request Price & Share */}
        <div className="flex items-center gap-2 pt-1">
          <button
            onClick={() => openRequestModalFor(product)}
            className="flex-1 py-2.5 sm:py-3 px-3 bg-[#4A2E2B] hover:bg-[#3E2723] active:scale-[0.98] text-[#FAF7F2] font-semibold rounded-2xl text-xs sm:text-sm transition flex items-center justify-center gap-1.5 shadow-xs group-hover:shadow-md"
          >
            <Tag className="w-3.5 h-3.5 text-[#D4AF37]" />
            Request Price
          </button>

          <button
            onClick={handleShare}
            aria-label={`Share ${product.name}`}
            title="Share creation with friends via social apps"
            className={`py-2.5 sm:py-3 px-3 sm:px-3.5 rounded-2xl border transition flex items-center justify-center gap-1.5 active:scale-[0.97] shrink-0 ${
              copied
                ? 'bg-[#FAF5EE] border-[#D4AF37] text-[#AA7C11]'
                : 'bg-[#FAF5EE] hover:bg-[#ECC3BD]/30 border-[#ECC3BD] text-[#4A2E2B]'
            }`}
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-700" />
                <span className="text-xs font-semibold text-emerald-800">Copied!</span>
              </>
            ) : (
              <>
                <Share2 className="w-3.5 h-3.5 text-[#8C533C]" />
                <span className="text-xs font-semibold text-[#4A2E2B]">Share</span>
              </>
            )}
          </button>
        </div>

        {/* Floating feedback toast */}
        {copied && (
          <div className="absolute top-14 left-1/2 -translate-x-1/2 z-30 px-3 py-1.5 rounded-full bg-[#2C1810]/95 text-[#FAF7F2] text-[11px] font-medium shadow-xl border border-[#D4AF37]/50 flex items-center gap-1.5 pointer-events-none animate-bounce">
            <Check className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>Product details copied!</span>
          </div>
        )}
      </div>
    </div>
  );
};
