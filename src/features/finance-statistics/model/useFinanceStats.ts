import useSWR from 'swr';
import { getOperations } from '@/entities/operation/api/getOperations';
import { Operation, OperationType } from '@/entities/operation/model/types';
import React from 'react';

const monthLabels = ['Янв','Фев','Мар','Апр','Май','Июн','Июл','Авг','Сен','Окт','Ноя','Дек'];

interface ChartPoint {
  month: string;
  revenue: number;
  expanses: number;
  income: number;
  debt: number;
}

interface Totals extends Record<OperationType | 'total', number> {}

export const useFinanceStats = () => {
  const { data, isLoading } = useSWR('/api/data', getOperations);

  const stats = React.useMemo(() => {
    const init: ChartPoint[] = monthLabels.map((m) => ({
      month: m, revenue: 0, expanses: 0, income: 0, debt: 0,
    }));
    const totals: Totals = {
      revenue: 0, expanses: 0, income: 0, debt: 0, total: 0,
    };

    (data?.data ?? []).forEach((op: Operation) => {
      const m = new Date(op.date).getMonth();
      init[m][op.type] += op.amount;
      totals[op.type] += op.amount;
    });
    totals.total = totals.revenue - totals.expanses;

    return { chartData: init, totals };
  }, [data]);

  return { ...stats, isLoading };
};
