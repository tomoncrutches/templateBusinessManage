export interface Transaction {
  id: string;
  name: string;
  value: number;
  type: TransactionType;
  date: Date;
  parent_id?: string;
}

type TransactionType = 'Variable' | 'Fijo';

export enum TransactionMode {
  EXPENSE = 'expense',
  INCOME = 'income',
  ALL = 'all',
}
