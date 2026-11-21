// Sample data for the Tideline CRM template. Replace it with your own API calls.
// Every number on screen is derived from these arrays, so the screens always agree.

export const me = { name: 'Rafael Ortiz', initials: 'RO', role: 'Sales lead', workspace: 'Tideline' };

export type OwnerId = 'ro' | 'hs' | 'dp' | 'mk';
export const owners: Record<OwnerId, { name: string; initials: string; tone: string }> = {
  ro: { name: 'Rafael Ortiz', initials: 'RO', tone: 'bg-[var(--tone-1)]' },
  hs: { name: 'Hana Sato', initials: 'HS', tone: 'bg-[var(--tone-2)]' },
  dp: { name: 'Dev Patel', initials: 'DP', tone: 'bg-[var(--tone-3)]' },
  mk: { name: 'Mira Kowalski', initials: 'MK', tone: 'bg-[var(--tone-4)]' },
};

export type Heat = 'hot' | 'warm' | 'cold';
export type LeadStage = 'New' | 'Contacted' | 'Qualified' | 'Unqualified';

export interface Lead {
  id: string;
  name: string;
  email: string;
  company: string;
  stage: LeadStage;
  heat: Heat;
  source: 'Website' | 'Referral' | 'LinkedIn' | 'Webinar' | 'Outbound';
  owner: OwnerId;
  score: number; // 0–100
  value: number; // estimated deal size, USD per year
  lastTouch: string;
  selected?: boolean;
}

export const leads: Lead[] = [
  { id: 'L-2041', name: 'Priya Raman', email: 'priya@lumenlabs.io', company: 'Lumen Labs', stage: 'Qualified', heat: 'hot', source: 'Webinar', owner: 'ro', score: 86, value: 48000, lastTouch: '24 min ago' },
  { id: 'L-2040', name: 'Tomás Herrera', email: 'tomas@brightpath.co', company: 'Brightpath Logistics', stage: 'Qualified', heat: 'hot', source: 'Referral', owner: 'hs', score: 78, value: 36000, lastTouch: '1 h ago', selected: true },
  { id: 'L-2039', name: 'Grace Okafor', email: 'grace@fernhill.health', company: 'Fernhill Health', stage: 'New', heat: 'warm', source: 'Website', owner: 'dp', score: 64, value: 22000, lastTouch: '2 h ago', selected: true },
  { id: 'L-2038', name: 'Jonah Weiss', email: 'jonah@quarrystudio.com', company: 'Quarry Studio', stage: 'Contacted', heat: 'warm', source: 'LinkedIn', owner: 'ro', score: 58, value: 12000, lastTouch: '3 h ago' },
  { id: 'L-2037', name: 'Lena Fischer', email: 'lena@nordhaus.de', company: 'Nordhaus GmbH', stage: 'Qualified', heat: 'hot', source: 'Outbound', owner: 'mk', score: 81, value: 64000, lastTouch: '5 h ago', selected: true },
  { id: 'L-2036', name: 'Marcus Bell', email: 'marcus@kitebox.app', company: 'Kitebox', stage: 'New', heat: 'cold', source: 'Website', owner: 'hs', score: 31, value: 6000, lastTouch: 'Yesterday' },
  { id: 'L-2035', name: 'Aiko Tanaka', email: 'aiko@seabright.jp', company: 'Seabright Foods', stage: 'Contacted', heat: 'warm', source: 'Webinar', owner: 'dp', score: 55, value: 18000, lastTouch: 'Yesterday' },
  { id: 'L-2034', name: 'Owen Gallagher', email: 'owen@ironvale.com', company: 'Ironvale Mfg', stage: 'Qualified', heat: 'warm', source: 'Referral', owner: 'mk', score: 69, value: 42000, lastTouch: 'Nov 19' },
  { id: 'L-2033', name: 'Sofia Mendes', email: 'sofia@pinecone.pt', company: 'Pinecone Retail', stage: 'Unqualified', heat: 'cold', source: 'LinkedIn', owner: 'ro', score: 22, value: 4000, lastTouch: 'Nov 18' },
  { id: 'L-2032', name: 'Daniel Kim', email: 'daniel@orbitpay.io', company: 'Orbitpay', stage: 'Qualified', heat: 'hot', source: 'Outbound', owner: 'hs', score: 74, value: 30000, lastTouch: 'Nov 18' },
  { id: 'L-2031', name: 'Hannah Lowe', email: 'hannah@meadowcare.org', company: 'Meadow Care', stage: 'New', heat: 'warm', source: 'Website', owner: 'dp', score: 47, value: 9000, lastTouch: 'Nov 17' },
  { id: 'L-2030', name: 'Victor Adeyemi', email: 'victor@coastline.ng', company: 'Coastline Energy', stage: 'Qualified', heat: 'warm', source: 'Referral', owner: 'mk', score: 66, value: 54000, lastTouch: 'Nov 17' },
];

/** Totals for the whole lead list (the table shows the latest 12). */
export const leadTotals = { all: 186, mine: 42, hot: 14, followUp: 9 };

export const leadKpis = [
  { label: 'New leads this week', value: '38', delta: '+12%', good: true, spark: [18, 22, 19, 27, 24, 31, 38] },
  { label: 'Hot leads', value: String(leadTotals.hot), delta: '+3', good: true, spark: [7, 9, 8, 10, 11, 11, 14] },
  { label: 'First reply time', value: '1h 52m', delta: '−18 min', good: true, spark: [190, 160, 172, 140, 131, 125, 112] },
  { label: 'Lead → deal rate', value: '24%', delta: '−2 pts', good: false, spark: [27, 26, 28, 25, 26, 26, 24] },
];

