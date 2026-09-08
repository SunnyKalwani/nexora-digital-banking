package com.nexora.banking.transaction;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TransactionRepository extends JpaRepository<Transaction, Long> {

    Page<Transaction> findAllByOrderByCreatedAtDesc(Pageable pagable);

    List<Transaction> findByFromAccountIdOrToAccountIdOrderByCreatedAtDesc(
            Long fromAccountId,
            Long toAccountId);

}
