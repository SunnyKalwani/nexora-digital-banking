package com.nexora.banking.account;

import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AccountService {

    private final AccountRepository accountRepository;

    public AccountService(AccountRepository accountRepository) {
        this.accountRepository = accountRepository;
    }

    public List<Account> getAllAccounts() {
        return accountRepository.findAll();
    }

    public Optional<Account> getAccountById(Long id) {
        return accountRepository.findById(id);
    }

    public Account createAccount(Account account) {
        return accountRepository.save(account);
    }

    public Optional<Account> updateAccount(Long id, Account updateAccount) {
        return accountRepository.findById(id)
                .map(existingAccount -> {
                    existingAccount.setAccountNumber(updateAccount.getAccountNumber());
                    existingAccount.setAccountType(updateAccount.getAccountType());
                    existingAccount.setBalance(updateAccount.getBalance());

                    return accountRepository.save(existingAccount);
                });
    }

    public boolean deleteAccount(Long id){
        if(accountRepository.existsById(id)){
            accountRepository.deleteById(id);
            return true;
        }
        return false;
    }
}