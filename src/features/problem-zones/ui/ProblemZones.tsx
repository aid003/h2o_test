"use client";

import React from "react";
import { useProblemZones, ProblemZone } from "../model/useProblemZones";
import styles from "./ProblemZones.module.css";

interface Props {
  range: "Неделя" | "Месяц" | "Год";
  division?: "B2B" | "B2C";
}

// Метки типов, можно дополнить
const typeLabels: Record<string, string> = {
  expanses: "Расходы",
  income: "Доходы",
  revenue: "Выручка",
  debt: "Долги",
};

const ProblemZones: React.FC<Props> = ({ range, division }) => {
  const { zones, isLoading, error } = useProblemZones({ range, division });

  if (isLoading) return <div>Загрузка...</div>;
  if (error) return <div className={styles.error}>Ошибка: {error}</div>;

  return (
    <div className={styles.container}>
      <h2 className={styles.header}>Проблемные зоны</h2>
      <ul className={styles.list}>
        {zones.map((z: ProblemZone, idx) => (
          <li key={idx} className={styles.item}>
            <span
              className={`${styles.icon} ${
                z.severity === "high" ? styles.high : styles.medium
              }`}
            />
            <span className={styles.label}>
              {typeLabels[z.type] ?? z.type}
            </span>
            <span className={styles.amount}>
              {z.amount.toLocaleString("ru-RU", {
                style: "currency",
                currency: "RUB",
                minimumFractionDigits: 0,
              })}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProblemZones;
