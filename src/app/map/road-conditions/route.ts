import { NextResponse } from 'next/server';
 
export async function GET() {
  const res = await fetch('https://511.alberta.ca/api/v2/get/winterroads', { next: { revalidate: 300 } });
  const data = await res.json();
  return NextResponse.json({ data });
}