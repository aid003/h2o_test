'use client';

import { LucideIcon } from 'lucide-react';
import Link from 'next/link';
import clsx from 'clsx';

interface Props {
  icon: LucideIcon;
  href: string;
  active?: boolean;
}

export const IconNavButton = ({ icon: Icon, href, active }: Props) => (
  <Link
    href={href}
    className={clsx(
      'flex h-10 w-10 items-center justify-center rounded-xl transition',
      active
        ? 'bg-white/25 text-white'
        : 'text-white/80 hover:bg-white/10 hover:text-white'
    )}
  >
    <Icon size={22} strokeWidth={2} />
  </Link>
);
