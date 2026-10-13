'use client';

import { useCallback, useEffect, useState } from 'react';
import { BarChart3, BrainCircuit, Mail, RefreshCw, Sparkles, Users } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

type Customer = {
  id: string; name: string; email: string; phone: string; address: string | null;
  interaction: string | null; productsEnquired: string | null; productsBought: string | null;
  notes: string | null; source: string[]; createdAt: string;
};
type Prediction = { likelihood: 'low' | 'medium' | 'high'; confidence: number; summary: string; signals: string[]; recommendedAction: string };

const likelihoodStyles = { low: 'bg-slate-100 text-slate-700 ring-slate-200', medium: 'bg-amber-50 text-amber-800 ring-amber-200', high: 'bg-emerald-50 text-emerald-800 ring-emerald-200' };

function Detail({ label, value }: { label: string; value: string | null }) {
  return <div className="rounded-lg border border-border/70 bg-muted/30 px-3 py-2.5"><p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{label}</p><p className="mt-1 break-words text-sm text-foreground">{value || 'Not provided'}</p></div>;
}

export default function DashboardPage() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [predictions, setPredictions] = useState<Record<string, Prediction>>({});
  const [predictingId, setPredictingId] = useState<string | null>(null);

  const loadCustomers = useCallback(async () => {
    setLoading(true); setError(null);
    try {
      const response = await fetch('/api/customers');
      const payload = await response.json().catch(() => null);
      if (!response.ok) throw new Error(payload?.error ?? 'Unable to load customers.');
      setCustomers(Array.isArray(payload) ? payload : payload.customers ?? []);
    } catch (loadError) {
      setError(loadError instanceof Error ? loadError.message : 'Unable to load customers.');
    } finally { setLoading(false); }
  }, []);

  useEffect(() => {
    const timeout = window.setTimeout(() => { void loadCustomers(); }, 0);
    return () => window.clearTimeout(timeout);
  }, [loadCustomers]);

  const predictPurchase = async (customerId: string) => {
    setPredictingId(customerId); setError(null);
    try {
      const response = await fetch(`/api/customers/${customerId}/prediction`, { method: 'POST' });
      const payload = await response.json().catch(() => null);
      if (!response.ok) throw new Error(payload?.error ?? 'Unable to create a prediction.');
      setPredictions((current) => ({ ...current, [customerId]: payload.prediction }));
    } catch (predictionError) {
      setError(predictionError instanceof Error ? predictionError.message : 'Unable to create a prediction.');
    } finally { setPredictingId(null); }
  };

  const highIntent = Object.values(predictions).filter((prediction) => prediction.likelihood === 'high').length;

  return <div className="mx-auto max-w-7xl space-y-6 font-mono">
    <section className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end"><div><p className="mb-2 flex items-center gap-2 text-sm font-medium text-primary"><Sparkles className="size-4" /> Customer intelligence</p><h2 className="text-3xl font-semibold tracking-tight">Customer dashboard</h2><p className="mt-2 text-muted-foreground">Review every customer detail and ask AI for a purchase-likelihood estimate.</p></div><Button variant="outline" onClick={() => void loadCustomers()} disabled={loading}><RefreshCw className={loading ? 'animate-spin' : ''} /> Refresh</Button></section>

    <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      <Card><CardHeader className="flex-row items-center gap-3 space-y-0"><Users className="size-5 text-primary" /><CardTitle>Total customers</CardTitle></CardHeader><CardContent><p className="text-3xl font-semibold">{customers.length}</p></CardContent></Card>
      <Card><CardHeader className="flex-row items-center gap-3 space-y-0"><BrainCircuit className="size-5 text-primary" /><CardTitle>High-intent customers</CardTitle></CardHeader><CardContent><p className="text-3xl font-semibold">{highIntent}</p></CardContent></Card>
      <Card><CardHeader className="flex-row items-center gap-3 space-y-0"><BarChart3 className="size-5 text-primary" /><CardTitle>Predictions run</CardTitle></CardHeader><CardContent><p className="text-3xl font-semibold">{Object.keys(predictions).length}</p></CardContent></Card>
    </section>
    {error && <div role="alert" className="rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">{error}</div>}
    {loading ? <div className="grid gap-5 lg:grid-cols-2">{[0, 1, 2, 3].map((index) => <Card key={index} className="h-96 animate-pulse bg-muted/50" />)}</div> : customers.length === 0 ? <Card className="border-dashed py-10 text-center"><CardContent><Users className="mx-auto mb-3 size-8 text-muted-foreground" /><CardTitle>No customers yet</CardTitle><CardDescription className="mt-2">Register your first customer to see their details and purchase prediction here.</CardDescription></CardContent></Card> : <section className="grid gap-5 lg:grid-cols-2">
      {customers.map((customer) => {
        const prediction = predictions[customer.id]; const isPredicting = predictingId === customer.id;
        return <Card key={customer.id} className="overflow-visible"><CardHeader><div className="flex items-start justify-between gap-3"><div><CardTitle className="text-xl">{customer.name}</CardTitle><CardDescription className="mt-1">Customer since {new Date(customer.createdAt).toLocaleDateString()}</CardDescription></div>{prediction && <span className={`rounded-full px-2.5 py-1 text-xs font-semibold capitalize ring-1 ${likelihoodStyles[prediction.likelihood]}`}>{prediction.likelihood} intent</span>}</div></CardHeader><CardContent className="space-y-5"><div className="grid gap-2 sm:grid-cols-2"><Detail label="Email" value={customer.email} /><Detail label="Phone" value={customer.phone} /><Detail label="Address" value={customer.address} /><Detail label="Interaction" value={customer.interaction} /><Detail label="Products enquired" value={customer.productsEnquired} /><Detail label="Products bought" value={customer.productsBought} /><Detail label="Source" value={customer.source.join(', ')} /><Detail label="Notes" value={customer.notes} /></div>{prediction && <div className="rounded-xl border border-primary/20 bg-primary/5 p-4"><div className="flex items-center justify-between gap-4"><p className="flex items-center gap-2 font-medium"><BrainCircuit className="size-4 text-primary" /> AI purchase estimate</p><span className="text-sm font-semibold">{prediction.confidence}% confidence</span></div><p className="mt-3 text-sm text-muted-foreground">{prediction.summary}</p><ul className="mt-3 space-y-1 text-sm">{prediction.signals.map((signal) => <li key={signal}>• {signal}</li>)}</ul><p className="mt-3 rounded-md bg-background/70 p-2 text-sm"><strong>Next step:</strong> {prediction.recommendedAction}</p><p className="mt-3 text-xs text-muted-foreground">AI estimate only. Review the customer record before taking action.</p></div>}</CardContent><CardFooter className="justify-between gap-3"><span className="flex items-center gap-1.5 text-xs text-muted-foreground"><Mail className="size-3.5" /> {customer.email}</span><Button onClick={() => void predictPurchase(customer.id)} disabled={isPredicting}><BrainCircuit className={isPredicting ? 'animate-pulse' : ''} /> {isPredicting ? 'Predicting…' : prediction ? 'Refresh prediction' : 'Predict purchase'}</Button></CardFooter></Card>;
      })}
    </section>}
  </div>;
}
