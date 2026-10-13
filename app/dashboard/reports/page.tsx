import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function ReportsPage() {
  return <Card><CardHeader><CardTitle>Reports</CardTitle><CardDescription>See customer and sales performance insights in one place.</CardDescription></CardHeader><CardContent><p className="text-sm text-muted-foreground">Reports will appear here as customer and sales activity is recorded.</p></CardContent></Card>;
}
