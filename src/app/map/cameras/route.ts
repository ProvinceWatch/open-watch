import axios from 'axios';
import { NextResponse } from 'next/server';
 
export async function GET() {
  const res = await axios.get('https://511.alberta.ca/api/v2/get/cameras', {});
  const data = res.data;
  return NextResponse.json({ data });
}