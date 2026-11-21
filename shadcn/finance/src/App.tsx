import { screens } from './screens';

type Name = keyof typeof screens;

/** All screens side by side; ?screen=<name> shows one, for screenshots. */
export default function App() {
  const only = new URLSearchParams(location.search).get('screen') as Name | null;
  const list = (only && screens[only] ? [only] : Object.keys(screens)) as Name[];
  return (
    <main className="flex min-h-screen flex-wrap items-start justify-center gap-10 bg-[oklch(0.9_0.015_150)] p-12">
      {list.map((name) => {
        const Screen = screens[name];
        return <Screen key={name} />;
      })}
    </main>
  );
}
