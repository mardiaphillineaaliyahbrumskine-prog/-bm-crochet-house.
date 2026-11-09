import React, { useState } from 'react';
import { Star, MessageSquare, Sparkles, CheckCircle2, ChevronRight, Quote, Heart } from 'lucide-react';
import { useBusiness } from '../context/BusinessContext';
import { PRODUCTS } from '../data/products';

export const ReviewsSection: React.FC = () => {
  const { reviews, openReviewModalFor } = useBusiness();
  const [selectedProductFilter, setSelectedProductFilter] = useState<string>('all');

  const filteredReviews = selectedProductFilter === 'all'
    ? reviews.slice(0, 6)
    : reviews.filter((r) => r.productId === selectedProductFilter);

  const averageRating = (
    reviews.reduce((acc, curr) => acc + curr.rating, 0) / (reviews.length || 1)
  ).toFixed(1);

  return (
    <section id="reviews" className="py-14 sm:py-20 px-4 sm:px-6 bg-[#FAF7F2] scroll-mt-20">
      <div className="max-w-7xl mx-auto space-y-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#ECC3BD]/50 pb-6">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAF5EE] border border-[#ECC3BD] text-xs font-semibold text-[#8C533C] mb-2 shadow-xs">
              <Star className="w-3.5 h-3.5 text-[#D4AF37] fill-[#D4AF37]" />
              Client Praise &amp; Experiences
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-[#2C1810]">
              Loved by Our Clients
            </h2>
            <p className="text-xs sm:text-sm text-[#6D4C41] mt-1">
              Read authentic feedback from fashion clients, brides, mothers, and gift shoppers.
            </p>
          </div>

          {/* Aggregate Rating Stat Card */}
          <div className="flex items-center gap-4 p-3.5 bg-white rounded-2xl border border-[#ECC3BD]/70 shadow-xs shrink-0">
            <div className="text-center border-r border-[#ECC3BD]/60 pr-4">
              <span className="font-serif font-bold text-2xl sm:text-3xl text-[#2C1810] block leading-none">
                {averageRating}
              </span>
              <div className="flex text-[#D4AF37] mt-1 justify-center">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3 h-3 fill-current" />
                ))}
              </div>
            </div>
            <div>
              <span className="text-xs font-bold text-[#2C1810] block">
                100% Handcrafted
              </span>
              <span className="text-[11px] text-[#6D4C41]">
                {reviews.length} Verified Reviews
              </span>
            </div>
          </div>
        </div>

        {/* Product Filter Quick Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
          <button
            onClick={() => setSelectedProductFilter('all')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition shrink-0 ${
              selectedProductFilter === 'all'
                ? 'bg-[#4A2E2B] text-white shadow-xs'
                : 'bg-white text-[#4E342E] border border-[#ECC3BD]'
            }`}
          >
            All Reviews ({reviews.length})
          </button>

          {PRODUCTS.slice(0, 6).map((prod) => (
            <button
              key={prod.id}
              onClick={() => setSelectedProductFilter(prod.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium transition shrink-0 truncate max-w-xs ${
                selectedProductFilter === prod.id
                  ? 'bg-[#4A2E2B] text-white shadow-xs'
                  : 'bg-white text-[#4E342E] border border-[#ECC3BD]'
              }`}
            >
              {prod.name.split(' (')[0]}
            </button>
          ))}
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredReviews.map((rev) => {
            const prod = PRODUCTS.find((p) => p.id === rev.productId);
            return (
              <div
                key={rev.id}
                className="bg-white rounded-3xl p-6 border border-[#ECC3BD]/60 shadow-xs hover:shadow-md transition flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  {/* Top Bar with Stars & Verified Tag */}
                  <div className="flex items-center justify-between">
                    <div className="flex text-[#D4AF37]">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-current" />
                      ))}
                    </div>
                    {rev.verifiedPurchase && (
                      <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                        Verified Order
                      </span>
                    )}
                  </div>

                  {/* Title & Comment */}
                  <h4 className="font-serif font-bold text-base text-[#2C1810]">
                    &quot;{rev.title}&quot;
                  </h4>
                  <p className="text-xs text-[#4E342E] leading-relaxed italic">
                    {rev.comment}
                  </p>
                </div>

                {/* Bottom author and reviewed product */}
                <div className="pt-3 border-t border-[#ECC3BD]/40 flex items-center justify-between">
                  <div>
                    <span className="font-bold text-xs text-[#2C1810] block">
                      {rev.author}
                    </span>
                    <span className="text-[10px] text-[#8C533C]">
                      {rev.location} • {rev.date}
                    </span>
                  </div>

                  {prod && (
                    <button
                      onClick={() => openReviewModalFor(prod)}
                      className="text-[10px] text-[#AA7C11] font-semibold hover:underline flex items-center gap-0.5 shrink-0"
                      title="Write your review for this creation"
                    >
                      <span>Review this</span>
                      <ChevronRight className="w-3 h-3" />
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Review Call to Action Banner */}
        <div className="p-6 sm:p-8 bg-gradient-to-r from-[#FAF5EE] via-white to-[#FBECEB] rounded-3xl border border-[#ECC3BD] shadow-xs flex flex-col sm:flex-row items-center justify-between gap-5 text-center sm:text-left">
          <div className="space-y-1">
            <h4 className="font-serif font-bold text-lg text-[#2C1810] flex items-center justify-center sm:justify-start gap-2">
              <Sparkles className="w-4 h-4 text-[#D4AF37]" />
              Have You Ordered from B &amp; M Crochet House?
            </h4>
            <p className="text-xs text-[#6D4C41] max-w-lg">
              We value your experience! Share your honest review, feedback on the stitch tension, fit, or delivery so others can discover our handmade atelier.
            </p>
          </div>

          <button
            onClick={() => openReviewModalFor(PRODUCTS[0])}
            className="px-6 py-3 bg-[#4A2E2B] hover:bg-[#3E2723] text-white font-semibold rounded-2xl text-xs sm:text-sm transition shadow-sm active:scale-95 shrink-0"
          >
            Leave a Product Review
          </button>
        </div>
      </div>
    </section>
  );
};
