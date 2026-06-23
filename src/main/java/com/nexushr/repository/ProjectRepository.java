package com.nexushr.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.nexushr.entity.Project;

public interface ProjectRepository
        extends JpaRepository<Project, Long> {

}