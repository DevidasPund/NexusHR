package com.nexushr.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.nexushr.entity.Payslip;

public interface PayslipRepository
        extends JpaRepository<Payslip, Long> {

    List<Payslip> findByEmployeeId(
            Long employeeId);
}