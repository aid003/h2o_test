"use client";

import React from "react";
import styles from "./page.module.css";
import { SummaryCard } from "@/widgets/summary/ui/SummaryCard";
import { FinanceStatisticsChart } from "@/widgets/finance-statistics-chart/ui/FinanceStatisticsChart";
import { useFinanceStats } from "@/features/finance-statistics/model/useFinanceStats";
import { PeriodTabs } from "@/features/period‑tabs/ui/PeriodTabs";

export default function DashboardPage() {
  const [period, setPeriod] = React.useState<"Неделя" | "Месяц" | "Год">("Год");
  const [filter, setFilter] = React.useState<"ALL" | "B2B" | "B2C">("ALL");

  const { chartData, totals, isLoading } = useFinanceStats(period);

  if (isLoading) return <div className={styles.loading}>Loading…</div>;

  const randPct = () => Math.floor(Math.random() * 200 - 100);

  return (
    <div className={styles.container}>
      <div className={styles.wrapperChart}>
        <h1 className={styles.title}>Сводный отчет</h1>
        <div className={styles.cards}>
          <SummaryCard
            title="Итоги"
            amount={totals.ALL.total}
            deltaPercent={randPct()}
            active={filter === "ALL"}
            onClick={() => setFilter("ALL")}
          />
          <SummaryCard
            title="B2B"
            amount={totals.B2B.revenue}
            deltaPercent={randPct()}
            active={filter === "B2B"}
            onClick={() => setFilter("B2B")}
          />
          <SummaryCard
            title="B2C"
            amount={totals.B2C.revenue}
            deltaPercent={randPct()}
            active={filter === "B2C"}
            onClick={() => setFilter("B2C")}
          />
        </div>

        <FinanceStatisticsChart
          data={chartData[filter]}
          totals={totals[filter]}
          header={<PeriodTabs value={period} onChange={setPeriod} />}
        />
      </div>
      <div className={styles.wrapperProblem}></div>
    </div>
  );
}
