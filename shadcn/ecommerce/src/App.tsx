import { Cart } from './cart';
import { Home } from './home';
import { ProductPage } from './product';
import { Shop } from './shop';

const pages = { home: Home, shop: Shop, product: ProductPage, cart: Cart };

export default function App() {
  const key = new URLSearchParams(location.search).get('page') as keyof typeof pages | null;
  const Page = pages[key ?? 'home'] ?? Home;
  return (
    <main className="flex min-h-screen justify-center bg-background">
      <Page />
    </main>
  );
}
