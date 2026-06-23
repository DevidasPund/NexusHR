package com.nexushr.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.nexushr.entity.Employee;
import com.nexushr.service.AIWorkforceService;
import com.nexushr.service.EmployeeService;

@RestController
@RequestMapping("/ai")
@CrossOrigin("*")
public class AIController {

    @Autowired
    private EmployeeService employeeService;

    @Autowired
    private AIWorkforceService aiService;

    @GetMapping("/attrition/{id}")
    public Employee getAttritionAnalysis(
            @PathVariable Long id) {

        Employee employee =
                employeeService.getById(id);

        return aiService.analyzeEmployee(
                employee);
    }
}