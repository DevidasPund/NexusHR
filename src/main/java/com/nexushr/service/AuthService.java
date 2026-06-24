package com.nexushr.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.nexushr.entity.Employee;
import com.nexushr.entity.User;
import com.nexushr.repository.EmployeeRepository;
import com.nexushr.repository.UserRepository;

@Service
public class AuthService {

    @Autowired
    private UserRepository repository;

    @Autowired
    private EmployeeRepository employeeRepository;

    @Autowired
    private AuditLogService auditLogService;

    // REGISTER

    public User register(User user) {

        User saved = repository.save(user);

        auditLogService.saveLog(
                user.getUsername(),
                "REGISTER",
                "New User Registered");

        return saved;
    }

    // LOGIN

    public User login(
            String username,
            String password) {

        User user =
                repository
                        .findByUsername(username)
                        .orElse(null);

        if (user == null) {
            throw new RuntimeException("User Not Found");
        }

        if (!password.equals(user.getPassword())) {
            throw new RuntimeException("Invalid Password");
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
            String password) {

        User user =
                repository
                        .findByEmail(email)
                        .orElse(null);

        if (user == null) {
            return "Email Not Found";
        }

        user.setPassword(password);

        repository.save(user);

        auditLogService.saveLog(
                user.getUsername(),
                "PASSWORD_RESET",
                "Password Updated");

        return "Password Updated";
    }

    // CHANGE PASSWORD

    public String changePassword(
            Long employeeId,
            String oldPassword,
            String newPassword) {

        Employee employee =
                employeeRepository
                        .findById(employeeId)
                        .orElseThrow(() ->
                                new RuntimeException("Employee Not Found"));

        User user =
                repository
                        .findByUsername(employee.getUsername())
                        .orElseThrow(() ->
                                new RuntimeException("User Not Found"));

        if (!user.getPassword().equals(oldPassword)) {
            throw new RuntimeException("Old Password Incorrect");
        }

        user.setPassword(newPassword);

        repository.save(user);

        auditLogService.saveLog(
                user.getUsername(),
                "PASSWORD_CHANGE",
                "Password Changed Successfully");

        return "Password Changed Successfully";
    }

    // GET USER BY USERNAME

    public User getUserByUsername(
            String username) {

        return repository
                .findByUsername(username)
                .orElseThrow(() ->
                        new RuntimeException("User Not Found"));
    }
}