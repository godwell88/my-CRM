// app/api/customers/route.ts
import { createCustomer, listCustomers } from '@/backend/services/customers';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
    
    try {
        const data = await request.json();
        const customer = await createCustomer(data);
        return NextResponse.json(customer, { status: 201 });

    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Failed to create customer' }, { status: 500 });
        
    }
    console.log('DATABASE_URL in use:', process.env.DATABASE_URL);
}

export async function GET() {
    const customers = await listCustomers();
    return NextResponse.json(customers);
}
