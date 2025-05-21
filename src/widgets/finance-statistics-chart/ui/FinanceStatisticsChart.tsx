// src/widgets/finance-statistics-chart/ui/FinanceStatisticsChart.tsx
"use client";

import { Line } from "react-chartjs-2";
import type { ChartOptions } from "chart.js";

import "@/shared/lib/registerChart"; // регистрируем контроллеры Chart.js
import { useFinanceStats } from "@/features/finance-statistics/model/useFinanceStats";
import { Loader } from "@/shared/ui/Loader/Loader";

import styles from "./FinanceStatisticsChart.module.css";

/* ---------- константы ---------- */

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

/* ---------- компонент ---------- */

export const FinanceStatisticsChart = () => {
  const { chartData, totals, isLoading } = useFinanceStats();
  if (isLoading) return <Loader />;

  /* данные для Chart.js */
  const labels = chartData.map((p) => p.month);

  const datasets = [
    {
      label: LABELS.revenue,
      data: chartData.map((p) => p.revenue),
      borderColor: COLORS.revenue,
      pointRadius: 0,
      tension: 0.4,
    },
    {
      label: LABELS.expanses,
      data: chartData.map((p) => p.expanses),
      borderColor: COLORS.expanses,
      pointRadius: 0,
      tension: 0.4,
    },
    {
      label: LABELS.income,
      data: chartData.map((p) => p.income),
      borderColor: COLORS.income,
      pointRadius: 0,
      tension: 0.4,
    },
    {
      label: LABELS.debt,
      data: chartData.map((p) => p.debt),
      borderColor: COLORS.debt,
      pointRadius: 0,
      tension: 0.4,
    },
    {
      label: LABELS.total,
      data: chartData.map((p) => p.revenue - p.expanses),
      borderColor: COLORS.total,
      borderDash: [6, 4],
      pointRadius: 0,
      tension: 0.4,
    },
  ];

  /* опции графика */
  const options: ChartOptions<"line"> = {
    maintainAspectRatio: false,
    interaction: { mode: "nearest", intersect: false },
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (ctx) => {
            const value = ctx.parsed.y ?? 0;
            return `${ctx.dataset.label}: ${value.toLocaleString("ru-RU")} ₽`;
          },
        },
      },
    },
    scales: {
      x: { grid: { display: false }, ticks: { font: { size: 12 } } },
      y: {
        ticks: {
          font: { size: 12 },
          callback: (v: string | number) => Number(v).toLocaleString("ru-RU"),
        },
      },
    },
  };

  /* ---------- render ---------- */

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Общая статистика</h2>

      <div className={styles.chartWrapper}>
        <Line data={{ labels, datasets }} options={options} />
      </div>

      {/* кастомная легенда */}
      <div className={styles.legend}>
        {Object.entries(totals as Record<string, number>).map(([k, v]) => (
          <div key={k} className={styles.legendItem}>
            <span
              className={styles.bullet}
              style={{ background: COLORS[k as keyof typeof COLORS] }}
            />
            <span>
              {LABELS[k as keyof typeof LABELS]}:&nbsp;
              <b>{v.toLocaleString("ru-RU")} ₽</b>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
