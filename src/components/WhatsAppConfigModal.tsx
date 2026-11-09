import React, { useState } from 'react';
import { X, MessageCircle, Phone, Check, RefreshCw, Info, ExternalLink } from 'lucide-react';
import { useBusiness } from '../context/BusinessContext';
import { buildWhatsAppLink } from '../data/businessConfig';

export const WhatsAppConfigModal: React.FC = () => {
  const { 
    isWhatsAppConfigOpen, 
    closeWhatsAppConfig, 
    activeWhatsApp, 
    customWhatsApp, 
    setCustomWhatsApp, 
    resetToDefaultWhatsApp,
    isCustomized 
  } = useBusiness();

  const [inputVal, setInputVal] = useState(customWhatsApp || '');
  const [savedSuccess, setSavedSuccess] = useState(false);

  if (!isWhatsAppConfigOpen) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setCustomWhatsApp(inputVal);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  const testLink = buildWhatsAppLink(
    'Hello B & M Crochet House! I am testing the WhatsApp ordering connection for my crochet boutique.',
    activeWhatsApp
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in">
      <div 
        className="w-full max-w-lg bg-[#FAF7F2] rounded-3xl p-6 sm:p-7 shadow-2xl border border-[#ECC3BD] text-[#2C1810] relative max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={closeWhatsAppConfig}
          className="absolute top-5 right-5 p-2 rounded-full text-[#4E342E]/70 hover:text-[#2C1810] hover:bg-[#ECC3BD]/30 transition"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-2xl bg-[#25D366] text-white flex items-center justify-center shadow-md">
            <MessageCircle className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-serif font-bold text-[#3E2723]">WhatsApp Phone Settings</h3>
            <p className="text-xs text-[#6D4C41]">Configure the phone number for customer orders</p>
          </div>
        </div>

        {/* Current status banner */}
        <div className="p-4 rounded-2xl bg-[#FAF5EE] border border-[#ECC3BD]/60 mb-5">
          <div className="flex items-center justify-between text-xs font-medium text-[#4E342E] mb-1">
            <span>Current Active WhatsApp:</span>
            <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-semibold flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Official Number Active
            </span>
          </div>
          <p className="text-base font-mono font-bold text-[#2C1810] tracking-wide flex items-center gap-2">
            <span>+{activeWhatsApp}</span>
            <span className="text-xs font-sans font-normal text-[#8C533C]">(Rwanda +250)</span>
          </p>
          <p className="text-xs text-[#6D4C41] mt-1">
            Directing all "Request Price", custom orders, and review shares directly to your WhatsApp.
          </p>
        </div>

        {/* Quick Config Form */}
        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#4E342E] mb-1.5">
              Enter Owner WhatsApp Number (with country code)
            </label>
            <div className="relative">
              <Phone className="w-5 h-5 text-[#8C533C] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                placeholder="e.g. 15551234567 or 231770000000"
                className="w-full pl-11 pr-4 py-3 rounded-xl border border-[#ECC3BD] bg-white text-sm text-[#2C1810] focus:ring-2 focus:ring-[#4A2E2B] focus:border-transparent outline-none transition"
              />
            </div>
            <p className="text-[11px] text-[#6D4C41] mt-1">
              Include country code (e.g. 1 for US/Canada, 44 for UK, 231 for Liberia, 234 for Nigeria) with no plus signs or spaces.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-2 pt-1">
            <button
              type="submit"
              className="flex-1 py-3 px-4 bg-[#4A2E2B] hover:bg-[#3E2723] text-white rounded-xl text-sm font-medium transition flex items-center justify-center gap-2 shadow-sm"
            >
              {savedSuccess ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400" />
                  Saved to Browser!
                </>
              ) : (
                'Save Active Number'
              )}
            </button>

            {isCustomized && (
              <button
                type="button"
                onClick={() => {
                  resetToDefaultWhatsApp();
                  setInputVal('');
                }}
                className="py-3 px-4 border border-[#ECC3BD] text-[#4E342E] hover:bg-[#ECC3BD]/20 rounded-xl text-xs font-medium transition flex items-center justify-center gap-1.5"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                Reset to Placeholder
              </button>
            )}
          </div>
        </form>

        {/* Live Test Link */}
        <div className="mt-6 pt-5 border-t border-[#ECC3BD]/50">
          <p className="text-xs font-semibold text-[#3E2723] mb-2 flex items-center gap-1.5">
            <Info className="w-4 h-4 text-[#AA7C11]" />
            Test Live WhatsApp Connection
          </p>
          <a
            href={testLink}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-2.5 px-4 bg-[#25D366]/15 hover:bg-[#25D366]/25 text-[#1b8a42] border border-[#25D366]/40 rounded-xl text-xs font-semibold transition flex items-center justify-center gap-2"
          >
            <MessageCircle className="w-4 h-4" />
            Launch Test Message on WhatsApp
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Permanent Code Note */}
        <div className="mt-4 p-3 bg-white/70 rounded-xl border border-[#ECC3BD]/40 text-[11px] text-[#6D4C41]">
          <span className="font-semibold text-[#2C1810]">Permanent Configuration Note:</span>
          <p className="mt-0.5">
            To set this permanently for all visitors, open <code>src/data/businessConfig.ts</code> and update the <code>whatsAppNumber</code> field.
          </p>
        </div>
      </div>
    </div>
  );
};
