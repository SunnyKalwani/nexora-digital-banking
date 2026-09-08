package com.nexora.banking.transaction;

import com.nexora.banking.account.Account;
import com.nexora.banking.account.AccountRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class TransactionService {

    private final TransactionRepository transactionRepository;
    private final AccountRepository accountRepository;

    public TransactionService(
            TransactionRepository transactionRepository,
            AccountRepository accountRepository) {
        this.transactionRepository = transactionRepository;
        this.accountRepository = accountRepository;
    }

    public Page<Transaction> getAllTransactions(int page, int size) {
       
        Pageable pageable = PageRequest.of(page,size);
       
        return transactionRepository.findAllByOrderByCreatedAtDesc(pageable);
    }

    public List<Transaction> getTransactionsByAccountId(Long accountId) {
        return transactionRepository.findByFromAccountIdOrToAccountIdOrderByCreatedAtDesc(
                accountId,
                accountId);
    }

    @Transactional
    public Transaction transfer(Long fromAccountId, Long toAccountId, BigDecimal amount) {

        Account fromAccount = accountRepository.findById(fromAccountId)
                .orElseThrow(() -> new RuntimeException("Source account not found"));
        Account toAccount = accountRepository.findById(toAccountId)
                .orElseThrow(() -> new RuntimeException("Destination account not found"));

        if (fromAccountId.equals(toAccountId)) {
            throw new RuntimeException("Source and destination accounts cannot be the same.");
        }

        if (amount == null || amount.compareTo(BigDecimal.ZERO) <= 0) {
            throw new RuntimeException("Transfer must be greater than zero");
        }

        if (fromAccount.getBalance().compareTo(amount) < 0) {
            throw new RuntimeException("Insufficient funds");
        }

        fromAccount.setBalance(fromAccount.getBalance().subtract(amount));
        toAccount.setBalance(toAccount.getBalance().add(amount));

        accountRepository.save(fromAccount);
        accountRepository.save(toAccount);

        Transaction transaction = new Transaction(
                fromAccountId,
                toAccountId,
                amount,
                TransactionType.TRANSFER,
                TransactionStatus.COMPLETED,
                LocalDateTime.now());

        return transactionRepository.save(transaction);
    }
}
