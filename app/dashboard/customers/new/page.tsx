'use client'

import React, { type ChangeEvent, type FormEvent, useState } from 'react'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

function Customers() {
    type CustomerFormData = {
        name: string;
        email: string;
        phone: string;
        address: string;
        interaction: string;
        productsEnquired: string;
        productsBought: string;
        source: string[];
        notes: string;
    };

    const [formData, setFormData] = useState<CustomerFormData>({
        name: '',
        email: '',
        phone: '',
        address: '',
        interaction: '',
        productsEnquired: '',
        productsBought: '',
        source: [],
        notes: '',
    });
    const [loading, setLoading] = useState(false);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setFormData((prev) => ({ ...prev, [id]: value }));
    };

const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;

    setFormData((prev) => {
    
        let updatedSource = [...prev.source];

        if (checked) {
          
            updatedSource.push(value);
        } else {

            updatedSource = updatedSource.filter((source) => source !== value);
        }

        return {
            ...prev,
            source: updatedSource,
        };
    });
};

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await fetch('/api/customers', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });
            if (!res.ok) {
                const payload = await res.json().catch(() => null);
                throw new Error(payload?.error ?? 'Failed to register customer');
            }
            alert('Customer registered!');
            setFormData({
                name: '', email: '', phone: '', address: '', interaction: '',
                productsEnquired: '', productsBought: '', source: [], notes: '',
            });
        } catch (err) {
            console.error(err);
            alert(err instanceof Error ? err.message : 'Something went wrong.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-background px-4 py-10 font-mono text-foreground">
            <form onSubmit={handleSubmit} className="max-w-3xl mx-auto space-y-6">

                <div>
                    <h1 className="text-2xl font-semibold text-foreground">Register Customer</h1>
                    <p className="mt-1 text-sm text-muted-foreground">Add a new customer record to the CRM.</p>
                </div>

                {/* Contact details */}
                <Card className="p-6">
                    <h2 className="mb-4 text-sm font-medium text-foreground">Contact details</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                            <Label htmlFor="name">Name</Label>
                            <Input id="name" type="text" placeholder="Full name" value={formData.name} onChange={handleChange} required />
                        </div>
                        <div className="space-y-1.5">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" type="email" placeholder="name@example.com" value={formData.email} onChange={handleChange} required />
                        </div>
                        <div className="space-y-1.5">
                            <Label htmlFor="phone">Phone</Label>
                            <Input id="phone" type="tel" placeholder="Phone number" value={formData.phone} onChange={handleChange} required />
                        </div>
                        <div className="space-y-1.5">
                            <Label htmlFor="address">Address</Label>
                            <Input id="address" type="text" placeholder="Address" value={formData.address} onChange={handleChange} />
                        </div>
                    </div>
                </Card>

                {/* Interaction details */}
                <Card className="p-6">
                    <h2 className="mb-4 text-sm font-medium text-foreground">Interaction details</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                            <Label htmlFor="interaction">Customer interaction</Label>
                            <Input id="interaction" type="text" placeholder="e.g. Store visit, call, chat" value={formData.interaction} onChange={handleChange} />
                        </div>
                        <div className="space-y-1.5">
                            <Label htmlFor="productsEnquired">Products enquired</Label>
                            <Input id="productsEnquired" type="text" placeholder="Products asked about" value={formData.productsEnquired} onChange={handleChange} />
                        </div>
                        <div className="space-y-1.5">
                            <Label htmlFor="productsBought">Products bought</Label>
                            <Input id="productsBought" type="text" placeholder="Products purchased" value={formData.productsBought} onChange={handleChange} />
                        </div>
                        <div className="space-y-1.5">
                            <Label htmlFor="notes">Notes</Label>
                            <Input id="notes" type="text" placeholder="Additional notes" value={formData.notes} onChange={handleChange} />
                        </div>
                    </div>
                </Card>

                {/* Source */}
                <Card className="p-6">
                    <h2 className="mb-4 text-sm font-medium text-foreground">Source</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        {[
                            { id: 'whatsapp', label: 'Whatsapp', value: 'Whatsapp' },
                            { id: 'instagram', label: 'Instagram', value: 'Instagram' },
                            { id: 'facebook', label: 'Facebook', value: 'Facebook' },
                        ].map((opt) => (
                            <div key={opt.id} className="flex items-center gap-2 rounded-md border border-border px-3 py-2">
                                <input
                                    type="checkbox"
                                    id={opt.id}
                                    value={opt.value}
                                    checked={formData.source.includes(opt.value)}
                                    onChange={handleCheckboxChange}
                                />
                                <label htmlFor={opt.id} className="text-sm text-foreground">{opt.label}</label>
                            </div>
                        ))}
                    </div>
                </Card>

                <div className="flex justify-end">
                    <Button type="submit" variant="default" className="px-8" disabled={loading}>
                        {loading ? 'Registering...' : 'Register Customer'}
                    </Button>
                </div>
            </form>
        </div>
    )
}

export default Customers
