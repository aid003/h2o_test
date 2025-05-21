import { FC } from 'react';
import styles from './DashboardHeader.module.css';

export interface TabItem {
  label: string;
}

interface TabsProps {
  tabs: TabItem[];
  selectedIndex: number;
  onSelect: (index: number) => void;
}

const Tabs: FC<TabsProps> = ({ tabs, selectedIndex, onSelect }) => (
  <nav className={styles.tabs}>
    {tabs.map((tab, idx) => (
      <button
        key={tab.label}
        className={`${styles.tab} ${idx === selectedIndex ? styles.active : ''}`}
        onClick={() => onSelect(idx)}
      >
        {tab.label}
      </button>
    ))}
  </nav>
);

export default Tabs;
