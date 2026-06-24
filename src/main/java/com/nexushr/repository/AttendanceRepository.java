package com.nexushr.repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.nexushr.entity.Attendance;

@Repository
public interface AttendanceRepository
        extends JpaRepository<Attendance, Long> {

    // Employee Attendance
    List<Attendance> findByEmployeeId(
            Long employeeId);

    // Today's Attendance
    List<Attendance> findByAttendanceDate(
            LocalDate attendanceDate);

    // Monthly Attendance
    List<Attendance> findByAttendanceDateGreaterThanEqual(
            LocalDate date);

    // Latest Attendance Record
    Attendance findTopByEmployeeIdOrderByIdDesc(
            Long employeeId);

    // Status Count
    long countByAttendanceStatus(
            String attendanceStatus);

    // Today's Present Count
    long countByAttendanceDateAndAttendanceStatus(
            LocalDate attendanceDate,
            String attendanceStatus);

    // Attendance By Department
    List<Attendance> findByDepartment(
            String department);

    // Employee Status Count
    long countByEmployeeIdAndAttendanceStatus(
            Long employeeId,
            String attendanceStatus);

    // Date Range Attendance
    List<Attendance> findByAttendanceDateBetween(
            LocalDate startDate,
            LocalDate endDate);
}