export interface TransactionDto {
  title: string;
  amount: number;
  category: string;
  type: 'credit' | 'debit';
  payer: string;
  userId: number;
}