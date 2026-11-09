import React, { useState, useEffect } from 'react';
import { 
  Phone, 
  MessageCircle, 
  Mail, 
  MapPin, 
  Clock, 
  Send, 
  Sparkles, 
  CheckCircle2, 
  ChevronDown, 
  Settings,
  HelpCircle,
  Package
} from 'lucide-react';
import { useBusiness } from '../context/BusinessContext';
import { buildWhatsAppLink } from '../data/businessConfig';
import { OrderStatusLookup } from './OrderStatusLookup';

export const ContactSection: React.FC = () => {
  const { config, activeWhatsApp, openWhatsAppConfig, isCustomized } = useBusiness();

  const [activeContactTab, setActiveContactTab] = useState<'order-status' | 'message'>('order-status');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [sentSuccess, setSentSuccess] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  useEffect(() => {
    if (window.location.hash === '#order-status') {
      setActiveContactTab('order-status');
    }
  }, []);

  const faqs = [
    {
      q: 'How does the "Request Price" process work?',
      a: 'Because our crochet pieces are handmade to order with customized sizes and fiber options, prices vary according to measurements and yarn type. When you click "Request Price", our system drafts your exact specs into a WhatsApp message directly to our artisan for an instant quote.',
    },
    {
      q: 'Can I choose my own colors and sizing?',
      a: 'Yes, absolutely! We love custom requests. You can mix and match color palettes, request specific sleeve or bust measurements, or ask for baby blanket dimensions tailored to your crib.',
    },
    {
      q: 'How long does it take to hand-crochet an order?',
      a: 'Smaller items (hair accessories, hats, plushies) take 1 to 3 business days. Wearable tops and totes take 3 to 5 business days, and large bespoke blankets or granny square cardigans take 7 to 12 business days.',
    },
    {
      q: 'How do I care for and wash my crochet items?',
      a: 'Always hand wash in cool or lukewarm water with gentle detergent. Avoid wringing or harsh machine spins. Gently press in a towel and lay flat on a drying rack to retain natural tension.',
    },
  ];

  const handleWhatsAppDirect = () => {
    let msg = `Hello B & M Crochet House! ✨\n`;
    if (name.trim()) msg += `My name is ${name.trim()}.\n`;
    if (message.trim()) {
      msg += `Inquiry: ${message.trim()}\n`;
    } else {
      msg += `I would like to inquire about your crochet collections and custom commissions.\n`;
    }
    const link = buildWhatsAppLink(msg, activeWhatsApp);
    window.open(link, '_blank', 'noopener,noreferrer');
  };

  const handleSubmitForm = (e: React.FormEvent) => {
    e.preventDefault();
    setSentSuccess(true);
    setTimeout(() => {
      setName('');
      setEmail('');
      setMessage('');
      setSentSuccess(false);
    }, 4000);
  };

  return (
    <section id="contact" className="py-14 sm:py-20 px-4 sm:px-6 max-w-7xl mx-auto scroll-mt-20">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Left Column: Contact Cards & Studio Info */}
        <div className="lg:col-span-5 space-y-6">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAF5EE] border border-[#ECC3BD] text-xs font-semibold text-[#8C533C] mb-2">
              <Phone className="w-3.5 h-3.5 text-[#D4AF37]" />
              Get in Touch
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#2C1810]">
              Contact B &amp; M Crochet House
            </h2>
            <p className="text-xs sm:text-sm text-[#6D4C41] mt-1 leading-relaxed">
              Have a question about a design or ready to commission your dream piece? We are always happy to chat.
            </p>
          </div>

          {/* WhatsApp Direct Highlight Card */}
          <div className="p-5 sm:p-6 bg-gradient-to-br from-[#25D366]/10 to-[#25D366]/5 rounded-3xl border border-[#25D366]/30 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-2xl bg-[#25D366] text-white flex items-center justify-center shadow-xs">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-serif font-bold text-base text-[#1b8a42]">
                    Instant WhatsApp Ordering
                  </h4>
                  <p className="text-[11px] text-[#2C1810] font-mono">
                    {activeWhatsApp}
                  </p>
                </div>
              </div>
              <button
                onClick={openWhatsAppConfig}
                className="p-2 rounded-xl bg-white/80 hover:bg-white text-[#4E342E] text-xs transition border border-[#25D366]/30"
                title="Configure Phone Number"
              >
                <Settings className="w-4 h-4 text-[#8C533C]" />
              </button>
            </div>

            <p className="text-xs text-[#4E342E] leading-relaxed">
              WhatsApp is our fastest channel for price quotes, sending reference photos, and color matching.
            </p>

            <button
              onClick={handleWhatsAppDirect}
              className="w-full py-3 px-4 bg-[#25D366] hover:bg-[#20ba59] text-white font-semibold rounded-2xl text-xs sm:text-sm transition flex items-center justify-center gap-2 shadow-xs"
            >
              <MessageCircle className="w-4 h-4" />
              Chat Directly on WhatsApp
            </button>
          </div>

          {/* Studio Details */}
          <div className="p-6 bg-white rounded-3xl border border-[#ECC3BD]/60 shadow-xs space-y-4 text-xs text-[#4E342E]">
            <div className="flex items-start gap-3">
              <Mail className="w-4 h-4 text-[#8C533C] shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-[#2C1810] block">Inquiry Email</span>
                <a 
                  href={`mailto:${config.email}`}
                  className="text-[#6D4C41] hover:text-[#4A2E2B] hover:underline font-mono text-[11px] break-all transition block mt-0.5"
                  title="Click to send email"
                >
                  {config.email}
                </a>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <MapPin className="w-4 h-4 text-[#8C533C] shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-[#2C1810] block">Studio Location</span>
                <span className="text-[#6D4C41]">{config.studioLocation}</span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Clock className="w-4 h-4 text-[#8C533C] shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-[#2C1810] block">Studio Hours</span>
                <span className="text-[#6D4C41] block">{config.businessHours.weekdays}</span>
                <span className="text-[#6D4C41] block">{config.businessHours.saturday}</span>
                <span className="text-[#6D4C41] block">{config.businessHours.sunday}</span>
              </div>
            </div>
          </div>

          {/* Quick Order Tracking Callout in Left Column */}
          <div className="p-5 bg-gradient-to-br from-[#FAF5EE] to-[#FAF7F2] rounded-3xl border border-[#ECC3BD] shadow-xs flex items-center justify-between gap-3">
            <div className="space-y-0.5">
              <span className="font-serif font-bold text-xs text-[#2C1810] flex items-center gap-1.5">
                <Package className="w-3.5 h-3.5 text-[#D4AF37]" />
                Have an Active Custom Order?
              </span>
              <p className="text-[11px] text-[#6D4C41]">
                Check live hook progress with your Order ID.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setActiveContactTab('order-status')}
              className="px-3.5 py-2 rounded-xl bg-[#4A2E2B] text-[#FAF7F2] text-xs font-semibold hover:bg-[#3E2723] active:scale-[0.98] transition shrink-0 shadow-xs"
            >
              Lookup ID
            </button>
          </div>
        </div>

        {/* Right Column: Tabbed Order Status Lookup & In-App Message Form */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Section Navigation Tabs */}
          <div className="flex p-1.5 rounded-2xl bg-[#FAF5EE] border border-[#ECC3BD] gap-1.5 shadow-xs">
            <button
              type="button"
              onClick={() => setActiveContactTab('order-status')}
              className={`flex-1 py-2.5 px-3 rounded-xl text-xs sm:text-sm font-semibold transition flex items-center justify-center gap-2 ${
                activeContactTab === 'order-status'
                  ? 'bg-[#4A2E2B] text-[#FAF7F2] shadow-sm'
                  : 'text-[#6D4C41] hover:text-[#2C1810] hover:bg-white/60'
              }`}
            >
              <Package className="w-4 h-4 text-[#D4AF37]" />
              <span>Order Status Lookup</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveContactTab('message')}
              className={`flex-1 py-2.5 px-3 rounded-xl text-xs sm:text-sm font-semibold transition flex items-center justify-center gap-2 ${
                activeContactTab === 'message'
                  ? 'bg-[#4A2E2B] text-[#FAF7F2] shadow-sm'
                  : 'text-[#6D4C41] hover:text-[#2C1810] hover:bg-white/60'
              }`}
            >
              <Send className="w-4 h-4 text-[#D4AF37]" />
              <span>Send Online Message</span>
            </button>
          </div>

          {/* Active Tab Content */}
          {activeContactTab === 'order-status' ? (
            <OrderStatusLookup />
          ) : (
            /* Contact Message Form */
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#ECC3BD] shadow-sm">
              <h3 className="text-xl font-serif font-bold text-[#2C1810] mb-1">
                Send an Online Message
              </h3>
              <p className="text-xs text-[#6D4C41] mb-5">
                Leave your details below and our team will get back to you within 24 hours.
              </p>

              {sentSuccess ? (
                <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-2xl text-center space-y-2">
                  <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
                  <h4 className="font-serif font-bold text-base text-emerald-900">
                    Message Sent Successfully!
                  </h4>
                  <p className="text-xs text-emerald-800">
                    Thank you for reaching out to B &amp; M Crochet House. We look forward to connecting with you.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmitForm} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-[#4E342E] mb-1">
                        Your Full Name
                      </label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Jessica Smith"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#ECC3BD] bg-[#FAF7F2] text-xs sm:text-sm text-[#2C1810] focus:ring-1 focus:ring-[#4A2E2B] outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-[#4E342E] mb-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="e.g. jessica@example.com"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#ECC3BD] bg-[#FAF7F2] text-xs sm:text-sm text-[#2C1810] focus:ring-1 focus:ring-[#4A2E2B] outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#4E342E] mb-1">
                      Your Message or Project Idea
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Tell us what you would like to know or describe your custom request..."
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#ECC3BD] bg-[#FAF7F2] text-xs sm:text-sm text-[#2C1810] focus:ring-1 focus:ring-[#4A2E2B] outline-none resize-none"
                    />
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 pt-2">
                    <button
                      type="submit"
                      className="flex-1 py-3 px-6 bg-[#4A2E2B] hover:bg-[#3E2723] text-white font-semibold rounded-xl text-xs sm:text-sm transition flex items-center justify-center gap-2 shadow-xs"
                    >
                      <Send className="w-4 h-4 text-[#D4AF37]" />
                      Send In-App Message
                    </button>
                    <button
                      type="button"
                      onClick={handleWhatsAppDirect}
                      className="py-3 px-5 bg-[#25D366]/15 hover:bg-[#25D366]/25 text-[#1b8a42] border border-[#25D366]/40 font-semibold rounded-xl text-xs sm:text-sm transition flex items-center justify-center gap-2"
                    >
                      <MessageCircle className="w-4 h-4" />
                      Send via WhatsApp
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}

          {/* Frequently Asked Questions */}
          <div className="space-y-3">
            <h3 className="text-lg font-serif font-bold text-[#2C1810] flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-[#AA7C11]" />
              Frequently Asked Questions
            </h3>

            <div className="space-y-2">
              {faqs.map((faq, index) => {
                const isOpen = openFaq === index;
                return (
                  <div
                    key={faq.q}
                    className="bg-white rounded-2xl border border-[#ECC3BD]/60 overflow-hidden shadow-xs"
                  >
                    <button
                      onClick={() => setOpenFaq(isOpen ? null : index)}
                      className="w-full p-4 text-left font-serif font-bold text-xs sm:text-sm text-[#2C1810] flex items-center justify-between gap-3 hover:text-[#8C533C] transition"
                    >
                      <span>{faq.q}</span>
                      <ChevronDown
                        className={`w-4 h-4 text-[#8C533C] shrink-0 transition-transform ${
                          isOpen ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                    {isOpen && (
                      <div className="px-4 pb-4 pt-1 text-xs text-[#6D4C41] leading-relaxed border-t border-[#ECC3BD]/30">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
