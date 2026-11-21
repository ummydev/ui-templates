// Sample data for the Kiln project management template. Replace it with your own API calls.
// Every total on screen is computed from these arrays, so the three screens always agree.

export const studio = { name: 'Northfold', plan: 'Studio plan' };
export const today = { label: 'Friday, November 21', short: 'Nov 21', weekday: 4 }; // weekday: 0 = Mon

export type PersonId = 'av' | 'km' | 'ln' | 'sw' | 'ic' | 'tg';
export const people: Record<PersonId, { name: string; initials: string; role: string; hours: number; capacity: number; tone: string }> = {
  av: { name: 'Ana Vidal', initials: 'AV', role: 'Design lead', hours: 34, capacity: 36, tone: 'bg-[var(--p-clay)]' },
  km: { name: 'Kofi Mensah', initials: 'KM', role: 'Engineer', hours: 39, capacity: 36, tone: 'bg-[var(--p-sky)]' },
  ln: { name: 'Lea Novak', initials: 'LN', role: 'Product designer', hours: 28, capacity: 36, tone: 'bg-[var(--p-lilac)]' },
  sw: { name: 'Sam Whitlock', initials: 'SW', role: 'Engineer', hours: 22, capacity: 32, tone: 'bg-[var(--p-lime)]' },
  ic: { name: 'Iris Chen', initials: 'IC', role: 'Project manager', hours: 30, capacity: 36, tone: 'bg-[var(--p-sand)]' },
  tg: { name: 'Theo Grant', initials: 'TG', role: 'Copywriter', hours: 14, capacity: 20, tone: 'bg-secondary' },
};
export const me: PersonId = 'ic';

export type Color = 'clay' | 'sky' | 'lime' | 'lilac' | 'sand';
export type Health = 'On track' | 'At risk' | 'Behind';

export interface Project {
  id: string;
  name: string;
  client: string;
  color: Color;
  health: Health;
  lead: PersonId;
  team: PersonId[];
  done: number;
  total: number;
  dueThisWeek: number; // open tasks due by Friday
  due: string;
  // Gantt: week index from Nov 3 (0) to Jan 19 (11); phases and the launch milestone.
  phases: { name: string; from: number; to: number }[];
  milestone: { name: string; week: number };
  // This week (Mon–Fri): what the project is doing, from day to day (fractions allowed).
  week: { label: string; from: number; to: number };
}

export const projects: Project[] = [
  {
    id: 'HAL', name: 'Halden website relaunch', client: 'Halden Coffee', color: 'clay', health: 'On track', lead: 'av',
    team: ['av', 'km', 'ln', 'tg'], done: 34, total: 52, dueThisWeek: 6, due: 'Dec 12',
    phases: [{ name: 'Design', from: 0, to: 2.5 }, { name: 'Build', from: 2, to: 5.64 }, { name: 'Content', from: 4, to: 5.64 }],
    milestone: { name: 'Launch', week: 5.64 },
    week: { label: 'Checkout build', from: 0, to: 3.5 },
  },
  {
    id: 'MIR', name: 'Mira app onboarding', client: 'Mira Health', color: 'sky', health: 'At risk', lead: 'ln',
    team: ['ln', 'sw', 'ic'], done: 21, total: 40, dueThisWeek: 5, due: 'Dec 5',
    phases: [{ name: 'Research', from: 0, to: 1.5 }, { name: 'Design', from: 1.5, to: 3.5 }, { name: 'Build', from: 3, to: 4.64 }],
    milestone: { name: 'Beta', week: 4.64 },
    week: { label: 'Usability tests', from: 1, to: 4.5 },
  },
  {
    id: 'BRA', name: 'Bramble brand refresh', client: 'Bramble Books', color: 'lime', health: 'On track', lead: 'av',
    team: ['av', 'tg'], done: 26, total: 30, dueThisWeek: 3, due: 'Nov 28',
    phases: [{ name: 'Strategy', from: 0, to: 1 }, { name: 'Identity', from: 1, to: 3 }, { name: 'Guidelines', from: 2.4, to: 3.64 }],
    milestone: { name: 'Handover', week: 3.64 },
    week: { label: 'Guidelines PDF', from: 2, to: 5 },
  },
  {
    id: 'PUL', name: 'Pulse analytics v2', client: 'Pulse Labs', color: 'lilac', health: 'On track', lead: 'km',
    team: ['km', 'sw', 'ln'], done: 9, total: 38, dueThisWeek: 4, due: 'Jan 16',
    phases: [{ name: 'Discovery', from: 2, to: 4 }, { name: 'Design', from: 4, to: 7 }, { name: 'Build', from: 6, to: 10.64 }],
    milestone: { name: 'Release', week: 10.64 },
    week: { label: 'Data model review', from: 0.5, to: 2.5 },
  },
  {
    id: 'ORC', name: 'Orchard annual report', client: 'Orchard Trust', color: 'sand', health: 'Behind', lead: 'ic',
    team: ['ic', 'tg', 'ln'], done: 12, total: 24, dueThisWeek: 5, due: 'Dec 19',
    phases: [{ name: 'Writing', from: 1, to: 4 }, { name: 'Layout', from: 3.5, to: 6 }, { name: 'Print', from: 5.6, to: 6.64 }],
    milestone: { name: 'To print', week: 6.64 },
    week: { label: 'Chairman’s letter', from: 3, to: 5 },
  },
];

