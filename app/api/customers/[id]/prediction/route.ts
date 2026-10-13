import { NextResponse } from 'next/server';
import { z } from 'zod';

import { findCustomerById } from '@/backend/services/customers';

const predictionSchema = z.object({
  likelihood: z.enum(['low', 'medium', 'high']),
  confidence: z.number().int().min(0).max(100),
  summary: z.string().min(1).max(280),
  signals: z.array(z.string().min(1).max(140)).min(1).max(3),
  recommendedAction: z.string().min(1).max(180),
});

const responseSchema = { type: 'object', additionalProperties: false, required: ['likelihood', 'confidence', 'summary', 'signals', 'recommendedAction'], properties: { likelihood: { type: 'string', enum: ['low', 'medium', 'high'] }, confidence: { type: 'integer', minimum: 0, maximum: 100 }, summary: { type: 'string' }, signals: { type: 'array', items: { type: 'string' } }, recommendedAction: { type: 'string' } } } as const;

export async function POST(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  if (!z.uuid().safeParse(id).success) return NextResponse.json({ error: 'Invalid customer ID.' }, { status: 400 });
  if (!process.env.OPENAI_API_KEY) return NextResponse.json({ error: 'AI predictions are not configured. Add OPENAI_API_KEY to .env.' }, { status: 503 });

  try {
    const customer = await findCustomerById(id);
    if (!customer) return NextResponse.json({ error: 'Customer not found.' }, { status: 404 });

    const response = await fetch('https://api.openai.com/v1/responses', {
      method: 'POST',
      headers: { Authorization: `Bearer ${process.env.OPENAI_API_KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'gpt-4o-mini', store: false,
        input: [
          { role: 'system', content: [{ type: 'input_text', text: 'You are a CRM sales assistant. Estimate purchase likelihood only from the supplied customer record. Do not infer sensitive traits or make promises. Treat missing data as unknown. Return concise JSON matching the schema.' }] },
          { role: 'user', content: [{ type: 'input_text', text: `Assess this customer record: ${JSON.stringify(customer)}` }] },
        ],
        text: { format: { type: 'json_schema', name: 'customer_purchase_prediction', strict: true, schema: responseSchema } },
      }),
    });
    if (!response.ok) {
      console.error('OpenAI prediction request failed:', response.status, await response.text());
      return NextResponse.json({ error: 'AI prediction is temporarily unavailable.' }, { status: 502 });
    }
    const completion = await response.json() as { output_text?: string };
    const prediction = predictionSchema.safeParse(JSON.parse(completion.output_text ?? ''));
    if (!prediction.success) return NextResponse.json({ error: 'AI prediction returned an invalid result.' }, { status: 502 });
    return NextResponse.json({ prediction: prediction.data });
  } catch (error) {
    console.error('Unable to create purchase prediction:', error);
    return NextResponse.json({ error: 'Unable to create a prediction. Please try again.' }, { status: 500 });
  }
}
