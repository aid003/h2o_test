// src/app/dashboard/page.tsx
"use client";

import React, { useContext, useState } from "react";
import styles from "./page.module.css";
import { DASHBOARD_TABS } from "@/features/dashboard/model/tabs";
import { DashboardContext } from "@/features/dashboard/model/DashboardContext";
import { SummaryCard } from "@/widgets/summary/ui/SummaryCard";
import { FinanceStatisticsChart } from "@/widgets/finance-statistics-chart/ui/FinanceStatisticsChart";
import { useFinanceStats } from "@/features/finance-statistics/model/useFinanceStats";
import { PeriodTabs } from "@/features/period‑tabs/ui/PeriodTabs";
import ProblemZones from "@/features/problem-zones/ui/ProblemZones";

export default function DashboardPage() {
  const { currentIndex } = useContext(DashboardContext);
  const tab = DASHBOARD_TABS[currentIndex];

  const isWithinCompanySummary = tab.label === "Сводный отчет внутри компании";

  const [period, setPeriod] = useState<"Неделя" | "Месяц" | "Год">("Год");
  const [filter, setFilter] = useState<"ALL" | "B2B" | "B2C">("ALL");
  const { chartData, totals, isLoading } = useFinanceStats(period);

  if (!isWithinCompanySummary) {
    return (
      <div className={styles.container}>
        <h1 className={styles.title}>{tab.label}</h1>
      </div>
    );
  }

  if (isLoading) {
    return <div className={styles.loading}>Loading…</div>;
  }

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
      <div className={styles.wrapperProblem}>
        <ProblemZones
          range={period}
          division={filter === "ALL" ? undefined : filter}
        />
      </div>
    </div>
  );
}
