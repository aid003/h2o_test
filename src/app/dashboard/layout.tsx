"use client";

import { useState } from "react";
import DashboardHeader from "@/features/dashboard/ui/DashboardHeader";
import styles from "./layout.module.css";
import { DashboardContext } from "@/features/dashboard/model/DashboardContext";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [currentIndex, setCurrentIndex] = useState(1);

  return (
    <DashboardContext.Provider value={{ currentIndex, setCurrentIndex }}>
      <div className={styles.wrapper}>
        <DashboardHeader />
        <main className={styles.main}>{children}</main>
      </div>
    </DashboardContext.Provider>
  );
}
