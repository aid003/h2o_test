export type OperationType = 'expanses' | 'income' | 'revenue' | 'debt';
export interface Operation {
  division: 'B2B' | 'B2C';
  date: string;
  amount: number;
  type: OperationType;
}