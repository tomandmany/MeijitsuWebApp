import { NextResponse } from 'next/server';
import membersData from '@/data/members.json';

export function GET(request: Request, { params }: { params: { id: string } }) {
  const memberId = params.id;
  const member = membersData.members.find((m) => m.id === memberId);

  if (!member) {
    return NextResponse.json({ error: 'Member not found' }, { status: 404 });
  }
  return NextResponse.json(member);
}
