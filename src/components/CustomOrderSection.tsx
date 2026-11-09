import React, { useState } from 'react';
import { 
  Sparkles, 
  Palette, 
  Ruler, 
  Clock, 
  MessageCircle, 
  CheckCircle2, 
  Scissors, 
  Heart,
  Send
} from 'lucide-react';
import { useBusiness } from '../context/BusinessContext';
import { buildWhatsAppLink } from '../data/businessConfig';

interface CustomOrderSectionProps {
  isModal?: boolean;
  onClose?: () => void;
}

const COLOR_PRESETS = [
  { name: 'Warm Cream', hex: '#FAF5EE' },
  { name: 'Blush Pink', hex: '#ECC3BD' },
  { name: 'Rose Petal', hex: '#D98270' },
  { name: 'Chocolate Brown', hex: '#4A2E2B' },
  { name: 'Soft Sage', hex: '#C2D4BC' },
  { name: 'Subtle Gold', hex: '#D4AF37' },
  { name: 'Mocha Tan', hex: '#B38B6D' },
  { name: 'Charcoal Black', hex: '#2C1810' },
];

const YARN_TYPES = [
  '100% Breathable Milk Cotton (Soft & Everyday)',
  'Luxury Velvet Chenille (Ultra Fluffy Plushies)',
  'Mercerized Bamboo-Cotton (Silky Sheen)',
  'Chunky Wool Blend (Extra Warmth & Blankets)',
  'Sturdy Macrame Cotton Cord (Bags & Decor)',
  'Hypoallergenic Baby Yarn (OEKO-TEX Certified)',
];

const ITEM_TYPES = [
  'Couture Evening Gown / Mermaid Dress',
  'Sculpted Corset Bodycon Dress',
  'Sunset Chevron Sundress / Beach Cover',
  'Sunset Mesh Turtleneck Sweater',
  '2-Piece Ruffled Festival / Lounge Set',
  'Structured Handbag / Crossbody Phone Sling',
  'Heirloom Baby Dress, Bonnet or Romper Set',
  'Luxury Pearl-Encrusted Cap or Rosette Beanie',
  'Other Custom Creation',
];

