'use client';
import React from 'react';
import clsx from 'clsx';
import { LucideIcon } from 'lucide-react';
import styles from './IconNavButton.module.css';

interface Props {
  icon: LucideIcon;
  onClick?: () => void;
  disabled?: boolean;
  /** Если true — иконка повёрнута на 180° */
  rotate?: boolean;
}

export const IconNavButton: React.FC<Props> = ({
  icon: Icon,
  onClick,
  disabled = false,
  rotate = false,
}) => {
  const stateClass = disabled
    ? styles.iconNavButtonDisabled
    : styles.iconNavButtonEnabled;

  return (
    <button
      className={clsx(styles.iconNavButton, stateClass)}
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      aria-disabled={disabled}
    >
      <Icon
        size={20}
        strokeWidth={2}
        style={rotate ? { transform: 'rotate(180deg)' } : undefined}
      />
    </button>
  );
};
