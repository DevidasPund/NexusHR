package com.nexushr.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.nexushr.dto.AttendanceSummary;
import com.nexushr.entity.Attendance;
import com.nexushr.service.AttendanceService;

@RestController
@RequestMapping("/attendance")
@CrossOrigin(origins = "*")
public class AttendanceController {

    @Autowired
    private AttendanceService attendanceService;

    // Save Attendance
    @PostMapping
    public Attendance saveAttendance(
            @RequestBody Attendance attendance) {

        return attendanceService.save(attendance);
    }

    // Get All Attendance
    @GetMapping
    public List<Attendance> getAllAttendance() {

        return attendanceService.getAll();
    }

    // Attendance Summary
    @GetMapping("/summary")
    public AttendanceSummary getSummary() {

        return attendanceService.getSummary();
    }

    // Employee Attendance History
    @GetMapping("/employee/{employeeId}")
    public List<Attendance> getEmployeeAttendance(
            @PathVariable Long employeeId) {

        return attendanceService.getEmployeeAttendance(employeeId);
    }

    // Today's Attendance
    @GetMapping("/today")
    public List<Attendance> getTodayAttendance() {

        return attendanceService.getTodayAttendance();
    }

    // Monthly Attendance
    @GetMapping("/month")
    public List<Attendance> getMonthlyAttendance() {

        return attendanceService.getMonthlyAttendance();
    }

    // Attendance History
    @GetMapping("/history")
    public List<Attendance> getAttendanceHistory() {

        return attendanceService.getAllAttendanceHistory();
    }

    // Employee Check In
    @PostMapping("/checkin/{employeeId}")
    public Attendance checkIn(
            @PathVariable Long employeeId) {

        return attendanceService.checkIn(employeeId);
    }

    // Employee Check Out
    @PostMapping("/checkout/{employeeId}")
    public Attendance checkOut(
            @PathVariable Long employeeId) {

        return attendanceService.checkOut(employeeId);
    }

    // Update Attendance Status
    @PutMapping("/{id}")
    public Attendance updateAttendance(
            @PathVariable Long id,
            @RequestBody Attendance attendance) {

        return attendanceService.updateAttendanceStatus(
                id,
                attendance.getAttendanceStatus());
    }

    // Delete Attendance Record
    @DeleteMapping("/{id}")
    public String deleteAttendance(
            @PathVariable Long id) {

        attendanceService.deleteAttendance(id);

        return "Attendance Deleted Successfully";
    }
}