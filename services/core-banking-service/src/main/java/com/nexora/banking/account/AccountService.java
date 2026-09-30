package com.nexora.banking.account;

import com.nexora.banking.user.User;
import com.nexora.banking.user.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AccountService {

    private final AccountRepository accountRepository;
    private final UserRepository userRepository;

    public AccountService(
            AccountRepository accountRepository,
            UserRepository userRepository) {

        this.accountRepository = accountRepository;
        this.userRepository = userRepository;
    }

    public List<Account> getAllAccounts() {
        return accountRepository.findAll();
    }

    public List<Account> getAccountsByUserEmail(String email) {
        return accountRepository.findByUserEmail(email);
    }

    public Optional<Account> getAccountById(Long id) {
        return accountRepository.findById(id);
    }

    public Account createAccount(Account account, String email) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException("User not found"));

        account.setUser(user);

        return accountRepository.save(account);
    }

    public Optional<Account> updateAccount(
            Long id,
            Account updateAccount) {

        return accountRepository.findById(id)
                .map(existingAccount -> {

                    existingAccount.setAccountNumber(
                            updateAccount.getAccountNumber());

                    existingAccount.setAccountType(
                            updateAccount.getAccountType());

                    existingAccount.setBalance(
                            updateAccount.getBalance());

                    return accountRepository.save(existingAccount);
                });
    }

    public boolean deleteAccount(Long id) {

        if (accountRepository.existsById(id)) {
            accountRepository.deleteById(id);
            return true;
        }

        return false;
    }
}