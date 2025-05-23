export interface TabItem {
  label: string;
  path: string;
}

export const DASHBOARD_TABS: TabItem[] = [
  { label: "Свод данных по сотрудникам", path: "/dashboard/employees" },
  { label: "Сводный отчет внутри компании", path: "/dashboard/summary" },
  { label: "Сводный отчет по сделкам", path: "/dashboard/deals" },
];
