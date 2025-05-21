import { NextResponse } from 'next/server';
import { faker } from '@faker-js/faker';

type OperationType = 'expanses' | 'income' | 'revenue' | 'debt';

export const GET = async () => {
  const divs = ['B2B', 'B2C', 'Marketing', 'Sales'] as const;
  const types: OperationType[] = ['expanses', 'income', 'revenue', 'debt'];

  const data = Array.from({ length: 30 }, () => ({
    division: faker.helpers.arrayElement(divs),
    date: faker.date.recent({ days: 30 }).toISOString(),
    amount: faker.number.int({ min: 5_000, max: 50_000 }),
    type: faker.helpers.arrayElement(types),
  }));

  return NextResponse.json({ data });
};
