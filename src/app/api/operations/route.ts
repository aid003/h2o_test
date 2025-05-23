// src/app/api/operations/route.ts
import { Operation } from "@/entities/operation/model/types";
import { NextResponse } from "next/server";

// Все возможные подразделения и типы операций
const divisions: Operation["division"][] = ["B2B", "B2C"];
const types: Operation["type"][] = ["expanses", "income", "revenue", "debt"];

/**
 * Возвращает случайную дату в формате YYYY-MM-DD
 * в пределах последних `days` дней.
 */
function randomDateWithin(days: number): string {
  const now = Date.now();
  const past = now - Math.random() * days * 24 * 60 * 60 * 1000;
  return new Date(past).toISOString().split("T")[0];
}

/**
 * Генерирует `count` операций.
 * Если указан `rangeDays`, даты будут в пределах этого числа дней.
 * Иначе — в пределах года.
 */
function generateMockOperations(count = 200, rangeDays?: number): Operation[] {
  const days = rangeDays ?? 365;
  return Array.from({ length: count }, () => ({
    division: divisions[Math.floor(Math.random() * divisions.length)],
    type: types[Math.floor(Math.random() * types.length)],
    amount: Math.floor(Math.random() * 5_000_000) + 1_000, // от 1 000 до 5 001 000
    date: randomDateWithin(days),
  }));
}

export function GET(request: Request) {
  const url = new URL(request.url);
  const divisionParam = url.searchParams.get("division") as Operation["division"] | null;
  const rangeParam = url.searchParams.get("range"); // "Неделя" | "Месяц" | "Год"
  
  // Определяем, за какой период генерировать
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

  // Сгенерим 200 операций в нужном диапазоне
  let data = generateMockOperations(200, rangeDays);

  // Если передано конкретное подразделение — отфильтруем
  if (divisionParam) {
    data = data.filter((op) => op.division === divisionParam);
  }

  return NextResponse.json({ data });
}
