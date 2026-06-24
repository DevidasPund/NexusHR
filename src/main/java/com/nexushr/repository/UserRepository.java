package com.nexushr.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.nexushr.entity.User;

public interface UserRepository
        extends JpaRepository<User, Long> {

    Optional<User> findByUsername(String username);

    Optional<User> findByEmail(String email);
}