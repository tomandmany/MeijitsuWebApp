import { NextResponse } from 'next/server';
import membersData from '@/data/members.json';

export async function GET(req: Request) {
  return NextResponse.json(membersData);
}
