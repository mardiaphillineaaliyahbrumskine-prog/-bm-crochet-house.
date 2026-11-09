import React, { useState } from 'react';
import { X, Star, CheckCircle2, MessageCircle, Heart, Sparkles, Send } from 'lucide-react';
import { useBusiness } from '../context/BusinessContext';
import { buildWhatsAppLink } from '../data/businessConfig';

export const WriteReviewModal: React.FC = () => {
  const { 
    isReviewModalOpen, 
    reviewProduct, 
    closeReviewModal, 
    addReview, 
    activeWhatsApp 
  } = useBusiness();

  const [rating, setRating] = useState<number>(5);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [name, setName] = useState<string>('');
  const [location, setLocation] = useState<string>('');
  const [title, setTitle] = useState<string>('');
  const [comment, setComment] = useState<string>('');
  const [verified, setVerified] = useState<boolean>(true);
  const [submitted, setSubmitted] = useState<boolean>(false);

  if (!isReviewModalOpen || !reviewProduct) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !comment.trim()) return;

    addReview({
      productId: reviewProduct.id,
      author: name.trim(),
      location: location.trim() || 'Verified Customer',
      rating,
      title: title.trim() || `${rating} Stars Review`,
      comment: comment.trim(),
      verifiedPurchase: verified,
    });

    setSubmitted(true);
  };

  const handleShareToWhatsApp = () => {
    let msg = `Hello B & M Crochet House! ✨\n\n`;
    msg += `I just left a *${rating}-Star Review* for your *${reviewProduct.name}*!\n\n`;
    if (title.trim()) msg += `⭐ *"${title.trim()}"*\n`;
    msg += `💬 "${comment.trim()}"\n\n`;
    msg += `— *${name.trim()}* (${location.trim() || 'Client'})\n`;
    msg += `\nThank you for your beautiful handmade craftsmanship!`;

    const link = buildWhatsAppLink(msg, activeWhatsApp);
    window.open(link, '_blank', 'noopener,noreferrer');
    closeReviewModal();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in">
      <div 
        className="w-full max-w-lg bg-[#FAF7F2] rounded-3xl shadow-2xl border border-[#ECC3BD] text-[#2C1810] relative max-h-[92vh] flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-[#ECC3BD]/50 flex items-start justify-between bg-[#FAF5EE]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#4A2E2B] text-[#D4AF37] flex items-center justify-center shadow-sm">
              <Star className="w-5 h-5 fill-current" />
            </div>
            <div>
              <span className="text-[11px] uppercase tracking-wider font-semibold text-[#8C533C]">
                Customer Testimonial
              </span>
              <h3 className="text-lg font-serif font-bold text-[#3E2723]">
                Review Creation
              </h3>
            </div>
          </div>
          <button
            onClick={closeReviewModal}
            className="p-2 rounded-full text-[#4E342E]/70 hover:text-[#2C1810] hover:bg-[#ECC3BD]/30 transition"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-4">
          {/* Target Product Summary */}
          <div className="flex items-center gap-3 p-3 bg-white rounded-2xl border border-[#ECC3BD]/50 shadow-xs">
            <img
              src={reviewProduct.imageUrl}
              alt={reviewProduct.name}
              className="w-14 h-14 rounded-xl object-cover border border-[#ECC3BD]/40 shrink-0"
            />
            <div className="min-w-0">
              <span className="text-[10px] uppercase font-semibold text-[#8C533C] block">
                {reviewProduct.category}
              </span>
              <h4 className="font-serif font-bold text-xs sm:text-sm text-[#2C1810] truncate">
                {reviewProduct.name}
              </h4>
              <p className="text-[11px] text-[#AA7C11] flex items-center gap-1 mt-0.5 font-medium">
                <Sparkles className="w-3 h-3" />
                Hand-crocheted original
              </p>
            </div>
          </div>

          {submitted ? (
            <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-2xl text-center space-y-3">
              <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-serif font-bold text-emerald-900">
                Thank You for Your Review!
              </h4>
              <p className="text-xs text-emerald-800 leading-relaxed max-w-sm mx-auto">
                Your feedback has been published on <strong>{reviewProduct.name}</strong>. Would you also like to share your review directly to the artisan on WhatsApp (+250 799 315 594)?
              </p>
              <div className="pt-2 space-y-2">
                <button
                  onClick={handleShareToWhatsApp}
                  className="w-full py-3 px-4 bg-[#25D366] hover:bg-[#20ba59] text-white font-semibold rounded-xl text-xs sm:text-sm transition flex items-center justify-center gap-2 shadow-xs"
                >
                  <MessageCircle className="w-4 h-4" />
                  Forward Review to WhatsApp (+250 799 315 594)
                </button>
                <button
                  onClick={closeReviewModal}
                  className="w-full py-2.5 px-4 bg-white text-[#4E342E] border border-[#ECC3BD] rounded-xl text-xs font-medium hover:bg-gray-50"
                >
                  Done
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
              {/* Star Rating Picker */}
              <div className="p-3.5 bg-white rounded-2xl border border-[#ECC3BD]/50 text-center space-y-1.5">
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#4E342E]">
                  Your Overall Rating
                </label>
                <div className="flex items-center justify-center gap-1.5 pt-1">
                  {[1, 2, 3, 4, 5].map((star) => {
                    const isFilled = (hoverRating || rating) >= star;
                    return (
                      <button
                        type="button"
                        key={star}
                        onClick={() => setRating(star)}
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(0)}
                        className="p-1 transition-transform hover:scale-110 active:scale-95"
                      >
                        <Star
                          className={`w-7 h-7 sm:w-8 sm:h-8 ${
                            isFilled
                              ? 'text-[#D4AF37] fill-[#D4AF37]'
                              : 'text-gray-300'
                          }`}
                        />
                      </button>
                    );
                  })}
                </div>
                <span className="text-xs font-serif font-bold text-[#AA7C11] block">
                  {rating === 5 && 'Outstanding Artistry (5 Stars)'}
                  {rating === 4 && 'Very Satisfied (4 Stars)'}
                  {rating === 3 && 'Good Quality (3 Stars)'}
                  {rating === 2 && 'Fair (2 Stars)'}
                  {rating === 1 && 'Needs Improvement (1 Star)'}
                </span>
              </div>

              {/* Name & Location */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#4E342E] mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Diane K."
                    className="w-full px-3 py-2.5 rounded-xl border border-[#ECC3BD] bg-white text-xs text-[#2C1810] focus:ring-1 focus:ring-[#4A2E2B] outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#4E342E] mb-1">
                    City / Country (Optional)
                  </label>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="e.g. Kigali, Rwanda"
                    className="w-full px-3 py-2.5 rounded-xl border border-[#ECC3BD] bg-white text-xs text-[#2C1810] focus:ring-1 focus:ring-[#4A2E2B] outline-none"
                  />
                </div>
              </div>

              {/* Review Headline */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#4E342E] mb-1">
                  Headline / Review Title
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Incredible fit and stitch tension!"
                  className="w-full px-3 py-2.5 rounded-xl border border-[#ECC3BD] bg-white text-xs text-[#2C1810] focus:ring-1 focus:ring-[#4A2E2B] outline-none"
                />
              </div>

              {/* Review Comments */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#4E342E] mb-1">
                  Detailed Review &amp; Experience *
                </label>
                <textarea
                  required
                  rows={4}
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Tell others about the yarn feel, stitch quality, custom sizing, packaging, or customer service..."
                  className="w-full px-3 py-2.5 rounded-xl border border-[#ECC3BD] bg-white text-xs text-[#2C1810] focus:ring-1 focus:ring-[#4A2E2B] outline-none resize-none"
                />
              </div>

              {/* Verified Purchase Checkbox */}
              <label className="flex items-center gap-2 cursor-pointer pt-1 text-xs text-[#6D4C41]">
                <input
                  type="checkbox"
                  checked={verified}
                  onChange={(e) => setVerified(e.target.checked)}
                  className="rounded border-[#ECC3BD] text-[#4A2E2B] focus:ring-0"
                />
                <span>I ordered/commissioned this handcrafted item from B &amp; M Crochet House</span>
              </label>

              {/* Submit Buttons */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3.5 px-4 bg-[#4A2E2B] hover:bg-[#3E2723] text-[#FAF7F2] font-semibold rounded-2xl text-xs sm:text-sm transition flex items-center justify-center gap-2 shadow-md hover:shadow-lg active:scale-[0.99]"
                >
                  <Send className="w-4 h-4 text-[#D4AF37]" />
                  Submit Customer Review
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
