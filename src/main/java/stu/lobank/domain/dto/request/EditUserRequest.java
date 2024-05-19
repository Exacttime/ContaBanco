package stu.lobank.domain.dto.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;
import stu.lobank.domain.entities.Role;

import java.util.HashSet;
import java.util.Set;
@Getter
@Setter
public class EditUserRequest {
    @Size(min = 2, max = 50)
    private String fullName;
    @Size(min = 3, max = 20)
    private String username;

    @Size(max = 50)
    @Email
    private String email;
    private String password;
    private Set<String> role;
}
