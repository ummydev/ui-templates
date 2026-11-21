// Sample data for the Fernwise template. Replace it with your own API calls.
import {
  Bus,
  Coffee,
  Dumbbell,
  Home,
  type LucideIcon,
  Music,
  ShoppingBasket,
  Sprout,
  Wallet,
} from 'lucide-react';

export const user = { name: 'Maya Lindqvist', first: 'Maya', initials: 'ML' };

export const balance = { whole: '12,480', cents: '36', change: '+4.2%', card: '4821' };

export interface Txn {
  id: string;
  title: string;
  note: string;
  amount: number;
  icon: LucideIcon;
  day: 'Today' | 'Yesterday' | 'Mon, Nov 17';
}

export const transactions: Txn[] = [
  { id: '1', title: 'Greenline Grocers', note: 'Groceries · 6:42 PM', amount: -64.2, icon: ShoppingBasket, day: 'Today' },
  { id: '2', title: 'Salary', note: 'Northwind Studio · 9:00 AM', amount: 4200, icon: Wallet, day: 'Today' },
  { id: '3', title: 'Oak & Bean', note: 'Coffee · 8:15 AM', amount: -5.4, icon: Coffee, day: 'Today' },
  { id: '4', title: 'City Transit', note: 'Monthly pass · 7:30 PM', amount: -92, icon: Bus, day: 'Yesterday' },
  { id: '5', title: 'Pulse Fitness', note: 'Membership · 12:10 PM', amount: -39, icon: Dumbbell, day: 'Yesterday' },
  { id: '6', title: 'Rent', note: 'Elm Street flat · 8:00 AM', amount: -1450, icon: Home, day: 'Mon, Nov 17' },
  { id: '7', title: 'Soundwave', note: 'Subscription · 6:00 AM', amount: -10.99, icon: Music, day: 'Mon, Nov 17' },
];

export const weekSpend = [
  { day: 'M', amount: 42 },
  { day: 'T', amount: 18 },
  { day: 'W', amount: 64 },
  { day: 'T', amount: 31 },
  { day: 'F', amount: 88 },
  { day: 'S', amount: 52 },
  { day: 'S', amount: 24 },
];

export const monthSpend = [
  { week: 'Oct 27', amount: 610 },
  { week: 'Nov 3', amount: 540 },
  { week: 'Nov 10', amount: 720 },
  { week: 'Nov 17', amount: 480 },
  { week: 'Nov 24', amount: 560 },
];

export const categories = [
  { name: 'Home', spent: 1450, budget: 1500, color: 'var(--chart-1)' },
  { name: 'Groceries', spent: 386, budget: 450, color: 'var(--chart-2)' },
  { name: 'Eating out', spent: 212, budget: 180, color: 'var(--chart-4)' },
  { name: 'Transport', spent: 92, budget: 120, color: 'var(--chart-3)' },
];

export const goals = [
  { name: 'Lisbon in spring', saved: 1860, target: 2400, icon: Sprout },
  { name: 'Emergency fund', saved: 6200, target: 9000, icon: Wallet },
];

export const contacts = [
  { name: 'Jonas', initials: 'JB' },
  { name: 'Priya', initials: 'PS' },
  { name: 'Leo', initials: 'LM' },
  { name: 'Ana', initials: 'AR' },
  { name: 'Sam', initials: 'SK' },
];

export const money = (n: number) =>
  `${n < 0 ? '−' : '+'}$${Math.abs(n).toLocaleString('en-US', { minimumFractionDigits: 2 })}`;
