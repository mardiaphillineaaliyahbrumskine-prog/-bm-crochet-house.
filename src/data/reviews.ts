/**
 * Product Reviews Data & Types for B & M Crochet House
 */

export interface ProductReview {
  id: string;
  productId: string;
  author: string;
  location: string;
  rating: number; // 1 to 5
  title: string;
  comment: string;
  date: string;
  verifiedPurchase: boolean;
  helpfulCount: number;
}

export const INITIAL_REVIEWS: ProductReview[] = [
  {
    id: 'rev-01',
    productId: 'gown-blush-mermaid',
    author: 'Aline M.',
    location: 'Kigali, Rwanda',
    rating: 5,
    title: 'A true runway-grade masterpiece!',
    comment: 'I commissioned this blush mermaid gown for a luxury awards gala. The ruffled neckline and the intricate white snowflake jacquard stitch turned every single head. The fit was completely customized to my waist and hips. Outstanding artistry by B & M Crochet House!',
    date: 'February 2026',
    verifiedPurchase: true,
    helpfulCount: 14,
  },
  {
    id: 'rev-02',
    productId: 'gown-waterfall-fringe',
    author: 'Clarisse K.',
    location: 'Nairobi, Kenya',
    rating: 5,
    title: 'The 3D flowers and fringe flow like water',
    comment: 'The craftsmanship on the floral bodice is unbelievable in person. The hip fringe sways with each step and the corset back let me tighten it to my exact comfort. Truly wearable couture.',
    date: 'January 2026',
    verifiedPurchase: true,
    helpfulCount: 9,
  },
  {
    id: 'rev-03',
    productId: 'sweater-sunset-mesh',
    author: 'David & Sharon',
    location: 'Accra, Ghana',
    rating: 5,
    title: 'Vibrant colors and perfect tension',
    comment: 'The vertical colorblocking in sunset orange, yellow, and lilac is gorgeous. Stitches are neat, breathable, and warm. Highly recommend ordering custom colorways!',
    date: 'March 2026',
    verifiedPurchase: true,
    helpfulCount: 7,
  },
  {
    id: 'rev-04',
    productId: 'accessory-emerald-pearl-cap',
    author: 'Jessica B.',
    location: 'Monrovia, Liberia',
    rating: 5,
    title: 'Exquisite pearl monogram work',
    comment: 'The pearl-encrusted cap with the crystal initial is pure luxury. Sturdy cap structure with zero sagging, and the matching emerald bag completes the whole outfit.',
    date: 'April 2026',
    verifiedPurchase: true,
    helpfulCount: 11,
  },
  {
    id: 'rev-05',
    productId: 'baby-mocha-cream-dress-set',
    author: 'Grace U.',
    location: 'Kigali, Rwanda',
    rating: 5,
    title: 'Precious heirloom for our christening',
    comment: 'The mocha and cream scalloped dress and bonnet were so gentle on my 4-month-old daughter. The yarn is ultra-soft and hypoallergenic. It will be passed down in our family.',
    date: 'March 2026',
    verifiedPurchase: true,
    helpfulCount: 8,
  },
  {
    id: 'rev-06',
    productId: 'bag-scarlet-circle-handle',
    author: 'Tatiana R.',
    location: 'London, UK',
    rating: 5,
    title: 'Stands upright on its own, beautiful stitch',
    comment: 'The thick ring handle is so comfortable to hold. The red is rich and vibrant, and the bag holds all my daily essentials without losing its circular silhouette.',
    date: 'February 2026',
    verifiedPurchase: true,
    helpfulCount: 6,
  },
  {
    id: 'rev-07',
    productId: 'dress-cerulean-ribbed',
    author: 'Naomi T.',
    location: 'Lagos, Nigeria',
    rating: 5,
    title: 'Sculpts the body like a glove',
    comment: 'The ribbed elasticity is magic! The 3D crimson rosette strap is such a unique fashion statement and the back corset lattice makes it completely adjustable.',
    date: 'April 2026',
    verifiedPurchase: true,
    helpfulCount: 12,
  },
  {
    id: 'rev-08',
    productId: 'dress-sunset-chevron',
    author: 'Marie-Claire V.',
    location: 'Gisenyi, Rwanda',
    rating: 5,
    title: 'The ultimate vacation sundress',
    comment: 'Wore this on Lake Kivu holiday! Breezy, lightweight cotton, vibrant ripple pattern, and the halter tie holds securely. 10/10 craftsmanship.',
    date: 'January 2026',
    verifiedPurchase: true,
    helpfulCount: 5,
  },
  {
    id: 'rev-09',
    productId: 'bag-tangerine-cream-satchel',
    author: 'Kezia O.',
    location: 'Freetown, Sierra Leone',
    rating: 5,
    title: 'The gold twist-lock hardware is top notch',
    comment: 'Clean stripes, solid hand feel, and the gold latch adds such an elegant touch. Ordered directly over WhatsApp with quick replies.',
    date: 'March 2026',
    verifiedPurchase: true,
    helpfulCount: 4,
  },
  {
    id: 'rev-10',
    productId: 'hat-rosette-beanie',
    author: 'Sonia D.',
    location: 'Paris, France',
    rating: 5,
    title: 'Obsessed with the 3D rose ear buns',
    comment: 'So warm and the dual sculptural roses are so charming! Everyone asks where I got it. Shipped securely and packaged with love.',
    date: 'February 2026',
    verifiedPurchase: true,
    helpfulCount: 6,
  },
];
