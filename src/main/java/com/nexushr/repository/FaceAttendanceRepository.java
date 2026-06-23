package com.nexushr.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.nexushr.entity.FaceAttendance;

public interface FaceAttendanceRepository
extends JpaRepository<FaceAttendance, Long>{

    List<FaceAttendance>
    findByEmployeeId(
        Long employeeId);
}