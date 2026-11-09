import React from 'react';
import { X, Trash2, MessageCircle, Heart, ArrowRight, Tag } from 'lucide-react';
import { useBusiness } from '../context/BusinessContext';
import { buildWhatsAppLink } from '../data/businessConfig';

export const InquiryShortlistDrawer: React.FC = () => {
  const { 
    isInquiryDrawerOpen, 
    closeInquiryDrawer, 
    savedInquiries, 
    toggleSaveInquiry, 
    clearInquiries,
    activeWhatsApp,
    openRequestModalFor
  } = useBusiness();

  if (!isInquiryDrawerOpen) return null;

  const handleSendAllToWhatsApp = () => {
    if (savedInquiries.length === 0) return;

    let msg = `Hello B & M Crochet House! ✨\n\n`;
    msg += `I am interested in ordering/requesting price quotes for the following *${savedInquiries.length} items*:\n\n`;
    savedInquiries.forEach((item, idx) => {
      msg += `${idx + 1}. *${item.name}* (${item.category})\n`;
      msg += `   • Specs: ${item.materials}\n`;
    });
    msg += `\nPlease let me know pricing, bundle possibilities, and crafting timeline. Thank you!`;

    const link = buildWhatsAppLink(msg, activeWhatsApp);
    window.open(link, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm animate-fade-in">
      <div 
        className="w-full max-w-md bg-[#FAF7F2] h-full shadow-2xl flex flex-col justify-between text-[#2C1810] border-l border-[#ECC3BD] relative animate-slide-left"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 border-b border-[#ECC3BD]/60 flex items-center justify-between bg-[#FAF5EE]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#4A2E2B] text-[#F6DFDC] flex items-center justify-center shadow-xs">
              <Heart className="w-5 h-5 fill-current" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-lg text-[#3E2723]">
                Inquiry Shortlist
              </h3>
              <p className="text-xs text-[#6D4C41]">
                {savedInquiries.length} {savedInquiries.length === 1 ? 'creation' : 'creations'} saved
              </p>
            </div>
          </div>
          <button
            onClick={closeInquiryDrawer}
            className="p-2 rounded-full text-[#4E342E]/70 hover:text-[#2C1810] hover:bg-[#ECC3BD]/30 transition"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* List */}
        <div className="p-5 flex-1 overflow-y-auto space-y-3">
          {savedInquiries.length === 0 ? (
            <div className="text-center py-16 px-4 space-y-3">
              <div className="w-14 h-14 rounded-full bg-[#ECC3BD]/20 text-[#8C533C] flex items-center justify-center mx-auto">
                <Heart className="w-7 h-7" />
              </div>
              <h4 className="font-serif font-bold text-lg text-[#3E2723]">
                Your Shortlist is Empty
              </h4>
              <p className="text-xs text-[#6D4C41] max-w-xs mx-auto leading-relaxed">
                Click the heart icon on any cardigan, bag, baby blanket, or plushie to save it here and request combined pricing!
              </p>
            </div>
          ) : (
            <>
              <div className="flex justify-between items-center text-xs pb-1">
                <span className="text-[#8C533C] font-semibold uppercase tracking-wider text-[10px]">
                  Saved Items for Quotation
                </span>
                <button
                  onClick={clearInquiries}
                  className="text-[#8C533C] hover:text-[#4A2E2B] flex items-center gap-1 text-xs"
                >
                  <Trash2 className="w-3 h-3" />
                  Clear All
                </button>
              </div>

              {savedInquiries.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-3 p-3 bg-white rounded-2xl border border-[#ECC3BD]/50 items-center justify-between shadow-xs"
                >
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="w-14 h-14 rounded-xl object-cover shrink-0 border border-[#ECC3BD]/40"
                  />
                  <div className="min-w-0 flex-1">
                    <h5 className="font-serif font-bold text-xs sm:text-sm text-[#2C1810] truncate">
                      {item.name}
                    </h5>
                    <p className="text-[11px] text-[#8C533C] font-medium mt-0.5">
                      {item.priceDisplay}
                    </p>
                    <button
                      onClick={() => {
                        closeInquiryDrawer();
                        openRequestModalFor(item);
                      }}
                      className="text-[11px] text-[#AA7C11] font-semibold hover:underline flex items-center gap-1 mt-1"
                    >
                      <Tag className="w-3 h-3" />
                      Request Single Price
                    </button>
                  </div>
                  <button
                    onClick={() => toggleSaveInquiry(item)}
                    className="p-1.5 text-gray-400 hover:text-red-500 transition"
                    title="Remove"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </>
          )}
        </div>

        {/* Footer Actions */}
        {savedInquiries.length > 0 && (
          <div className="p-5 border-t border-[#ECC3BD]/60 bg-[#FAF5EE] space-y-2">
            <button
              onClick={handleSendAllToWhatsApp}
              className="w-full py-3.5 px-4 bg-[#25D366] hover:bg-[#20ba59] text-white font-semibold rounded-2xl text-sm transition flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
            >
              <MessageCircle className="w-5 h-5" />
              Request Quotes on WhatsApp ({savedInquiries.length})
            </button>
            <p className="text-center text-[11px] text-[#6D4C41]">
              Sends all saved items in one tidy WhatsApp message to our artisan.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
