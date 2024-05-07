package stu.lobank.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import stu.lobank.domain.entities.Conta;
@Repository
public interface AccountRepository extends JpaRepository<Conta, Long> {
    Conta findContaByNumber(int number);
    Conta findContaById(int id);
}
