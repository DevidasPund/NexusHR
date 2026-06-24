package com.nexushr.repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.nexushr.entity.Attendance;

@Repository
public interface AttendanceRepository
        extends JpaRepository<Attendance, Long> {

    List<Attendance> findByEmployeeId(Long employeeId);

    List<Attendance> findByAttendanceDate(
            LocalDate attendanceDate);

    List<Attendance> findByAttendanceDateGreaterThanEqual(
            LocalDate date);

    Attendance findTopByEmployeeIdOrderByIdDesc(
            Long employeeId);

    long countByAttendanceStatus(
            String attendanceStatus);

    long countByAttendanceDateAndAttendanceStatus(
            LocalDate attendanceDate,
            String attendanceStatus);

    List<Attendance> findByDepartment(
            String department);

    long countByEmployeeIdAndAttendanceStatus(
            Long employeeId,
            String attendanceStatus);

    List<Attendance> findByAttendanceDateBetween(
            LocalDate startDate,
            LocalDate endDate);
}