"use client";

import { FC, useState, useRef, useEffect } from "react";
import styles from "./UserDropdown.module.css";
import { ChevronDown } from "lucide-react";
import { useUser } from "../model/useUser";

const UserDropdown: FC = () => {
  const { user, logout } = useUser();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className={styles.dropdown} ref={ref}>
      <button
        className={styles.button}
        onClick={() => setOpen((prev) => !prev)}
        aria-label="User menu"
      >
        <img src={user.avatarUrl} alt={user.name} className={styles.avatar} />
        <div className={styles.info}>
          <span className={styles.name}>{user.name}</span>
          <span className={styles.role}>{user.role}</span>
        </div>
        <ChevronDown size={16} />
      </button>

      {open && (
        <div className={styles.menu}>
          <div
            className={styles.menuItem}
            onClick={() => (window.location.href = "/profile")}
          >
            Профиль
          </div>
          <div
            className={styles.menuItem}
            onClick={() => (window.location.href = "/settings")}
          >
            Настройки
          </div>
          <div className={styles.menuItem} onClick={logout}>
            Выйти
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDropdown;
