import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const res = await fetch('https://511.alberta.ca/api/v2/get/alerts', { next: { revalidate: 60 } });
    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json([])
  }
}

export const dynamic = "force-dynamic";
export const revalidate = 10;