import React from 'react';
import { WifiOff } from 'lucide-react';
import { useOnlineStatus } from '../hooks/useOnlineStatus';

export const OfflineBanner: React.FC = () => {
  const isOnline = useOnlineStatus();

  if (isOnline) return null;

  return (
    <div className="fixed bottom-20 md:bottom-6 left-4 right-4 md:left-auto md:right-6 z-50 max-w-md bg-[#3E2723] text-[#FAF7F2] border border-[#D4AF37]/40 px-4 py-3 rounded-2xl shadow-2xl flex items-center gap-3 backdrop-blur-md animate-fade-in">
      <div className="p-2 bg-[#ECC3BD]/20 rounded-xl text-[#ECC3BD]">
        <WifiOff className="w-5 h-5 animate-pulse" />
      </div>
      <div className="text-xs">
        <p className="font-semibold text-[#F6DFDC]">Offline Mode Active</p>
        <p className="text-[#FAF7F2]/80">
          You are viewing cached boutique creations. WhatsApp inquiries will send once you are back online.
        </p>
      </div>
    </div>
  );
};
