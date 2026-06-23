package com.nexushr.service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.nexushr.dto.AttendanceSummary;
import com.nexushr.entity.Attendance;
import com.nexushr.repository.AttendanceRepository;
import com.nexushr.repository.EmployeeRepository;

@Service
public class AttendanceService {

    @Autowired
    private AttendanceRepository repository;

    @Autowired
    private EmployeeRepository employeeRepository;

    // SAVE ATTENDANCE

    public Attendance save(
            Attendance attendance) {

        return repository.save(
                attendance);
    }

    // GET ALL ATTENDANCE

    public List<Attendance> getAll() {

        return repository.findAll();
    }

    // EMPLOYEE ATTENDANCE HISTORY

    public List<Attendance>
    getEmployeeAttendance(
            Long employeeId) {

        return repository
                .findByEmployeeIdOrderByAttendanceDateDesc(
                        employeeId);
    }

    // CHECK IN
    // ONE TIME PER DAY

    public Attendance checkIn(
            Long employeeId) {

        LocalDate today =
                LocalDate.now();

        Attendance attendance =
                repository
                .findByEmployeeIdAndAttendanceDate(
                        employeeId,
                        today)
                .orElse(null);

        if(attendance != null) {

            throw new RuntimeException(
                    "You have already checked in today");
        }

        attendance =
                new Attendance();

        attendance.setEmployeeId(
                employeeId);

        attendance.setAttendanceDate(
                today);

        attendance.setCheckInTime(
                LocalTime.now());

        attendance.setStatus(
                "PRESENT");

        attendance.setAttendanceType(
                "OFFICE");

        attendance.setCreatedAt(
                LocalDateTime.now());

        return repository.save(
                attendance);
    }

    // CHECK OUT
    // ONE TIME PER DAY

    public Attendance checkOut(
            Long employeeId) {

        Attendance attendance =
                repository
                .findByEmployeeIdAndAttendanceDate(
                        employeeId,
                        LocalDate.now())
                .orElseThrow(() ->
                        new RuntimeException(
                                "Please Check In First"));

        if(attendance.getCheckOutTime()
                != null) {

            throw new RuntimeException(
                    "You have already checked out today");
        }

        attendance.setCheckOutTime(
                LocalTime.now());

        return repository.save(
                attendance);
    }

    // TODAY PRESENT COUNT

    public long getTodayPresentCount() {

        LocalDate today =
                LocalDate.now();

        return repository.findAll()
                .stream()
                .filter(a ->
                        today.equals(
                                a.getAttendanceDate()))
                .count();
    }

    // TODAY ABSENT COUNT

    public long getTodayAbsentCount() {

        long totalEmployees =
                employeeRepository.count();

        long presentToday =
                getTodayPresentCount();

        return totalEmployees -
                presentToday;
    }

    // ADMIN DASHBOARD SUMMARY

    public AttendanceSummary getSummary() {

        AttendanceSummary summary =
                new AttendanceSummary();

        long totalEmployees =
                employeeRepository.count();

        long presentToday =
                repository
                .countByAttendanceDateAndStatus(
                        LocalDate.now(),
                        "PRESENT");

        long absentToday =
                totalEmployees
                - presentToday;

        double attendancePercentage =
                totalEmployees == 0
                ? 0
                : (presentToday * 100.0)
                  / totalEmployees;

        summary.setTotalEmployees(
                totalEmployees);

        summary.setPresentToday(
                presentToday);

        summary.setAbsentToday(
                absentToday);

        summary.setAttendancePercentage(
                Math.round(
                        attendancePercentage));

        return summary;
    
    }

    // EMPLOYEE PRESENT DAYS

    public long getPresentDays(
            Long employeeId) {

        return repository
                .findByEmployeeIdOrderByAttendanceDateDesc(
                        employeeId)
                .stream()
                .filter(a ->
                        "PRESENT".equals(
                                a.getStatus()))
                .count();
    }

    // EMPLOYEE ATTENDANCE %

    public double getAttendancePercentage(
            Long employeeId) {

        List<Attendance> list =
                repository
                .findByEmployeeIdOrderByAttendanceDateDesc(
                        employeeId);

        if(list.isEmpty()) {

            return 0;
        }

        long presentDays =
                list.stream()
                .filter(a ->
                        "PRESENT".equals(
                                a.getStatus()))
                .count();

        return (presentDays * 100.0)
                / list.size();
    }
    public List<Attendance> getTodayAttendance() {

        return repository.findByAttendanceDate(
                LocalDate.now());
    }

    public List<Attendance> getMonthlyAttendance() {

        LocalDate start =
                LocalDate.now()
                .withDayOfMonth(1);

        LocalDate end =
                LocalDate.now();

        return repository
                .findByAttendanceDateBetween(
                        start,
                        end);
    }

    public List<Attendance> getAllAttendanceHistory() {

        return repository
                .findAllByOrderByAttendanceDateDesc();
    }
}