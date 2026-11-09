import React, { useState, useRef } from 'react';
import { BusinessProvider, useBusiness } from './context/BusinessContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { CatalogueSection } from './components/CatalogueSection';
import { CustomOrderSection } from './components/CustomOrderSection';
import { AboutSection } from './components/AboutSection';
import { FacebookSection } from './components/FacebookSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { RequestPriceModal } from './components/RequestPriceModal';
import { WhatsAppConfigModal } from './components/WhatsAppConfigModal';
import { InquiryShortlistDrawer } from './components/InquiryShortlistDrawer';
import { OfflineBanner } from './components/OfflineBanner';
import { Category } from './data/products';

import { ReviewsSection } from './components/ReviewsSection';
import { WriteReviewModal } from './components/WriteReviewModal';

function MainContent() {
  const [activeSection, setActiveSection] = useState('home');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<Category>('All');
  
  const { isCustomOrderModalOpen, closeCustomOrderModal } = useBusiness();

  const handleSearchFocus = () => {
    const catalogueEl = document.getElementById('catalogue');
    if (catalogueEl) {
      catalogueEl.scrollIntoView({ behavior: 'smooth' });
      // Give focus to the catalogue search input
      const input = catalogueEl.querySelector('input');
      if (input) {
        input.focus();
      }
    }
  };

  const handleExploreClick = () => {
    const catalogueEl = document.getElementById('catalogue');
    if (catalogueEl) {
      catalogueEl.scrollIntoView({ behavior: 'smooth' });
      setActiveSection('catalogue');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2] text-[#2C1810] pb-16 lg:pb-0">
      {/* Primary Sticky Navbar */}
      <Navbar
        onSearchClick={handleSearchFocus}
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* 1. Brand Home & Welcome */}
        <Hero onExploreClick={handleExploreClick} />

        {/* 2. Product Catalogue & Categories with Request Price buttons */}
        <CatalogueSection
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />

        {/* 3. Customer Reviews & Ratings Showcase */}
        <ReviewsSection />

        {/* 4. Custom Order Request for Colors, Sizes, Designs */}
        <CustomOrderSection />

        {/* 5. About Us & Craftsmanship & Care Guide */}
        <AboutSection />

        {/* 6. Facebook Page & Community Section */}
        <FacebookSection />

        {/* 7. Contact & Instant WhatsApp Ordering */}
        <ContactSection />
      </main>

      {/* 8. Footer */}
      <Footer />

      {/* Interactive Global Modals and Drawers */}
      <RequestPriceModal />
      <WriteReviewModal />
      <WhatsAppConfigModal />
      <InquiryShortlistDrawer />
      <OfflineBanner />

      {/* Custom Order Modal when triggered via Nav/Fab */}
      {isCustomOrderModalOpen && (
        <CustomOrderSection isModal={true} onClose={closeCustomOrderModal} />
      )}
    </div>
  );
}

export default function App() {
  return (
    <BusinessProvider>
      <MainContent />
    </BusinessProvider>
  );
}
