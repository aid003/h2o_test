"use client";

import { Line } from "react-chartjs-2";
import type { ChartOptions } from "chart.js";

import "@/shared/lib/registerChart";
import {
  ChartPoint,
  Totals,
} from "@/features/finance-statistics/model/useFinanceStats";

import styles from "./FinanceStatisticsChart.module.css";
import { JSX } from "react";

const COLORS = {
  revenue: "#22c55e",
  expanses: "#06b6d4",
  income: "#3b82f6",
  debt: "#eab308",
  total: "#a855f7",
} as const;

const LABELS = {
  revenue: "Выручка",
  expanses: "Затраты",
  income: "Прибыль",
  debt: "Задолженность",
  total: "Итог",
} as const;

type Metric = keyof typeof LABELS;

interface Props {
  data: ChartPoint[];
  totals: Totals;
  header?: React.ReactNode;
}

export const FinanceStatisticsChart = ({
  data,
  totals,
  header,
}: Props): JSX.Element => {
  const labels = data.map((p) => p.month);

  const datasets = [
    {
      label: LABELS.revenue,
      data: data.map((p) => p.revenue),
      borderColor: COLORS.revenue,
      pointRadius: 3,
      pointHoverRadius: 6,
      tension: 0.4,
    },
    {
      label: LABELS.expanses,
      data: data.map((p) => p.expanses),
      borderColor: COLORS.expanses,
      pointRadius: 3,
      pointHoverRadius: 6,
      tension: 0.4,
    },
    {
      label: LABELS.income,
      data: data.map((p) => p.income),
      borderColor: COLORS.income,
      pointRadius: 3,
      pointHoverRadius: 6,
      tension: 0.4,
    },
    {
      label: LABELS.debt,
      data: data.map((p) => p.debt),
      borderColor: COLORS.debt,
      pointRadius: 3,
      pointHoverRadius: 6,
      tension: 0.4,
    },
    {
      label: LABELS.total,
      data: data.map((p) => p.revenue - p.expanses),
      borderColor: COLORS.total,
      borderDash: [6, 4],
      pointRadius: 3,
      pointHoverRadius: 6,
      tension: 0.4,
    },
  ];

  const options: ChartOptions<"line"> = {
    maintainAspectRatio: false,
    interaction: { mode: "nearest", intersect: false },
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (ctx) =>
            `${ctx.dataset.label}: ${ctx.parsed.y?.toLocaleString("ru-RU")} ₽`,
        },
      },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { font: { size: 12 } },
      },
      y: {
        ticks: {
          font: { size: 12 },
          callback: (v: string | number) =>
            Number(v).toLocaleString("ru-RU"),
        },
      },
    },
  };

  return (
    <div className={styles.container}>
      {header && <div className={styles.header}>{header}</div>}

      <div className={styles.chartWrapper}>
        <Line data={{ labels, datasets }} options={options} />
      </div>

      <div className={styles.legend}>
        {(
          Object.entries(totals) as [Metric, number][]
        ).map(([k, v]) => (
          <div key={k} className={styles.legendItem}>
            <span
              className={styles.bullet}
              style={{ background: COLORS[k] }}
            />
            <span>
              {LABELS[k]}:&nbsp;
              <b>{v.toLocaleString("ru-RU")} ₽</b>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
