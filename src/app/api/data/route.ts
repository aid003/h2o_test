import { NextResponse } from 'next/server';
import { faker } from '@faker-js/faker';

const DIVISIONS = ['B2B', 'B2C'] as const;
const TYPES = ['expanses', 'income', 'revenue', 'debt'] as const;

export type OperationType = (typeof TYPES)[number];
export interface Operation {
  division: (typeof DIVISIONS)[number];
  date: string;
  amount: number;
  type: OperationType;
}

export const GET = async (req: Request) => {
  const { searchParams } = new URL(req.url);
  const divisionParam = searchParams.get('division');
  const rangeParam = (searchParams.get('range') as 'week' | 'month' | 'year') ?? 'year';

  // type‑guard, чтобы не «размывать» литералы до string
  const isDivision = (v: unknown): v is 'B2B' | 'B2C' => v === 'B2B' || v === 'B2C';
  const divisionFilter = isDivision(divisionParam) ? divisionParam : undefined;

  const days = rangeParam === 'week' ? 7 : rangeParam === 'month' ? 30 : 365;

  const data: Operation[] = Array.from({ length: 1_000 }, () => ({
    division: divisionFilter ?? faker.helpers.arrayElement(DIVISIONS),
    date: faker.date.recent({ days }).toISOString(),
    amount: faker.number.int({ min: 5_000, max: 80_000 }),
    type: faker.helpers.arrayElement(TYPES),
  }));

  return NextResponse.json({ data });
};