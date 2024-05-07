package stu.lobank.domain.entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
public class Usuario {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String name;
    @Column(nullable = false, unique = true)
    private String username;
    private String email;
    private String password;
    @OneToOne
    @JoinColumn(name = "account_id") // Nome da coluna na tabela Conta que faz referência à tabela Usuario
    private Conta account;
    private String role;
}
