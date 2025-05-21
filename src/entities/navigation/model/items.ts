import {
  CalendarDays,
  ListChecks,
  Archive,
  Users,
  Database,
  PieChart,
} from "lucide-react";

export const navItems = [
  { id: "calendar", icon: CalendarDays, href: "/calendar" },
  { id: "list", icon: ListChecks, href: "/tasks" },
  { id: "archive", icon: Archive, href: "/archive" },
  { id: "users", icon: Users, href: "/employees" },
  { id: "db", icon: Database, href: "/storage" },
  { id: "charts", icon: PieChart, href: "/dashboard" },
] as const;
