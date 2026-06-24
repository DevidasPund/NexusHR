package com.nexushr.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.nexushr.entity.Employee;
import com.nexushr.entity.User;
import com.nexushr.repository.EmployeeRepository;
import com.nexushr.service.AuthService;

@RestController
@RequestMapping("/auth")
@CrossOrigin("*")
public class AuthController {

    @Autowired
    private AuthService service;

    @Autowired
    private EmployeeRepository employeeRepository;

    @PostMapping("/register")
    public User register(
            @RequestBody User user) {

        return service.register(user);
    }

    @PostMapping("/login")
    public Map<String, Object> login(
            @RequestBody User loginUser) {

        User user = service.login(
                loginUser.getUsername(),
                loginUser.getPassword());

        Employee employee =
                employeeRepository
                        .findByUsername(
                                user.getUsername())
                        .orElse(null);

        Map<String, Object> response =
                new HashMap<>();

        response.put("id", user.getId());
        response.put("username", user.getUsername());
        response.put("email", user.getEmail());
        response.put("role", user.getRole());
        response.put("employeeName", user.getEmployeeName());

        if (employee != null) {
            response.put("employeeId", employee.getId());
            response.put("department", employee.getDepartment());
            response.put("designation", employee.getDesignation());
        }

        return response;
    }

    @PutMapping("/reset-password")
    public String resetPassword(
            @RequestParam String email,
            @RequestParam String password) {

        return service.resetPassword(
                email,
                password);
    }

    @PutMapping("/change-password/{employeeId}")
    public String changePassword(
            @PathVariable Long employeeId,
            @RequestBody Map<String, String> request) {

        return service.changePassword(
                employeeId,
                request.get("oldPassword"),
                request.get("newPassword"));
    }

    @GetMapping("/user/{username}")
    public User getUser(
            @PathVariable String username) {

        return service.getUserByUsername(
                username);
    }
}