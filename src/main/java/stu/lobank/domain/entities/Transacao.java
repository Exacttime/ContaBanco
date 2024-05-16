package stu.lobank.domain.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.Date;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Transacao {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String tipo; // "Depósito", "Saque", "Transferência"
    private double valor;
    private double saldoAnterior;
    private double saldoAtual;
    private String detalhes; // Detalhes adicionais sobre a transação
    private LocalDateTime dataTransacao;
}