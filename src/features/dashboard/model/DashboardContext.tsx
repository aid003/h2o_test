import { createContext, Dispatch, SetStateAction } from "react";

export interface DashboardContextProps {
  currentIndex: number;
  setCurrentIndex: Dispatch<SetStateAction<number>>;
}

export const DashboardContext = createContext<DashboardContextProps>({
  currentIndex: 1,
  setCurrentIndex: (() => {}) as Dispatch<SetStateAction<number>>,
});
