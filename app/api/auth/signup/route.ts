import { NextResponse } from 'next/server';

export async function POST() {
  return NextResponse.json({ error: 'Sign-up is not configured yet.' }, { status: 501 });
}
