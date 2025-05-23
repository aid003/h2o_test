import { ArrowUp, ArrowDown } from 'lucide-react';
import { motion } from 'framer-motion';
import { clsx } from 'clsx';
import styles from './SummaryCard.module.css';

interface Props {
  title: string;
  amount: number;
  deltaPercent: number;
  active?: boolean;
  onClick?: () => void;
}

export const SummaryCard = ({
  title,
  amount,
  deltaPercent,
  active,
  onClick,
}: Props) => {
  const positive = deltaPercent >= 0;
  const DeltaIcon = positive ? ArrowUp : ArrowDown;

  const headerBgClass = active
    ? positive
      ? styles.headerPositiveActive
      : styles.headerNegativeActive
    : positive
      ? styles.headerPositiveInactive
      : styles.headerNegativeInactive;

  return (
    <motion.button
      whileHover={{ y: -2 }}
      onClick={onClick}
      className={clsx(
        styles.card,
        active && styles.active
      )}
    >
      <div
        className={clsx(
          styles.header,
          headerBgClass
        )}
      >
        <DeltaIcon size={14} />
        <span>{deltaPercent}%</span>
      </div>

      <div className={styles.amount}>
        <strong>₽</strong> {amount.toLocaleString('ru-RU')}
      </div>

      <span className={styles.title}>{title}</span>
    </motion.button>
  );
};
