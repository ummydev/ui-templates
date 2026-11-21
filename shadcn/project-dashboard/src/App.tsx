import { Board } from './board';
import { Overview } from './overview';
import { Timeline } from './timeline';

const screens = { overview: Overview, board: Board, timeline: Timeline };

export default function App() {
  const key = new URLSearchParams(location.search).get('screen') as keyof typeof screens | null;
  const Screen = screens[key ?? 'overview'] ?? Overview;
  return (
    <main className="flex min-h-screen items-start justify-center bg-[oklch(0.9_0.012_75)] p-10">
      <Screen />
    </main>
  );
}
