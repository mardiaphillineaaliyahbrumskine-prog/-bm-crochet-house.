import { Product } from '../data/products';
import { BUSINESS_CONFIG } from '../data/businessConfig';

const DEFAULT_TITLE = 'B & M Crochet House | Handmade with love, crafted with care';
const DEFAULT_DESC = 'Artisanal slow-fashion crochet studio in Rwanda. Custom wearables, elegant evening gowns, heirloom nursery blankets, and textured everyday bags handcrafted from natural fibers.';
const DEFAULT_IMAGE = '/assets/aistudio/FB_IMG_1794214772435_461177f7.jpg';

function setMetaTag(selector: string, attrName: string, attrValue: string, content: string) {
  let element = document.querySelector(selector);
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attrName, attrValue);
    document.head.appendChild(element);
  }
  element.setAttribute('content', content);
}

function removeElement(selector: string) {
  const el = document.querySelector(selector);
  if (el) {
    el.remove();
  }
}

/**
 * Dynamically updates document title, Open Graph, Twitter Card meta tags,
 * canonical link, and Schema.org Product structured data (JSON-LD)
 * for a specific product.
 */
export function updateProductMeta(product: Product | null) {
  if (typeof window === 'undefined' || !document || !document.head) return;

  const origin = window.location.origin;

  if (!product) {
    // Restore default brand metadata
    document.title = DEFAULT_TITLE;
    setMetaTag('meta[name="description"]', 'name', 'description', DEFAULT_DESC);

    // OpenGraph
    setMetaTag('meta[property="og:title"]', 'property', 'og:title', DEFAULT_TITLE);
    setMetaTag('meta[property="og:description"]', 'property', 'og:description', DEFAULT_DESC);
    setMetaTag('meta[property="og:type"]', 'property', 'og:type', 'website');
    setMetaTag('meta[property="og:image"]', 'property', 'og:image', `${origin}${DEFAULT_IMAGE}`);
    setMetaTag('meta[property="og:url"]', 'property', 'og:url', `${origin}/`);
    setMetaTag('meta[property="og:site_name"]', 'property', 'og:site_name', BUSINESS_CONFIG.name);

    // Twitter
    setMetaTag('meta[name="twitter:card"]', 'name', 'twitter:card', 'summary_large_image');
    setMetaTag('meta[name="twitter:title"]', 'name', 'twitter:title', DEFAULT_TITLE);
    setMetaTag('meta[name="twitter:description"]', 'name', 'twitter:description', DEFAULT_DESC);
    setMetaTag('meta[name="twitter:image"]', 'name', 'twitter:image', `${origin}${DEFAULT_IMAGE}`);

    // Remove dynamic product JSON-LD
    removeElement('#product-schema-jsonld');
    return;
  }

  // Build specific Product Meta
  const productTitle = `${product.name} | B & M Crochet House`;
  const productDescription = `${product.subtitle} - ${product.shortDescription} Handcrafted slow-fashion crochet in customizable colors & measurements.`;
  const productUrl = `${origin}/#product-${product.id}`;
  const absoluteImageUrl = product.imageUrl.startsWith('http')
    ? product.imageUrl
    : `${origin}${product.imageUrl}`;

  // 1. Browser Title & Description
  document.title = productTitle;
  setMetaTag('meta[name="description"]', 'name', 'description', productDescription);

  // 2. OpenGraph Product Meta Tags
  setMetaTag('meta[property="og:title"]', 'property', 'og:title', productTitle);
  setMetaTag('meta[property="og:description"]', 'property', 'og:description', productDescription);
  setMetaTag('meta[property="og:type"]', 'property', 'og:type', 'product');
  setMetaTag('meta[property="og:url"]', 'property', 'og:url', productUrl);
  setMetaTag('meta[property="og:image"]', 'property', 'og:image', absoluteImageUrl);
  setMetaTag('meta[property="og:image:alt"]', 'property', 'og:image:alt', `Handmade ${product.name} by B & M Crochet House`);
  setMetaTag('meta[property="og:site_name"]', 'property', 'og:site_name', 'B & M Crochet House');

  // Additional product-specific OG tags
  setMetaTag('meta[property="product:price:currency"]', 'property', 'product:price:currency', 'USD');
  setMetaTag('meta[property="product:price:amount"]', 'property', 'product:price:amount', '0.00');
  setMetaTag('meta[property="product:availability"]', 'property', 'product:availability', 'in stock');
  setMetaTag('meta[property="product:category"]', 'property', 'product:category', product.category);
  setMetaTag('meta[property="product:retailer_item_id"]', 'property', 'product:retailer_item_id', product.id);

  // 3. Twitter / X Card Meta Tags
  setMetaTag('meta[name="twitter:card"]', 'name', 'twitter:card', 'summary_large_image');
  setMetaTag('meta[name="twitter:title"]', 'name', 'twitter:title', productTitle);
  setMetaTag('meta[name="twitter:description"]', 'name', 'twitter:description', productDescription);
  setMetaTag('meta[name="twitter:image"]', 'name', 'twitter:image', absoluteImageUrl);
  setMetaTag('meta[name="twitter:image:alt"]', 'name', 'twitter:image:alt', `Handmade ${product.name}`);

  // 4. Canonical link
  let canonicalLink = document.querySelector('link[rel="canonical"]');
  if (!canonicalLink) {
    canonicalLink = document.createElement('link');
    canonicalLink.setAttribute('rel', 'canonical');
    document.head.appendChild(canonicalLink);
  }
  canonicalLink.setAttribute('href', productUrl);

  // 5. Schema.org Product Structured Data (JSON-LD)
  let scriptTag = document.querySelector('#product-schema-jsonld') as HTMLScriptElement | null;
  if (!scriptTag) {
    scriptTag = document.createElement('script');
    scriptTag.id = 'product-schema-jsonld';
    scriptTag.type = 'application/ld+json';
    document.head.appendChild(scriptTag);
  }

  const allImages = [absoluteImageUrl];
  if (product.galleryImages) {
    product.galleryImages.forEach((img) => {
      const fullImg = img.startsWith('http') ? img : `${origin}${img}`;
      if (!allImages.includes(fullImg)) {
        allImages.push(fullImg);
      }
    });
  }

  const productSchema = {
    '@context': 'https://schema.org/',
    '@type': 'Product',
    name: product.name,
    image: allImages,
    description: product.fullDescription,
    sku: `BM-${product.id}`,
    category: product.category,
    material: product.materials,
    color: product.sampleColors.map((c) => c.name).join(', '),
    brand: {
      '@type': 'Brand',
      name: 'B & M Crochet House',
      logo: `${origin}${BUSINESS_CONFIG.logoUrl}`,
    },
    offers: {
      '@type': 'Offer',
      url: productUrl,
      priceCurrency: 'USD',
      price: '0.00',
      priceValidUntil: '2027-12-31',
      itemCondition: 'https://schema.org/NewCondition',
      availability: 'https://schema.org/InStock',
      seller: {
        '@type': 'Organization',
        name: 'B & M Crochet House',
        telephone: `+${BUSINESS_CONFIG.whatsAppNumber}`,
      },
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '5.0',
      bestRating: '5',
      worstRating: '1',
      ratingCount: '4',
    },
  };

  scriptTag.textContent = JSON.stringify(productSchema, null, 2);
}
