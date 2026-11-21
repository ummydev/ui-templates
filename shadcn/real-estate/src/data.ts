// Sample data for the Fieldstone real estate template. Replace it with your listings feed (MLS/IDX) and CRM.
// Counts, price ranges, agent stats and the mortgage estimate on every page are computed from these arrays.

export const brand = { name: 'Fieldstone', region: 'Ashford Bay', phone: '(555) 014-2280' };

export type AgentId = 'elena' | 'jonah';
export const agents: Record<AgentId, { name: string; title: string; photo: string; years: number; soldLastYear: number; rating: number; reviews: number; phone: string; areas: string[]; bio: string }> = {
  elena: {
    name: 'Elena Ruiz', title: 'Principal agent', photo: '/images/agent1.webp', years: 12, soldLastYear: 38, rating: 4.9, reviews: 87, phone: '(555) 014-2291',
    areas: ['Northwood', 'Ridgeview', 'Shoreline'],
    bio: 'Elena grew up in Northwood and has sold homes on both sides of the bay for twelve years. She is known for honest pricing advice, calm negotiations and a contact list of every good inspector and builder in town.',
  },
  jonah: {
    name: 'Jonah Reid', title: 'Buyer’s agent', photo: '/images/agent2.webp', years: 6, soldLastYear: 24, rating: 4.8, reviews: 41, phone: '(555) 014-2307',
    areas: ['Old Town', 'Millbrook', 'Southridge'],
    bio: 'Jonah works mostly with first-time buyers and people moving to the bay from the city. He spent five years as an architect before real estate, so he will tell you which walls can go.',
  },
};

export interface Listing {
  id: string;
  title: string;
  address: string;
  area: string;
  price: number;
  beds: number;
  baths: number;
  sqft: number;
  lotAcres?: number;
  year: number;
  type: 'House' | 'Townhouse' | 'Cabin' | 'Condo';
  image: string;
  agent: AgentId;
  status?: 'New' | 'Open house Sat' | 'Price cut';
  map: { x: number; y: number }; // position on the illustrated map, 0–100
}

export const listings: Listing[] = [
  { id: 'larkspur', title: 'Cedar house in the pines', address: '14 Larkspur Lane', area: 'Northwood', price: 1285000, beds: 4, baths: 3, sqft: 2850, lotAcres: 0.42, year: 2019, type: 'House', image: '/images/hero.webp', agent: 'elena', status: 'New', map: { x: 30, y: 22 } },
  { id: 'orchard', title: 'Farmhouse with a wraparound porch', address: '208 Orchard Road', area: 'Millbrook', price: 940000, beds: 4, baths: 3, sqft: 3100, lotAcres: 1.2, year: 2016, type: 'House', image: '/images/h1.webp', agent: 'jonah', status: 'Open house Sat', map: { x: 70, y: 18 } },
  { id: 'wren', title: 'Brick townhouse on a quiet street', address: '31 Wren Street', area: 'Old Town', price: 735000, beds: 3, baths: 2, sqft: 1760, year: 1908, type: 'Townhouse', image: '/images/h2.webp', agent: 'jonah', map: { x: 56, y: 52 } },
  { id: 'fern', title: 'Glass cabin above the creek', address: '9 Fern Hollow', area: 'Ridgeview', price: 615000, beds: 2, baths: 1, sqft: 1050, lotAcres: 2.1, year: 2021, type: 'Cabin', image: '/images/h3.webp', agent: 'elena', status: 'Price cut', map: { x: 14, y: 46 } },
  { id: 'dune', title: 'Blue cottage by the dunes', address: '5 Dune Path', area: 'Shoreline', price: 1090000, beds: 3, baths: 2, sqft: 1640, lotAcres: 0.18, year: 1962, type: 'House', image: '/images/h4.webp', agent: 'elena', map: { x: 26, y: 80 } },
  { id: 'mesa', title: 'Mid-century house with a stone wall', address: '77 Mesa Court', area: 'Southridge', price: 860000, beds: 3, baths: 2, sqft: 1980, lotAcres: 0.3, year: 1958, type: 'House', image: '/images/h5.webp', agent: 'jonah', map: { x: 80, y: 74 } },
  { id: 'harbor', title: 'Corner condo with two balconies', address: '120 Harbor Row, 3B', area: 'Old Town', price: 485000, beds: 2, baths: 2, sqft: 1020, year: 2015, type: 'Condo', image: '/images/h6.webp', agent: 'jonah', status: 'New', map: { x: 48, y: 64 } },
];

export const byId = (id: string) => listings.find((l) => l.id === id)!;
export const areas = Array.from(new Set(listings.map((l) => l.area)));
export const priceRange = { min: Math.min(...listings.map((l) => l.price)), max: Math.max(...listings.map((l) => l.price)) };

export const reviews = [
  { name: 'Dana & Felix M.', text: 'Elena told us what the cabin was really worth, not what we wanted to hear. We sold in nine days, above asking.', agent: 'elena' as AgentId, when: 'Sold in Ridgeview, 2025' },
  { name: 'Ruth A.', text: 'Calm, prepared and always one step ahead of the other side. She found our inspector, our plumber and our dog-walker.', agent: 'elena' as AgentId, when: 'Bought in Northwood, 2025' },
  { name: 'Sam & Theo K.', text: 'Jonah walked every room with a tape measure and an opinion. We bought the townhouse he said had good bones, and he was right.', agent: 'jonah' as AgentId, when: 'Bought in Old Town, 2025' },
];

/** Monthly payment estimate: principal and interest, plus tax and insurance. */
export function mortgage(price: number, downPct = 20, rate = 6.5, years = 30, taxRate = 1.1, insurance = 150) {
  const loan = price * (1 - downPct / 100);
  const r = rate / 100 / 12;
  const n = years * 12;
  const pi = (loan * r) / (1 - Math.pow(1 + r, -n));
  const tax = (price * taxRate) / 100 / 12;
  return { down: price - loan, loan, pi, tax, insurance, total: pi + tax + insurance, rate, years, downPct };
}

export const usd = (n: number) => `$${Math.round(n).toLocaleString('en-US')}`;
export const short = (n: number) => (n >= 1_000_000 ? `$${Math.round(n / 10_000) / 100}M` : `$${Math.round(n / 1000)}k`);
