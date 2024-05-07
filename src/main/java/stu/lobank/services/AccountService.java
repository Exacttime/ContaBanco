package stu.lobank.services;

import stu.lobank.domain.entities.Conta;

import java.util.List;

public interface AccountService {
    List<Conta> getAllAccounts();
    Conta getAccount(int number);
    void createAccount(Conta conta);
    void updateAccount(Conta conta);
}
