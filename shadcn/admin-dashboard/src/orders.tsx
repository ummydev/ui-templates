import { Check, Filter, MoreHorizontal, Package, Printer, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { fmt, orderTotal, orders, statusCounts, subtotal, tax, taxRate, usd, type Status } from '@/data';
import { cn } from '@/lib/utils';
import { Shell } from '@/shell';

const statusStyle: Record<Status, string> = {
  Paid: 'bg-primary/14 text-accent-foreground',
  Fulfilled: 'bg-chart-2/14 text-chart-2',
  Pending: 'bg-chart-4/14 text-chart-4',
  Refunded: 'bg-down/12 text-down',
};

function Box({ on }: { on?: boolean }) {
  return (
    <span className={cn('flex size-4 items-center justify-center rounded-[5px] border', on ? 'border-primary bg-primary text-primary-foreground' : 'border-input')}>
      {on && <Check className="size-3" strokeWidth={3} />}
    </span>
  );
}

export function Orders() {
  const o = orders.find((x) => x.selected)!;
  return (
    <Shell active="orders" title="Orders" actions={<Button className="h-9 rounded-[10px] px-3.5 text-[13px] font-semibold">Create order</Button>}>
      <div className="grid h-full grid-cols-[1fr_380px] gap-5">
        <section className="tile flex min-h-0 flex-col overflow-hidden">
          <div className="flex items-center justify-between border-b border-border px-5">
            <div className="flex gap-5 text-[13.5px]">
              {(Object.keys(statusCounts) as (keyof typeof statusCounts)[]).map((k, i) => (
                <span key={k} className={cn('-mb-px flex items-center gap-2 border-b-2 py-3.5', i === 0 ? 'border-primary font-semibold' : 'border-transparent text-muted-foreground')}>
                  {k}
                  <span className="num rounded-md bg-secondary px-1.5 text-[11.5px]">{fmt(statusCounts[k])}</span>
                </span>
              ))}
            </div>
            <span className="flex h-8 items-center gap-1.5 rounded-[9px] border border-border px-2.5 text-[12.5px] text-muted-foreground">
              <Filter className="size-3.5" /> Filters
            </span>
          </div>
          <Table className="text-[13px]">
            <TableHeader>
              <TableRow className="border-border hover:bg-transparent [&>th]:h-10 [&>th]:text-[12px] [&>th]:font-medium [&>th]:text-muted-foreground">
                <TableHead className="w-10 pl-5">
                  <Box />
                </TableHead>
                <TableHead>Order</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Channel</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Items</TableHead>
                <TableHead className="pr-5 text-right">Total</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((x) => (
                <TableRow key={x.id} className={cn('border-border [&>td]:py-3', x.selected && 'bg-accent hover:bg-accent')}>
                  <TableCell className="pl-5">
                    <Box on={x.selected} />
                  </TableCell>
                  <TableCell>
                    <div className="num font-medium">{x.id}</div>
                    <div className="text-[12px] text-muted-foreground">{x.date}</div>
                  </TableCell>
                  <TableCell>
                    <div>{x.customer}</div>
                    <div className="text-[12px] text-muted-foreground">{x.city}</div>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{x.channel}</TableCell>
                  <TableCell>
                    <span className={cn('rounded-md px-2 py-1 text-[12px] font-medium', statusStyle[x.status])}>{x.status}</span>
                  </TableCell>
                  <TableCell className="num text-right">{x.items.reduce((s, i) => s + i.qty, 0)}</TableCell>
                  <TableCell className="num pr-5 text-right font-medium">{usd(orderTotal(x), true)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className="mt-auto flex items-center justify-between border-t border-border px-5 py-3 text-[12.5px] text-muted-foreground">
            <span>
              Showing <span className="num text-foreground">1–{orders.length}</span> of <span className="num text-foreground">{fmt(statusCounts.All)}</span> orders
            </span>
            <span className="flex gap-1.5">
              <span className="rounded-md border border-border px-2.5 py-1">Previous</span>
              <span className="rounded-md border border-border px-2.5 py-1 text-foreground">Next</span>
            </span>
          </div>
        </section>

        <aside className="tile flex flex-col p-5">
          <div className="flex items-center justify-between">
            <div>
              <div className="num text-[20px] font-medium">{o.id}</div>
              <div className="text-[12.5px] text-muted-foreground">{o.date}</div>
            </div>
            <span className="flex gap-1.5 text-muted-foreground">
              <span className="flex size-8 items-center justify-center rounded-[9px] border border-border">
                <Printer className="size-4" />
              </span>
              <span className="flex size-8 items-center justify-center rounded-[9px] border border-border">
                <MoreHorizontal className="size-4" />
              </span>
              <span className="flex size-8 items-center justify-center rounded-[9px] border border-border">
                <X className="size-4" />
              </span>
            </span>
          </div>
          <span className={cn('mt-4 w-fit rounded-md px-2 py-1 text-[12px] font-medium', statusStyle[o.status])}>{o.status} · not yet fulfilled</span>

          <div className="mt-5 rounded-[12px] bg-secondary p-4 text-[13px]">
            <div className="font-medium">{o.customer}</div>
            <div className="text-muted-foreground">{o.email}</div>
            <div className="mt-2 text-muted-foreground">
              Ships to {o.city} · came from {o.channel.toLowerCase()}
            </div>
          </div>

          <ul className="mt-5 space-y-3">
            {o.items.map((i) => (
              <li key={i.name} className="flex items-center gap-3 text-[13px]">
                <span className="flex size-10 items-center justify-center rounded-[10px] bg-secondary">
                  <Package className="size-4 text-muted-foreground" />
                </span>
                <div className="flex-1 leading-tight">
                  <div>{i.name}</div>
                  <div className="text-[12px] text-muted-foreground">
                    {i.variant} · <span className="num">{i.qty} × {usd(i.price)}</span>
                  </div>
                </div>
                <span className="num">{usd(i.qty * i.price)}</span>
              </li>
            ))}
          </ul>

          <dl className="mt-5 space-y-2 border-t border-border pt-4 text-[13px]">
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Subtotal</dt>
              <dd className="num">{usd(subtotal(o), true)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Shipping</dt>
              <dd className="num">{o.shipping ? usd(o.shipping, true) : 'Free'}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Tax ({taxRate * 100}%)</dt>
              <dd className="num">{usd(tax(o), true)}</dd>
            </div>
            <div className="flex justify-between border-t border-border pt-3 text-[15px] font-medium">
              <dt>Total</dt>
              <dd className="num">{usd(orderTotal(o), true)}</dd>
            </div>
          </dl>

          <div className="mt-auto grid grid-cols-2 gap-2.5 pt-5">
            <Button variant="outline" className="h-10 rounded-[10px] border-border bg-transparent text-[13px]">
              Refund
            </Button>
            <Button className="h-10 rounded-[10px] text-[13px] font-semibold">Fulfil order</Button>
          </div>
        </aside>
      </div>
    </Shell>
  );
}
