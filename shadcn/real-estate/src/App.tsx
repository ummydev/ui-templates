import { Agent } from './agent';
import { Home } from './home';
import { Listings } from './listings';
import { Property } from './property';

const pages = { home: Home, listings: Listings, property: Property, agent: Agent };

export default function App() {
  const key = new URLSearchParams(location.search).get('page') as keyof typeof pages | null;
  const Page = pages[key ?? 'home'] ?? Home;
  return (
    <main className="flex min-h-screen justify-center bg-background">
      <Page />
    </main>
  );
}
