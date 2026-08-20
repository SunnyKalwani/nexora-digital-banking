import { CurrencyPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Account, AccountService } from '../../services/account';

@Component({
  selector: 'app-transfers',
  imports: [ReactiveFormsModule, CurrencyPipe, RouterLink],
  standalone: true,
  templateUrl: './transfers.html',
  styleUrl: './transfers.scss',
})
export class Transfers {
  private accountService = inject(AccountService);

  accounts: Account[] = this.accountService.getAccounts();

  transferError = '';
  showConfirmation = false;

  transferForm = new FormGroup({
    fromAccountId: new FormControl<number | null>(null, Validators.required),
    toAccountId: new FormControl<number | null>(null, Validators.required),
    amount: new FormControl<number | null>(null, [Validators.required, Validators.min(0.01)]),
  });

  submitTransfer() {
    this.transferError = '';
    this.showConfirmation = false;

    if (this.transferForm.invalid) {
      this.transferForm.markAllAsTouched();
      return;
    }

    const { fromAccountId, toAccountId, amount } = this.transferForm.getRawValue();

    if (fromAccountId === toAccountId) {
      this.transferError = 'Source and destination accounts must be different,';
      return;
    }
    const sourceAccount = this.accounts.find((account) => account.id === fromAccountId);

    if (!sourceAccount) {
      this.transferError = 'Source account could not be found';
      return;
    }

    if (amount === null) {
      this.transferError = 'Please enter a valid amount.';
      return;
    }

    if (amount > sourceAccount.balance) {
      this.transferError = 'You do not have enough funds in the selected account';
      return;
    }

    this.showConfirmation = true;
  }

  get selectedFromAccount(): Account | undefined {
    const id = this.transferForm.controls.fromAccountId.value;
    return this.accounts.find((account) => account.id === id);
  }

  get selectedToAccount(): Account | undefined {
    const id = this.transferForm.controls.toAccountId.value;
    return this.accounts.find((account) => account.id === id);
  }

  get transferAmount(): number {
    return this.transferForm.controls.amount.value ?? 0;
  }

  cancelConfirmation(){
    this.showConfirmation = false;
  }

  confirmTransfer(){
    console.log('Transfer confirmed',{
      fromAccount: this.selectedFromAccount,
      toAccount: this.selectedToAccount,
      amount: this.transferAmount
    });
  }
}
