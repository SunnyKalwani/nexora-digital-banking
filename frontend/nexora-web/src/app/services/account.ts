import { Injectable } from "@angular/core";

export interface Account {
  id: number;
  type: string;
  balance: number;
  details: string;
}

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  private accounts: Account[] = [
    {
      id: 1,
      type: 'Chequing',
      balance: 4280.2,
      details: '•••• 4821',
    },
    {
      id: 2,
      type: 'Savings',
      balance: 8200.32,
      details: '•••• 8472',
    },
    {
      id: 3,
      type: 'Credit Card',
      balance: 1420.6,
      details: '$5,000 limit',
    }
  ];

  getAccounts(): Account[]{
    return this.accounts;
  }
}
