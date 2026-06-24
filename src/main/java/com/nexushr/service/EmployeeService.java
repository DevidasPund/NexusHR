package com.nexushr.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.nexushr.entity.Employee;
import com.nexushr.repository.EmployeeRepository;

@Service
public class EmployeeService {

    @Autowired
    private EmployeeRepository repository;

    // Save Employee
    public Employee save(Employee employee) {
        return repository.save(employee);
    }

    // Get All Employees
    public List<Employee> getAllEmployees() {
        return repository.findAll();
    }

    // Get Employee By ID
    public Employee getById(Long id) {
        return repository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Employee Not Found"));
    }

    // Get Employee By Username
    public Employee getByUsername(String username) {
        return repository.findByUsername(username)
                .orElseThrow(() ->
                        new RuntimeException("Employee Not Found"));
    }

    // Update Employee
    public Employee updateEmployee(
            Long id,
            Employee employee) {

        Employee existing = getById(id);

        existing.setFirstName(employee.getFirstName());
        existing.setLastName(employee.getLastName());
        existing.setEmail(employee.getEmail());
        existing.setPhone(employee.getPhone());
        existing.setDepartment(employee.getDepartment());
        existing.setDesignation(employee.getDesignation());
        existing.setSalary(employee.getSalary());
        existing.setRole(employee.getRole());
        existing.setStatus(employee.getStatus());
        existing.setUsername(employee.getUsername());
        existing.setSkills(employee.getSkills());
        existing.setMissingSkills(employee.getMissingSkills());

        return repository.save(existing);
    }

    // Delete Employee
    public void delete(Long id) {
        repository.deleteById(id);
    }

    // Count Employees
    public long count() {
        return repository.count();
    }

    // Active Employees
    public Long getActiveEmployees() {
        return repository.countByStatus("ACTIVE");
    }

    // Total Salary
    public Double getTotalSalary() {
        Double total = repository.getTotalSalary();
        return total == null ? 0.0 : total;
    }

    // Department Wise Employees
    public List<Employee> getByDepartment(
            String department) {

        return repository.findByDepartment(department);
    }

    // Role Wise Employees
    public List<Employee> getByRole(
            String role) {

        return repository.findByRole(role);
    }

    // Search Employee
    public List<Employee> searchEmployee(
            String name) {

        return repository
                .findByFirstNameContainingIgnoreCaseOrLastNameContainingIgnoreCase(
                        name,
                        name);
    }
}