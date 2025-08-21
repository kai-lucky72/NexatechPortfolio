// Product-specific KB details. Extend freely.
export type ProductKB = { id: string; title: string; details: string };

export const productKB: ProductKB[] = [
  {
    id: 'shoppa',
    title: 'SHOPPA',
    details:
      'SHOPPA is a next-generation e-commerce platform tailored for African markets. It empowers SMEs and local sellers with digital storefronts, logistics integrations, and AI product discovery for buyers. Focus: trust, affordability, and seller enablement.',
  },
  {
    id: 'agri-chain',
    title: 'AGRI-Chain',
    details:
      'AGRI-Chain connects farmers, buyers, and distributors with transparent supply-chain tracking. Goals: fair pricing, real-time market visibility, food security analytics for institutions, and optimized distribution.',
  },
  {
    id: 'skill-link',
    title: 'Skill-Link',
    details:
      'Skill-Link is a marketplace for skilled practical workers, matching verified talent to employers. Emphasis on worker visibility, reputation, and fast, reliable hiring for businesses and households.',
  },
];
