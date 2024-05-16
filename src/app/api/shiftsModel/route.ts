import { NextResponse } from 'next/server';
import shiftsModelData from '@/data/shiftsModel.json';

export function GET(req: Request) {
  return NextResponse.json(shiftsModelData);
}
