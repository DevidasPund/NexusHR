package com.nexushr.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.nexushr.entity.Payslip;
import com.nexushr.service.PayslipService;

@RestController
@RequestMapping("/payslip")
@CrossOrigin("*")
public class PayslipController {

    @Autowired
    private PayslipService service;

    @PostMapping
    public Payslip generatePayslip(
            @RequestBody Payslip payslip) {

        return service.generatePayslip(
                payslip);
    }

    @GetMapping
    public List<Payslip> getAllPayslips() {

        return service.getAllPayslips();
    }

    @GetMapping("/employee/{id}")
    public List<Payslip> getEmployeePayslips(
            @PathVariable Long id) {

        return service.getEmployeePayslips(id);
    }
}
