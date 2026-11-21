import { Check, Eye, History, Minus, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { audit, permissions, resources, roleCount, roleInfo, roleOrder, type Access, type Role } from '@/data';
import { cn } from '@/lib/utils';
import { Shell } from '@/shell';

const active: Role = 'Manager';

function Cell({ a, focus }: { a: Access; focus?: boolean }) {
  return (
    <span
      className={cn(
        'mx-auto flex h-8 w-[88px] items-center justify-center gap-1.5 rounded-[8px] text-[12px] font-medium',
        a === 'full' && 'bg-primary/14 text-accent-foreground',
        a === 'view' && 'bg-chart-2/12 text-chart-2',
        a === 'none' && 'text-muted-foreground',
        focus && 'ring-1 ring-primary/60',
      )}
    >
      {a === 'full' && (
        <>
          <Check className="size-3.5" strokeWidth={2.5} /> Edit
        </>
      )}
      {a === 'view' && (
        <>
          <Eye className="size-3.5" /> View
        </>
      )}
      {a === 'none' && <Minus className="size-3.5" />}
    </span>
  );
}

export function Roles() {
  const p = permissions[active];
  const editable = resources.filter((r) => p[r] === 'full').length;
  return (
    <Shell
      active="roles"
      title="Roles & permissions"
      actions={
        <Button className="h-9 gap-1.5 rounded-[10px] px-3.5 text-[13px] font-semibold">
          <Plus className="size-4" /> New role
        </Button>
      }
    >
      <div className="grid h-full grid-cols-[300px_1fr] gap-5">
        <section className="tile p-3">
          <div className="px-3 pt-2 pb-3 text-[12.5px] text-muted-foreground">{roleOrder.length} roles</div>
          <ul className="space-y-1">
            {roleOrder.map((r) => (
              <li key={r} className={cn('rounded-[12px] px-3 py-3', r === active ? 'bg-secondary ring-1 ring-primary/40' : '')}>
                <div className="flex items-center justify-between">
                  <span className="text-[14px] font-medium">{r}</span>
                  <span className="num text-[12px] text-muted-foreground">
                    {roleCount(r)} {roleCount(r) === 1 ? 'user' : 'users'}
                  </span>
                </div>
                <p className="mt-1 text-[12.5px] leading-snug text-muted-foreground">{roleInfo[r]}</p>
              </li>
            ))}
          </ul>
        </section>

        <div className="grid min-h-0 grid-rows-[1fr_auto] gap-5">
          <section className="tile overflow-hidden">
            <div className="flex items-start justify-between px-6 pt-5 pb-4">
              <div>
                <h2 className="text-[16px] font-semibold">Permissions by role</h2>
                <p className="mt-1 text-[12.5px] text-muted-foreground">
                  {active}: can edit {editable} of {resources.length} areas. Every change is recorded in the audit log below.
                </p>
              </div>
              <div className="flex items-center gap-3 text-[12px] text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <Check className="size-3.5 text-accent-foreground" /> Edit
                </span>
                <span className="flex items-center gap-1.5">
                  <Eye className="size-3.5 text-chart-2" /> View only
                </span>
                <span className="flex items-center gap-1.5">
                  <Minus className="size-3.5" /> No access
                </span>
              </div>
            </div>
            <div className="grid grid-cols-[180px_repeat(5,1fr)] border-y border-border bg-secondary/50 px-6 py-2.5 text-[12.5px] font-medium">
              <span className="text-muted-foreground">Area</span>
              {roleOrder.map((r) => (
                <span key={r} className={cn('text-center', r === active ? 'text-accent-foreground' : 'text-muted-foreground')}>
                  {r}
                </span>
              ))}
            </div>
            {resources.map((res) => (
              <div key={res} className="grid grid-cols-[180px_repeat(5,1fr)] items-center border-b border-border px-6 py-[9px] text-[13px] last:border-0">
                <span>{res}</span>
                {roleOrder.map((r) => (
                  <Cell key={r} a={permissions[r][res]} focus={r === active} />
                ))}
              </div>
            ))}
          </section>

          <section className="tile p-5">
            <div className="flex items-center gap-2 text-[15px] font-semibold">
              <History className="size-4 text-muted-foreground" /> Audit log
            </div>
            <ul className="mt-3 divide-y divide-border text-[13px]">
              {audit.map((e) => (
                <li key={e.what} className="flex items-center justify-between py-2">
                  <span>
                    <span className="font-medium">{e.who}</span> <span className="text-muted-foreground">{e.what}</span>
                  </span>
                  <span className="num text-[12px] text-muted-foreground">{e.when}</span>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </Shell>
  );
}
