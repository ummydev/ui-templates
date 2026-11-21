import { Orders } from './orders';
import { Overview } from './overview';
import { Reports } from './reports';
import { Roles } from './roles';
import { Users } from './users';

const screens = { overview: Overview, orders: Orders, reports: Reports, users: Users, roles: Roles };

export default function App() {
  const key = new URLSearchParams(location.search).get('screen') as keyof typeof screens | null;
  const Screen = screens[key ?? 'overview'] ?? Overview;
  return (
    <main className="flex min-h-screen items-start justify-center bg-[oklch(0.1_0.005_260)] p-10">
      <Screen />
    </main>
  );
}
