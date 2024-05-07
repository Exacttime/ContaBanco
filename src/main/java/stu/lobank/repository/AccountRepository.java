package stu.lobank.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import stu.lobank.domain.entities.Conta;
@Repository
public interface AccountRepository extends JpaRepository<Conta, Long> {
public Conta findContaByNumber(int number);
public Conta findContaById(int id);
}
