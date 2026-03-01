import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Download, FileText } from "lucide-react";
import { MOCK_INVOICES, MOCK_EXPENSES, MONTHLY_REVENUE } from "@/lib/mock-data";
import { formatCurrency } from "@/lib/currencies";
import { RevenueChart } from "@/components/RevenueChart";

const Reports = () => {
  const paidTotal = MOCK_INVOICES.filter(i => i.status === 'Paid').reduce((s, i) => s + i.convertedTotal, 0);
  const totalExpenses = MOCK_EXPENSES.reduce((s, e) => s + e.convertedAmount, 0);
  const netIncome = paidTotal - totalExpenses;

  const expensesByCategory = MOCK_EXPENSES.reduce((acc, e) => {
    acc[e.category] = (acc[e.category] || 0) + e.convertedAmount;
    return acc;
  }, {} as Record<string, number>);

  const handleExportCSV = () => {
    const headers = ['Month,Revenue'];
    const rows = MONTHLY_REVENUE.map(m => `${m.month},${m.revenue}`);
    const csv = [...headers, ...rows, '', 'Category,Amount', ...Object.entries(expensesByCategory).map(([c, a]) => `${c},${a.toFixed(2)}`), '', `Net Income,${netIncome.toFixed(2)}`].join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'financial-report.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Reports</h1>
          <p className="text-sm text-muted-foreground mt-1">Financial summaries for tax preparation</p>
        </div>
        <Button onClick={handleExportCSV}>
          <Download className="h-4 w-4 mr-2" />
          Export CSV
        </Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-semibold font-mono text-success">{formatCurrency(paidTotal, 'USD')}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Expenses</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-semibold font-mono text-destructive">{formatCurrency(totalExpenses, 'USD')}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Net Income</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-semibold font-mono">{formatCurrency(netIncome, 'USD')}</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Revenue Trend</CardTitle>
        </CardHeader>
        <CardContent>
          <RevenueChart data={MONTHLY_REVENUE} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Expenses by Category</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {Object.entries(expensesByCategory)
              .sort(([, a], [, b]) => b - a)
              .map(([category, amount]) => (
                <div key={category} className="flex items-center justify-between py-1">
                  <span className="text-sm">{category}</span>
                  <span className="font-mono text-sm text-muted-foreground">{formatCurrency(amount, 'USD')}</span>
                </div>
              ))}
            <Separator />
            <div className="flex items-center justify-between py-1">
              <span className="text-sm font-semibold">Total</span>
              <span className="font-mono text-sm font-semibold">{formatCurrency(totalExpenses, 'USD')}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Reports;
