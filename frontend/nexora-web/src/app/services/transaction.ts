import { Injectable } from '@angular/core';

export interface Transaction {
  id: number;
  accountId: number;
  description: string;
  amount: number;
  date: string;
  type: 'credit' | 'debit';
}

@Injectable({
    providedIn: 'root'
})
export class TransactionService{
    private transactions: Transaction[]=[
        {
            id:1,
            accountId: 1,
            description: 'Loblaws',
            amount: 82.46,
            date: '2026-08-19',
            type: 'debit'
        },
         {
      id: 2,
      accountId: 1,
      description: 'Payroll Deposit',
      amount: 2450.00,
      date: '2026-08-18',
      type: 'credit'
    },
    {
      id: 3,
      accountId: 1,
      description: 'Netflix',
      amount: 20.99,
      date: '2026-08-17',
      type: 'debit'
    },

    {
      id: 4,
      accountId: 2,
      description: 'Interest Payment',
      amount: 18.42,
      date: '2026-08-19',
      type: 'credit'
    },
    {
      id: 5,
      accountId: 2,
      description: 'Transfer from Chequing',
      amount: 500.00,
      date: '2026-08-15',
      type: 'credit'
    },

    {
      id: 6,
      accountId: 3,
      description: 'Amazon',
      amount: 74.29,
      date: '2026-08-18',
      type: 'debit'
    },
    {
      id: 7,
      accountId: 3,
      description: 'Restaurant',
      amount: 63.80,
      date: '2026-08-16',
      type: 'debit'
    }
    ];

    getTransactionsByAccountId(accountId:number): Transaction[]{
        return this.transactions.filter(
            transaction=>transaction.accountId === accountId
        );
    }
}