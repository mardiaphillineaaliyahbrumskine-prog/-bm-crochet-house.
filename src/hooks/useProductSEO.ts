import { useEffect } from 'react';
import { Product } from '../data/products';
import { updateProductMeta } from '../utils/seo';

/**
 * Hook to synchronize Open Graph, Twitter Card meta tags, canonical link,
 * and Schema.org Product structured data whenever a product is active or viewed.
 */
export function useProductSEO(product: Product | null) {
  useEffect(() => {
    updateProductMeta(product);

    return () => {
      // If modal or product view closes, restore default brand metadata
      updateProductMeta(null);
    };
  }, [product]);
}
