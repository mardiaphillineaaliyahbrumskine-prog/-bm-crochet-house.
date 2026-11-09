import React, { useState } from 'react';
import { X, Heart, MessageCircle, Tag, Sparkles, Clock, Feather, ShieldCheck, Star, Share2, Check } from 'lucide-react';
import { Product } from '../data/products';
import { useBusiness } from '../context/BusinessContext';
import { useProductSEO } from '../hooks/useProductSEO';

interface ProductQuickViewModalProps {
  product: Product | null;
  onClose: () => void;
}

export const ProductQuickViewModal: React.FC<ProductQuickViewModalProps> = ({ product, onClose }) => {
  const { 
    openRequestModalFor, 
    toggleSaveInquiry, 
    isInquirySaved,
    getReviewsForProduct,
    getRatingSummary,
    openReviewModalFor
  } = useBusiness();
  const [selectedImage, setSelectedImage] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);

  // Synchronize Open Graph, Twitter cards & Schema.org JSON-LD for this product
  useProductSEO(product);

  React.useEffect(() => {
    if (product) {
      setSelectedImage(product.imageUrl);
      setCopied(false);
      // Synchronize URL hash for direct bookmarking and sharing
      if (typeof window !== 'undefined' && window.location.hash !== `#product-${product.id}`) {
        window.history.replaceState(null, '', `#product-${product.id}`);
      }
    }
  }, [product]);

  if (!product) return null;

  const isSaved = isInquirySaved(product.id);
  const currentImage = selectedImage || product.imageUrl;
  const allImages = [product.imageUrl, ...(product.galleryImages || [])];
  const productReviews = getReviewsForProduct(product.id);
  const productRating = getRatingSummary(product.id);

  const handleShare = async () => {
    const shareUrl = `${window.location.origin}${window.location.pathname}#product-${product.id}`;
    const shareTitle = `${product.name} | B & M Crochet House`;
    const shareText = `Check out this handmade crochet "${product.name}" (${product.subtitle}) by B & M Crochet House! Custom sizing & colors crafted with love.`;

    const sharePayload = {
      title: shareTitle,
      text: shareText,
      url: shareUrl,
    };

    if (navigator.share) {
      try {
        await navigator.share(sharePayload);
        return;
      } catch (err: unknown) {
        if (err instanceof Error && err.name === 'AbortError') {
          return;
        }
      }
    }

    try {
      await navigator.clipboard.writeText(`${shareText} ${shareUrl}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2400);
    } catch {
      const waUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(
        `${shareText} ${shareUrl}`
      )}`;
      window.open(waUrl, '_blank');
    }
  };

  const handleRequestPrice = () => {
    onClose();
    openRequestModalFor(product);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in">
      <div 
        className="w-full max-w-2xl bg-[#FAF7F2] rounded-3xl shadow-2xl border border-[#ECC3BD] text-[#2C1810] relative max-h-[92vh] flex flex-col md:flex-row overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="absolute top-4 right-4 z-10 flex items-center gap-1.5">
          <button
            onClick={handleShare}
            className={`p-2 rounded-full backdrop-blur-sm shadow-sm transition flex items-center justify-center ${
              copied
                ? 'bg-[#D4AF37] text-[#2C1810]'
                : 'bg-white/80 text-[#4E342E] hover:bg-white'
            }`}
            title="Share this product"
            aria-label="Share product"
          >
            {copied ? <Check className="w-4 h-4" /> : <Share2 className="w-4 h-4" />}
          </button>
          <button
            onClick={onClose}
            className="p-2 rounded-full bg-white/80 backdrop-blur-sm text-[#4E342E] hover:bg-white shadow-sm transition"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Product Image & Multi-Angle Thumbnails */}
        <div className="md:w-1/2 relative bg-[#F4EFE6] flex flex-col justify-between p-3">
          <div className="relative aspect-3/4 w-full rounded-2xl overflow-hidden bg-black/5">
            <img
              src={currentImage}
              alt={product.name}
              className="w-full h-full object-cover transition-all duration-300"
            />
            <div className="absolute bottom-3 left-3 bg-[#4A2E2B]/90 backdrop-blur-sm text-[#FAF7F2] text-[10px] uppercase font-semibold tracking-wider px-2.5 py-1 rounded-full border border-[#D4AF37]/50 flex items-center gap-1 shadow-sm">
              <Sparkles className="w-2.5 h-2.5 text-[#D4AF37]" />
              B &amp; M Original
            </div>
          </div>

          {/* Multiple Angle Selector */}
          {allImages.length > 1 && (
            <div className="flex items-center gap-2 mt-2.5 overflow-x-auto pb-1">
              {allImages.map((img, idx) => (
                <button
                  key={img + idx}
                  onClick={() => setSelectedImage(img)}
                  className={`relative w-14 h-14 rounded-xl overflow-hidden border-2 transition shrink-0 ${
                    currentImage === img
                      ? 'border-[#4A2E2B] scale-95 shadow-md'
                      : 'border-transparent opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt={`Angle ${idx + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Details */}
        <div className="md:w-1/2 p-6 overflow-y-auto flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="text-[11px] uppercase tracking-wider font-semibold text-[#8C533C]">
                {product.category}
              </span>
              <button
                onClick={() => toggleSaveInquiry(product)}
                className={`p-1.5 rounded-full border transition ${
                  isSaved 
                    ? 'bg-[#ECC3BD]/30 border-[#ECC3BD] text-[#8C533C]' 
                    : 'border-gray-200 text-gray-400 hover:text-[#8C533C]'
                }`}
              >
                <Heart className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
              </button>
            </div>

            <h3 className="text-xl font-serif font-bold text-[#2C1810] leading-snug">
              {product.name}
            </h3>

            <p className="text-xs text-[#8C533C] font-medium mt-1">
              {product.subtitle}
            </p>

            {/* Price Badge */}
            <div className="mt-3 p-2.5 bg-[#FAF5EE] rounded-xl border border-[#ECC3BD]/60 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Tag className="w-4 h-4 text-[#AA7C11]" />
                <span className="text-xs font-semibold text-[#3E2723]">
                  {product.priceDisplay}
                </span>
              </div>
              <span className="text-[10px] text-[#8C533C] font-medium bg-[#ECC3BD]/20 px-2 py-0.5 rounded-full">
                Custom Quoted
              </span>
            </div>

            {/* Description */}
            <div className="mt-4 text-xs text-[#4E342E] leading-relaxed space-y-2">
              <p>{product.fullDescription}</p>
            </div>

            {/* Specs */}
            <div className="mt-4 space-y-2 text-xs border-t border-[#ECC3BD]/40 pt-3">
              <div className="flex items-start gap-2">
                <Feather className="w-3.5 h-3.5 text-[#8C533C] shrink-0 mt-0.5" />
                <span className="text-[#6D4C41]">
                  <strong>Materials:</strong> {product.materials}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-[#8C533C] shrink-0" />
                <span className="text-[#6D4C41]">
                  <strong>Crafting Time:</strong> {product.estimatedCraftTime}
                </span>
              </div>
            </div>

            {/* Color Swatches */}
            <div className="mt-4">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-[#4E342E] block mb-1.5">
                Sample Color Inspirations
              </span>
              <div className="flex flex-wrap gap-1.5">
                {product.sampleColors.map((col) => (
                  <span
                    key={col.name}
                    className="inline-flex items-center gap-1.5 px-2 py-1 rounded-lg bg-white border border-[#ECC3BD]/70 text-[10px] text-[#4E342E]"
                  >
                    <span
                      className="w-2.5 h-2.5 rounded-full border border-black/10"
                      style={{ backgroundColor: col.hex }}
                    />
                    {col.name}
                  </span>
                ))}
              </div>
            </div>

            {/* Customer Reviews Section */}
            <div className="mt-5 border-t border-[#ECC3BD]/50 pt-4 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <div className="flex text-[#D4AF37]">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                  <span className="font-serif font-bold text-xs text-[#2C1810]">
                    {productRating.count > 0 ? productRating.average.toFixed(1) : '5.0'}
                  </span>
                  <span className="text-[11px] text-[#6D4C41]">
                    ({productReviews.length} {productReviews.length === 1 ? 'review' : 'reviews'})
                  </span>
                </div>

                <button
                  onClick={() => openReviewModalFor(product)}
                  className="px-2.5 py-1 rounded-lg bg-[#FAF5EE] hover:bg-[#ECC3BD]/30 border border-[#ECC3BD] text-[#8C533C] text-[11px] font-semibold transition"
                >
                  Write a Review
                </button>
              </div>

              {/* Reviews List */}
              {productReviews.length > 0 ? (
                <div className="space-y-2.5 max-h-48 overflow-y-auto pr-1">
                  {productReviews.map((rev) => (
                    <div
                      key={rev.id}
                      className="p-3 bg-white rounded-xl border border-[#ECC3BD]/60 space-y-1 text-xs"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-[#2C1810]">
                          {rev.author}
                        </span>
                        <div className="flex text-[#D4AF37]">
                          {[...Array(rev.rating)].map((_, i) => (
                            <Star key={i} className="w-2.5 h-2.5 fill-current" />
                          ))}
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-[10px] text-[#8C533C]">
                        <span>{rev.location}</span>
                        <span>•</span>
                        <span>{rev.date}</span>
                        {rev.verifiedPurchase && (
                          <span className="text-emerald-700 font-medium">
                            ✓ Verified Buyer
                          </span>
                        )}
                      </div>
                      {rev.title && (
                        <p className="font-semibold text-[#3E2723] text-[11px] pt-0.5">
                          {rev.title}
                        </p>
                      )}
                      <p className="text-[#6D4C41] text-[11px] leading-relaxed">
                        {rev.comment}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-3 bg-white/70 rounded-xl border border-dashed border-[#ECC3BD] text-center text-xs text-[#6D4C41]">
                  <p>No reviews yet for this creation.</p>
                  <button
                    onClick={() => openReviewModalFor(product)}
                    className="text-[#8C533C] font-semibold underline mt-1"
                  >
                    Be the first to review!
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Action Button */}
          <div className="pt-4 border-t border-[#ECC3BD]/50 space-y-2">
            <div className="flex items-center gap-2">
              <button
                onClick={handleRequestPrice}
                className="flex-1 py-3.5 px-4 bg-[#4A2E2B] hover:bg-[#3E2723] text-[#FAF7F2] font-semibold rounded-2xl text-xs sm:text-sm transition flex items-center justify-center gap-2 shadow-md hover:shadow-lg active:scale-[0.99]"
              >
                <Tag className="w-4 h-4 text-[#D4AF37]" />
                Request Price
              </button>

              <button
                onClick={handleShare}
                title="Share creation with friends via social apps"
                className={`py-3.5 px-4 rounded-2xl border transition flex items-center justify-center gap-2 shadow-sm active:scale-[0.98] ${
                  copied
                    ? 'bg-[#FAF5EE] border-[#D4AF37] text-[#AA7C11]'
                    : 'bg-white hover:bg-[#ECC3BD]/20 border-[#ECC3BD] text-[#4A2E2B]'
                }`}
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-700" />
                    <span className="text-xs sm:text-sm font-semibold text-emerald-800">Copied!</span>
                  </>
                ) : (
                  <>
                    <Share2 className="w-4 h-4 text-[#8C533C]" />
                    <span className="text-xs sm:text-sm font-semibold text-[#4A2E2B]">Share</span>
                  </>
                )}
              </button>
            </div>
            <p className="text-center text-[10px] text-[#8C533C]">
              Includes customized color matching, sizing &amp; WhatsApp order dispatch.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