export const CustomOrderSection: React.FC<CustomOrderSectionProps> = ({ isModal = false, onClose }) => {
  const { activeWhatsApp } = useBusiness();

  const [itemType, setItemType] = useState<string>(ITEM_TYPES[0]);
  const [selectedColors, setSelectedColors] = useState<string[]>([COLOR_PRESETS[0].name, COLOR_PRESETS[1].name]);
  const [yarnType, setYarnType] = useState<string>(YARN_TYPES[0]);
  const [customSize, setCustomSize] = useState<string>('Standard Medium / Tailored to measurements');
  const [designDetails, setDesignDetails] = useState<string>('');
  const [deadline, setDeadline] = useState<string>('');
  const [customerName, setCustomerName] = useState<string>('');
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [createdOrderId, setCreatedOrderId] = useState<string>('');

  const toggleColor = (colorName: string) => {
    setSelectedColors((prev) => 
      prev.includes(colorName)
        ? prev.filter((c) => c !== colorName)
        : [...prev, colorName]
    );
  };

  const handleWhatsAppSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newOrderId = createdOrderId || `BM-${Math.floor(1000 + Math.random() * 9000)}`;
    setCreatedOrderId(newOrderId);

    // Persist new order into local storage so Order Status Lookup can immediately find it
    try {
      const existing = localStorage.getItem('bm_crochet_custom_orders');
      const parsed = existing ? JSON.parse(existing) : [];
      const newOrderRecord = {
        orderId: newOrderId,
        clientName: customerName.trim() || 'Valued Client',
        itemName: itemType,
        category: 'Custom Commission',
        currentStep: 'confirmed',
        progressPercent: 20,
        statusTitle: 'Commission Request Logged',
        statusDescription: 'Order specs received and forwarded to artisan. Awaiting yarn confirmation and invoice approval.',
        orderDate: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        estimatedCompletion: deadline.trim() || '7-10 business days',
        yarnType: yarnType,
        customColors: selectedColors,
        measurementsOrSize: customSize || 'Tailored to client specs',
        artisanNote: 'Specifications logged. Color matching & yarn swatches in preparation.',
      };
      localStorage.setItem('bm_crochet_custom_orders', JSON.stringify([newOrderRecord, ...parsed]));
    } catch {
      // ignore
    }

    let msg = `Hello B & M Crochet House! ✨\n\n`;
    msg += `I would like to commission a *CUSTOM CROCHET ORDER*:\n`;
    msg += `🏷️ *Order Reference ID:* ${newOrderId}\n`;
    msg += `🧵 *Design / Item Type:* ${itemType}\n`;
    msg += `🎨 *Colors Chosen:* ${selectedColors.join(', ') || 'Custom blend'}\n`;
    msg += `🧶 *Yarn Preference:* ${yarnType}\n`;
    msg += `📐 *Size / Measurements:* ${customSize || 'To be discussed'}\n`;
    if (deadline.trim()) {
      msg += `⏳ *Target Date:* ${deadline.trim()}\n`;
    }
    if (customerName.trim()) {
      msg += `👤 *Client Name:* ${customerName.trim()}\n`;
    }
    if (designDetails.trim()) {
      msg += `📝 *Design Inspiration & Details:* ${designDetails.trim()}\n`;
    }
    msg += `\nPlease let me know your yarn availability, price quotation, and how many days it will take to craft. Thank you!`;

    const link = buildWhatsAppLink(msg, activeWhatsApp);
    window.open(link, '_blank', 'noopener,noreferrer');
    setSubmitted(true);
  };

  const formContent = (
    <div className="space-y-6">
      {submitted ? (
        <div className="p-8 bg-emerald-50 border border-emerald-200 rounded-3xl text-center space-y-4">
          <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto shadow-sm">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h4 className="text-xl font-serif font-bold text-emerald-900">
            Custom Commission Request Drafted!
          </h4>
          <p className="text-sm text-emerald-800 leading-relaxed max-w-md mx-auto">
            Your customized project brief has been formatted. If WhatsApp did not open automatically, tap the button below to send your specifications directly to our artisan.
          </p>
          {createdOrderId && (
            <div className="p-3 bg-white/80 rounded-2xl border border-emerald-300 max-w-xs mx-auto">
              <span className="text-[11px] uppercase tracking-wider text-emerald-700 font-semibold block">
                Your Order Tracking ID
              </span>
              <span className="font-mono font-bold text-lg text-emerald-900">
                {createdOrderId}
              </span>
              <p className="text-[10px] text-emerald-700 mt-0.5">
                Use this ID in our Contact section to check craft status anytime!
              </p>
            </div>
          )}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={handleWhatsAppSubmit}
              className="w-full sm:w-auto px-6 py-3.5 bg-[#25D366] hover:bg-[#20ba59] text-white font-semibold rounded-2xl text-sm transition inline-flex items-center justify-center gap-2 shadow-md"
            >
              <MessageCircle className="w-5 h-5" />
              Send Specifications on WhatsApp
            </button>
            <a
              href="#contact"
              onClick={() => {
                if (onClose) onClose();
              }}
              className="w-full sm:w-auto px-5 py-3.5 bg-white text-[#4E342E] hover:bg-emerald-100/50 border border-emerald-300 font-semibold rounded-2xl text-sm transition text-center"
            >
              Go to Order Status Lookup
            </a>
          </div>
          <p className="text-xs text-emerald-700 pt-2">
            Average response time: within 2 to 4 business hours.
          </p>
        </div>
      ) : (
        <form onSubmit={handleWhatsAppSubmit} className="space-y-5">
          {/* Step 1: Item Category */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#4E342E] mb-2 flex items-center gap-1.5">
              <Scissors className="w-4 h-4 text-[#8C533C]" />
              1. What would you like us to crochet?
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {ITEM_TYPES.map((type) => (
                <button
                  type="button"
                  key={type}
                  onClick={() => setItemType(type)}
                  className={`p-3 rounded-2xl text-xs font-medium text-left border transition ${
                    itemType === type
                      ? 'bg-[#4A2E2B] text-[#FAF7F2] border-[#4A2E2B] shadow-sm'
                      : 'bg-white text-[#4E342E] border-[#ECC3BD] hover:border-[#4A2E2B]'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* Step 2: Color Palette */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-[#4E342E] flex items-center gap-1.5">
                <Palette className="w-4 h-4 text-[#8C533C]" />
                2. Select Preferred Colors (Select all that apply)
              </label>
              <span className="text-[11px] text-[#AA7C11] font-medium">
                {selectedColors.length} chosen
              </span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {COLOR_PRESETS.map((col) => {
                const isSelected = selectedColors.includes(col.name);
                return (
                  <button
                    type="button"
                    key={col.name}
                    onClick={() => toggleColor(col.name)}
                    className={`flex items-center gap-2 p-2.5 rounded-2xl text-xs border transition ${
                      isSelected
                        ? 'bg-[#ECC3BD]/30 border-[#4A2E2B] font-semibold text-[#2C1810]'
                        : 'bg-white border-[#ECC3BD]/70 text-[#4E342E] hover:border-[#4A2E2B]'
                    }`}
                  >
                    <span
                      className="w-4 h-4 rounded-full border border-black/10 shrink-0"
                      style={{ backgroundColor: col.hex }}
                    />
                    <span className="truncate">{col.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 3: Yarn & Fiber */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#4E342E] mb-2 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-[#8C533C]" />
              3. Yarn &amp; Fiber Preference
            </label>
            <select
              value={yarnType}
              onChange={(e) => setYarnType(e.target.value)}
              className="w-full px-3.5 py-3 rounded-2xl border border-[#ECC3BD] bg-white text-xs sm:text-sm text-[#2C1810] focus:ring-2 focus:ring-[#4A2E2B] outline-none"
            >
              {YARN_TYPES.map((yarn) => (
                <option key={yarn} value={yarn}>
                  {yarn}
                </option>
              ))}
            </select>
          </div>

          {/* Step 4: Sizing & Dimensions */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#4E342E] mb-1.5 flex items-center gap-1.5">
                <Ruler className="w-4 h-4 text-[#8C533C]" />
                4. Size / Custom Measurements
              </label>
              <input
                type="text"
                value={customSize}
                onChange={(e) => setCustomSize(e.target.value)}
                placeholder="e.g. Bust: 36in, Length: 22in, or Bag: 30x35cm"
                className="w-full px-3.5 py-2.5 rounded-2xl border border-[#ECC3BD] bg-white text-xs sm:text-sm text-[#2C1810] focus:ring-1 focus:ring-[#4A2E2B] outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#4E342E] mb-1.5 flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-[#8C533C]" />
                Target Need-By Date (Optional)
              </label>
              <input
                type="text"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
                placeholder="e.g. Next month, Wedding on Oct 14"
                className="w-full px-3.5 py-2.5 rounded-2xl border border-[#ECC3BD] bg-white text-xs sm:text-sm text-[#2C1810] focus:ring-1 focus:ring-[#4A2E2B] outline-none"
              />
            </div>
          </div>

          {/* Step 5: Design Inspiration / Description */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#4E342E] mb-1.5">
              5. Design Inspiration, Special Stitches, or Link
            </label>
            <textarea
              rows={3}
              value={designDetails}
              onChange={(e) => setDesignDetails(e.target.value)}
              placeholder="Describe your vision, pattern idea, reference link from Instagram/Pinterest, or special instructions..."
              className="w-full px-3.5 py-2.5 rounded-2xl border border-[#ECC3BD] bg-white text-xs sm:text-sm text-[#2C1810] focus:ring-1 focus:ring-[#4A2E2B] outline-none resize-none"
            />
          </div>

          {/* Client Name */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#4E342E] mb-1.5">
              Your Name
            </label>
            <input
              type="text"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              placeholder="e.g. Sarah J."
              className="w-full px-3.5 py-2.5 rounded-2xl border border-[#ECC3BD] bg-white text-xs sm:text-sm text-[#2C1810] focus:ring-1 focus:ring-[#4A2E2B] outline-none"
            />
          </div>

          {/* Submit buttons */}
          <div className="pt-3 space-y-2">
            <button
              type="submit"
              className="w-full py-4 px-6 bg-[#25D366] hover:bg-[#20ba59] text-white font-semibold rounded-2xl text-sm sm:text-base transition flex items-center justify-center gap-2.5 shadow-lg hover:shadow-xl active:scale-[0.99]"
            >
              <MessageCircle className="w-5 h-5" />
              Request Custom Quote on WhatsApp
            </button>
            <p className="text-center text-[11px] text-[#6D4C41]">
              Custom orders are quoted based on yarn weight, stitch density, and crafting hours. No commitment required.
            </p>
          </div>
        </form>
      )}
    </div>
  );

  if (isModal) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in">
        <div 
          className="w-full max-w-2xl bg-[#FAF7F2] rounded-3xl shadow-2xl border border-[#ECC3BD] text-[#2C1810] relative max-h-[92vh] flex flex-col overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="p-5 sm:p-6 border-b border-[#ECC3BD]/50 flex items-center justify-between bg-[#FAF5EE]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-[#4A2E2B] text-[#F6DFDC] flex items-center justify-center shadow-sm">
                <Heart className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] uppercase tracking-wider font-semibold text-[#8C533C]">
                  Bespoke Commissions
                </span>
                <h3 className="text-lg sm:text-xl font-serif font-bold text-[#3E2723]">
                  Custom Order Request
                </h3>
              </div>
            </div>
            {onClose && (
              <button
                onClick={onClose}
                className="p-2 rounded-full text-[#4E342E]/70 hover:text-[#2C1810] hover:bg-[#ECC3BD]/30 transition"
              >
                ✕
              </button>
            )}
          </div>
          <div className="p-5 sm:p-6 overflow-y-auto">
            {formContent}
          </div>
        </div>
      </div>
    );
  }

  return (
    <section id="custom-orders" className="py-12 sm:py-16 px-4 max-w-4xl mx-auto">
      <div className="bg-gradient-to-br from-[#FAF5EE] via-[#FAF7F2] to-[#FBECEB] rounded-3xl sm:rounded-4xl p-6 sm:p-10 border border-[#ECC3BD] shadow-xl relative overflow-hidden">
        {/* Subtle decorative motif in corner */}
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-44 h-44 rounded-full bg-[#ECC3BD]/20 blur-2xl pointer-events-none" />

        <div className="text-center max-w-xl mx-auto mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#4A2E2B] text-[#F6DFDC] text-xs font-semibold mb-3 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
            Bespoke Made-to-Measure
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-[#2C1810] tracking-tight">
            Have a Dream Crochet Piece in Mind?
          </h2>
          <p className="text-xs sm:text-sm text-[#6D4C41] mt-2.5 leading-relaxed">
            From custom garments measured to your exact dimensions to heirloom nursery sets and bespoke accessories, we bring your vision to life stitch by stitch.
          </p>
        </div>

        {formContent}
      </div>
    </section>
  );
};
