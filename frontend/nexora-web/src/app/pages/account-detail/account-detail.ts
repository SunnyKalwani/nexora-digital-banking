import { CurrencyPipe, DatePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Account, AccountService } from '../../services/account';
import { Transaction, TransactionService } from '../../services/transaction';

@Component({
  selector: 'app-account-detail',
  standalone: true,
  imports: [CurrencyPipe, DatePipe, RouterLink],
  templateUrl: './account-detail.html',
  styleUrl: './account-detail.scss',
})
export class AccountDetail {
  private route = inject(ActivatedRoute);
  private accountService = inject(AccountService);
  private transactionService = inject(TransactionService);

  accountId = Number(this.route.snapshot.paramMap.get('id'));

  account: Account | undefined = this.accountService.getAccountById(this.accountId);

  transactions: Transaction[] = this.transactionService.getTransactionsByAccountId(this.accountId);
  testTransactions() {
    console.log(this.transactions);
  }
}
