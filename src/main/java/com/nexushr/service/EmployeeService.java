package com.nexushr.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.nexushr.entity.Employee;
import com.nexushr.entity.Notification;
import com.nexushr.repository.EmployeeRepository;

@Service
public class EmployeeService {

    @Autowired
    private EmployeeRepository repository;

    @Autowired
    private NotificationService notificationService;

    @Autowired
    private AuditLogService auditLogService;

    @Autowired
    private EmailService emailService;

    // SAVE EMPLOYEE

    public Employee save(Employee employee) {

        Employee savedEmployee =
                repository.save(employee);

        // Notification

        Notification notification =
                new Notification();

        notification.setTitle(
                "New Employee Added");

        notification.setMessage(
                savedEmployee.getFirstName()
                + " "
                + savedEmployee.getLastName()
                + " joined "
                + savedEmployee.getDepartment());

        notification.setSender(
                "SYSTEM");

        notification.setReceiver(
                "ALL");

        notificationService.save(
                notification);

        // Audit Log

        auditLogService.saveLog(
                "ADMIN",
                "EMPLOYEE_ADDED",
                savedEmployee.getFirstName()
                + " "
                + savedEmployee.getLastName());

        // Email

        if(savedEmployee.getEmail() != null &&
           !savedEmployee.getEmail().isEmpty()) {

            emailService.sendEmail(
                    savedEmployee.getEmail(),
                    "Welcome To NexusHR",
                    "Hello "
                    + savedEmployee.getFirstName()
                    + ",\n\nWelcome to NexusHR.\nYour employee account has been created successfully.");
        }

        return savedEmployee;
    }

    // GET ALL EMPLOYEES

    public List<Employee> getAllEmployees() {

        return repository.findAll();
    }

    // GET EMPLOYEE BY ID

    public Employee getById(Long id) {

        return repository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Employee Not Found"));
    }

    // GET EMPLOYEE BY USERNAME

    public Employee getByUsername(
            String username){

        return repository
                .findByUsername(username)
                .orElseThrow(
                    () -> new RuntimeException(
                        "Employee Not Found"
                    ));
    }
    // UPDATE EMPLOYEE

    public Employee updateEmployee(
            Long id,
            Employee employee) {

        Employee existing =
                repository.findById(id)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Employee Not Found"));

        Double oldSalary =
                existing.getSalary();

        existing.setFirstName(
                employee.getFirstName());

        existing.setLastName(
                employee.getLastName());

        existing.setUsername(
                employee.getUsername());

        existing.setEmail(
                employee.getEmail());

        existing.setPhone(
                employee.getPhone());

        existing.setDepartment(
                employee.getDepartment());

        existing.setDesignation(
                employee.getDesignation());

        existing.setSalary(
                employee.getSalary());

        existing.setRole(
                employee.getRole());

        existing.setStatus(
                employee.getStatus());

        existing.setProfileImage(
                employee.getProfileImage());

        Employee updated =
                repository.save(existing);

        // Audit Log

        auditLogService.saveLog(
                "ADMIN",
                "EMPLOYEE_UPDATED",
                existing.getFirstName()
                + " "
                + existing.getLastName());

        // Salary Update Audit

        if(oldSalary != null &&
           !oldSalary.equals(
                   employee.getSalary())) {

            auditLogService.saveLog(
                    "ADMIN",
                    "SALARY_UPDATED",
                    existing.getFirstName()
                    + " Salary Changed From ₹"
                    + oldSalary
                    + " To ₹"
                    + employee.getSalary());
        }

        return updated;
    }

    // DELETE EMPLOYEE

    public void delete(Long id) {

        Employee employee =
                repository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Employee Not Found"));

        auditLogService.saveLog(
                "ADMIN",
                "EMPLOYEE_DELETED",
                employee.getFirstName()
                + " "
                + employee.getLastName());

        repository.deleteById(id);
    }

    // TOTAL EMPLOYEES

    public long count() {

        return repository.count();
    }

    // ACTIVE EMPLOYEES

    public Long getActiveEmployees() {

        return repository.countByStatus(
                "ACTIVE");
    }

    // TOTAL SALARY

    public Double getTotalSalary() {

        return repository.getTotalSalary();
    }
    public List<Employee> getEmployeesByDepartment(
            String department) {

        return repository.findByDepartment(
                department);
    }

    public List<Employee> getEmployeesByRole(
            String role) {

        return repository.findByRole(
                role);
    }

    public List<Employee> getEmployeesByAttritionRisk(
            String risk) {

        return repository.findByAttritionRisk(
                risk);
    }
    public List<Employee> getByDepartment(
            String department){

        return repository.findByDepartment(
                department);
    }

    public List<Employee> getByRole(
            String role){

        return repository.findByRole(
                role);
    }

    public List<Employee> searchEmployee(
            String name){

        return repository
                .findByFirstNameContainingIgnoreCase(
                        name);
    }

   
}