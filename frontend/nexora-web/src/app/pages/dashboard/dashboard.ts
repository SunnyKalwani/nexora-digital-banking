import { CurrencyPipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AccountService, Account } from '../../services/account';

@Component({
  selector: 'app-dashboard',
  imports: [RouterLink, CurrencyPipe],
  standalone: true,
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard implements OnInit {

  private accountService = inject(AccountService);

  accounts: Account[] = [];

  ngOnInit(): void {
    this.accountService.loadAccounts().subscribe({
      next: (accounts) => {
        this.accounts = accounts;
        console.log('Accounts loaded from backend:', accounts);
      },
      error: (error) => {
        console.error('Error loading accounts:', error);
      }
    });
  }

  get totalBalance(): number {
    return this.accounts
      .filter(account => account.type !== 'Credit Card')
      .reduce((total, account) => total + account.balance, 0);
  }
}