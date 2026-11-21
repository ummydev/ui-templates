// Sample data for the Vantage analytics and admin template: an online outdoor-gear store, last 30 days.
// Every KPI, share, funnel step and order total on screen is computed from these arrays.

export const store = { name: 'Kestrel Outdoor', plan: 'Store admin', period: 'Oct 23 – Nov 21', previous: 'Sep 23 – Oct 22' };
export const me = { name: 'Noor Haddad', initials: 'NH', role: 'Head of growth' };

// 30 days of traffic. A weekly rhythm (weekends busier), a gentle upward trend and a small fixed wobble.
const wobble = [3, -2, 5, -4, 1, 6, -3, 2, -5, 4, 0, -1, 3, -6, 2, 5, -2, 1, -4, 3, 6, -3, 0, 2, -1, 4, -2, 5, 1, 3];
export const days = Array.from({ length: 30 }, (_, i) => {
  const date = new Date(Date.UTC(2026, 9, 23 + i));
  const weekend = [0, 6].includes(date.getUTCDay());
  const visitors = Math.round(3900 + i * 38 + (weekend ? 900 : 0) + wobble[i] * 70);
  const orders = Math.round(visitors * (0.026 + (weekend ? 0.004 : 0) + wobble[(i + 7) % 30] * 0.0004));
  const revenue = Math.round(orders * (96 + wobble[(i + 3) % 30] * 2.5));
  return { label: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', timeZone: 'UTC' }), visitors, orders, revenue };
});

const sum = (k: 'visitors' | 'orders' | 'revenue') => days.reduce((s, d) => s + d[k], 0);
export const totals = { visitors: sum('visitors'), orders: sum('orders'), revenue: sum('revenue') };
export const conversion = totals.orders / totals.visitors;
export const aov = totals.revenue / totals.orders;

/** The previous 30 days, for the deltas. */
export const previous = { visitors: 121400, orders: 3180, revenue: 296800 };
export const prevConversion = previous.orders / previous.visitors;
export const prevAov = previous.revenue / previous.orders;
export const change = (now: number, before: number) => (now - before) / before;

// Where visitors came from: shares of the 30-day total (the last channel takes the rounding remainder).
const channelShares = [
  { name: 'Organic search', share: 0.38, color: 'var(--chart-1)' },
  { name: 'Direct', share: 0.21, color: 'var(--chart-2)' },
  { name: 'Social', share: 0.16, color: 'var(--chart-3)' },
  { name: 'Email', share: 0.11, color: 'var(--chart-4)' },
  { name: 'Referral', share: 0.08, color: 'var(--chart-5)' },
  { name: 'Paid search', share: 0.06, color: 'oklch(0.6 0.08 260)' },
];
export const channels = channelShares.map((c, i, all) => {
  const before = all.slice(0, i).reduce((s, x) => s + Math.round(totals.visitors * x.share), 0);
  const visitors = i === all.length - 1 ? totals.visitors - before : Math.round(totals.visitors * c.share);
  return { ...c, visitors };
});

export const topPages = [
  { path: '/', title: 'Home', views: 61240, avg: '0:48', bounce: 0.34 },
  { path: '/collections/tents', title: 'Tents', views: 28410, avg: '1:52', bounce: 0.29 },
  { path: '/products/ridgeline-2p-tent', title: 'Ridgeline 2P tent', views: 17960, avg: '2:41', bounce: 0.22 },
  { path: '/collections/jackets', title: 'Jackets', views: 15320, avg: '1:37', bounce: 0.31 },
  { path: '/journal/winter-camping-list', title: 'Winter camping list', views: 12880, avg: '4:05', bounce: 0.46 },
  { path: '/products/alder-down-jacket', title: 'Alder down jacket', views: 11040, avg: '2:18', bounce: 0.25 },
];

export const countries = [
  { name: 'United States', code: 'US', share: 0.46 },
  { name: 'Canada', code: 'CA', share: 0.17 },
  { name: 'United Kingdom', code: 'GB', share: 0.12 },
  { name: 'Germany', code: 'DE', share: 0.09 },
  { name: 'Australia', code: 'AU', share: 0.07 },
  { name: 'Other', code: '··', share: 0.09 },
];

export const live = { now: 42, pages: [{ path: '/products/ridgeline-2p-tent', n: 9 }, { path: '/collections/jackets', n: 7 }, { path: '/', n: 6 }] };

// Orders (the latest 12 of the period). Line items add up to each order's subtotal.
export type Status = 'Paid' | 'Fulfilled' | 'Pending' | 'Refunded';
export interface Order {
  id: string;
  customer: string;
  email: string;
  city: string;
  channel: string;
  date: string;
  status: Status;
  items: { name: string; variant: string; qty: number; price: number }[];
  shipping: number;
  selected?: boolean;
}

export const orders: Order[] = [
  { id: '#10492', customer: 'Maya Okafor', email: 'maya.okafor@example.com', city: 'Portland, OR', channel: 'Organic search', date: 'Nov 21, 10:42', status: 'Paid', shipping: 0, selected: true,
    items: [{ name: 'Ridgeline 2P tent', variant: 'Moss', qty: 1, price: 389 }, { name: 'Ember camp stove', variant: 'Steel', qty: 1, price: 79 }, { name: 'Trail mug', variant: 'Graphite', qty: 2, price: 18 }] },
  { id: '#10491', customer: 'Leo Brandt', email: 'leo.brandt@example.com', city: 'Denver, CO', channel: 'Email', date: 'Nov 21, 09:58', status: 'Pending', shipping: 9, items: [{ name: 'Wool beanie', variant: 'Rust', qty: 2, price: 32 }] },
  { id: '#10490', customer: 'Aiko Mori', email: 'aiko.mori@example.com', city: 'Vancouver, BC', channel: 'Social', date: 'Nov 21, 09:15', status: 'Paid', shipping: 0, items: [{ name: 'Alder down jacket', variant: 'Black, M', qty: 1, price: 249 }] },
  { id: '#10489', customer: 'Samuel Reyes', email: 'samuel.reyes@example.com', city: 'Austin, TX', channel: 'Direct', date: 'Nov 20, 22:31', status: 'Fulfilled', shipping: 0, items: [{ name: 'Cirrus sleeping bag', variant: 'Long', qty: 1, price: 219 }, { name: 'Trail mug', variant: 'Sand', qty: 1, price: 18 }] },
  { id: '#10488', customer: 'Hannah Weiss', email: 'hannah.weiss@example.com', city: 'Berlin, DE', channel: 'Organic search', date: 'Nov 20, 19:04', status: 'Fulfilled', shipping: 14, items: [{ name: 'Headlamp 400', variant: 'Orange', qty: 1, price: 45 }] },
  { id: '#10487', customer: 'Owen Clarke', email: 'owen.clarke@example.com', city: 'Leeds, UK', channel: 'Referral', date: 'Nov 20, 16:47', status: 'Refunded', shipping: 0, items: [{ name: 'Alder down jacket', variant: 'Navy, L', qty: 1, price: 249 }] },
  { id: '#10486', customer: 'Priya Nair', email: 'priya.nair@example.com', city: 'Seattle, WA', channel: 'Paid search', date: 'Nov 20, 13:22', status: 'Fulfilled', shipping: 0, items: [{ name: 'Ridgeline 2P tent', variant: 'Sand', qty: 1, price: 389 }] },
  { id: '#10485', customer: 'Tom Fischer', email: 'tom.fischer@example.com', city: 'Munich, DE', channel: 'Email', date: 'Nov 20, 11:09', status: 'Fulfilled', shipping: 14, items: [{ name: 'Trekking poles', variant: 'Carbon', qty: 1, price: 119 }] },
  { id: '#10484', customer: 'Grace Lin', email: 'grace.lin@example.com', city: 'Toronto, ON', channel: 'Social', date: 'Nov 19, 21:55', status: 'Fulfilled', shipping: 0, items: [{ name: 'Cirrus sleeping bag', variant: 'Regular', qty: 1, price: 219 }, { name: 'Wool beanie', variant: 'Moss', qty: 1, price: 32 }] },
  { id: '#10483', customer: 'Diego Santos', email: 'diego.santos@example.com', city: 'Miami, FL', channel: 'Direct', date: 'Nov 19, 18:12', status: 'Fulfilled', shipping: 9, items: [{ name: 'Dry bag 20L', variant: 'Yellow', qty: 2, price: 29 }] },
];

export const subtotal = (o: Order) => o.items.reduce((s, i) => s + i.qty * i.price, 0);
export const taxRate = 0.08;
export const tax = (o: Order) => Math.round(subtotal(o) * taxRate * 100) / 100;
export const orderTotal = (o: Order) => subtotal(o) + o.shipping + tax(o);

/** All orders in the period by status (the table shows the latest 10). */
export const statusCounts = (() => {
  const refunded = 41;
  const pending = 63;
  const paid = 288;
  return { All: totals.orders, Paid: paid, Pending: pending, Fulfilled: totals.orders - paid - pending - refunded, Refunded: refunded };
})();

// Funnel: sessions are the period's visitors, purchases are its orders; the steps in between are measured events.
export const funnel = [
  { step: 'Sessions', n: totals.visitors },
  { step: 'Viewed a product', n: Math.round(totals.visitors * 0.54) },
  { step: 'Added to cart', n: Math.round(totals.visitors * 0.117) },
  { step: 'Started checkout', n: Math.round(totals.visitors * 0.058) },
  { step: 'Purchased', n: totals.orders },
];

// Share of each monthly cohort of new customers who bought again in month 1..5.
export const cohorts = [
  { month: 'Jun', customers: 1240, retention: [1, 0.31, 0.22, 0.18, 0.16, 0.15] },
  { month: 'Jul', customers: 1385, retention: [1, 0.29, 0.21, 0.17, 0.15] },
  { month: 'Aug', customers: 1460, retention: [1, 0.33, 0.24, 0.19] },
  { month: 'Sep', customers: 1512, retention: [1, 0.35, 0.25] },
  { month: 'Oct', customers: 1698, retention: [1, 0.37] },
  { month: 'Nov', customers: 1204, retention: [1] },
];

export const categories = [
  { name: 'Tents & shelter', share: 0.34 },
  { name: 'Jackets', share: 0.27 },
  { name: 'Sleeping', share: 0.18 },
  { name: 'Cooking', share: 0.11 },
  { name: 'Accessories', share: 0.1 },
];

/** Revenue per category; the last one takes the rounding remainder so the parts add up to the total. */
export const categoryRevenue = categories.map((c, i) =>
  i === categories.length - 1 ? totals.revenue - categories.slice(0, -1).reduce((s, x) => s + Math.round(x.share * totals.revenue), 0) : Math.round(c.share * totals.revenue),
);

export const fmt = (n: number) => n.toLocaleString('en-US');
export const usd = (n: number, cents = false) => `$${n.toLocaleString('en-US', { minimumFractionDigits: cents ? 2 : 0, maximumFractionDigits: cents ? 2 : 0 })}`;
export const pct = (n: number, d = 1) => `${(n * 100).toFixed(d)}%`;
export const signed = (n: number) => `${n >= 0 ? '+' : '−'}${Math.abs(n * 100).toFixed(1)}%`;

// Staff accounts for the store admin. Role and status counts on the Users and Roles screens are computed from this list.
export type Role = 'Owner' | 'Admin' | 'Manager' | 'Support' | 'Analyst';
export type UserStatus = 'Active' | 'Invited' | 'Suspended';
export interface StaffUser {
  name: string;
  email: string;
  role: Role;
  status: UserStatus;
  lastActive: string;
  twoFactor: boolean;
  team: string;
  selected?: boolean;
}

export const users: StaffUser[] = [
  { name: 'Noor Haddad', email: 'noor@kestrel.example', role: 'Owner', status: 'Active', lastActive: 'Now', twoFactor: true, team: 'Growth' },
  { name: 'Ben Archer', email: 'ben@kestrel.example', role: 'Admin', status: 'Active', lastActive: '12 min ago', twoFactor: true, team: 'Operations' },
  { name: 'Carla Duarte', email: 'carla@kestrel.example', role: 'Manager', status: 'Active', lastActive: '1 h ago', twoFactor: true, team: 'Merchandising' },
  { name: 'Felix Wong', email: 'felix@kestrel.example', role: 'Manager', status: 'Active', lastActive: '3 h ago', twoFactor: false, team: 'Fulfilment', selected: true },
  { name: 'Ines Kovac', email: 'ines@kestrel.example', role: 'Support', status: 'Active', lastActive: '5 min ago', twoFactor: true, team: 'Customer care' },
  { name: 'Jamal Ortiz', email: 'jamal@kestrel.example', role: 'Support', status: 'Active', lastActive: '26 min ago', twoFactor: false, team: 'Customer care', selected: true },
  { name: 'Kira Sato', email: 'kira@kestrel.example', role: 'Support', status: 'Invited', lastActive: 'Invite sent Nov 20', twoFactor: false, team: 'Customer care' },
  { name: 'Liam Novak', email: 'liam@kestrel.example', role: 'Analyst', status: 'Active', lastActive: 'Yesterday', twoFactor: true, team: 'Growth' },
  { name: 'Mei Tanaka', email: 'mei@kestrel.example', role: 'Analyst', status: 'Active', lastActive: 'Nov 19', twoFactor: true, team: 'Finance' },
  { name: 'Omar Fadel', email: 'omar@kestrel.example', role: 'Manager', status: 'Suspended', lastActive: 'Oct 30', twoFactor: false, team: 'Fulfilment', selected: true },
  { name: 'Rosa Lind', email: 'rosa@kestrel.example', role: 'Support', status: 'Invited', lastActive: 'Invite sent Nov 21', twoFactor: false, team: 'Customer care' },
];

export const roleOrder: Role[] = ['Owner', 'Admin', 'Manager', 'Support', 'Analyst'];
export const roleCount = (r: Role) => users.filter((u) => u.role === r).length;
export const statusCount = (s: UserStatus) => users.filter((u) => u.status === s).length;
export const without2fa = users.filter((u) => u.status === 'Active' && !u.twoFactor).length;

export const roleInfo: Record<Role, string> = {
  Owner: 'Everything, including billing and deleting the store',
  Admin: 'Everything except billing and ownership',
  Manager: 'Runs products, orders and fulfilment',
  Support: 'Helps customers: orders, refunds up to a limit',
  Analyst: 'Reads reports and exports, changes nothing',
};

// What each role may do. 'full' = view + edit, 'view' = read only, 'none' = hidden.
export type Access = 'full' | 'view' | 'none';
export const resources = ['Orders', 'Refunds', 'Products', 'Customers', 'Discounts', 'Reports', 'Users & roles', 'Billing'] as const;
export const permissions: Record<Role, Record<(typeof resources)[number], Access>> = {
  Owner: { Orders: 'full', Refunds: 'full', Products: 'full', Customers: 'full', Discounts: 'full', Reports: 'full', 'Users & roles': 'full', Billing: 'full' },
  Admin: { Orders: 'full', Refunds: 'full', Products: 'full', Customers: 'full', Discounts: 'full', Reports: 'full', 'Users & roles': 'full', Billing: 'view' },
  Manager: { Orders: 'full', Refunds: 'full', Products: 'full', Customers: 'view', Discounts: 'full', Reports: 'view', 'Users & roles': 'none', Billing: 'none' },
  Support: { Orders: 'full', Refunds: 'full', Products: 'view', Customers: 'full', Discounts: 'view', Reports: 'none', 'Users & roles': 'none', Billing: 'none' },
  Analyst: { Orders: 'view', Refunds: 'view', Products: 'view', Customers: 'view', Discounts: 'view', Reports: 'full', 'Users & roles': 'none', Billing: 'none' },
};

export const audit = [
  { who: 'Ben Archer', what: 'changed Support refunds limit to $150', when: '10:04' },
  { who: 'Noor Haddad', what: 'invited Rosa Lind as Support', when: '09:31' },
  { who: 'Ben Archer', what: 'suspended Omar Fadel', when: 'Nov 20, 18:12' },
  { who: 'Carla Duarte', what: 'gave Managers edit access to Discounts', when: 'Nov 20, 11:40' },
  { who: 'Noor Haddad', what: 'turned on required 2FA for Admins', when: 'Nov 18, 16:05' },
];
