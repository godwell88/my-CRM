import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({ error: 'User management is not configured yet.' }, { status: 501 });
}
