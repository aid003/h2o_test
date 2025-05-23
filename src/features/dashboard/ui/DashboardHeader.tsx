"use client";

import { FC, useContext } from "react";
import styles from "./DashboardHeader.module.css";
import { IconNavButton } from "@/shared/ui/IconNavDashButton/IconNavButton";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Tabs from "./Tabs";
import UserDropdown from "@/entities/user/ui/UserDropdown";
import { DASHBOARD_TABS } from "../model/tabs";
import { DashboardContext } from "../model/DashboardContext";

const DashboardHeader: FC = () => {
  const { currentIndex, setCurrentIndex } = useContext(DashboardContext);

  const goPrev = () =>
    setCurrentIndex((i: number) => Math.max(i - 1, 0));
  const goNext = () =>
    setCurrentIndex((i: number) =>
      Math.min(i + 1, DASHBOARD_TABS.length - 1)
    );

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
