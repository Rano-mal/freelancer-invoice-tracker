import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, Clock, AlertTriangle, TrendingUp } from "lucide-react";
import { MOCK_INVOICES, MONTHLY_REVENUE, MOCK_EXPENSES } from "@/lib/mock-data";
import { formatCurrency } from "@/lib/currencies";
import { RevenueChart } from "@/components/RevenueChart";
import { RevenueByClient } from "@/components/RevenueByClient";

const Dashboard = () => {
  const paidTotal = MOCK_INVOICES.filter(i => i.status === 'Paid').reduce((sum, i) => sum + i.convertedTotal, 0);
  const pendingTotal = MOCK_INVOICES.filter(i => i.status === 'Sent').reduce((sum, i) => sum + i.convertedTotal, 0);
  const overdueTotal = MOCK_INVOICES.filter(i => i.status === 'Overdue').reduce((sum, i) => sum + i.convertedTotal, 0);
  const totalExpenses = MOCK_EXPENSES.reduce((sum, e) => sum + e.convertedAmount, 0);

  const cards = [
    { title: 'Total Revenue', value: formatCurrency(paidTotal, 'USD'), icon: DollarSign, description: 'Paid invoices (USD)', variant: 'success' as const },
    { title: 'Pending', value: formatCurrency(pendingTotal, 'USD'), icon: Clock, description: 'Awaiting payment', variant: 'warning' as const },
    { title: 'Overdue', value: formatCurrency(overdueTotal, 'USD'), icon: AlertTriangle, description: 'Past due date', variant: 'destructive' as const },
    { title: 'Net Income', value: formatCurrency(paidTotal - totalExpenses, 'USD'), icon: TrendingUp, description: 'Revenue minus expenses', variant: 'default' as const },
  ];

  const variantStyles = {
    success: 'text-success',
    warning: 'text-warning',
    destructive: 'text-destructive',
    default: 'text-foreground',
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Dashboard</h1>
        <p className="text-sm text-muted-foreground mt-1">Financial overview for your freelance business</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((card) => (
          <Card key={card.title}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{card.title}</CardTitle>
              <card.icon className={`h-4 w-4 ${variantStyles[card.variant]}`} />
            </CardHeader>
            <CardContent>
              <div className={`text-2xl font-semibold ${variantStyles[card.variant]}`}>
                {card.value}
              </div>
              <p className="text-xs text-muted-foreground mt-1">{card.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-7">
        <Card className="lg:col-span-4">
          <CardHeader>
            <CardTitle className="text-base">Monthly Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <RevenueChart data={MONTHLY_REVENUE} />
          </CardContent>
        </Card>

        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle className="text-base">Revenue by Client</CardTitle>
          </CardHeader>
          <CardContent>
            <RevenueByClient />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
