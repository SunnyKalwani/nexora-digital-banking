import { CurrencyPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Account, AccountService } from '../../services/account';
import { TransactionService, Transaction } from '../../services/transaction';

@Component({
  selector: 'app-transfers',
  imports: [ReactiveFormsModule, CurrencyPipe, RouterLink],
  standalone: true,
  templateUrl: './transfers.html',
  styleUrl: './transfers.scss',
})
export class Transfers {
  private accountService = inject(AccountService);

  transferSuccess = false;
  confirmationNumber = '';
  completedAmount = 0;

  accounts: Account[] = this.accountService.getAccounts();
  private transactionService = inject(TransactionService);
  private createTransferTransactions(
    fromAccountId: number,
    toAccountId: number,
    amount: number,
    fromAccountType: string,
    toAccountType: string
  ): void {
    const date = new Date().toISOString().split('T')[0];

    const debitTransaction:Transaction={
      id: this.transactionService.getNextTransactionId(),
      accountId: fromAccountId,
      description: `Transfer to ${toAccountType}`,
      amount,
      date,
      type:'debit'
    };

    this.transactionService.addTransaction(debitTransaction);

    const creditTransaction: Transaction ={
      id: this.transactionService.getNextTransactionId(),
      accountId: toAccountId,
      description: `Transfer from ${fromAccountType}`,
      amount,
      date,
      type:'credit'
    };

    this.transactionService.addTransaction(creditTransaction);
  }

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

  cancelConfirmation() {
    this.showConfirmation = false;
  }

  confirmTransfer() {
    const fromAccount = this.selectedFromAccount;
    const toAccount = this.selectedToAccount;
    const amount = this.transferAmount;

    if (!fromAccount || !toAccount || amount <= 0) {
      this.transferError = 'Transfer information is invalid.';
      return;
    }

    const debitSuccessful = this.accountService.debitAccount(fromAccount.id, amount);

    if (!debitSuccessful) {
      this.transferError = 'The transfer couldnot be completed from the source account.';
      return;
    }

    const creditSuccessful = this.accountService.creditAccount(toAccount.id, amount);

    if (!creditSuccessful) {
      this.accountService.creditAccount(fromAccount.id, amount);
      this.transferError = 'The destination account couldnot be credited.';
      return;
    }

    this.createTransferTransactions(
      fromAccount.id,
      toAccount.id,
      amount,
      fromAccount.type,
      toAccount.type,
    );

    this.confirmationNumber = 'NX-' + Date.now();

    this.showConfirmation = false;
    this.transferSuccess = true;
    this.completedAmount = amount;
    this.transferForm.reset();
  }
}
