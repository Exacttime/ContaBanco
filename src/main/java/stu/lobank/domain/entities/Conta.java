package stu.lobank.domain.entities;

import jakarta.persistence.*;
import lombok.Getter;
@Getter
@Entity
public class Conta implements IConta {

    private static final int DEFAULT_AGENCY = 1;
    private static int SEQUENCIAL = 1;

    protected int agency;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    protected int number;
    protected double balance;
    @Override
    public void withdraw(double value) {
        if(value > balance){
            throw new IllegalArgumentException("Saldo insuficiente para realizar o saque.");
        }
        balance -= value;
    }
    @Override
    public void deposit(double value) {
        balance += value;
    }
    @Override
    public void transfer(double value, IConta destinationAccount) {
        if(value > balance){
            throw new IllegalArgumentException("Saldo insuficiente para realizar a transferência.");
        }
        if(destinationAccount == null){
            throw new IllegalArgumentException("A conta destino não existe.");
        }
        this.withdraw(value);
        destinationAccount.deposit(value);
    }
}