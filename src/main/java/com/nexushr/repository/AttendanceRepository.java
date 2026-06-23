package com.nexushr.repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.nexushr.entity.Attendance;
@Repository
public interface AttendanceRepository
        extends JpaRepository<Attendance, Long> {

    List<Attendance> findByEmployeeId(Long employeeId);

    List<Attendance>
    findByEmployeeIdOrderByAttendanceDateDesc(
            Long employeeId);

    Optional<Attendance>
    findByEmployeeIdAndAttendanceDate(
            Long employeeId,
            LocalDate attendanceDate);

    long countByAttendanceDate(
            LocalDate attendanceDate);

    List<Attendance>
    findByAttendanceDate(
            LocalDate attendanceDate);

    long countByStatus(
            String status);

    List<Attendance>
    findByStatus(
            String status);

    List<Attendance>
    findByAttendanceDateBetween(
            LocalDate startDate,
            LocalDate endDate);

    // NEW

    long countByAttendanceDateAndStatus(
            LocalDate attendanceDate,
            String status);

    List<Attendance>
    findByAttendanceDateOrderByAttendanceDateDesc(
            LocalDate attendanceDate);

    List<Attendance>
    findAllByOrderByAttendanceDateDesc();
}