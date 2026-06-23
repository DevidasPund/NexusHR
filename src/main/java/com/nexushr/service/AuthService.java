package com.nexushr.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.nexushr.entity.User;
import com.nexushr.repository.UserRepository;

@Service
public class AuthService {

    @Autowired
    private UserRepository repository;

    @Autowired
    private PasswordEncoder encoder;

    @Autowired
    private AuditLogService auditLogService;

    // REGISTER

    public User register(User user){

        user.setPassword(
                encoder.encode(
                        user.getPassword()));

        User saved =
                repository.save(user);

        auditLogService.saveLog(
                user.getUsername(),
                "REGISTER",
                "New User Registered");

        return saved;
    }

    // LOGIN

    public User login(
            String username,
            String password){

        User user =
                repository
                .findByUsername(username)
                .orElse(null);

        if(user == null){
            throw new RuntimeException("User not found");
        }

        if(!encoder.matches(
                password,
                user.getPassword())){

            throw new RuntimeException(
                    "Invalid Password");
        }

        auditLogService.saveLog(
                username,
                "LOGIN",
                "User Logged In");

        return user;
    }

    // RESET PASSWORD

    public String resetPassword(
            String email,
            String password){

        User user =
                repository
                .findByEmail(email)
                .orElse(null);

        if(user == null){

            return "Email Not Found";
        }

        user.setPassword(
                encoder.encode(
                        password));

        repository.save(user);

        auditLogService.saveLog(
                user.getUsername(),
                "PASSWORD_RESET",
                "Password Updated");

        return "Password Updated";
    }
}