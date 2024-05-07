package stu.lobank.services;

import stu.lobank.domain.entities.Conta;
import stu.lobank.domain.entities.Usuario;

import java.util.List;

public interface AccountService {
    public List<Conta> getAllAccounts();
    public Conta getAccount(int number);
    public void createAccount(Conta conta);
    public void updateAccount(Conta conta);
}
