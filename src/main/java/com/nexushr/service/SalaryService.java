package com.nexushr.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.nexushr.entity.Employee;
import com.nexushr.repository.EmployeeRepository;

@Service
public class SalaryService {

    @Autowired
    private EmployeeRepository repository;

    // Get All Payroll Records
    public List<Employee> getPayroll() {

        return repository.findAll();
    }

    // Get Employee Salary
    public Employee getEmployeeSalary(
            Long id) {

        return repository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Employee Not Found"));
    }

    // Update Salary
    public Employee updateSalary(
            Long id,
            Double salary) {

        Employee employee =
                getEmployeeSalary(id);

        employee.setSalary(salary);

        return repository.save(employee);
    }

    // Total Payroll
    public Double getTotalPayroll() {

        return repository.findAll()
                .stream()
                .mapToDouble(emp ->
                        emp.getSalary() == null
                                ? 0
                                : emp.getSalary())
                .sum();
    }

    // Average Salary
    public Double getAverageSalary() {

        List<Employee> employees =
                repository.findAll();

        if (employees.isEmpty()) {
            return 0.0;
        }

        return getTotalPayroll()
                / employees.size();
    }
}