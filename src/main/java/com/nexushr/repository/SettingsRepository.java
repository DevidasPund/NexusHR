package com.nexushr.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.nexushr.entity.UserSettings;

@Repository
public interface SettingsRepository
extends JpaRepository<UserSettings, Long>{

    Optional<UserSettings>
    findByUsername(String username);
}