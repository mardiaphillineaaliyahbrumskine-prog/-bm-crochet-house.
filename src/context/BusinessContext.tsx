import React, { createContext, useContext, useState, useEffect } from 'react';
import { BUSINESS_CONFIG, BusinessConfig, buildWhatsAppLink } from '../data/businessConfig';
import { Product } from '../data/products';
import { INITIAL_REVIEWS, ProductReview } from '../data/reviews';

interface BusinessContextType {
  config: BusinessConfig;
  customWhatsApp: string;
  setCustomWhatsApp: (num: string) => void;
  activeWhatsApp: string;
  isCustomized: boolean;
  resetToDefaultWhatsApp: () => void;
  savedInquiries: Product[];
  toggleSaveInquiry: (product: Product) => void;
  isInquirySaved: (productId: string) => boolean;
  clearInquiries: () => void;
  openRequestModalFor: (product: Product) => void;
  selectedProductForQuote: Product | null;
  closeRequestModal: () => void;
  isCustomOrderModalOpen: boolean;
  openCustomOrderModal: () => void;
  closeCustomOrderModal: () => void;
  isWhatsAppConfigOpen: boolean;
  openWhatsAppConfig: () => void;
  closeWhatsAppConfig: () => void;
  isInquiryDrawerOpen: boolean;
  openInquiryDrawer: () => void;
  closeInquiryDrawer: () => void;

  // Product Reviews
  reviews: ProductReview[];
  addReview: (review: Omit<ProductReview, 'id' | 'date' | 'helpfulCount'>) => void;
  getReviewsForProduct: (productId: string) => ProductReview[];
  getRatingSummary: (productId: string) => { average: number; count: number };
  isReviewModalOpen: boolean;
  reviewProduct: Product | null;
  openReviewModalFor: (product: Product) => void;
  closeReviewModal: () => void;
}

const BusinessContext = createContext<BusinessContextType | undefined>(undefined);

const LOCAL_STORAGE_WHATSAPP_KEY = 'bm_crochet_custom_whatsapp';
const LOCAL_STORAGE_SAVED_ITEMS_KEY = 'bm_crochet_saved_inquiries';
const LOCAL_STORAGE_REVIEWS_KEY = 'bm_crochet_user_reviews';

