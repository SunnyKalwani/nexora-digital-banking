import { CurrencyPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AccountService, Account } from '../../services/account';

@Component({
  selector: 'app-dashboard',
  imports: [RouterLink, CurrencyPipe],
  standalone: true,
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard {
  
  private accountService = inject(AccountService);

  accounts: Account[] = this.accountService.getAccounts();

  get totalBalance(): number{
    return this.accounts
    .filter(account => account.type !== 'Credit Card')
      .reduce((total,account)=> total+ account.balance, 0);
    
  }
}
