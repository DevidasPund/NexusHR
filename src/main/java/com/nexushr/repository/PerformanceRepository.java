package com.nexushr.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.nexushr.entity.Performance;

public interface PerformanceRepository
        extends JpaRepository<Performance, Long> {

    List<Performance>
    findByEmployeeId(Long employeeId);
    
    Long countByRating(
            String rating);
}