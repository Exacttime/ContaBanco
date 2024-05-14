package stu.lobank.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import stu.lobank.domain.entities.Usuario;

import java.util.Optional;
@Repository
public interface UserRepository extends JpaRepository<Usuario, Long> {
    Usuario findByUsername(String username);
    Optional<Usuario> findOptionalUserByUsername(String username);
    boolean existsByUsername(String username);
    boolean existsByEmail(String email);
}
