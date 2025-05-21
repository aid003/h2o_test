import { Sidebar } from '@/widgets/sidebar/ui/Sidebar';
import styles from './Layout.module.css';

export const Layout = ({ children }: { children: React.ReactNode }) => (
  <div className={styles.container}>
    <Sidebar />
    <main className={styles.main}>
      {children}
    </main>
  </div>
);
