// Sample data for the Morrow storefront template. Replace it with your products and cart API.
// Prices, counts and the cart totals on every page are computed from these arrays.

export const shop = {
  name: 'Morrow',
  tagline: 'Handmade stoneware for slow mornings',
  freeShippingOver: 150,
  studio: 'Thrown, glazed and fired in our two-person studio',
};

export type Category = 'Mugs' | 'Bowls' | 'Plates' | 'Vases' | 'Teapots' | 'Jugs' | 'Planters';

export interface Product {
  id: string;
  name: string;
  category: Category;
  glaze: string;
  price: number;
  image: string;
  rating: number;
  reviews: number;
  badge?: 'Bestseller' | 'New' | 'Low stock';
  size: string;
  glazes: { name: string; color: string }[];
}

export const products: Product[] = [
  {
    id: 'dune-mug', name: 'Dune mug', category: 'Mugs', glaze: 'Sand speckle', price: 38, image: '/images/mug.webp',
    rating: 4.9, reviews: 212, badge: 'Bestseller', size: '12 oz · 9 cm tall',
    glazes: [{ name: 'Sand speckle', color: '#D9C7AA' }, { name: 'Charcoal', color: '#3C3A38' }, { name: 'Sage', color: '#A9B79A' }],
  },
  {
    id: 'tide-bowls', name: 'Tide bowls, set of 3', category: 'Bowls', glaze: 'Blue-grey', price: 84, image: '/images/bowls.webp',
    rating: 4.8, reviews: 96, size: '12, 14 and 16 cm',
    glazes: [{ name: 'Blue-grey', color: '#8EA0A6' }, { name: 'Sand speckle', color: '#D9C7AA' }],
  },
  {
    id: 'ember-plate', name: 'Ember dinner plate', category: 'Plates', glaze: 'Rust', price: 42, image: '/images/plate.webp',
    rating: 4.7, reviews: 64, size: '27 cm wide',
    glazes: [{ name: 'Rust', color: '#C0673A' }, { name: 'Sand speckle', color: '#D9C7AA' }],
  },
  {
    id: 'reed-vase', name: 'Reed bud vase', category: 'Vases', glaze: 'Cream', price: 46, image: '/images/vase.webp',
    rating: 5.0, reviews: 38, badge: 'New', size: '24 cm tall',
    glazes: [{ name: 'Cream', color: '#ECE4D6' }],
  },
  {
    id: 'hollow-teapot', name: 'Hollow teapot', category: 'Teapots', glaze: 'Charcoal', price: 128, image: '/images/teapot.webp',
    rating: 4.9, reviews: 41, badge: 'Low stock', size: '900 ml · cane handle',
    glazes: [{ name: 'Charcoal', color: '#3C3A38' }],
  },
  {
    id: 'brook-jug', name: 'Brook jug', category: 'Jugs', glaze: 'Sage', price: 72, image: '/images/jug.webp',
    rating: 4.8, reviews: 57, badge: 'New', size: '1 litre',
    glazes: [{ name: 'Sage', color: '#A9B79A' }, { name: 'Cream', color: '#ECE4D6' }],
  },
  {
    id: 'bloom-planter', name: 'Bloom planter', category: 'Planters', glaze: 'Clay pink', price: 54, image: '/images/planter.webp',
    rating: 4.6, reviews: 29, size: '14 cm · drainage hole',
    glazes: [{ name: 'Clay pink', color: '#D59A86' }, { name: 'Cream', color: '#ECE4D6' }],
  },
];

export const byId = (id: string) => products.find((p) => p.id === id)!;

/** What's in the bag on the cart page (and the count on the bag icon everywhere). */
export const cart = [
  { id: 'dune-mug', glaze: 'Sand speckle', qty: 2 },
  { id: 'tide-bowls', glaze: 'Blue-grey', qty: 1 },
];
export const cartCount = cart.reduce((s, l) => s + l.qty, 0);
export const subtotal = cart.reduce((s, l) => s + byId(l.id).price * l.qty, 0);
export const shipping = subtotal >= shop.freeShippingOver ? 0 : 9;

export const reviews = [
  { name: 'Hannah K.', where: 'Leeds', text: 'The mugs hold heat for ages and the speckles look even better in person. We bought two more.', product: 'dune-mug' },
  { name: 'Marco D.', where: 'Lyon', text: 'Every bowl is a little different, which is exactly why I wanted handmade. Packed like treasure.', product: 'tide-bowls' },
  { name: 'Priya S.', where: 'Toronto', text: 'The teapot pours without a single drip. It lives on the table now, not in a cupboard.', product: 'hollow-teapot' },
];

export const money = (n: number) => `$${n.toFixed(n % 1 ? 2 : 0)}`;
