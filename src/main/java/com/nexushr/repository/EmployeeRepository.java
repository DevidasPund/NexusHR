package com.nexushr.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.nexushr.entity.Employee;

@Repository
public interface EmployeeRepository
        extends JpaRepository<Employee, Long> {

    Optional<Employee> findByUsername(
            String username);

    Optional<Employee> findByEmail(
            String email);

    List<Employee> findByDepartment(
            String department);

    List<Employee> findByRole(
            String role);

    List<Employee> findByAttritionRisk(
            String attritionRisk);

    List<Employee> findByFirstNameContainingIgnoreCase(
            String firstName);

    Long countByStatus(
            String status);

    Long countByRole(
            String role);

    Long countByDepartment(
            String department);

    Long countByAttritionRisk(
            String attritionRisk);

    @Query("""
        SELECT COALESCE(
        SUM(e.salary),0)
        FROM Employee e
    """)
    Double getTotalSalary();
}