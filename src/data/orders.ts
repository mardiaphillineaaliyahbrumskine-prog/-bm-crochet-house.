export type OrderProgressStep = 
  | 'confirmed' 
  | 'yarn_sourced' 
  | 'crafting' 
  | 'finishing' 
  | 'ready_dispatched';

export interface CrochetOrder {
  orderId: string;
  clientName: string;
  itemName: string;
  category: string;
  currentStep: OrderProgressStep;
  progressPercent: number; // 0 - 100
  statusTitle: string;
  statusDescription: string;
  orderDate: string;
  estimatedCompletion: string;
  yarnType: string;
  customColors: string[];
  measurementsOrSize: string;
  notes?: string;
  artisanNote?: string;
}

export const ORDER_STEPS: { step: OrderProgressStep; label: string; description: string }[] = [
  { 
    step: 'confirmed', 
    label: 'Order Confirmed', 
    description: 'Specs, colors & measurements approved' 
  },
  { 
    step: 'yarn_sourced', 
    label: 'Yarn Sourced & Gauge Swatch', 
    description: 'Fibers prepared & tension swatch tested' 
  },
  { 
    step: 'crafting', 
    label: 'Hand-Crochet in Progress', 
    description: 'Artisan row-by-row hook stitching' 
  },
  { 
    step: 'finishing', 
    label: 'Blocking & Finishing', 
    description: 'Wet-blocking, seam locks & inspection' 
  },
  { 
    step: 'ready_dispatched', 
    label: 'Ready / Dispatched', 
    description: 'Care packaging & WhatsApp dispatch' 
  },
];

export const INITIAL_ORDERS: CrochetOrder[] = [
  {
    orderId: 'BM-7821',
    clientName: 'Sarah K.',
    itemName: 'Blush Snowflake Couture Evening Gown',
    category: 'Wearables & Dresses',
    currentStep: 'crafting',
    progressPercent: 70,
    statusTitle: 'Hand-Crafting Torso & Motif Rows',
    statusDescription: 'The lavish off-shoulder ruffle neckline is complete. Artisan is currently crocheting the snowflake jacquard torso taper using organic milk cotton.',
    orderDate: 'Nov 03, 2026',
    estimatedCompletion: 'In 3-4 business days',
    yarnType: '100% Breathable Milk Cotton',
    customColors: ['Warm Cream', 'Blush Pink', 'Rose Petal'],
    measurementsOrSize: 'Bespoke Tailored: Bust 36" • Waist 28" • Length 58"',
    artisanNote: 'Natural drape and snowflake symmetry looking exquisite. Moving into the mermaid flare hem next.',
  },
  {
    orderId: 'BM-6490',
    clientName: 'Amina T.',
    itemName: 'Sunset Chevron Halter Sundress',
    category: 'Wearables & Dresses',
    currentStep: 'ready_dispatched',
    progressPercent: 100,
    statusTitle: 'Packaged & Ready for Dispatch',
    statusDescription: 'Final wet-blocking complete. Hand-wrapped in tissue paper with our signature crochet care guide and dispatch label.',
    orderDate: 'Oct 28, 2026',
    estimatedCompletion: 'Ready for Pickup / Delivery Today',
    yarnType: 'Mercerized Bamboo-Cotton Blend',
    customColors: ['Sunset Red', 'Golden Yellow', 'Chocolate Brown', 'Sky Blue'],
    measurementsOrSize: 'Standard Small (Length 34")',
    artisanNote: 'Colors are vibrant and tension holds beautifully.',
  },
  {
    orderId: 'BM-9042',
    clientName: 'Claire M.',
    itemName: 'Heirloom Baby Blanket & Bonnet Set',
    category: 'Baby Blankets & Sets',
    currentStep: 'yarn_sourced',
    progressPercent: 35,
    statusTitle: 'Yarn Sourced & Swatch Tension Verified',
    statusDescription: 'Hypoallergenic OEKO-TEX certified baby yarn sourced. Gauge swatch completed and scallop edge border count mapped out.',
    orderDate: 'Nov 06, 2026',
    estimatedCompletion: 'In 6 business days',
    yarnType: 'Hypoallergenic Baby Cotton (OEKO-TEX Certified)',
    customColors: ['Warm Cream', 'Soft Sage'],
    measurementsOrSize: 'Nursery Crib Size: 32" x 40"',
    artisanNote: 'Yarn feels cloud-soft and gentle for newborn sensitive skin.',
  },
  {
    orderId: 'BM-5120',
    clientName: 'Diane U.',
    itemName: '2-Piece Ruffled Festival Shorts & Top Set',
    category: 'Wearables & Sets',
    currentStep: 'finishing',
    progressPercent: 90,
    statusTitle: 'Wet-Blocking & Seam Reinforcements',
    statusDescription: 'Granny square joinery and ruffle borders finished. Undergoing gentle steam blocking to set structural drape.',
    orderDate: 'Nov 01, 2026',
    estimatedCompletion: 'Tomorrow afternoon',
    yarnType: 'Chunky Cotton Blend',
    customColors: ['Sunflower Yellow', 'Crimson Red', 'Chocolate Brown', 'White'],
    measurementsOrSize: 'Size Medium (Waist 30" with drawstring)',
    artisanNote: 'Tension is firm and comfortable. Final inspection complete.',
  },
];
