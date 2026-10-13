'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'


interface Customer {
    id: string;
    name: string;
    email: string;
    phone: string;
    address: string | null;
    productsBought: string | null;
    source: string[];
    createdAt: string;
}


function CustomersPage() {
    const [customers, setCustomers] = useState<Customer[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        async function fetchCustomers() {
            try {
                const res = await fetch('/api/customers');
    //            if (!res.ok) throw new Error('Failed to load customers');
                const data = await res.json();
                setCustomers(data);
            } catch (err) {
                console.error(err);
                setError('Could not load customers.');
            } finally {
                setLoading(false);
            }
        }
        fetchCustomers();
    }, []);

    if (loading) return <p className="p-6 text-muted-foreground">Loading customers...</p>;
    if (error) return <p className="p-6 text-destructive">{error}</p>;

    return (
        <div className="p-6">
            <div className="flex items-center justify-between mb-4">
                <h1 className="text-2xl font-semibold text-foreground">Customers</h1>
                <Link href="/dashboard/customers/new">
                    <Button>Add Customer</Button>
                </Link>
            </div>

            <div className="overflow-x-auto rounded-lg border border-border bg-card text-card-foreground shadow-sm">
                <table className="min-w-full divide-y divide-border">
                    <thead className="bg-muted/50">
                        <tr>
                            <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase">Name</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase">Email</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase">Phone</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase">Source</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase">Added</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                        {customers.length === 0 ? (
                            <tr>
                                <td colSpan={5} className="px-4 py-6 text-center text-muted-foreground">
                                    No customers yet.
                                </td>
                            </tr>
                        ) : (
                            customers.map((c) => (
                                <tr key={c.id} className="hover:bg-muted/50">
                                    <td className="px-4 py-3 text-sm text-foreground">{c.name}</td>
                                    <td className="px-4 py-3 text-sm text-muted-foreground">{c.email}</td>
                                    <td className="px-4 py-3 text-sm text-muted-foreground">{c.phone}</td>
                                    <td className="px-4 py-3 text-sm text-muted-foreground">{c.source.join(', ')}</td>
                                    <td className="px-4 py-3 text-sm text-muted-foreground">
                                        {new Date(c.createdAt).toLocaleDateString()}
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default CustomersPage
