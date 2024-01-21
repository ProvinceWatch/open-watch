import { NextResponse } from 'next/server';
 
export async function GET() {
  const res = await fetch('https://511.alberta.ca/api/v2/get/winterroads', { cache: 'no-store' });
  const data = await res.json();
  return NextResponse.json({ data });
}