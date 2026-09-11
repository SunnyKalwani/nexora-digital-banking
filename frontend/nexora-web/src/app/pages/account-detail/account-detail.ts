import { Component, inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';

import { Account, AccountService } from '../../services/account';
import {
  TransactionService,
  TransferResponse
} from '../../services/transaction';

@Component({
  selector: 'app-account-detail',
  standalone: true,
  imports: [
    RouterLink,
    CurrencyPipe,
    DatePipe
  ],
  templateUrl: './account-detail.html',
  styleUrl: './account-detail.scss',
})
export class AccountDetail implements OnInit {

  private route = inject(ActivatedRoute);
  private accountService = inject(AccountService);
  private transactionService = inject(TransactionService);
  private cdr = inject(ChangeDetectorRef);

  accountId = Number(
    this.route.snapshot.paramMap.get('id')
  );

  account: Account | undefined;

  transactions: TransferResponse[] = [];

  ngOnInit(): void {

    // Load account information from Spring Boot
    this.accountService.loadAccounts().subscribe({

      next: (accounts) => {

        this.account = accounts.find(
          account => account.id === this.accountId
        );

        this.cdr.detectChanges();
      },

      error: (error) => {
        console.error(
          'Could not load account:',
          error
        );
      }

    });

    // Load transactions for this account
    this.transactionService
      .getTransactionsByAccountId(this.accountId)
      .subscribe({

        next: (transactions) => {

          this.transactions = transactions;

          console.log(
            'Transactions loaded:',
            transactions
          );

          this.cdr.detectChanges();
        },

        error: (error) => {

          console.error(
            'Could not load transactions:',
            error
          );

        }

      });
  }

  // Determine whether the transaction
  // added money to the current account
  isCredit(transaction: TransferResponse): boolean {

    return transaction.toAccountId === this.accountId;

  }

  // Generate a description for the transaction
  getTransactionDescription(
    transaction: TransferResponse
  ): string {

    if (transaction.toAccountId === this.accountId) {

      return `Transfer from Account ${transaction.fromAccountId}`;

    }

    return `Transfer to Account ${transaction.toAccountId}`;
  }
}