export const weeks = ['Nov 3', 'Nov 10', 'Nov 17', 'Nov 24', 'Dec 1', 'Dec 8', 'Dec 15', 'Dec 22', 'Dec 29', 'Jan 5', 'Jan 12', 'Jan 19'];
export const todayWeek = 2 + 4.5 / 7; // Friday Nov 21, inside the Nov 17 week

const team = Object.values(people);
export const totals = {
  active: projects.length,
  open: projects.reduce((s, p) => s + p.total - p.done, 0),
  dueThisWeek: projects.reduce((s, p) => s + p.dueThisWeek, 0),
  hours: team.reduce((s, p) => s + p.hours, 0),
  capacity: team.reduce((s, p) => s + p.capacity, 0),
  onTrack: projects.filter((p) => p.health === 'On track').length,
  atRisk: projects.filter((p) => p.health === 'At risk').length,
  behind: projects.filter((p) => p.health === 'Behind').length,
};

export const deadlines = [
  { title: 'Guidelines handover', project: 'BRA', date: 'Fri, Nov 28', who: 'av' as PersonId },
  { title: 'Beta build to TestFlight', project: 'MIR', date: 'Thu, Dec 4', who: 'sw' as PersonId },
  { title: 'Halden site goes live', project: 'HAL', date: 'Fri, Dec 12', who: 'km' as PersonId },
  { title: 'Report files to printer', project: 'ORC', date: 'Fri, Dec 19', who: 'ic' as PersonId },
];

// The board shows the Halden project. Column counts add up to its 18 open + 34 done tasks.
export type Column = 'To do' | 'In progress' | 'In review' | 'Done';
export interface Task {
  id: string;
  title: string;
  column: Column;
  tag: 'Design' | 'Build' | 'Content' | 'QA';
  who: PersonId[];
  due?: string;
  late?: boolean;
  subtasks?: [number, number];
  comments?: number;
  priority?: 'High';
}

export const boardCounts: Record<Column, number> = { 'To do': 9, 'In progress': 5, 'In review': 4, Done: 34 };

export const tasks: Task[] = [
  { id: 'HAL-61', title: 'Gift card flow on mobile', column: 'To do', tag: 'Design', who: ['ln'], due: 'Nov 26', subtasks: [0, 4] },
  { id: 'HAL-63', title: 'Write shipping and returns pages', column: 'To do', tag: 'Content', who: ['tg'], due: 'Nov 27', comments: 2 },
  { id: 'HAL-64', title: 'Redirect map from the old site', column: 'To do', tag: 'Build', who: ['km'], due: 'Dec 2' },
  { id: 'HAL-52', title: 'Checkout: saved addresses', column: 'In progress', tag: 'Build', who: ['km'], due: 'Nov 21', subtasks: [3, 5], comments: 4, priority: 'High' },
  { id: 'HAL-55', title: 'Subscription picker', column: 'In progress', tag: 'Design', who: ['av', 'ln'], due: 'Nov 24', subtasks: [2, 3] },
  { id: 'HAL-57', title: 'Origin stories for 12 coffees', column: 'In progress', tag: 'Content', who: ['tg'], due: 'Nov 20', late: true, comments: 1 },
  { id: 'HAL-48', title: 'Product page photography crops', column: 'In review', tag: 'Design', who: ['av'], due: 'Nov 21', comments: 6 },
  { id: 'HAL-50', title: 'Cart drawer accessibility pass', column: 'In review', tag: 'QA', who: ['km', 'ln'], due: 'Nov 22', subtasks: [7, 8] },
  { id: 'HAL-41', title: 'Navigation and footer', column: 'Done', tag: 'Build', who: ['km'] },
  { id: 'HAL-39', title: 'Home page hero, 3 options', column: 'Done', tag: 'Design', who: ['av'] },
  { id: 'HAL-37', title: 'Brew guide template', column: 'Done', tag: 'Design', who: ['ln'] },
];
