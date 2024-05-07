package stu.lobank.services.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import stu.lobank.domain.entities.Conta;
import stu.lobank.repository.AccountRepository;
import stu.lobank.services.AccountService;

import java.util.List;

@Service
public class AccountServiceImpl implements AccountService {
    private final AccountRepository accountRepository;

    @Autowired
    public AccountServiceImpl(AccountRepository accountRepository) {
        this.accountRepository = accountRepository;
    }

    @Override
    public List<Conta> getAllAccounts() {
        return accountRepository.findAll();
    }

    @Override
    public Conta getAccount(int number) {
        return accountRepository.findContaByNumber(number);
    }

    @Override
    public void createAccount(Conta conta) {
        if (existsByIdOrNumber(conta.getId(), conta.getNumber())) {
            throw new IllegalArgumentException("Já existe uma conta com esse número ou Id.");
        }
        accountRepository.save(conta);
    }
    @Override
    public void updateAccount(Conta conta) {
        if (!existsByIdOrNumber(conta.getId(), conta.getNumber())) {
            throw new IllegalArgumentException("Uma conta com esse Id ou número não existe.");
        }
        accountRepository.save(conta);
    }
    private boolean existsByIdOrNumber(Integer id, Integer number) {
        Conta existingAccountById = accountRepository.findContaById(id);
        Conta existingAccountByNumber = accountRepository.findContaByNumber(number);

        return existingAccountById != null || existingAccountByNumber != null;
    }
}
