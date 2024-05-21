package stu.lobank.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import stu.lobank.domain.dto.request.EditUserRequest;
import stu.lobank.domain.dto.response.MessageResponse;
import stu.lobank.domain.entities.Role;
import stu.lobank.domain.entities.UserRoles;
import stu.lobank.domain.entities.Usuario;
import stu.lobank.repository.RoleRepository;
import stu.lobank.repository.UserRepository;
import stu.lobank.services.UserService;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@RestController
public class UserController extends BaseController {
    private final UserService userService;
    private final PasswordEncoder passwordEncoder;
    private final RoleRepository roleRepository;
    private final UserRepository userRepository;

    @Autowired
    public UserController(UserService userService, PasswordEncoder passwordEncoder, RoleRepository roleRepository, UserRepository userRepository) {
        this.userService = userService;
        this.passwordEncoder = passwordEncoder;
        this.roleRepository = roleRepository;
        this.userRepository = userRepository;
    }
    @GetMapping("/users")
    @PreAuthorize("hasRole('ADMIN') or hasRole('MODERATOR')")
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
    @PutMapping("/user/{id}")
    @PreAuthorize("hasRole('ADMIN') or hasRole('MODERATOR') or hasRole('USER')")
    public ResponseEntity<?> updateUser(@PathVariable Long id, @RequestBody EditUserRequest editUserRequest) {
        Usuario existingUser = userService.findById(id);

        if (existingUser != null) {
            if (editUserRequest.getFullName() != null && !editUserRequest.getFullName().isEmpty()) {
                existingUser.setName(editUserRequest.getFullName());
            }

            if (editUserRequest.getUsername() != null && !editUserRequest.getUsername().isEmpty()) {
                existingUser.setUsername(editUserRequest.getUsername());
            }

            if (editUserRequest.getEmail() != null && !editUserRequest.getEmail().isEmpty()) {
                existingUser.setEmail(editUserRequest.getEmail());
            }
            Set<String> strRoles = editUserRequest.getRole();
            Set<Role> roles = new HashSet<>();
            if (strRoles == null) {
                Role userRole = roleRepository.findByName(UserRoles.ROLE_USER)
                        .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
                roles.add(userRole);
            } else {
                strRoles.forEach(role -> {
                    switch (role) {
                        case "admin":
                            Role adminRole = roleRepository.findByName(UserRoles.ROLE_ADMIN)
                                    .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
                            roles.add(adminRole);

                            break;
                        case "mod":
                            Role modRole = roleRepository.findByName(UserRoles.ROLE_MODERATOR)
                                    .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
                            roles.add(modRole);

                            break;
                        default:
                            Role userRole = roleRepository.findByName(UserRoles.ROLE_USER)
                                    .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
                            roles.add(userRole);
                    }
                });
            }
            existingUser.setRoles(roles);
            if (editUserRequest.getPassword() != null && !editUserRequest.getPassword().isEmpty()) {
                existingUser.setPassword(passwordEncoder.encode(editUserRequest.getPassword()));
            }
            userService.update(existingUser);
            return ResponseEntity.ok(new MessageResponse("User updated successfully!"));
        }
        return ResponseEntity.badRequest().body(new MessageResponse("Error: User not found."));
    }

}
