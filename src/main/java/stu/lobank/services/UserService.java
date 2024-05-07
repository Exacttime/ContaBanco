package stu.lobank.services;

import org.springframework.security.core.userdetails.UserDetails;
import stu.lobank.domain.entities.Usuario;

import java.util.List;
import java.util.Optional;

public interface UserService {
    public void save(Usuario user);
    public List<Usuario> findAll();
    public UserDetails loadUserByUsername(String username);
    public Usuario findById(Long id);
}
