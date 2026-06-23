package com.nexushr.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.nexushr.dto.AttendanceSummary;
import com.nexushr.entity.Attendance;
import com.nexushr.service.AttendanceService;

@RestController
@RequestMapping("/attendance")
@CrossOrigin("*")
public class AttendanceController {

    @Autowired
    private AttendanceService service;

    @PostMapping
    public Attendance save(
            @RequestBody Attendance attendance){

        return service.save(attendance);
    }
    @GetMapping("/summary")
    public AttendanceSummary getSummary() {

        return service.getSummary();
    }
    @GetMapping
    public List<Attendance> getAll(){

        return service.getAll();
    }

    @GetMapping("/employee/{employeeId}")
    public List<Attendance> getEmployeeAttendance(
            @PathVariable Long employeeId){

        return service.getEmployeeAttendance(
                employeeId);
    }
    @GetMapping("/today")
    public List<Attendance> today() {

        return service.getTodayAttendance();
    }

    @GetMapping("/month")
    public List<Attendance> month() {

        return service.getMonthlyAttendance();
    }

    @GetMapping("/history")
    public List<Attendance> history() {

        return service.getAllAttendanceHistory();
    }
    @PostMapping("/checkin/{employeeId}")
    public Attendance checkIn(
            @PathVariable Long employeeId){

        return service.checkIn(
                employeeId);
    }

    @PostMapping("/checkout/{employeeId}")
    public Attendance checkOut(
            @PathVariable Long employeeId){

        return service.checkOut(
                employeeId);
    }
}