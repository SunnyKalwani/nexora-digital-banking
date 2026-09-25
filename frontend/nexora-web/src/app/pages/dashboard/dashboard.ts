import { CurrencyPipe } from '@angular/common';
import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AccountService, Account } from '../../services/account';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-dashboard',
  imports: [RouterLink, CurrencyPipe],
  standalone: true,
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard implements OnInit {
  private accountService = inject(AccountService);
  private cdr = inject(ChangeDetectorRef);
  private authService = inject(AuthService);
  private router = inject(Router);

  accounts: Account[] = [];

  ngOnInit(): void {
    this.accountService.loadAccounts().subscribe({
      next: (accounts) => {
        this.accounts = accounts;

        // console.log('Accounts loaded from backend:', accounts);
        // console.log('Calculated total:', this.totalBalance);

        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Error loading accounts:', error);
      },
    });
  }

  get totalBalance(): number {
    return this.accounts
      .filter((account) => account.accountType !== 'Credit Card')
      .reduce((total, account) => total + Number(account.balance), 0);
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
