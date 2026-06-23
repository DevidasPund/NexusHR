package com.nexushr.service;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.nexushr.entity.Payslip;
import com.nexushr.repository.PayslipRepository;

@Service
public class PayslipService {

    @Autowired
    private PayslipRepository repository;

    public Payslip generatePayslip(
            Payslip payslip) {

        double netSalary =
                payslip.getBasicSalary()
                + payslip.getBonus()
                - payslip.getDeduction();

        payslip.setNetSalary(
                netSalary);

        payslip.setGeneratedDate(
                LocalDate.now());

        Payslip savedPayslip =
                repository.save(
                        payslip);

        return savedPayslip;
    }

    public List<Payslip> getAllPayslips() {

        return repository.findAll();
    }

    public List<Payslip> getEmployeePayslips(
            Long employeeId) {

        return repository.findByEmployeeId(
                employeeId);
    }
}