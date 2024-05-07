package stu.lobank.services.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import stu.lobank.domain.entities.Usuario;
import stu.lobank.repository.UserRepository;
import stu.lobank.services.UserService;

import java.util.List;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService, UserDetailsService {
    private final UserRepository userRepository;
    @Autowired
    public UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }
    public void save(Usuario user) {
        if(existsById(user.getId())){
            throw new IllegalArgumentException("Já existe um usuário com esse Id.");
        }
        userRepository.save(user);
    }
    @Override
    public List<Usuario> findAll() {
        return userRepository.findAll();
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<Usuario> user = userRepository.findOptionalUserByUsername(username);
        if (user.isPresent()) {
            var userObj = user.get();
            return User.builder()
                    .username(userObj.getUsername())
                    .password(userObj.getPassword())
                    .roles(getRoles(userObj))
                    .build();
        } else {
            throw new UsernameNotFoundException(username);
        }
    }
    @Override
    public Usuario findById(Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Usuário com id " + id + " não encontrado."));
    }
    private String[] getRoles(Usuario user) {
        if (user.getRole() == null) {
            return new String[]{"USER"};
        }
        return user.getRole().split(",");
    }
    private boolean existsById(Integer id) {
        Optional<Usuario> existingUser = userRepository.findById(Long.valueOf(id));
        return existingUser.isPresent();
    }
}
