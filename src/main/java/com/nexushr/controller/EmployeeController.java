package com.nexushr.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.nexushr.entity.Employee;
import com.nexushr.service.EmployeeService;

@RestController
@RequestMapping("/employees")
@CrossOrigin("*")
public class EmployeeController {

    @Autowired
    private EmployeeService employeeService;

   

    @PostMapping
    public Employee save(
            @RequestBody Employee employee) {

        System.out.println(employee);

        return employeeService.save(employee);
    }
    @PostMapping
    public Object save(
            @RequestBody java.util.Map<String,Object> data) {

        System.out.println("DATA = " + data);

        return data;
    }


    @GetMapping
    public List<Employee> getAll() {

        return employeeService.getAllEmployees();
    }

    // Get Employee By ID

    @GetMapping("/{id}")
    public Employee getById(
            @PathVariable Long id) {

        return employeeService.getById(id);
    }

   

    @GetMapping("/profile/{id}")
    public Employee getProfile(
            @PathVariable Long id) {

        return employeeService.getById(id);
    }



    @GetMapping("/username/{username}")
    public Employee getByUsername(
            @PathVariable String username) {

        return employeeService.getByUsername(
                username);
    }



    @PutMapping("/{id}")
    public Employee updateEmployee(
            @PathVariable Long id,
            @RequestBody Employee employee) {

        return employeeService.updateEmployee(
                id,
                employee);
    }


    @DeleteMapping("/{id}")
    public String delete(
            @PathVariable Long id) {

        employeeService.delete(id);

        return "Employee Deleted Successfully";
    }

   

    @GetMapping("/count")
    public long countEmployees() {

        return employeeService.count();
    }

    // Active Employees

    @GetMapping("/active-count")
    public Long activeEmployees() {

        return employeeService.getActiveEmployees();
    }

    // Total Salary

    @GetMapping("/total-salary")
    public Double totalSalary() {

        return employeeService.getTotalSalary();
    }

    // Employees By Department

    @GetMapping("/department/{department}")
    public List<Employee> getByDepartment(
            @PathVariable String department) {

        return employeeService.getByDepartment(
                department);
    }

    // Employees By Role

    @GetMapping("/role/{role}")
    public List<Employee> getByRole(
            @PathVariable String role) {

        return employeeService.getByRole(role);
    }

    // Search Employee

    @GetMapping("/search/{name}")
    public List<Employee> searchEmployee(
            @PathVariable String name) {

        return employeeService.searchEmployee(
                name);
    }
}