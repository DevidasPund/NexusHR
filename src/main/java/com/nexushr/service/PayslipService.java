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

        if (payslip.getGeneratedDate() == null) {
            payslip.setGeneratedDate(
                    LocalDate.now());
        }

        double netSalary =
                payslip.getBasicSalary()
                + payslip.getBonus()
                - payslip.getDeduction();

        payslip.setNetSalary(netSalary);

        return repository.save(payslip);
    }

    public List<Payslip> getAllPayslips() {

        return repository.findAll();
    }

    public List<Payslip> getEmployeePayslips(
            Long employeeId) {

        return repository.findByEmployeeId(
                employeeId);
    }

    public Payslip getById(
            Long id) {

        return repository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Payslip Not Found"));
    }

    public void delete(
            Long id) {

        repository.deleteById(id);
    }
}