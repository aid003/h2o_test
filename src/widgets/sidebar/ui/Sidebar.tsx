"use client";

import { usePathname } from "next/navigation";
import { navItems } from "@/entities/navigation/model/items";
import { IconNavButton } from "@/shared/ui/IconNavButton/IconNavButton";
import Image from "next/image";
import styles from "./Sidebar.module.css";

export const Sidebar = () => {
  const pathname = usePathname();

  return (
    <aside className={styles.sidebar}>
      <div className={styles.logo}>
        <Image
          src="/h2o_logo.svg"
          alt="H₂O logo"
          width={40}
          height={40}
          priority
        />
      </div>

      <nav className={styles.nav}>
        {navItems.map(({ id, icon, href }) => (
          <IconNavButton
            key={id}
            icon={icon}
            href={href}
            active={pathname.startsWith(href)}
          />
        ))}

        <IconNavButton
          icon={require("lucide-react").Settings}
          href="/settings"
          active={pathname.startsWith("/settings")}
        />
      </nav>
    </aside>
  );
};
