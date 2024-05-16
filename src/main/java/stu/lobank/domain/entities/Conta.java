package stu.lobank.domain.entities;

import jakarta.persistence.*;
import jakarta.validation.constraints.Digits;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Conta implements IConta {

    private static final int DEFAULT_AGENCY = 1;
    private static int SEQUENCIAL = 1;
    @Digits(integer = 4, fraction = 0)
    protected int agency;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @Digits(integer = 6, fraction = 0)
    protected int number;
    protected double balance;
    protected double creditLimit;
    @OneToMany(cascade = CascadeType.ALL)
    private List<Transacao> transacoes;
    @Override
    public void withdraw(double value) {
        if(value > balance){
            throw new IllegalArgumentException("Saldo insuficiente para realizar o saque.");
        }
        double oldBalance = balance;
        balance -= value;
        Transacao transacao = new Transacao();
        transacao.setTipo("Saque");
        transacao.setValor(value);
        transacao.setSaldoAnterior(oldBalance);
        transacao.setSaldoAtual(balance);
        transacao.setDataTransacao(LocalDateTime.now()); // Adicione esta linha
        transacoes.add(transacao);
    }
    @Override
    public void deposit(double value) {
        double oldBalance = balance;
        balance += value;
        Transacao transacao = new Transacao();
        transacao.setTipo("Deposito");
        transacao.setValor(value);
        transacao.setSaldoAnterior(oldBalance);
        transacao.setSaldoAtual(balance);
        transacao.setDataTransacao(LocalDateTime.now()); // Adicione esta linha
        transacoes.add(transacao);
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