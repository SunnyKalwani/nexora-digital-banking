import { CurrencyPipe } from '@angular/common';
import {
  ChangeDetectorRef,
  Component,
  inject,
  OnInit
} from '@angular/core';

import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import { RouterLink } from '@angular/router';

import { Account, AccountService } from '../../services/account';
import { TransactionService } from '../../services/transaction';

@Component({
  selector: 'app-transfers',
  imports: [ReactiveFormsModule, CurrencyPipe, RouterLink],
  standalone: true,
  templateUrl: './transfers.html',
  styleUrl: './transfers.scss',
})
export class Transfers implements OnInit {

  private accountService = inject(AccountService);
  private transactionService = inject(TransactionService);
  private cdr = inject(ChangeDetectorRef);

  accounts: Account[] = [];

  transferSuccess = false;
  confirmationNumber = '';
  completedAmount = 0;

  transferError = '';
  showConfirmation = false;

  transferForm = new FormGroup({
    fromAccountId: new FormControl<number | null>(
      null,
      Validators.required
    ),

    toAccountId: new FormControl<number | null>(
      null,
      Validators.required
    ),

    amount: new FormControl<number | null>(
      null,
      [
        Validators.required,
        Validators.min(0.01)
      ]
    ),
  });

  ngOnInit(): void {

    this.accountService.loadAccounts().subscribe({
      next: (accounts) => {
        this.accounts = accounts;
        this.cdr.detectChanges();
      },

      error: (error) => {
        console.error('Error loading transfer accounts:', error);
        this.transferError = 'Accounts could not be loaded.';
      }
    });
  }

  submitTransfer(): void {

    this.transferError = '';
    this.showConfirmation = false;

    if (this.transferForm.invalid) {
      this.transferForm.markAllAsTouched();
      return;
    }

    const {
      fromAccountId,
      toAccountId,
      amount
    } = this.transferForm.getRawValue();

    if (fromAccountId === toAccountId) {
      this.transferError =
        'Source and destination accounts must be different.';
      return;
    }

    const sourceAccount =
      this.accounts.find(
        account => account.id === fromAccountId
      );

    if (!sourceAccount) {
      this.transferError =
        'Source account could not be found.';
      return;
    }

    if (amount === null) {
      this.transferError =
        'Please enter a valid amount.';
      return;
    }

    if (amount > sourceAccount.balance) {
      this.transferError =
        'You do not have enough funds in the selected account.';
      return;
    }

    this.showConfirmation = true;
  }

  get selectedFromAccount(): Account | undefined {

    const id =
      this.transferForm.controls.fromAccountId.value;

    return this.accounts.find(
      account => account.id === id
    );
  }

  get selectedToAccount(): Account | undefined {

    const id =
      this.transferForm.controls.toAccountId.value;

    return this.accounts.find(
      account => account.id === id
    );
  }

  get transferAmount(): number {
    return this.transferForm.controls.amount.value ?? 0;
  }

  cancelConfirmation(): void {
    this.showConfirmation = false;
  }

  confirmTransfer(): void {

    const fromAccount = this.selectedFromAccount;
    const toAccount = this.selectedToAccount;
    const amount = this.transferAmount;

    this.transferError = '';

    if (!fromAccount || !toAccount || amount <= 0) {
      this.transferError =
        'Transfer information is invalid.';
      return;
    }

    this.transactionService
      .transfer(
        fromAccount.id,
        toAccount.id,
        amount
      )
      .subscribe({

        next: (transaction) => {

          console.log(
            'Transfer completed:',
            transaction
          );

          this.confirmationNumber =
            'NX-' + transaction.id;

          this.completedAmount = amount;

          this.showConfirmation = false;
          this.transferSuccess = true;

          this.transferForm.reset();

          this.refreshAccounts();
        },

        error: (error) => {

          console.error(
            'Transfer failed:',
            error
          );

          this.showConfirmation = false;

          this.transferError =
            'The transfer could not be completed.';
        }
      });
  }

  private refreshAccounts(): void {

    this.accountService
      .loadAccounts()
      .subscribe({

        next: (accounts) => {
          this.accounts = accounts;
          this.cdr.detectChanges();
        },

        error: (error) => {
          console.error(
            'Could not refresh balances:',
            error
          );
        }
      });
  }
}