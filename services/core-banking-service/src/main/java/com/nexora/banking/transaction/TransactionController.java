package com.nexora.banking.transaction;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import org.springframework.data.domain.Page;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/transactions")
public class TransactionController {

    private final TransactionService transactionService;

    public TransactionController(TransactionService transactionService) {
        this.transactionService = transactionService;
    }

    @GetMapping
    public Page<Transaction> getAllTransactions(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {

        return transactionService.getAllTransactions(page, size);
    }

    @GetMapping("/account/{accountId}")
    public List<Transaction> getTransactionsByAccountId(@PathVariable Long accountId) {
        return transactionService.getTransactionsByAccountId(accountId);
    }

    @PostMapping("/transfer")
    public ResponseEntity<Transaction> transfer(@RequestBody Map<String, Object> request) {
        Long fromAccountId = Long.valueOf(request.get("fromAccountId").toString());
        Long toAccountId = Long.valueOf(request.get("toAccountId").toString());
        BigDecimal amount = new BigDecimal(request.get("amount").toString());

        Transaction transaction = transactionService.transfer(fromAccountId, toAccountId, amount);

        return ResponseEntity.ok(transaction);
    }

}