export type DealStage = 'Discovery' | 'Proposal' | 'Negotiation' | 'Closed won';
export const dealStages: { name: DealStage; probability: number }[] = [
  { name: 'Discovery', probability: 0.2 },
  { name: 'Proposal', probability: 0.5 },
  { name: 'Negotiation', probability: 0.75 },
  { name: 'Closed won', probability: 1 },
];

export interface Deal {
  id: string;
  company: string;
  title: string;
  stage: DealStage;
  value: number;
  owner: OwnerId;
  days: number; // days in the current stage
  next: string; // next step
  due: string;
  overdue?: boolean;
}

export const deals: Deal[] = [
  { id: 'D-318', company: 'Coastline Energy', title: 'Field ops rollout', stage: 'Discovery', value: 54000, owner: 'mk', days: 3, next: 'Discovery call', due: 'Nov 24' },
  { id: 'D-317', company: 'Ironvale Mfg', title: '3 plants, 120 seats', stage: 'Discovery', value: 42000, owner: 'mk', days: 6, next: 'Send case study', due: 'Nov 21', overdue: true },
  { id: 'D-315', company: 'Brightpath Logistics', title: 'Dispatch team', stage: 'Discovery', value: 36000, owner: 'hs', days: 2, next: 'Scope workshop', due: 'Nov 25' },
  { id: 'D-312', company: 'Lumen Labs', title: 'Team plan, 60 seats', stage: 'Proposal', value: 48000, owner: 'ro', days: 4, next: 'Proposal review', due: 'Nov 26' },
  { id: 'D-309', company: 'Orbitpay', title: 'Support desk', stage: 'Proposal', value: 30000, owner: 'hs', days: 9, next: 'Security questionnaire', due: 'Nov 20', overdue: true },
  { id: 'D-306', company: 'Halcyon Hotels', title: '8 properties', stage: 'Proposal', value: 72000, owner: 'dp', days: 5, next: 'Pricing call', due: 'Nov 27' },
  { id: 'D-301', company: 'Nordhaus GmbH', title: 'EU expansion', stage: 'Negotiation', value: 64000, owner: 'mk', days: 7, next: 'Legal redlines', due: 'Nov 25' },
  { id: 'D-298', company: 'Redwood Dental', title: '14 clinics', stage: 'Negotiation', value: 38000, owner: 'ro', days: 12, next: 'Final pricing', due: 'Nov 24' },
  { id: 'D-294', company: 'Atlas Freight', title: 'Annual renewal + 40 seats', stage: 'Closed won', value: 56000, owner: 'dp', days: 0, next: 'Kickoff', due: 'Nov 19' },
  { id: 'D-290', company: 'Willow Schools', title: 'District pilot', stage: 'Closed won', value: 24000, owner: 'hs', days: 0, next: 'Onboarding', due: 'Nov 14' },
];

export const stageProbability = (s: DealStage) => dealStages.find((d) => d.name === s)!.probability;
export const openDeals = deals.filter((d) => d.stage !== 'Closed won');
export const pipelineTotals = {
  open: openDeals.reduce((s, d) => s + d.value, 0),
  weighted: openDeals.reduce((s, d) => s + d.value * stageProbability(d.stage), 0),
  wonThisMonth: deals.filter((d) => d.stage === 'Closed won').reduce((s, d) => s + d.value, 0),
  quota: 180000,
};

/** The lead shown on the detail screen: Priya Raman (L-2041) and her deal D-312. */
export const focus = {
  lead: leads[0],
  deal: deals.find((d) => d.id === 'D-312')!,
  title: 'Head of Operations',
  phone: '+1 415 555 0142',
  location: 'San Francisco, CA',
  companySize: '180 employees',
  tags: ['Webinar: Nov 12', 'Ops tooling', 'Budget approved'],
};

export const activity = [
  { kind: 'email' as const, who: 'ro' as OwnerId, title: 'Sent the proposal', body: 'Team plan for 60 seats, annual billing, $48,000. Opened 3 times.', when: 'Today, 10:12' },
  { kind: 'call' as const, who: 'ro' as OwnerId, title: 'Call with Priya, 32 min', body: 'Wants rollout before the January planning cycle. Needs SSO and an admin audit log. CFO signs above $40k.', when: 'Nov 19, 15:30' },
  { kind: 'meeting' as const, who: 'ro' as OwnerId, title: 'Demo for the ops team', body: '5 attendees. Questions on routing rules and the reporting export.', when: 'Nov 17, 11:00' },
  { kind: 'note' as const, who: 'hs' as OwnerId, title: 'Hana added a note', body: 'Lumen Labs is replacing two tools at renewal in February. Good timing.', when: 'Nov 14, 09:40' },
  { kind: 'lead' as const, who: 'ro' as OwnerId, title: 'Became a lead', body: 'Signed up after the Nov 12 webinar "Ops without spreadsheets".', when: 'Nov 12, 18:05' },
];

export const tasks = [
  { title: 'Proposal review with Priya and CFO', due: 'Nov 26', done: false },
  { title: 'Send SSO and audit log docs', due: 'Nov 22', done: false },
  { title: 'Share security questionnaire', due: 'Nov 21', done: true },
];

export const usd = (n: number) => `$${n.toLocaleString('en-US')}`;
export const usdK = (n: number) =>
  n >= 1_000_000 ? `$${(n / 1_000_000).toFixed(2)}M` : `$${Math.round(n / 1000)}k`;
