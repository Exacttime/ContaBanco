package stu.lobank.services;

import org.springframework.security.core.userdetails.UserDetails;
import stu.lobank.domain.entities.Usuario;

import java.util.List;

public interface UserService {
    void save(Usuario user);
    List<Usuario> findAll();
    UserDetails loadUserByUsername(String username);
    Usuario findById(Long id);
    void update(Usuario user);
}
