package com.nexushr.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.nexushr.entity.Department;

@Repository
public interface DepartmentRepository
        extends JpaRepository<Department, Long> {

    Optional<Department>
    findByDepartmentName(
            String departmentName);

    boolean existsByDepartmentName(
            String departmentName);

    long countByDepartmentNameContainingIgnoreCase(
            String keyword);
}