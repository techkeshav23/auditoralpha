/** The two live systems, joined by the two-hourly reconciliation. */
export function LivePair() {
  const box = (name: string, role: string) => (
    <div className="flex flex-col items-center justify-center rounded-xl border border-rule bg-card px-3 py-4 text-center">
      <b className="block text-lg leading-tight font-semibold text-ink">{name}</b>
      <span className="text-[12.5px] whitespace-nowrap text-muted">{role}</span>
      <span className="mt-2.5 flex items-center justify-center gap-1.5 font-mono text-[10.5px] font-semibold tracking-[0.08em] text-green uppercase before:size-1.5 before:rounded-full before:bg-green">
        Live
      </span>
    </div>
  );
  return (
    <div className="grid grid-cols-[1fr_auto_1fr] items-stretch">
      {box("HubSpot", "CRM · deals")}
      <div className="flex items-center">
        <div className="relative h-0.5 w-16 bg-[repeating-linear-gradient(to_right,var(--color-ink)_0_6px,transparent_6px_11px)] opacity-75 sm:w-24">
          <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-[5px] border border-rule bg-paper px-1.5 py-1 font-mono text-[10.5px] font-semibold whitespace-nowrap text-ink">
            every 2h
          </span>
        </div>
      </div>
      {box("Xero", "Ledger · invoices")}
    </div>
  );
}
