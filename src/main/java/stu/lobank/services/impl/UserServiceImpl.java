package stu.lobank.services.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import stu.lobank.domain.entities.UserDetailsImpl;
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
        if(existsByAccountId(user.getAccount().getNumber())){
            throw new IllegalArgumentException("Já existe um usuário com essa conta.");
        }
        userRepository.save(user);
    }
    public void update(Usuario user){
        if(!existsById(user.getId())){
            throw new IllegalArgumentException("ID não encontrado");
        }
        userRepository.save(user);
    }
    @Override
    public List<Usuario> findAll() {
        return userRepository.findAll();
    }

    @Override
    @Transactional
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Usuario user = userRepository.findOptionalUserByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User Not Found with username: " + username));
        return UserDetailsImpl.build(user);
    }
    @Override
    public Usuario findById(Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Usuário com id " + id + " não encontrado."));
    }
    private boolean existsById(Long id) {
        Optional<Usuario> existingUser = userRepository.findById(Long.valueOf(id));
        return existingUser.isPresent();
    }
    private boolean existsByAccountId(Integer accountId) {
        return userRepository.existsByAccountId(accountId);
    }
}
