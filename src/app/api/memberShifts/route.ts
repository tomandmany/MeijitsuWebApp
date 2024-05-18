import { NextResponse } from 'next/server';
import userShiftsData from '@/data/userShifts.json';

export async function GET(req: Request) {
  return NextResponse.json(userShiftsData);
}
