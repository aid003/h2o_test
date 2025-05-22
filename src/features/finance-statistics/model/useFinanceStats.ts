import useSWR from "swr";
import React from "react";
import { Operation, OperationType } from "@/entities/operation/model/types";
import { getOperations } from "@/entities/operation/api/getOperations";

const MONTH_LABELS = [
  "Янв",
  "Фев",
  "Мар",
  "Апр",
  "Май",
  "Июн",
  "Июл",
  "Авг",
  "Сен",
  "Окт",
  "Ноя",
  "Дек",
];

export interface ChartPoint {
  month: string;
  revenue: number;
  expanses: number;
  income: number;
  debt: number;
}
export interface Totals extends Record<OperationType | "total", number> {}

export const useFinanceStats = (range: "Неделя" | "Месяц" | "Год") => {
  const { data, isLoading } = useSWR(["/api/data", { range }], getOperations);

  const stats = React.useMemo(() => {
    const makeInit = (): ChartPoint[] =>
      MONTH_LABELS.map((m) => ({
        month: m,
        revenue: 0,
        expanses: 0,
        income: 0,
        debt: 0,
      }));

    const init = {
      ALL: makeInit(),
      B2B: makeInit(),
      B2C: makeInit(),
    } as Record<"ALL" | "B2B" | "B2C", ChartPoint[]>;

    const totals: Record<"ALL" | "B2B" | "B2C", Totals> = {
      ALL: { revenue: 0, expanses: 0, income: 0, debt: 0, total: 0 },
      B2B: { revenue: 0, expanses: 0, income: 0, debt: 0, total: 0 },
      B2C: { revenue: 0, expanses: 0, income: 0, debt: 0, total: 0 },
    };

    (data?.data ?? []).forEach((op: Operation) => {
      const idx = new Date(op.date).getMonth();
      init[op.division][idx][op.type] += op.amount;
      totals[op.division][op.type] += op.amount;
      init.ALL[idx][op.type] += op.amount;
      totals.ALL[op.type] += op.amount;
    });

    totals.ALL.total = totals.ALL.revenue - totals.ALL.expanses;
    totals.B2B.total = totals.B2B.revenue - totals.B2B.expanses;
    totals.B2C.total = totals.B2C.revenue - totals.B2C.expanses;

    return { chartData: init, totals };
  }, [data]);

  return { ...stats, isLoading };
};
