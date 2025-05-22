import DashboardHeader from "@/features/dashboard/ui/DashboardHeader";
import styles from "./layout.module.css";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={styles.wrapper}>
      <DashboardHeader />
      <main className={styles.main}>{children}</main>
    </div>
  );
}
