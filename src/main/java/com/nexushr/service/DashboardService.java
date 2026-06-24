package com.nexushr.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.nexushr.dto.DashboardResponse;
import com.nexushr.repository.AttendanceRepository;
import com.nexushr.repository.DepartmentRepository;
import com.nexushr.repository.EmployeeRepository;
import com.nexushr.repository.LeaveRepository;

@Service
public class DashboardService {

    @Autowired
    private EmployeeRepository employeeRepository;

    @Autowired
    private DepartmentRepository departmentRepository;

    @Autowired
    private AttendanceRepository attendanceRepository;

    @Autowired
    private LeaveRepository leaveRepository;

    public DashboardResponse getDashboard() {

        DashboardResponse response =
                new DashboardResponse();

        response.setTotalEmployees(
                employeeRepository.count());

        response.setTotalDepartments(
                departmentRepository.count());

        response.setTotalAttendance(
                attendanceRepository.count());

        response.setPendingLeaves(
                leaveRepository.countByStatus(
                        "PENDING"));

        response.setApprovedLeaves(
                leaveRepository.countByStatus(
                        "APPROVED"));

        response.setActiveEmployees(
                employeeRepository.countByStatus(
                        "ACTIVE"));

        response.setTotalSalary(
                employeeRepository.getTotalSalary());

        response.setPresentToday(
                attendanceRepository.countByAttendanceStatus(
                        "PRESENT"));

        response.setAbsentToday(
                attendanceRepository.countByAttendanceStatus(
                        "ABSENT"));

        long totalEmployees =
                employeeRepository.count();

        long present =
                attendanceRepository.countByAttendanceStatus(
                        "PRESENT");

        double percentage =
                totalEmployees > 0
                        ? ((double) present / totalEmployees) * 100
                        : 0;

        response.setAttendancePercentage(
                percentage);

        return response;
    }
}