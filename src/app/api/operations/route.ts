import { Operation } from "@/entities/operation/model/types";
import { NextResponse } from "next/server";

const divisions: Operation["division"][] = ["B2B", "B2C"];
const types: Operation["type"][] = ["expanses", "income", "revenue", "debt"];

function randomDateWithin(days: number): string {
  const now = Date.now();
  const past = now - Math.random() * days * 24 * 60 * 60 * 1000;
  return new Date(past).toISOString().slice(0, 10);
}

function generateMockOperations(count = 200, rangeDays?: number): Operation[] {
  const days = rangeDays ?? 365;
  return Array.from({ length: count }).map(() => {
    const division = divisions[Math.floor(Math.random() * divisions.length)];
    const type = types[Math.floor(Math.random() * types.length)];
    const isMedium = Math.random() < 0.5;
    const amount = isMedium
      ? 
        Math.floor(Math.random() * (50_000 - 10_000 + 1)) + 10_000
      : 
        Math.floor(Math.random() * (5_000_000 - 50_001 + 1)) + 50_001;
    const date = randomDateWithin(days);
    return { division, type, amount, date };
  });
}

export function GET(request: Request) {
  const url = new URL(request.url);
  const divisionParam = url.searchParams.get("division") as
    | Operation["division"]
    | null;
  const rangeParam = url.searchParams.get("range"); 

  let rangeDays: number | undefined;
  switch (rangeParam) {
    case "Неделя":
      rangeDays = 7;
      break;
    case "Месяц":
      rangeDays = 30;
      break;
    case "Год":
      rangeDays = 365;
      break;
  }

  let data = generateMockOperations(200, rangeDays);

  if (divisionParam) {
    data = data.filter((op) => op.division === divisionParam);
  }

  return NextResponse.json({ data });
}
