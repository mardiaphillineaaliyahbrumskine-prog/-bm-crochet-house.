import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Filter, 
  Sparkles, 
  Tag, 
  X, 
  SlidersHorizontal, 
  ArrowUpDown, 
  Info 
} from 'lucide-react';
import { PRODUCTS, CATEGORIES, Category, Product } from '../data/products';
import { ProductCard } from './ProductCard';
import { ProductQuickViewModal } from './ProductQuickViewModal';
import { useBusiness } from '../context/BusinessContext';

interface CatalogueSectionProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: Category;
  setSelectedCategory: (cat: Category) => void;
}

export const CatalogueSection: React.FC<CatalogueSectionProps> = ({
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
}) => {
  const [activeSort, setActiveSort] = useState<'featured' | 'name' | 'craftTime'>('featured');
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  React.useEffect(() => {
    const handleHashCheck = () => {
      if (typeof window === 'undefined') return;
      const hash = window.location.hash;
      if (hash && hash.startsWith('#product-')) {
        const prodId = hash.replace('#product-', '');
        const matched = PRODUCTS.find((p) => p.id === prodId);
        if (matched) {
          setQuickViewProduct(matched);
        }
      }
    };

    handleHashCheck();
    window.addEventListener('hashchange', handleHashCheck);
    return () => window.removeEventListener('hashchange', handleHashCheck);
  }, []);

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((item) => {
      // Category check
      const matchesCategory =
        selectedCategory === 'All' || item.category === selectedCategory;

      // Search check
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !query ||
        item.name.toLowerCase().includes(query) ||
        item.subtitle.toLowerCase().includes(query) ||
        item.shortDescription.toLowerCase().includes(query) ||
        item.materials.toLowerCase().includes(query) ||
        item.tags.some((t) => t.toLowerCase().includes(query));

      return matchesCategory && matchesSearch;
    }).sort((a, b) => {
      if (activeSort === 'name') {
        return a.name.localeCompare(b.name);
      }
      if (activeSort === 'featured') {
        return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
      }
      return 0;
    });
  }, [selectedCategory, searchQuery, activeSort]);

  return (
    <section id="catalogue" className="py-12 sm:py-16 px-4 sm:px-6 max-w-7xl mx-auto scroll-mt-20">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4 border-b border-[#ECC3BD]/50 pb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAF5EE] border border-[#ECC3BD] text-[11px] font-semibold text-[#8C533C] mb-2">
            <Tag className="w-3.5 h-3.5 text-[#D4AF37]" />
            Bespoke Product Showcase
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-[#2C1810]">
            Boutique Catalogue
          </h2>
          <p className="text-xs sm:text-sm text-[#6D4C41] mt-1">
            Browse our authentic handcrafted crochet collection. Tap <strong>"Request Price"</strong> on any creation to customize colors, measurements, and get an immediate quote.
          </p>
        </div>

        {/* Search bar inside header for instant accessibility */}
        <div className="w-full md:w-72 relative">
          <Search className="w-4 h-4 text-[#8C533C] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search tops, bags, baby blankets..."
            className="w-full pl-10 pr-9 py-2.5 rounded-2xl bg-white border border-[#ECC3BD] text-xs sm:text-sm text-[#2C1810] focus:ring-2 focus:ring-[#4A2E2B] focus:border-transparent outline-none transition"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#4A2E2B]"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Category Pills (Horizontal Scroll on Mobile) */}
      <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-6 no-scrollbar">
        {CATEGORIES.map((cat) => {
          const isSelected = selectedCategory === cat;
          const count =
            cat === 'All'
              ? PRODUCTS.length
              : PRODUCTS.filter((p) => p.category === cat).length;

          return (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-2xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all flex items-center gap-2 shrink-0 ${
                isSelected
                  ? 'bg-[#4A2E2B] text-[#FAF7F2] shadow-sm'
                  : 'bg-white hover:bg-[#ECC3BD]/20 text-[#4E342E] border border-[#ECC3BD]'
              }`}
            >
              <span>{cat}</span>
              <span
                className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                  isSelected
                    ? 'bg-[#D4AF37] text-[#2C1810]'
                    : 'bg-[#FAF5EE] text-[#8C533C]'
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Filter Stats & Sorting bar */}
      <div className="flex items-center justify-between text-xs text-[#6D4C41] mb-6 px-1">
        <div>
          Showing <span className="font-bold text-[#2C1810]">{filteredProducts.length}</span> creations
          {searchQuery && (
            <span> for &quot;<strong className="text-[#8C533C]">{searchQuery}</strong>&quot;</span>
          )}
        </div>

        <div className="flex items-center gap-2">
          <span className="hidden sm:inline">Sort:</span>
          <select
            value={activeSort}
            onChange={(e) => setActiveSort(e.target.value as any)}
            className="px-2.5 py-1.5 rounded-xl border border-[#ECC3BD] bg-white text-xs text-[#4E342E] outline-none"
          >
            <option value="featured">Featured First</option>
            <option value="name">Alphabetical</option>
          </select>
        </div>
      </div>

      {/* Product Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onQuickView={(p) => setQuickViewProduct(p)}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-white rounded-3xl border border-[#ECC3BD]/60 p-8 space-y-4">
          <div className="w-16 h-16 rounded-full bg-[#ECC3BD]/25 text-[#8C533C] flex items-center justify-center mx-auto">
            <Search className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-serif font-bold text-[#2C1810]">
            No matching crochet creations found
          </h3>
          <p className="text-xs sm:text-sm text-[#6D4C41] max-w-sm mx-auto">
            We don&apos;t have a ready sample matching &quot;{searchQuery}&quot;, but we can custom crochet any design!
          </p>
          <div className="pt-2 flex flex-col sm:flex-row gap-2 justify-center">
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
              }}
              className="px-4 py-2 bg-[#FAF5EE] text-[#4A2E2B] border border-[#ECC3BD] rounded-xl text-xs font-semibold"
            >
              Reset Filters
            </button>
          </div>
        </div>
      )}

      {/* Quick View Modal */}
      <ProductQuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
      />
    </section>
  );
};
