export type OperationType = 'revenue' | 'expanses' | 'income' | 'debt';

export interface Operation {
  division: string;
  date: string;
  amount: number;
  type: OperationType;
}
