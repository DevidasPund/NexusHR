package com.nexushr.config;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.nexushr.entity.User;
import com.nexushr.repository.UserRepository;

@Configuration
public class DataInitializer {

    @Bean
    CommandLineRunner init(
            UserRepository repo) {

        return args -> {

            if(repo.count() == 0) {

                User admin =
                        new User();

                admin.setUsername(
                        "admin");

                admin.setPassword(
                        "admin123");

                admin.setRole(
                        "ADMIN");

                repo.save(admin);

                User manager =
                        new User();

                manager.setUsername(
                        "manager");

                manager.setPassword(
                        "manager123");

                manager.setRole(
                        "MANAGER");

                repo.save(manager);

                User employee =
                        new User();

                employee.setUsername(
                        "employee");

                employee.setPassword(
                        "employee123");

                employee.setRole(
                        "EMPLOYEE");

                repo.save(employee);
            }
        };
    }
}