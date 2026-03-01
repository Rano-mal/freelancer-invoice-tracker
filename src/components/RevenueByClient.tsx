import { MOCK_INVOICES } from "@/lib/mock-data";
import { formatCurrency } from "@/lib/currencies";

export function RevenueByClient() {
  const clientRevenue = MOCK_INVOICES
    .filter(i => i.status === 'Paid')
    .reduce((acc, inv) => {
      acc[inv.clientName] = (acc[inv.clientName] || 0) + inv.convertedTotal;
      return acc;
    }, {} as Record<string, number>);

  const sorted = Object.entries(clientRevenue)
    .sort(([, a], [, b]) => b - a);

  const maxRevenue = sorted[0]?.[1] || 1;

  return (
    <div className="space-y-4">
      {sorted.map(([client, revenue]) => (
        <div key={client} className="space-y-1.5">
          <div className="flex items-center justify-between text-sm">
            <span className="font-medium truncate">{client}</span>
            <span className="text-muted-foreground font-mono text-xs">
              {formatCurrency(revenue, 'USD')}
            </span>
          </div>
          <div className="h-2 rounded-full bg-muted overflow-hidden">
            <div
              className="h-full rounded-full bg-success"
              style={{ width: `${(revenue / maxRevenue) * 100}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
