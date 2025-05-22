"use client";
import { motion } from 'framer-motion';
import { clsx } from 'clsx';

interface Props {
  value: 'B2B' | 'B2C';
  onChange(v: 'B2B' | 'B2C'): void;
}
export const DivisionSwitcher = ({ value, onChange }: Props) => {
  return (
    <div className="inline-flex rounded-full bg-slate-100 p-1">
      {(['B2B', 'B2C'] as const).map((d) => (
        <button
          key={d}
          onClick={() => onChange(d)}
          className={clsx(
            'relative z-10 px-4 py-1.5 text-sm font-medium transition-colors',
            value === d ? 'text-white' : 'text-slate-600'
          )}
        >
          {value === d && (
            <motion.span
              layoutId="pill"
              className="absolute inset-0 z-[-1] rounded-full bg-sky-500"
            />
          )}
          {d}
        </button>
      ))}
    </div>
  );
};