package com.nexushr.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.nexushr.entity.Employee;
import com.nexushr.entity.Notification;
import com.nexushr.repository.EmployeeRepository;

@Service
public class SalaryService {

    @Autowired
    private EmployeeRepository employeeRepository;

    @Autowired
    private NotificationService notificationService;

    @Autowired
    private AuditLogService auditLogService;

    @Autowired
    private EmailService emailService;

    // Get Employee Salary

    public Employee getEmployeeSalary(
            Long employeeId) {

        return employeeRepository
                .findById(employeeId)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Employee Not Found"));
    }

    // Get All Employees Payroll

    public List<Employee> getPayroll() {

        return employeeRepository.findAll();
    }

    // Update Salary

    public Employee updateSalary(
            Long employeeId,
            Double salary) {

        Employee employee =
                employeeRepository
                .findById(employeeId)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Employee Not Found"));

        Double oldSalary =
                employee.getSalary();

        employee.setSalary(
                salary);

        Employee updated =
                employeeRepository.save(
                        employee);

        // Audit Log

        auditLogService.saveLog(
                "ADMIN",
                "SALARY_UPDATED",
                employee.getFirstName()
                + " Salary Updated From ₹"
                + oldSalary
                + " To ₹"
                + salary);

        // Notification

        Notification notification =
                new Notification();

        notification.setTitle(
                "Salary Updated");

        notification.setMessage(
                "Your salary has been updated to ₹"
                + salary);

        notification.setSender(
                "ADMIN");

        notification.setReceiver(
                employee.getUsername());

        notificationService.save(
                notification);

        // Email

        if(employee.getEmail() != null &&
           !employee.getEmail().isEmpty()) {

            emailService.sendEmail(
                    employee.getEmail(),
                    "Salary Updated",
                    "Hello "
                    + employee.getFirstName()
                    + ",\n\nYour salary has been updated.\nNew Salary : ₹"
                    + salary);
        }

        return updated;
    }

    // Payroll Summary

    public Double getTotalPayroll() {

        Double total =
                employeeRepository.getTotalSalary();

        return total == null ? 0 : total;
    }
}