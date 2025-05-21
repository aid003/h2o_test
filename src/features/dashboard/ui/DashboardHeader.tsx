"use client";
import { FC, useState } from "react";
import styles from "./DashboardHeader.module.css";
import { IconNavButton } from "@/shared/ui/IconNavDashButton/IconNavButton";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Tabs from "./Tabs";
import UserDropdown from "@/entities/user/ui/UserDropdown";
import { DASHBOARD_TABS } from "../model/tabs";

const DashboardHeader: FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goPrev = () => setCurrentIndex((i) => Math.max(i - 1, 0));
  const goNext = () =>
    setCurrentIndex((i) => Math.min(i + 1, DASHBOARD_TABS.length - 1));

  return (
    <header className={styles.header}>
      <div className={styles.navButtons}>
        <IconNavButton
          icon={ChevronLeft}
          onClick={goPrev}
          disabled={currentIndex === 0}
        />
        <IconNavButton
          icon={ChevronRight}
          onClick={goNext}
          disabled={currentIndex === DASHBOARD_TABS.length - 1}
        />
      </div>

      <Tabs
        tabs={DASHBOARD_TABS}
        selectedIndex={currentIndex}
        onSelect={setCurrentIndex}
      />

      <div className={styles.user}>
        <UserDropdown />
      </div>
    </header>
  );
};

export default DashboardHeader;