export const BusinessProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [customWhatsApp, setCustomWhatsAppState] = useState<string>('');
  const [savedInquiries, setSavedInquiries] = useState<Product[]>([]);
  const [selectedProductForQuote, setSelectedProductForQuote] = useState<Product | null>(null);
  const [isCustomOrderModalOpen, setIsCustomOrderModalOpen] = useState(false);
  const [isWhatsAppConfigOpen, setIsWhatsAppConfigOpen] = useState(false);
  const [isInquiryDrawerOpen, setIsInquiryDrawerOpen] = useState(false);

  // Reviews state
  const [reviews, setReviews] = useState<ProductReview[]>(INITIAL_REVIEWS);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [reviewProduct, setReviewProduct] = useState<Product | null>(null);

  useEffect(() => {
    // Load custom phone from localStorage if configured
    try {
      const storedPhone = localStorage.getItem(LOCAL_STORAGE_WHATSAPP_KEY);
      // If the stored phone was the old dummy placeholder, remove it so the new official number 250799315594 is used
      if (storedPhone && storedPhone !== '000000000000') {
        setCustomWhatsAppState(storedPhone);
      } else if (storedPhone === '000000000000') {
        localStorage.removeItem(LOCAL_STORAGE_WHATSAPP_KEY);
      }

      const storedSaved = localStorage.getItem(LOCAL_STORAGE_SAVED_ITEMS_KEY);
      if (storedSaved) {
        setSavedInquiries(JSON.parse(storedSaved));
      }

      const storedReviews = localStorage.getItem(LOCAL_STORAGE_REVIEWS_KEY);
      if (storedReviews) {
        const parsed = JSON.parse(storedReviews);
        if (Array.isArray(parsed)) {
          setReviews([...INITIAL_REVIEWS, ...parsed]);
        }
      }
    } catch {
      // ignore storage errors
    }
  }, []);

  const setCustomWhatsApp = (num: string) => {
    setCustomWhatsAppState(num);
    try {
      if (num.trim()) {
        localStorage.setItem(LOCAL_STORAGE_WHATSAPP_KEY, num.trim());
      } else {
        localStorage.removeItem(LOCAL_STORAGE_WHATSAPP_KEY);
      }
    } catch {
      // ignore
    }
  };

  const resetToDefaultWhatsApp = () => {
    setCustomWhatsAppState('');
    try {
      localStorage.removeItem(LOCAL_STORAGE_WHATSAPP_KEY);
    } catch {
      // ignore
    }
  };

  const activeWhatsApp = customWhatsApp.trim() || BUSINESS_CONFIG.whatsAppNumber;
  const isCustomized = !!customWhatsApp.trim();

  const toggleSaveInquiry = (product: Product) => {
    setSavedInquiries((prev) => {
      const exists = prev.some((p) => p.id === product.id);
      let updated: Product[];
      if (exists) {
        updated = prev.filter((p) => p.id !== product.id);
      } else {
        updated = [...prev, product];
      }
      try {
        localStorage.setItem(LOCAL_STORAGE_SAVED_ITEMS_KEY, JSON.stringify(updated));
      } catch {
        // ignore
      }
      return updated;
    });
  };

  const isInquirySaved = (productId: string) => {
    return savedInquiries.some((p) => p.id === productId);
  };

  const clearInquiries = () => {
    setSavedInquiries([]);
    try {
      localStorage.removeItem(LOCAL_STORAGE_SAVED_ITEMS_KEY);
    } catch {
      // ignore
    }
  };

  const openRequestModalFor = (product: Product) => {
    setSelectedProductForQuote(product);
  };

  const closeRequestModal = () => {
    setSelectedProductForQuote(null);
  };

  // Review functions
  const addReview = (newReviewData: Omit<ProductReview, 'id' | 'date' | 'helpfulCount'>) => {
    const newReview: ProductReview = {
      ...newReviewData,
      id: `rev-${Date.now()}`,
      date: 'Just now',
      helpfulCount: 0,
    };

    setReviews((prev) => {
      const updated = [newReview, ...prev];
      try {
        // save user submitted reviews (those not in initial)
        const customOnly = updated.filter((r) => !INITIAL_REVIEWS.some((init) => init.id === r.id));
        localStorage.setItem(LOCAL_STORAGE_REVIEWS_KEY, JSON.stringify(customOnly));
      } catch {
        // ignore
      }
      return updated;
    });
  };

  const getReviewsForProduct = (productId: string) => {
    return reviews.filter((r) => r.productId === productId);
  };

  const getRatingSummary = (productId: string) => {
    const prodReviews = reviews.filter((r) => r.productId === productId);
    if (prodReviews.length === 0) {
      return { average: 5.0, count: 0 };
    }
    const sum = prodReviews.reduce((acc, curr) => acc + curr.rating, 0);
    const average = Math.round((sum / prodReviews.length) * 10) / 10;
    return { average, count: prodReviews.length };
  };

  const openReviewModalFor = (product: Product) => {
    setReviewProduct(product);
    setIsReviewModalOpen(true);
  };

  const closeReviewModal = () => {
    setIsReviewModalOpen(false);
    setReviewProduct(null);
  };

  return (
    <BusinessContext.Provider
      value={{
        config: BUSINESS_CONFIG,
        customWhatsApp,
        setCustomWhatsApp,
        activeWhatsApp,
        isCustomized,
        resetToDefaultWhatsApp,
        savedInquiries,
        toggleSaveInquiry,
        isInquirySaved,
        clearInquiries,
        selectedProductForQuote,
        openRequestModalFor,
        closeRequestModal,
        isCustomOrderModalOpen,
        openCustomOrderModal: () => setIsCustomOrderModalOpen(true),
        closeCustomOrderModal: () => setIsCustomOrderModalOpen(false),
        isWhatsAppConfigOpen,
        openWhatsAppConfig: () => setIsWhatsAppConfigOpen(true),
        closeWhatsAppConfig: () => setIsWhatsAppConfigOpen(false),
        isInquiryDrawerOpen,
        openInquiryDrawer: () => setIsInquiryDrawerOpen(true),
        closeInquiryDrawer: () => setIsInquiryDrawerOpen(false),

        // Reviews
        reviews,
        addReview,
        getReviewsForProduct,
        getRatingSummary,
        isReviewModalOpen,
        reviewProduct,
        openReviewModalFor,
        closeReviewModal,
      }}
    >
      {children}
    </BusinessContext.Provider>
  );
};

export function useBusiness() {
  const context = useContext(BusinessContext);
  if (!context) {
    throw new Error('useBusiness must be used within a BusinessProvider');
  }
  return context;
}
