import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Clock, 
  CheckCircle2, 
  Sparkles, 
  MessageCircle, 
  Package, 
  AlertCircle,
  RotateCcw,
  Palette,
  Ruler,
  Scissors
} from 'lucide-react';
import { useBusiness } from '../context/BusinessContext';
import { INITIAL_ORDERS, ORDER_STEPS, CrochetOrder, OrderProgressStep } from '../data/orders';

interface OrderStatusLookupProps {
  initialOrderId?: string;
}

const LOCAL_STORAGE_ORDERS_KEY = 'bm_crochet_custom_orders';

export const OrderStatusLookup: React.FC<OrderStatusLookupProps> = ({ initialOrderId = '' }) => {
  const { config, activeWhatsApp } = useBusiness();
  const [searchTerm, setSearchTerm] = useState(initialOrderId);
  const [searchedId, setSearchedId] = useState('');
  const [matchedOrder, setMatchedOrder] = useState<CrochetOrder | null>(null);
  const [hasSearched, setHasSearched] = useState(false);
  const [allOrders, setAllOrders] = useState<CrochetOrder[]>(INITIAL_ORDERS);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(LOCAL_STORAGE_ORDERS_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          setAllOrders([...parsed, ...INITIAL_ORDERS]);
        }
      }
    } catch {
      // ignore
    }
  }, []);

  const handleLookup = (idToSearch?: string) => {
    const term = (idToSearch || searchTerm).trim().toUpperCase();
    if (!term) return;

    setSearchedId(term);
    setHasSearched(true);

    const found = allOrders.find(
      (o) => o.orderId.toUpperCase() === term || o.orderId.replace(/[^0-9]/g, '') === term.replace(/[^0-9]/g, '')
    );

    setMatchedOrder(found || null);
  };

  const handleQuickSelect = (orderId: string) => {
    setSearchTerm(orderId);
    handleLookup(orderId);
  };

  const handleReset = () => {
    setSearchTerm('');
    setSearchedId('');
    setMatchedOrder(null);
    setHasSearched(false);
  };

  // Helper to determine step index
  const getStepIndex = (step: OrderProgressStep) => {
    return ORDER_STEPS.findIndex((s) => s.step === step);
  };

  const cleanWhatsAppNumber = activeWhatsApp.replace(/[^0-9]/g, '');

  const getWhatsAppInquiryUrl = (order?: CrochetOrder) => {
    const text = order
      ? `Hello B & M Crochet House! ✨\nI am checking on the status of my order *${order.orderId}* (${order.itemName}) for ${order.clientName}.\nCould you please share the latest updates or photos from the hook? Thank you!`
      : `Hello B & M Crochet House! ✨\nI am looking up my order ID *${searchedId || searchTerm}*. Could you please check your studio records for me? Thank you!`;
    return `https://wa.me/${cleanWhatsAppNumber}?text=${encodeURIComponent(text)}`;
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#ECC3BD] shadow-sm space-y-6">
      
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAF5EE] border border-[#ECC3BD] text-xs font-semibold text-[#8C533C] mb-2">
          <Package className="w-3.5 h-3.5 text-[#D4AF37]" />
          <span>Live Studio Tracking</span>
        </div>
        <h3 className="text-xl font-serif font-bold text-[#2C1810]">
          Track Your Custom Crochet Order
        </h3>
        <p className="text-xs text-[#6D4C41] mt-1">
          Enter your Order ID (e.g. <span className="font-mono font-semibold text-[#8C533C]">BM-7821</span>) to see current progress, yarn preparations, and estimated completion.
        </p>
      </div>

      {/* Lookup Form */}
      <form 
        onSubmit={(e) => {
          e.preventDefault();
          handleLookup();
        }}
        className="space-y-3"
      >
        <div className="flex flex-col sm:flex-row gap-2.5">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#8C533C]">
              <Search className="w-4 h-4" />
            </div>
            <input
              type="text"
              required
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Enter your Order ID (e.g. BM-7821)..."
              className="w-full pl-10 pr-3.5 py-3 rounded-2xl border border-[#ECC3BD] bg-[#FAF7F2] text-xs sm:text-sm text-[#2C1810] placeholder-[#8C533C]/40 focus:ring-1 focus:ring-[#4A2E2B] focus:border-[#4A2E2B] outline-none font-mono tracking-wider transition uppercase"
            />
          </div>

          <div className="flex gap-2">
            <button
              type="submit"
              className="flex-1 sm:flex-none px-6 py-3 bg-[#4A2E2B] hover:bg-[#3E2723] active:scale-[0.98] text-[#FAF7F2] font-semibold rounded-2xl text-xs sm:text-sm transition flex items-center justify-center gap-2 shadow-xs"
            >
              <Search className="w-4 h-4 text-[#D4AF37]" />
              <span>Lookup Status</span>
            </button>

            {hasSearched && (
              <button
                type="button"
                onClick={handleReset}
                title="Reset search"
                className="p-3 rounded-2xl border border-[#ECC3BD] hover:bg-[#FAF7F2] text-[#6D4C41] transition"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Quick Sample IDs */}
        <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
          <span className="text-[11px] text-[#8C533C] font-medium">Try active samples:</span>
          {INITIAL_ORDERS.map((sample) => (
            <button
              key={sample.orderId}
              type="button"
              onClick={() => handleQuickSelect(sample.orderId)}
              className={`text-[11px] font-mono font-medium px-2.5 py-0.5 rounded-lg border transition ${
                searchedId === sample.orderId
                  ? 'bg-[#4A2E2B] text-white border-[#4A2E2B]'
                  : 'bg-[#FAF5EE] text-[#4E342E] border-[#ECC3BD]/70 hover:border-[#D4AF37] hover:bg-white'
              }`}
            >
              {sample.orderId}
            </button>
          ))}
        </div>
      </form>

      {/* RESULTS DISPLAY */}
      {hasSearched && matchedOrder && (
        <div className="p-5 sm:p-6 rounded-2xl bg-[#FAF7F2] border border-[#ECC3BD] space-y-6 animate-fade-in">
          
          {/* Order Header Summary */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#ECC3BD]/50">
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono font-bold text-sm sm:text-base text-[#4A2E2B] bg-[#ECC3BD]/30 border border-[#ECC3BD] px-2.5 py-0.5 rounded-lg">
                  {matchedOrder.orderId}
                </span>
                <span className="text-xs text-[#8C533C] font-semibold">
                  Client: {matchedOrder.clientName}
                </span>
              </div>
              <h4 className="font-serif font-bold text-base sm:text-lg text-[#2C1810] mt-1">
                {matchedOrder.itemName}
              </h4>
            </div>

            <div className="text-left sm:text-right">
              <span className="text-[11px] text-[#6D4C41] block">Estimated Completion</span>
              <span className="text-xs sm:text-sm font-semibold text-[#4A2E2B] flex items-center sm:justify-end gap-1 mt-0.5">
                <Clock className="w-3.5 h-3.5 text-[#D4AF37]" />
                {matchedOrder.estimatedCompletion}
              </span>
            </div>
          </div>

          {/* Progress Bar & Percentage */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-serif font-bold text-[#3E2723]">
                {matchedOrder.statusTitle}
              </span>
              <span className="font-mono font-bold text-[#8C533C]">
                {matchedOrder.progressPercent}% Complete
              </span>
            </div>

            {/* Custom Meter */}
            <div className="w-full h-3 bg-white rounded-full border border-[#ECC3BD]/80 overflow-hidden p-0.5">
              <div 
                className="h-full rounded-full bg-gradient-to-r from-[#D4AF37] via-[#C99A2C] to-[#8C533C] transition-all duration-700 ease-out"
                style={{ width: `${matchedOrder.progressPercent}%` }}
              />
            </div>
          </div>

          {/* Stepper Timeline */}
          <div className="pt-2">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-[#8C533C] block mb-3">
              Craft Milestone Stages
            </span>

            <div className="relative pl-6 space-y-4 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-[#ECC3BD]">
              {ORDER_STEPS.map((milestone, idx) => {
                const currentIdx = getStepIndex(matchedOrder.currentStep);
                const isPassed = idx < currentIdx;
                const isCurrent = idx === currentIdx;
                const isUpcoming = idx > currentIdx;

                return (
                  <div key={milestone.step} className="relative flex items-start gap-3">
                    {/* Circle Node */}
                    <div 
                      className={`absolute -left-6 top-0.5 w-4.5 h-4.5 rounded-full flex items-center justify-center border-2 transition ${
                        isPassed
                          ? 'bg-emerald-600 border-emerald-600 text-white'
                          : isCurrent
                          ? 'bg-[#4A2E2B] border-[#D4AF37] text-white ring-4 ring-[#D4AF37]/20 animate-pulse'
                          : 'bg-white border-gray-300 text-transparent'
                      }`}
                    >
                      {isPassed ? (
                        <CheckCircle2 className="w-3 h-3 fill-current" />
                      ) : isCurrent ? (
                        <Sparkles className="w-2.5 h-2.5 text-[#D4AF37]" />
                      ) : null}
                    </div>

                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <span 
                          className={`text-xs font-semibold ${
                            isCurrent 
                              ? 'text-[#2C1810]' 
                              : isPassed 
                              ? 'text-emerald-800' 
                              : 'text-gray-400'
                          }`}
                        >
                          {milestone.label}
                        </span>
                        {isCurrent && (
                          <span className="text-[10px] bg-[#D4AF37]/20 border border-[#D4AF37]/50 text-[#3E2723] px-2 py-0.2 rounded-full font-medium">
                            Current Stage
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-[#6D4C41]">
                        {milestone.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Artisan Live Notes Box */}
          <div className="p-4 rounded-xl bg-white border border-[#ECC3BD]/60 space-y-2">
            <div className="flex items-center gap-2 text-xs font-semibold text-[#4A2E2B]">
              <Scissors className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Studio Desk Update:</span>
            </div>
            <p className="text-xs text-[#4E342E] leading-relaxed italic">
              &quot;{matchedOrder.statusDescription}&quot;
            </p>
            {matchedOrder.artisanNote && (
              <p className="text-[11px] text-[#8C533C] pt-1 border-t border-[#ECC3BD]/30 font-medium">
                Note from Artisan: {matchedOrder.artisanNote}
              </p>
            )}
          </div>

          {/* Specs Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs pt-1">
            <div className="p-3 bg-white rounded-xl border border-[#ECC3BD]/40 space-y-1">
              <span className="text-[10px] uppercase font-semibold text-[#8C533C] block">
                Yarn &amp; Fibers
              </span>
              <span className="text-[#3E2723] font-medium block">
                {matchedOrder.yarnType}
              </span>
              <div className="flex items-center gap-1 pt-1 flex-wrap">
                {matchedOrder.customColors.map((col) => (
                  <span 
                    key={col} 
                    className="text-[10px] px-2 py-0.5 rounded-md bg-[#FAF7F2] border border-[#ECC3BD] text-[#4A2E2B]"
                  >
                    {col}
                  </span>
                ))}
              </div>
            </div>

            <div className="p-3 bg-white rounded-xl border border-[#ECC3BD]/40 space-y-1">
              <span className="text-[10px] uppercase font-semibold text-[#8C533C] block">
                Measurements / Sizing
              </span>
              <span className="text-[#3E2723] font-medium block">
                {matchedOrder.measurementsOrSize}
              </span>
              <span className="text-[10px] text-[#8C533C] block pt-1">
                Ordered: {matchedOrder.orderDate}
              </span>
            </div>
          </div>

          {/* Direct WhatsApp Follow-up button */}
          <div className="pt-2">
            <a
              href={getWhatsAppInquiryUrl(matchedOrder)}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 px-4 bg-[#25D366] hover:bg-[#20ba59] text-white font-semibold rounded-xl text-xs sm:text-sm transition flex items-center justify-center gap-2 shadow-xs"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Ask Artisan About Order #{matchedOrder.orderId} on WhatsApp</span>
            </a>
          </div>

        </div>
      )}

      {/* NOT FOUND VIEW */}
      {hasSearched && !matchedOrder && (
        <div className="p-6 rounded-2xl bg-[#FAF5EE] border border-[#ECC3BD] text-center space-y-4 animate-fade-in">
          <div className="w-12 h-12 rounded-full bg-[#ECC3BD]/40 text-[#8C533C] flex items-center justify-center mx-auto">
            <AlertCircle className="w-6 h-6" />
          </div>

          <div className="space-y-1">
            <h4 className="font-serif font-bold text-base text-[#2C1810]">
              No Automated Record Found for &quot;{searchedId}&quot;
            </h4>
            <p className="text-xs text-[#6D4C41] max-w-md mx-auto leading-relaxed">
              If your custom piece was commissioned recently or directly through WhatsApp, our maker may still be logging your order sheet. You can query the artisan directly with this order number!
            </p>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href={getWhatsAppInquiryUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-semibold flex items-center justify-center gap-2 transition shadow-xs"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Inquire via WhatsApp with ID &quot;{searchedId}&quot;</span>
            </a>

            <button
              onClick={handleReset}
              className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-white hover:bg-gray-50 text-[#4E342E] text-xs font-medium border border-[#ECC3BD] transition"
            >
              Try Another Order ID
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
