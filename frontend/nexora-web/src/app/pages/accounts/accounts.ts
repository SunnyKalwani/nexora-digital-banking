import { Component, inject } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AccountService, Account } from '../../services/account';

@Component({
  selector: 'app-accounts',
  standalone: true,
  imports: [CurrencyPipe, RouterLink],
  templateUrl: './accounts.html',
  styleUrl: './accounts.scss'
})
export class Accounts {

  private accountService = inject(AccountService);

  accounts: Account[] = this.accountService.getAccounts();
}