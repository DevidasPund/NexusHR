package com.nexushr.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.nexushr.entity.Employee;
import com.nexushr.service.EmployeeService;

@RestController
@RequestMapping("/reports")
@CrossOrigin("*")
public class ReportController {

    @Autowired
    private EmployeeService employeeService;

    // Employee Report Data
    @GetMapping
    public List<Employee> getReportData() {

        return employeeService.getAllEmployees();
    }

    // PDF Report
    @GetMapping("/pdf")
    public String pdfReport() {

        return "PDF Report Generated Successfully";
    }

    // Excel Report
    @GetMapping("/excel")
    public String excelReport() {

        return "Excel Report Generated Successfully";
    }

    // Summary Report
    @GetMapping("/summary")
    public ReportSummary summary() {

        ReportSummary summary =
                new ReportSummary();

        summary.setTotalEmployees(
                employeeService.count());

        summary.setActiveEmployees(
                employeeService.getActiveEmployees());

        summary.setTotalSalary(
                employeeService.getTotalSalary());

        return summary;
    }

    static class ReportSummary {

        private long totalEmployees;
        private long activeEmployees;
        private Double totalSalary;

        public long getTotalEmployees() {
            return totalEmployees;
        }

        public void setTotalEmployees(
                long totalEmployees) {
            this.totalEmployees = totalEmployees;
        }

        public long getActiveEmployees() {
            return activeEmployees;
        }

        public void setActiveEmployees(
                long activeEmployees) {
            this.activeEmployees = activeEmployees;
        }

        public Double getTotalSalary() {
            return totalSalary;
        }

        public void setTotalSalary(
                Double totalSalary) {
            this.totalSalary = totalSalary;
        }
    }
}