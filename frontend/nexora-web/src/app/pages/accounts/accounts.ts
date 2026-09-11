import {
  ChangeDetectorRef,
  Component,
  inject,
  OnInit
} from '@angular/core';

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
export class Accounts implements OnInit {

  private accountService = inject(AccountService);
  private cdr = inject(ChangeDetectorRef);

  accounts: Account[] = [];

  ngOnInit(): void {
    this.accountService.loadAccounts().subscribe({
      next: (accounts) => {
        this.accounts = accounts;

        console.log('Accounts page loaded:', this.accounts);

        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Error loading accounts page:', error);
      }
    });
  }
}