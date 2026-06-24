package com.nexushr.service;

import java.time.Duration;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.nexushr.dto.AttendanceSummary;
import com.nexushr.entity.Attendance;
import com.nexushr.entity.Employee;
import com.nexushr.repository.AttendanceRepository;
import com.nexushr.repository.EmployeeRepository;

@Service
public class AttendanceService {

    @Autowired
    private AttendanceRepository attendanceRepository;

    @Autowired
    private EmployeeRepository employeeRepository;

    public Attendance save(Attendance attendance) {

        if (attendance.getAttendanceDate() == null) {
            attendance.setAttendanceDate(LocalDate.now());
        }

        return attendanceRepository.save(attendance);
    }

    public List<Attendance> getAll() {

        return attendanceRepository.findAll();
    }

    public List<Attendance> getEmployeeAttendance(
            Long employeeId) {

        return attendanceRepository
                .findByEmployeeId(employeeId);
    }

    public List<Attendance> getTodayAttendance() {

        return attendanceRepository
                .findByAttendanceDate(
                        LocalDate.now());
    }

    public List<Attendance> getMonthlyAttendance() {

        LocalDate firstDay =
                LocalDate.now().withDayOfMonth(1);

        return attendanceRepository
                .findByAttendanceDateGreaterThanEqual(
                        firstDay);
    }

    public List<Attendance> getAllAttendanceHistory() {

        return attendanceRepository.findAll();
    }

    public Attendance checkIn(Long employeeId) {

        Employee employee =
                employeeRepository.findById(employeeId)
                        .orElseThrow(() ->
                                new RuntimeException("Employee Not Found"));

        List<Attendance> todayAttendance =
                attendanceRepository.findByEmployeeId(employeeId)
                        .stream()
                        .filter(a ->
                                LocalDate.now().equals(
                                        a.getAttendanceDate()))
                        .toList();

        if (!todayAttendance.isEmpty()) {
            throw new RuntimeException(
                    "Already checked in today");
        }

        Attendance attendance = new Attendance();

        attendance.setEmployeeId(employee.getId());
        attendance.setEmployeeName(
                employee.getFirstName() + " " +
                employee.getLastName());
        attendance.setDepartment(
                employee.getDepartment());
        attendance.setAttendanceDate(
                LocalDate.now());
        attendance.setCheckInTime(
                LocalDateTime.now());
        attendance.setAttendanceStatus(
                "PRESENT");

        return attendanceRepository.save(attendance);
    }
    public Attendance checkOut(Long employeeId) {

        Attendance attendance =
                attendanceRepository
                        .findTopByEmployeeIdOrderByIdDesc(
                                employeeId);

        if (attendance == null) {
            throw new RuntimeException(
                    "Check-In Record Not Found");
        }

        attendance.setCheckOutTime(
                LocalDateTime.now());

        if (attendance.getCheckInTime() != null) {

            long minutes =
                    Duration.between(
                            attendance.getCheckInTime(),
                            attendance.getCheckOutTime())
                            .toMinutes();

            attendance.setWorkingHours(
                    minutes / 60.0);
        }

        return attendanceRepository.save(
                attendance);
    }

    public Attendance updateAttendanceStatus(
            Long id,
            String status) {

        Attendance attendance =
                attendanceRepository.findById(id)
                        .orElseThrow(
                                () -> new RuntimeException(
                                        "Attendance Not Found"));

        attendance.setAttendanceStatus(
                status);

        return attendanceRepository.save(
                attendance);
    }

    public void deleteAttendance(Long id) {

        attendanceRepository.deleteById(id);
    }

    public AttendanceSummary getSummary() {

        AttendanceSummary summary = new AttendanceSummary();

        LocalDate today = LocalDate.now();

        long totalEmployees = employeeRepository.count();

        long present =
                attendanceRepository
                        .countByAttendanceDateAndAttendanceStatus(
                                today,
                                "PRESENT");

        long absent =
                attendanceRepository
                        .countByAttendanceDateAndAttendanceStatus(
                                today,
                                "ABSENT");

        summary.setTotalAttendance(totalEmployees);
        summary.setPresentCount(present);
        summary.setAbsentCount(absent);
        summary.setLeaveCount(0);

        return summary;
    }
}