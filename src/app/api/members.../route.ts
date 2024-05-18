import { NextResponse } from 'next/server';
import membersData from '@/data/members.json';

export function GET(req: Request) {
  return NextResponse.json(membersData);
}