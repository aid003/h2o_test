// PeriodTabs.tsx
"use client";
import { clsx } from 'clsx';
import styles from './PeriodTabs.module.css';

interface Props {
  value: 'Неделя' | 'Месяц' | 'Год';
  onChange(v: Props['value']): void;
}

const OPTIONS: Props['value'][] = ['Неделя', 'Месяц', 'Год'];

export const PeriodTabs = ({ value, onChange }: Props) => (
  <div className={styles.container}>
    {OPTIONS.map((option) => (
      <button
        key={option}
        onClick={() => onChange(option)}
        className={clsx(
          styles.tab,
          value === option && styles.active
        )}
      >
        {option}
      </button>
    ))}
  </div>
);
