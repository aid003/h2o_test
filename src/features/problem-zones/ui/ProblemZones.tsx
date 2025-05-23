"use client";

import React from "react";
import { useProblemZones, ProblemZone } from "../model/useProblemZones";
import styles from "./ProblemZones.module.css";

interface Props {
  range: "Неделя" | "Месяц" | "Год";
  division?: "B2B" | "B2C";
}

const typeLabels: Record<string, string> = {
  expanses: "Расходы",
  income: "Доходы",
  revenue: "Выручка",
  debt: "Долги",
};

const ProblemZones: React.FC<Props> = ({ range, division }) => {
  const { zones, isLoading, error } = useProblemZones({ range, division });

  if (isLoading) return <div className={styles.status}>Загрузка...</div>;
  if (error) return <div className={styles.status}>Ошибка: {error}</div>;

  return (
    <div className={styles.container}>
      <h2 className={styles.header}>Проблемные зоны</h2>
      <ul className={styles.list}>
        {zones.map((z: ProblemZone, idx) => {
          const src =
            z.severity === "high" ? "/red-alert.svg" : "/warning-alert.svg";
          return (
            <li key={idx} className={styles.item}>
              <img
                src={src}
                alt=""
                width={30}
                height={30}
                className={styles.iconSvg}
              />
              <div className={styles.text}>
                <span className={styles.label}>
                  {typeLabels[z.type] ?? z.type}
                </span>
                <span className={styles.amount}>
                  ₽{" "}
                  {z.amount.toLocaleString("ru-RU", {
                    minimumFractionDigits: 0,
                  })}
                </span>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ProblemZones;
