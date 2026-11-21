import { LeadDetail } from './lead';
import { Leads } from './leads';
import { Pipeline } from './pipeline';

const screens = { leads: Leads, pipeline: Pipeline, lead: LeadDetail };

export default function App() {
  const key = new URLSearchParams(location.search).get('screen') as keyof typeof screens | null;
  const Screen = screens[key ?? 'leads'] ?? Leads;
  return (
    <main className="flex min-h-screen items-start justify-center bg-[oklch(0.93_0.008_255)] p-10">
      <Screen />
    </main>
  );
}
