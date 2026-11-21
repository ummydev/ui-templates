import { Check, KeyRound, ListFilter, MoreHorizontal, ShieldAlert, ShieldCheck, UserPlus, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { roleCount, roleOrder, statusCount, users, without2fa, type Role, type UserStatus } from '@/data';
import { cn } from '@/lib/utils';
import { Shell } from '@/shell';

const roleStyle: Record<Role, string> = {
  Owner: 'bg-primary/14 text-accent-foreground',
  Admin: 'bg-chart-2/14 text-chart-2',
  Manager: 'bg-chart-3/16 text-[oklch(0.8_0.08_280)]',
  Support: 'bg-chart-4/14 text-chart-4',
  Analyst: 'bg-secondary text-muted-foreground',
};
const statusDot: Record<UserStatus, string> = { Active: 'bg-up', Invited: 'bg-chart-4', Suspended: 'bg-down' };

function Box({ on }: { on?: boolean }) {
  return (
    <span className={cn('flex size-4 items-center justify-center rounded-[5px] border', on ? 'border-primary bg-primary text-primary-foreground' : 'border-input')}>
      {on && <Check className="size-3" strokeWidth={3} />}
    </span>
  );
}

const initials = (n: string) =>
  n
    .split(' ')
    .map((p) => p[0])
    .join('');

export function Users() {
  const selected = users.filter((u) => u.selected).length;
  return (
    <Shell
      active="users"
      title="Users"
      actions={
        <Button className="h-9 gap-1.5 rounded-[10px] px-3.5 text-[13px] font-semibold">
          <UserPlus className="size-4" /> Invite user
        </Button>
      }
    >
      <div className="relative flex h-full flex-col gap-5">
        <div className="grid grid-cols-4 gap-5">
          {[
            { label: 'Staff accounts', value: users.length, note: `${statusCount('Active')} active` },
            { label: 'Pending invites', value: statusCount('Invited'), note: 'expire after 7 days' },
            { label: 'Suspended', value: statusCount('Suspended'), note: 'cannot sign in' },
            { label: 'Active without 2FA', value: without2fa, note: 'should turn it on', warn: true },
          ].map((k) => (
            <div key={k.label} className="tile p-5">
              <div className="flex items-center justify-between text-[13px] text-muted-foreground">
                {k.label}
                {k.warn && <ShieldAlert className="size-4 text-chart-4" />}
              </div>
              <div className="num mt-2.5 text-[30px] leading-none font-medium">{k.value}</div>
              <div className="mt-2 text-[12px] text-muted-foreground">{k.note}</div>
            </div>
          ))}
        </div>

        <section className="tile flex min-h-0 flex-1 flex-col overflow-hidden">
          <div className="flex items-center gap-2 border-b border-border px-5 py-3.5">
            <span className="flex h-8 items-center gap-1.5 rounded-[9px] bg-secondary px-3 text-[12.5px] font-medium">
              All roles <span className="num text-muted-foreground">{users.length}</span>
            </span>
            {roleOrder.map((r) => (
              <span key={r} className="flex h-8 items-center gap-1.5 rounded-[9px] border border-border px-3 text-[12.5px] text-muted-foreground">
                {r} <span className="num">{roleCount(r)}</span>
              </span>
            ))}
            <span className="ml-auto flex h-8 items-center gap-1.5 rounded-[9px] border border-border px-2.5 text-[12.5px] text-muted-foreground">
              <ListFilter className="size-3.5" /> Status: Any
            </span>
          </div>
          <Table className="text-[13px]">
            <TableHeader>
              <TableRow className="border-border hover:bg-transparent [&>th]:h-10 [&>th]:text-[12px] [&>th]:font-medium [&>th]:text-muted-foreground">
                <TableHead className="w-10 pl-5">
                  <Box />
                </TableHead>
                <TableHead>User</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Team</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>2FA</TableHead>
                <TableHead>Last active</TableHead>
                <TableHead className="w-10 pr-5" />
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((u) => (
                <TableRow key={u.email} className={cn('border-border [&>td]:py-2.5', u.selected && 'bg-accent hover:bg-accent')}>
                  <TableCell className="pl-5">
                    <Box on={u.selected} />
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <span className="flex size-8 items-center justify-center rounded-full bg-secondary text-[11px] font-semibold">{initials(u.name)}</span>
                      <div className="leading-tight">
                        <div className="font-medium">{u.name}</div>
                        <div className="code text-[11.5px] text-muted-foreground">{u.email}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className={cn('rounded-md px-2 py-1 text-[12px] font-medium', roleStyle[u.role])}>{u.role}</span>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{u.team}</TableCell>
                  <TableCell>
                    <span className="flex items-center gap-2">
                      <span className={cn('size-1.5 rounded-full', statusDot[u.status])} /> {u.status}
                    </span>
                  </TableCell>
                  <TableCell>
                    {u.twoFactor ? (
                      <span className="flex items-center gap-1.5 text-up">
                        <ShieldCheck className="size-4" /> On
                      </span>
                    ) : (
                      <span className="flex items-center gap-1.5 text-muted-foreground">
                        <KeyRound className="size-4" /> Off
                      </span>
                    )}
                  </TableCell>
                  <TableCell className="text-muted-foreground">{u.lastActive}</TableCell>
                  <TableCell className="pr-5">
                    <MoreHorizontal className="size-4 text-muted-foreground" />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </section>

        <div className="absolute bottom-5 left-1/2 flex -translate-x-1/2 items-center gap-1 rounded-[14px] border border-border bg-popover py-1.5 pr-1.5 pl-4 text-[13px] shadow-[0_20px_50px_-15px_rgba(0,0,0,0.7)]">
          <span className="num mr-3">{selected} selected</span>
          {['Change role', 'Require 2FA', 'Resend invite', 'Suspend'].map((a) => (
            <span key={a} className={cn('flex h-8 items-center rounded-[9px] px-3', a === 'Suspend' ? 'text-down' : 'text-foreground/85')}>
              {a}
            </span>
          ))}
          <span className="mx-1 h-5 w-px bg-border" />
          <span className="flex size-8 items-center justify-center text-muted-foreground">
            <X className="size-4" />
          </span>
        </div>
      </div>
    </Shell>
  );
}
