package com.nexushr.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.nexushr.entity.Team;

public interface TeamRepository
        extends JpaRepository<Team, Long> {

}