package stu.lobank.domain.entities;

public interface IConta {

    void withdraw(double value);
    void deposit(double value);
    void transfer(double valor, IConta destinationAccount);
    void printBankStatement();
}