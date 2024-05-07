package stu.lobank.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import stu.lobank.domain.entities.Usuario;

import java.util.Optional;

public interface UserRepository extends JpaRepository<Usuario, Long> {
    Usuario findByUsername(String username);
    Optional<Usuario> findOptionalUserByUsername(String username);
}
