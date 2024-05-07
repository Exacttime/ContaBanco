package stu.lobank.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import stu.lobank.domain.entities.Usuario;
import stu.lobank.services.UserService;

import java.util.List;

@RestController
public class UserController extends BaseController {
    private final UserService userService;
    private final PasswordEncoder passwordEncoder;
    @Autowired
    public UserController(UserService userService, PasswordEncoder passwordEncoder) {
        this.userService = userService;
        this.passwordEncoder = passwordEncoder;
    }
    @GetMapping("/users")
    public List<Usuario> listUsers(){
        return userService.findAll();
    }
    @GetMapping("/user/{id}")
    public Usuario getUser(@PathVariable Long id){
        return userService.findById(id);
    }
    @PostMapping("/user")
    public void createUser(@RequestBody Usuario user){
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        userService.save(user);
    }
}
