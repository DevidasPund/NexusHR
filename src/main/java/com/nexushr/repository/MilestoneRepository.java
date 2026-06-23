package com.nexushr.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.nexushr.entity.Milestone;

@Repository
public interface MilestoneRepository
        extends JpaRepository<Milestone, Long> {

    List<Milestone> findByProjectName(
            String projectName);

    Long countByStatus(
            String status);
}