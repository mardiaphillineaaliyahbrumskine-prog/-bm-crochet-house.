import React, { useState, useEffect } from 'react';
import { 
  Mail, 
  CheckCircle2, 
  Sparkles, 
  Send, 
  Heart, 
  Gift, 
  Bell, 
  MessageCircle,
  Check,
  ShieldCheck,
  ArrowRight
} from 'lucide-react';
import { useBusiness } from '../context/BusinessContext';

interface Subscriber {
  email: string;
  name?: string;
  interest: string;
  date: string;
  notifyWhatsApp?: boolean;
}

const LOCAL_STORAGE_NEWSLETTER_KEY = 'bm_crochet_newsletter_subscribers';
const BASELINE_SUBSCRIBER_COUNT = 184;

export const NewsletterSignup: React.FC = () => {
  const { config } = useBusiness();
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [interest, setInterest] = useState('All Collections');
  const [notifyWhatsApp, setNotifyWhatsApp] = useState(false);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [subscribersList, setSubscribersList] = useState<Subscriber[]>([]);
  const [confirmedEmail, setConfirmedEmail] = useState<string>('');

  useEffect(() => {
    try {
      const stored = localStorage.getItem(LOCAL_STORAGE_NEWSLETTER_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          setSubscribersList(parsed);
          if (parsed.length > 0) {
            setConfirmedEmail(parsed[0].email);
          }
        }
      }
    } catch {
      // ignore storage errors
    }
  }, []);

  const interestsList = [
    { label: 'All Collections', desc: 'Every new release' },
    { label: 'Dresses & Tops', desc: 'Couture slow-fashion' },
    { label: 'Bags & Totes', desc: 'Hand-knotted textured bags' },
    { label: 'Baby Blankets & Toys', desc: 'Heirloom nursery pieces' },
  ];

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    const cleanEmail = email.trim().toLowerCase();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!cleanEmail || !emailRegex.test(cleanEmail)) {
      setStatus('error');
      setErrorMessage('Please provide a valid email address (e.g. name@example.com).');
      return;
    }

    setStatus('loading');

    setTimeout(() => {
      try {
        const newSubscriber: Subscriber = {
          email: cleanEmail,
          name: name.trim() || undefined,
          interest,
          date: new Date().toISOString(),
          notifyWhatsApp,
        };

        const existingIndex = subscribersList.findIndex(
          (s) => s.email.toLowerCase() === cleanEmail
        );
        let updatedList: Subscriber[];

        if (existingIndex >= 0) {
          updatedList = [...subscribersList];
          updatedList[existingIndex] = newSubscriber;
        } else {
          updatedList = [newSubscriber, ...subscribersList];
        }

        localStorage.setItem(LOCAL_STORAGE_NEWSLETTER_KEY, JSON.stringify(updatedList));
        setSubscribersList(updatedList);
        setConfirmedEmail(cleanEmail);
        setStatus('success');
      } catch {
        setStatus('error');
        setErrorMessage('Could not save your subscription. Please try again.');
      }
    }, 400);
  };

  const handleReset = () => {
    setEmail('');
    setName('');
    setStatus('idle');
    setErrorMessage('');
  };

  const cleanWhatsAppNumber = config.whatsAppNumber.replace(/[^0-9]/g, '');
  const whatsAppConfirmUrl = `https://wa.me/${cleanWhatsAppNumber}?text=${encodeURIComponent(
    `Hello B & M Crochet House! ✨\nI just joined your VIP Newsletter Circle with my email: ${confirmedEmail || email}.\nLooking forward to your upcoming handmade crochet drops and custom commission slots!`
  )}`;

  return (
    <section 
      id="newsletter" 
      className="w-full mb-12 sm:mb-16 relative scroll-mt-24"
      aria-label="Newsletter Subscription"
    >
      {/* Decorative Outer Shell */}
      <div className="relative rounded-3xl bg-gradient-to-br from-[#38201B] via-[#2D1814] to-[#21100C] border border-[#D4AF37]/40 shadow-2xl overflow-hidden p-6 sm:p-9 md:p-12">
        
        {/* Ambient Warm Glows */}
        <div className="absolute -top-24 -right-24 w-72 h-72 bg-[#ECC3BD]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-[#D4AF37]/15 rounded-full blur-3xl pointer-events-none" />
        
        {/* Delicate Crochet Stitch Border Pattern (top and bottom) */}
        <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/40 to-transparent" />
        <div className="absolute bottom-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-[#ECC3BD]/30 to-transparent" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Brand Invitation & Artisan Proof */}
          <div className="lg:col-span-6 space-y-4 text-left">
            
            {/* Elegant Tag */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FAF7F2]/10 border border-[#D4AF37]/40 text-[#ECC3BD] text-xs font-semibold tracking-wide backdrop-blur-xs">
              <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span className="font-serif">The B &amp; M Crochet House Circle</span>
            </div>

            <h3 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-[#FAF7F2] leading-tight">
              Stay in the Loop with New Creations
            </h3>

            <p className="text-xs sm:text-sm text-[#FAF7F2]/85 leading-relaxed font-light">
              Because our pieces are slow-crafted by hand with zero mass manufacturing, custom commission slots and new colorways fill quickly. Subscribe to receive first-look previews, yarn care secrets, and VIP collection drops.
            </p>

            {/* Artisan Value Badges */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-2">
              <div className="p-2.5 rounded-2xl bg-[#4A2E2B]/60 border border-[#ECC3BD]/20 flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-xl bg-[#D4AF37]/20 flex items-center justify-center shrink-0">
                  <Gift className="w-3.5 h-3.5 text-[#D4AF37]" />
                </div>
                <div className="text-left">
                  <span className="text-[11px] font-bold text-[#FAF7F2] block leading-tight">Priority Slots</span>
                  <span className="text-[9px] text-[#ECC3BD]/80">Custom orders</span>
                </div>
              </div>

              <div className="p-2.5 rounded-2xl bg-[#4A2E2B]/60 border border-[#ECC3BD]/20 flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-xl bg-[#ECC3BD]/20 flex items-center justify-center shrink-0">
                  <Bell className="w-3.5 h-3.5 text-[#ECC3BD]" />
                </div>
                <div className="text-left">
                  <span className="text-[11px] font-bold text-[#FAF7F2] block leading-tight">Drop Alerts</span>
                  <span className="text-[9px] text-[#ECC3BD]/80">New designs first</span>
                </div>
              </div>

              <div className="p-2.5 rounded-2xl bg-[#4A2E2B]/60 border border-[#ECC3BD]/20 flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-xl bg-[#D4AF37]/20 flex items-center justify-center shrink-0">
                  <Heart className="w-3.5 h-3.5 text-[#D4AF37]" />
                </div>
                <div className="text-left">
                  <span className="text-[11px] font-bold text-[#FAF7F2] block leading-tight">Yarn Care</span>
                  <span className="text-[9px] text-[#ECC3BD]/80">Washing guides</span>
                </div>
              </div>
            </div>

            {/* Community Proof */}
            <div className="flex items-center gap-2.5 text-[11px] text-[#ECC3BD]/90 pt-1">
              <span className="flex -space-x-1.5 overflow-hidden">
                <span className="inline-block w-6 h-6 rounded-full ring-2 ring-[#2D1814] bg-[#D4AF37] text-[10px] font-bold text-[#2C1810] text-center leading-6">B</span>
                <span className="inline-block w-6 h-6 rounded-full ring-2 ring-[#2D1814] bg-[#ECC3BD] text-[10px] font-bold text-[#2C1810] text-center leading-6">M</span>
                <span className="inline-block w-6 h-6 rounded-full ring-2 ring-[#2D1814] bg-[#8C533C] text-[10px] font-bold text-[#FAF7F2] text-center leading-6">★</span>
              </span>
              <span>
                Joined by <strong className="text-[#FAF7F2] font-semibold">{BASELINE_SUBSCRIBER_COUNT + subscribersList.length}</strong> crochet collectors &amp; clients
              </span>
            </div>
          </div>

          {/* Right Column: Interactive Subscription Form or Success Confirmation */}
          <div className="lg:col-span-6">
            {status === 'success' ? (
              /* Success Confirmation Card */
              <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#27130F] to-[#1C0D0A] border-2 border-[#D4AF37]/60 text-center space-y-5 animate-fade-in shadow-2xl relative overflow-hidden">
                
                {/* Decorative glow inside success */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#D4AF37]/15 rounded-full blur-2xl pointer-events-none" />

                <div className="w-14 h-14 rounded-full bg-[#D4AF37]/20 border-2 border-[#D4AF37] text-[#D4AF37] flex items-center justify-center mx-auto shadow-inner">
                  <CheckCircle2 className="w-7 h-7" />
                </div>

                <div className="space-y-1.5">
                  <span className="text-[11px] uppercase tracking-widest text-[#D4AF37] font-semibold block">
                    Subscription Confirmed
                  </span>
                  <h4 className="font-serif text-xl sm:text-2xl font-bold text-[#FAF7F2]">
                    Welcome to the Circle! ✨
                  </h4>
                  <p className="text-xs sm:text-sm text-[#FAF7F2]/85 leading-relaxed max-w-sm mx-auto">
                    Your email <span className="font-semibold text-[#D4AF37] underline break-all">{confirmedEmail}</span> has been successfully added to our VIP subscriber list.
                  </p>
                </div>

                <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 text-xs text-[#FAF7F2]/80 max-w-sm mx-auto">
                  <p className="text-[11px] leading-relaxed">
                    💌 Look out for early preview notes whenever our artisan finishes new crochet batches or opens custom measurement slots.
                  </p>
                </div>

                {/* Next Steps Buttons */}
                <div className="pt-1 flex flex-col sm:flex-row items-center justify-center gap-3">
                  <a
                    href={whatsAppConfirmUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto px-5 py-3 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-semibold flex items-center justify-center gap-2 transition shadow-md active:scale-[0.98]"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Connect on WhatsApp ({config.whatsAppDisplay})</span>
                  </a>

                  <button
                    onClick={handleReset}
                    className="w-full sm:w-auto px-4 py-3 rounded-xl bg-white/10 hover:bg-white/15 text-[#FAF7F2] text-xs font-medium border border-white/20 transition active:scale-[0.98]"
                  >
                    Subscribe Another Email
                  </button>
                </div>

                <p className="text-[10px] text-[#ECC3BD]/70 pt-1">
                  We respect your inbox. You can unsubscribe at any time with a single click.
                </p>
              </div>
            ) : (
              /* Subscription Form */
              <form 
                onSubmit={handleSubscribe} 
                className="p-5 sm:p-7 rounded-3xl bg-[#261310]/80 backdrop-blur-md border border-[#D4AF37]/30 shadow-2xl space-y-4"
              >
                {/* Interest Pills */}
                <div className="space-y-1.5">
                  <label className="text-[11px] font-semibold text-[#ECC3BD] uppercase tracking-wider block">
                    Choose Your Favorite Creations:
                  </label>
                  <div className="grid grid-cols-2 gap-1.5">
                    {interestsList.map((item) => {
                      const isSelected = interest === item.label;
                      return (
                        <button
                          type="button"
                          key={item.label}
                          onClick={() => setInterest(item.label)}
                          className={`text-left p-2 rounded-xl border transition ${
                            isSelected
                              ? 'bg-[#D4AF37] text-[#2C1810] border-[#D4AF37] shadow-xs'
                              : 'bg-[#3A221D]/60 text-[#FAF7F2]/80 border-[#FAF7F2]/10 hover:border-[#ECC3BD]/40 hover:text-[#FAF7F2]'
                          }`}
                        >
                          <span className="block text-[11px] font-semibold leading-tight">
                            {item.label}
                          </span>
                          <span className={`block text-[9px] ${isSelected ? 'text-[#2C1810]/80' : 'text-[#FAF7F2]/50'}`}>
                            {item.desc}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Form Inputs */}
                <div className="space-y-2.5 pt-1">
                  <div className="grid grid-cols-1 sm:grid-cols-12 gap-2.5">
                    {/* Optional Name */}
                    <div className="sm:col-span-5">
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="First Name (Optional)"
                        className="w-full px-3.5 py-3 rounded-2xl bg-[#1B0D0A] border border-[#ECC3BD]/30 focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] text-xs text-[#FAF7F2] placeholder-[#FAF7F2]/40 outline-none transition"
                      />
                    </div>
                    {/* Email Input */}
                    <div className="sm:col-span-7 relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#D4AF37]">
                        <Mail className="w-4 h-4" />
                      </div>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          if (status === 'error') setStatus('idle');
                        }}
                        placeholder="Enter your email address..."
                        className="w-full pl-10 pr-3.5 py-3 rounded-2xl bg-[#1B0D0A] border border-[#ECC3BD]/30 focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] text-xs text-[#FAF7F2] placeholder-[#FAF7F2]/40 outline-none transition"
                      />
                    </div>
                  </div>

                  {/* Optional WhatsApp check */}
                  <label className="flex items-center gap-2 cursor-pointer pt-0.5 group">
                    <input
                      type="checkbox"
                      checked={notifyWhatsApp}
                      onChange={(e) => setNotifyWhatsApp(e.target.checked)}
                      className="w-3.5 h-3.5 rounded border-[#ECC3BD]/40 text-[#D4AF37] focus:ring-0 accent-[#D4AF37] cursor-pointer"
                    />
                    <span className="text-[11px] text-[#FAF7F2]/80 group-hover:text-[#FAF7F2] transition flex items-center gap-1">
                      <span>Also notify me of urgent flash drops via WhatsApp</span>
                      <span className="text-[10px] text-[#D4AF37] font-semibold">(Optional)</span>
                    </span>
                  </label>
                </div>

                {/* Error Banner */}
                {errorMessage && (
                  <p className="text-xs text-[#F28B82] bg-[#F28B82]/15 border border-[#F28B82]/30 rounded-xl p-2.5 text-center font-medium">
                    {errorMessage}
                  </p>
                )}

                {/* Submit Action */}
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full py-3.5 px-5 rounded-2xl bg-gradient-to-r from-[#D4AF37] via-[#E2BE51] to-[#AA7C11] hover:from-[#E5C158] hover:to-[#C49B2E] text-[#2C1810] font-bold text-xs sm:text-sm tracking-wide shadow-xl hover:shadow-2xl active:scale-[0.99] transition flex items-center justify-center gap-2 disabled:opacity-70 cursor-pointer"
                >
                  {status === 'loading' ? (
                    <>
                      <div className="w-4 h-4 border-2 border-[#2C1810] border-t-transparent rounded-full animate-spin" />
                      <span>Subscribing to the Circle...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Subscribe for Updates &amp; Drops</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>

                {/* Privacy reassurance */}
                <div className="flex items-center justify-between text-[10px] text-[#ECC3BD]/75 pt-1.5 border-t border-[#4A2E2B]/60">
                  <span className="flex items-center gap-1 text-[#FAF7F2]/80">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#D4AF37]" />
                    <span>100% spam-free guarantee</span>
                  </span>
                  <span>Instant one-click unsubscribe</span>
                </div>
              </form>
            )}
          </div>

        </div>

      </div>
    </section>
  );
};
