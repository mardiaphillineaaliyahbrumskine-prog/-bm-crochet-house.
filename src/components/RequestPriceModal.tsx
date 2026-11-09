import React, { useState, useEffect } from 'react';
import { X, MessageCircle, Send, Sparkles, Tag, Check, Heart, ShieldCheck } from 'lucide-react';
import { useBusiness } from '../context/BusinessContext';
import { buildWhatsAppLink } from '../data/businessConfig';

export const RequestPriceModal: React.FC = () => {
  const { 
    selectedProductForQuote, 
    closeRequestModal, 
    activeWhatsApp,
    toggleSaveInquiry,
    isInquirySaved 
  } = useBusiness();

  const product = selectedProductForQuote;

  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);
  const [customNote, setCustomNote] = useState<string>('');
  const [customerName, setCustomerName] = useState<string>('');
  const [customerLocation, setCustomerLocation] = useState<string>('');
  const [inquirySubmitted, setInquirySubmitted] = useState<boolean>(false);

  useEffect(() => {
    if (product) {
      setSelectedSize(product.availableSizes?.[0] || 'Standard');
      setSelectedColor(product.sampleColors?.[0]?.name || 'Standard');
      setQuantity(1);
      setCustomNote('');
      setInquirySubmitted(false);
    }
  }, [product]);

  if (!product) return null;

  const isSaved = isInquirySaved(product.id);

  // Formatted WhatsApp message
  const generateWhatsAppMessage = () => {
    let msg = `Hello B & M Crochet House! ✨\n\n`;
    msg += `I would like to request a price quote for:\n`;
    msg += `🧶 *Product:* ${product.name}\n`;
    msg += `📐 *Size:* ${selectedSize || 'Not specified'}\n`;
    msg += `🎨 *Preferred Color:* ${selectedColor || 'Not specified'}\n`;
    msg += `📦 *Quantity:* ${quantity}\n`;
    if (customerName.trim()) {
      msg += `👤 *My Name:* ${customerName.trim()}\n`;
    }
    if (customerLocation.trim()) {
      msg += `📍 *Delivery Location:* ${customerLocation.trim()}\n`;
    }
    if (customNote.trim()) {
      msg += `📝 *Notes/Customization:* ${customNote.trim()}\n`;
    }
    msg += `\nPlease provide availability, price quotation, and estimated turnaround time. Thank you!`;
    return msg;
  };

  const handleWhatsAppSend = () => {
    const message = generateWhatsAppMessage();
    const link = buildWhatsAppLink(message, activeWhatsApp);
    window.open(link, '_blank', 'noopener,noreferrer');
    closeRequestModal();
  };

  const handleInAppSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setInquirySubmitted(true);
    // Auto-save to inquiry shortlist
    if (!isSaved) {
      toggleSaveInquiry(product);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in">
      <div 
        className="w-full max-w-xl bg-[#FAF7F2] rounded-3xl shadow-2xl border border-[#ECC3BD] text-[#2C1810] relative max-h-[92vh] flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-[#ECC3BD]/50 flex items-start justify-between bg-[#FAF5EE]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#4A2E2B] text-[#F6DFDC] flex items-center justify-center shadow-sm">
              <Tag className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] uppercase tracking-wider font-semibold text-[#8C533C]">
                Bespoke Price Quote
              </span>
              <h3 className="text-lg sm:text-xl font-serif font-bold text-[#3E2723] line-clamp-1">
                Request Price
              </h3>
            </div>
          </div>
          <button
            onClick={closeRequestModal}
            className="p-2 rounded-full text-[#4E342E]/70 hover:text-[#2C1810] hover:bg-[#ECC3BD]/30 transition"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body Content */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-5">
          {/* Product Summary Card */}
          <div className="flex gap-4 p-3.5 bg-white rounded-2xl border border-[#ECC3BD]/60 shadow-sm items-center">
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl object-cover shrink-0 border border-[#ECC3BD]/40"
            />
            <div className="min-w-0 flex-1">
              <div className="inline-block px-2 py-0.5 rounded-full bg-[#ECC3BD]/30 text-[#4A2E2B] text-[10px] font-semibold mb-1">
                {product.category}
              </div>
              <h4 className="text-sm sm:text-base font-serif font-bold text-[#2C1810] truncate">
                {product.name}
              </h4>
              <p className="text-xs text-[#6D4C41] mt-0.5 font-medium">
                {product.priceDisplay}
              </p>
              <p className="text-[11px] text-[#AA7C11] flex items-center gap-1 mt-1 font-medium">
                <Sparkles className="w-3 h-3" />
                Hand-crocheted on demand
              </p>
            </div>
            <button
              onClick={() => toggleSaveInquiry(product)}
              className={`p-2.5 rounded-xl border transition shrink-0 ${
                isSaved 
                  ? 'bg-[#ECC3BD]/30 border-[#ECC3BD] text-[#8C533C]' 
                  : 'border-gray-200 text-gray-400 hover:text-[#8C533C]'
              }`}
              title={isSaved ? 'In your inquiry list' : 'Add to inquiry shortlist'}
            >
              <Heart className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
            </button>
          </div>

          {inquirySubmitted ? (
            <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-2xl text-center space-y-3">
              <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                <Check className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-serif font-bold text-emerald-900">
                Inquiry Shortlisted!
              </h4>
              <p className="text-xs text-emerald-800 leading-relaxed max-w-sm mx-auto">
                Your quote request for <strong>{product.name}</strong> has been saved. 
                For instant pricing, connect directly with our artisan on WhatsApp!
              </p>
              <button
                onClick={handleWhatsAppSend}
                className="mt-2 w-full py-3 px-4 bg-[#25D366] hover:bg-[#20ba59] text-white font-medium rounded-xl text-sm transition flex items-center justify-center gap-2 shadow-sm"
              >
                <MessageCircle className="w-4 h-4" />
                Send Inquiry to WhatsApp Now
              </button>
              <button
                onClick={closeRequestModal}
                className="text-xs text-emerald-700 underline pt-2 hover:text-emerald-900"
              >
                Continue Browsing Boutique
              </button>
            </div>
          ) : (
            <form onSubmit={handleInAppSubmit} className="space-y-4 text-xs sm:text-sm">
              {/* Size selection */}
              {product.availableSizes && product.availableSizes.length > 0 && (
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#4E342E] mb-1.5">
                    Select Size / Dimensions
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {product.availableSizes.map((sz) => (
                      <button
                        type="button"
                        key={sz}
                        onClick={() => setSelectedSize(sz)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-medium border transition ${
                          selectedSize === sz
                            ? 'bg-[#4A2E2B] text-[#FAF7F2] border-[#4A2E2B] shadow-sm'
                            : 'bg-white text-[#4E342E] border-[#ECC3BD] hover:border-[#4A2E2B]'
                        }`}
                      >
                        {sz}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Color selection */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#4E342E] mb-1.5">
                  Color Preference
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {product.sampleColors.map((col) => (
                    <button
                      type="button"
                      key={col.name}
                      onClick={() => setSelectedColor(col.name)}
                      className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs border text-left transition ${
                        selectedColor === col.name
                          ? 'bg-[#ECC3BD]/20 border-[#4A2E2B] font-semibold text-[#2C1810]'
                          : 'bg-white border-[#ECC3BD]/70 text-[#4E342E] hover:border-[#4A2E2B]'
                      }`}
                    >
                      <span
                        className="w-4 h-4 rounded-full border border-black/10 shrink-0"
                        style={{ backgroundColor: col.hex }}
                      />
                      <span className="truncate">{col.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity */}
              <div className="flex items-center justify-between p-3 bg-white rounded-xl border border-[#ECC3BD]/60">
                <span className="text-xs font-semibold uppercase tracking-wider text-[#4E342E]">
                  Quantity
                </span>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="w-7 h-7 rounded-lg bg-[#FAF5EE] border border-[#ECC3BD] text-[#4E342E] flex items-center justify-center font-bold hover:bg-[#ECC3BD]/30"
                  >
                    -
                  </button>
                  <span className="font-semibold text-sm w-6 text-center text-[#2C1810]">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => q + 1)}
                    className="w-7 h-7 rounded-lg bg-[#FAF5EE] border border-[#ECC3BD] text-[#4E342E] flex items-center justify-center font-bold hover:bg-[#ECC3BD]/30"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Optional customer info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#4E342E] mb-1">
                    Your Name (Optional)
                  </label>
                  <input
                    type="text"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="e.g. Maya"
                    className="w-full px-3 py-2 rounded-xl border border-[#ECC3BD] bg-white text-xs text-[#2C1810] focus:ring-1 focus:ring-[#4A2E2B] outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#4E342E] mb-1">
                    City / Country (For Shipping)
                  </label>
                  <input
                    type="text"
                    value={customerLocation}
                    onChange={(e) => setCustomerLocation(e.target.value)}
                    placeholder="e.g. Monrovia, Accra, London"
                    className="w-full px-3 py-2 rounded-xl border border-[#ECC3BD] bg-white text-xs text-[#2C1810] focus:ring-1 focus:ring-[#4A2E2B] outline-none"
                  />
                </div>
              </div>

              {/* Customization notes */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#4E342E] mb-1">
                  Specific Requests (Yarn type, modifications, deadlines)
                </label>
                <textarea
                  rows={2}
                  value={customNote}
                  onChange={(e) => setCustomNote(e.target.value)}
                  placeholder="Need it for a birthday next month, or prefer velvet yarn instead of cotton..."
                  className="w-full px-3 py-2 rounded-xl border border-[#ECC3BD] bg-white text-xs text-[#2C1810] focus:ring-1 focus:ring-[#4A2E2B] outline-none resize-none"
                />
              </div>

              {/* Actions */}
              <div className="pt-2 space-y-2">
                <button
                  type="button"
                  onClick={handleWhatsAppSend}
                  className="w-full py-3.5 px-4 bg-[#25D366] hover:bg-[#20ba59] text-white font-semibold rounded-2xl text-sm transition flex items-center justify-center gap-2 shadow-md hover:shadow-lg active:scale-[0.99]"
                >
                  <MessageCircle className="w-5 h-5" />
                  Request Price via WhatsApp
                </button>

                <button
                  type="submit"
                  className="w-full py-2.5 px-4 bg-white hover:bg-[#ECC3BD]/20 text-[#4E342E] border border-[#ECC3BD] font-medium rounded-xl text-xs transition flex items-center justify-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5" />
                  Save to In-App Shortlist
                </button>
              </div>

              <div className="flex items-center justify-center gap-2 text-[11px] text-[#6D4C41] pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-[#AA7C11]" />
                <span>Zero obligations • Quotation includes yarn, labor & dispatch time</span>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
