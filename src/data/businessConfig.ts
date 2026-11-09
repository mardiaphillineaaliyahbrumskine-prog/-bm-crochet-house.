/**
 * Business Configuration for B & M Crochet House
 * 
 * Edit this file to customize business details, contact information,
 * and social media handles. All phone numbers and business details
 * currently use clearly marked placeholders as requested.
 */

export interface BusinessConfig {
  name: string;
  tagline: string;
  instituteName: string;
  craftMotto: string;
  shortName: string;
  logoUrl: string;
  makerImageUrl: string;
  heroModelImageUrl: string;
  whatsAppNumber: string; // International format without spaces, e.g. "1234567890"
  whatsAppDisplay: string;
  isWhatsAppPlaceholder: boolean;
  email: string;
  facebookUrl: string;
  facebookHandle: string;
  instagramUrl: string;
  instagramHandle: string;
  studioLocation: string;
  businessHours: {
    weekdays: string;
    saturday: string;
    sunday: string;
  };
  customOrderTurnaround: string;
  shippingInfo: string;
  currencySymbol: string;
  currencyCode: string;
}

export const BUSINESS_CONFIG: BusinessConfig = {
  name: "B & M Crochet House",
  shortName: "B&M Crochet",
  tagline: "Handmade with love, crafted with care.",
  instituteName: "Marbrecal Home Economics Institute",
  craftMotto: "We Craft with Hands",
  logoUrl: "/assets/aistudio/FB_IMG_1766551913118_deea7bea.jpg",
  makerImageUrl: "/assets/aistudio/FB_IMG_1794214761444_f398e24e.jpg",
  heroModelImageUrl: "/assets/aistudio/FB_IMG_1794214772435_461177f7.jpg",
  
  // Official WhatsApp Ordering Number
  whatsAppNumber: "250799315594", 
  whatsAppDisplay: "+250 799 315 594",
  isWhatsAppPlaceholder: false,

  // Official Business Contacts
  email: "mardiaphillineaaliyahbrumskine@gmail.com",
  studioLocation: "Artisan Crochet Studio",
  
  // Social Media Links (No fake placeholder URLs; configured when real URL is provided by owner)
  facebookUrl: "",
  facebookHandle: "B & M Crochet House",
  instagramUrl: "",
  instagramHandle: "@bmcrochethouse",

  businessHours: {
    weekdays: "Monday – Friday: 9:00 AM – 6:00 PM",
    saturday: "Saturday: 10:00 AM – 5:00 PM",
    sunday: "Sunday: Closed (Custom Order Drafting)",
  },

  customOrderTurnaround: "3 to 10 business days depending on design complexity",
  shippingInfo: "Nationwide dispatch & international shipping available on request.",
  currencySymbol: "$",
  currencyCode: "USD",
};

/**
 * Helper to build a direct WhatsApp chat link with an encoded pre-filled message
 */
export function buildWhatsAppLink(message: string, customPhone?: string): string {
  const phone = (customPhone || BUSINESS_CONFIG.whatsAppNumber).replace(/[^0-9]/g, '');
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${phone}?text=${encoded}`;
}
