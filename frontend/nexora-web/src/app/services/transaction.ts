import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface TransferResponse {
  id: number;
  fromAccountId: number;
  toAccountId: number;
  amount: number;
  transactionType: string;
  status: string;
  createdAt: string;
}

@Injectable({
  providedIn: 'root',
})
export class TransactionService {

  private apiUrl = `${environment.apiUrl}/transactions`;

  constructor(private http: HttpClient) {}

  transfer(
    fromAccountId: number,
    toAccountId: number,
    amount: number
  ): Observable<TransferResponse> {
    return this.http.post<TransferResponse>(
      `${this.apiUrl}/transfer`,
      {
        fromAccountId,
        toAccountId,
        amount
      }
    );
  }

  getTransactionsByAccountId(
    accountId: number
  ): Observable<TransferResponse[]> {
    return this.http.get<TransferResponse[]>(
      `${this.apiUrl}/account/${accountId}`
    );
  }
}