package com.nexushr.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.nexushr.entity.Employee;
import com.nexushr.service.SalaryService;

@RestController
@RequestMapping("/salary")
@CrossOrigin("*")
public class SalaryController {

    @Autowired
    private SalaryService service;

    @GetMapping
    public List<Employee> getPayroll() {

        return service.getPayroll();
    }

    @GetMapping("/{id}")
    public Employee getEmployeeSalary(
            @PathVariable Long id) {

        return service.getEmployeeSalary(id);
    }

    @PutMapping("/{id}/{salary}")
    public Employee updateSalary(
            @PathVariable Long id,
            @PathVariable Double salary) {

        return service.updateSalary(
                id,
                salary);
    }

    @GetMapping("/summary")
    public Double totalPayroll() {

        return service.getTotalPayroll();
    }
}