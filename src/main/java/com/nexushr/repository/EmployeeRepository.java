package com.nexushr.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.nexushr.entity.Employee;

public interface EmployeeRepository
        extends JpaRepository<Employee, Long> {

    Optional<Employee> findByUsername(
            String username);

    List<Employee> findByDepartment(
            String department);

    List<Employee> findByRole(
            String role);

    Long countByStatus(
            String status);

    @Query("SELECT COALESCE(SUM(e.salary),0) FROM Employee e")
    Double getTotalSalary();

    List<Employee>
    findByFirstNameContainingIgnoreCaseOrLastNameContainingIgnoreCase(
            String firstName,
            String lastName);
}