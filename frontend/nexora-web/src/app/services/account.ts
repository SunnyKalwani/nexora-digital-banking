import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap, map } from 'rxjs';

export interface Account {
  id: number;

  // Fields used by the Angular UI
  type: string;
  details: string;
  balance: number;

  // Original backend fields
  accountNumber?: string;
  accountType?: string;
}

interface BackendAccount {
  id: number;
  accountNumber: string;
  accountType: string;
  balance: number;
}

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private apiUrl = 'http://localhost:8080/api/v1/accounts';

  private accounts: Account[] = [];

  constructor(private http: HttpClient) {}

  getAccounts(): Account[] {
    return this.accounts;
  }

  getAccountById(id: number): Account | undefined {
    return this.accounts.find(account => account.id === id);
  }

  loadAccounts(): Observable<Account[]> {
    return this.http.get<BackendAccount[]>(this.apiUrl).pipe(
      map(backendAccounts =>
        backendAccounts.map(account => ({
          id: account.id,
          type: account.accountType,
          details: account.accountNumber,
          balance: account.balance,

          accountNumber: account.accountNumber,
          accountType: account.accountType
        }))
      ),

      tap(accounts => {
        this.accounts = accounts;
      })
    );
  }
}