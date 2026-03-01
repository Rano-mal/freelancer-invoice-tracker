import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus } from "lucide-react";
import { MOCK_INVOICES, type Invoice, type InvoiceStatus } from "@/lib/mock-data";
import { formatCurrency } from "@/lib/currencies";
import { CreateInvoiceDialog } from "@/components/CreateInvoiceDialog";

const statusVariant: Record<InvoiceStatus, string> = {
  Paid: 'bg-success/10 text-success border-success/20',
  Sent: 'bg-blue-500/10 text-blue-600 border-blue-500/20',
  Draft: 'bg-muted text-muted-foreground border-border',
  Overdue: 'bg-destructive/10 text-destructive border-destructive/20',
};

const Invoices = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Invoices</h1>
          <p className="text-sm text-muted-foreground mt-1">Manage and track all your invoices</p>
        </div>
        <Button onClick={() => setOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          New Invoice
        </Button>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Invoice</TableHead>
                <TableHead>Client</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead className="text-right">Amount</TableHead>
                <TableHead className="text-right">USD Equivalent</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {MOCK_INVOICES.map((inv) => (
                <TableRow key={inv.id}>
                  <TableCell className="font-medium font-mono text-sm">{inv.number}</TableCell>
                  <TableCell>{inv.clientName}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className={statusVariant[inv.status]}>
                      {inv.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{inv.dueDate}</TableCell>
                  <TableCell className="text-right font-mono text-sm">
                    {formatCurrency(inv.total, inv.currency)}
                  </TableCell>
                  <TableCell className="text-right font-mono text-sm text-muted-foreground">
                    {inv.currency !== 'USD' ? formatCurrency(inv.convertedTotal, 'USD') : '—'}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <CreateInvoiceDialog open={open} onOpenChange={setOpen} />
    </div>
  );
};

export default Invoices;
