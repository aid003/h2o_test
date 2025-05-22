import { AlertCircle } from 'lucide-react';
import { Operation } from '@/entities/operation/model/types';

interface Props { data: Operation[]; limit?: number }
export const ProblemZones = ({ data, limit = 10_000 }: Props) => {
  const grouped = data.filter(o => o.type === 'expanses')
    .reduce<Record<string, number>>((acc, o) => {
      acc[o.division] = (acc[o.division] ?? 0) + o.amount; return acc;
    }, {});

  const items = Object.entries(grouped)
    .filter(([, sum]) => sum > limit)
    .sort((a, b) => b[1] - a[1]);

  return (
    <div className="bg-white p-6 rounded-3xl shadow-lg w-72 space-y-3">
      <h3 className="font-semibold text-lg mb-2">Проблемные зоны</h3>
      {items.map(([division, sum]) => {
        const color = sum > 50_000 ? 'text-red-500' : 'text-amber-400';
        return (
          <div key={division} className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <AlertCircle className={color} size={16} />
              <span>{division}</span>
            </div>
            <b className={color}>₽ {sum.toLocaleString('ru-RU')}</b>
          </div>
        );
      })}
    </div>
  );
};