import React from 'react';
import { X, Share, PlusSquare, Smartphone, CheckCircle2 } from 'lucide-react';

interface IOSInstallModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const IOSInstallModal: React.FC<IOSInstallModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in">
      <div 
        className="w-full max-w-md bg-[#FAF7F2] rounded-3xl p-6 shadow-2xl border border-[#ECC3BD] text-[#2C1810] relative overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full text-[#4E342E]/70 hover:text-[#2C1810] hover:bg-[#ECC3BD]/30 transition"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center p-0.5 shadow-md border-2 border-[#ECC3BD] overflow-hidden shrink-0">
            <img src="/assets/aistudio/FB_IMG_1766551913118_deea7bea.jpg" alt="B & M Crochet House Logo" className="w-full h-full object-cover rounded-full" />
          </div>
          <div>
            <h3 className="text-lg font-serif font-bold text-[#3E2723]">Install on iPhone / iPad</h3>
            <p className="text-xs text-[#6D4C41]">Add B &amp; M Crochet House to your Home Screen</p>
          </div>
        </div>

        <div className="space-y-4 my-5 text-sm text-[#4E342E]">
          <div className="flex items-start gap-3 p-3 bg-white/70 rounded-2xl border border-[#ECC3BD]/50">
            <div className="p-2 bg-[#ECC3BD]/30 rounded-xl text-[#4A2E2B] shrink-0 mt-0.5">
              <Share className="w-5 h-5" />
            </div>
            <div>
              <p className="font-semibold text-[#2C1810]">1. Tap the Share button</p>
              <p className="text-xs text-[#6D4C41] mt-0.5">
                Look for the square icon with an upward arrow in the Safari navigation bar.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 bg-white/70 rounded-2xl border border-[#ECC3BD]/50">
            <div className="p-2 bg-[#ECC3BD]/30 rounded-xl text-[#4A2E2B] shrink-0 mt-0.5">
              <PlusSquare className="w-5 h-5" />
            </div>
            <div>
              <p className="font-semibold text-[#2C1810]">2. Tap "Add to Home Screen"</p>
              <p className="text-xs text-[#6D4C41] mt-0.5">
                Scroll down through the share sheet options and select <strong>Add to Home Screen</strong>.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 bg-white/70 rounded-2xl border border-[#ECC3BD]/50">
            <div className="p-2 bg-[#D4AF37]/20 rounded-xl text-[#AA7C11] shrink-0 mt-0.5">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <p className="font-semibold text-[#2C1810]">3. Tap "Add" in top-right</p>
              <p className="text-xs text-[#6D4C41] mt-0.5">
                The app will appear instantly on your phone like a native mobile app!
              </p>
            </div>
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full py-3 bg-[#4A2E2B] hover:bg-[#3E2723] text-[#FAF7F2] font-medium rounded-2xl transition shadow-md"
        >
          Got it!
        </button>
      </div>
    </div>
  );
};
