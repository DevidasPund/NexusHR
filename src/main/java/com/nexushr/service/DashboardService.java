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

        DashboardResponse response = new DashboardResponse();

        try {
            response.setTotalEmployees(employeeRepository.count());
        } catch (Exception e) {
            response.setTotalEmployees(0);
        }

        try {
            response.setTotalDepartments(departmentRepository.count());
        } catch (Exception e) {
            response.setTotalDepartments(0);
        }

        try {
            response.setTotalAttendance(attendanceRepository.count());
        } catch (Exception e) {
            response.setTotalAttendance(0);
        }

        try {
            response.setPendingLeaves(
                    leaveRepository.countByStatus("PENDING"));
        } catch (Exception e) {
            response.setPendingLeaves(0);
        }

        try {
            response.setApprovedLeaves(
                    leaveRepository.countByStatus("APPROVED"));
        } catch (Exception e) {
            response.setApprovedLeaves(0);
        }

        try {
            response.setActiveEmployees(
                    employeeRepository.countByStatus("ACTIVE"));
        } catch (Exception e) {
            response.setActiveEmployees(0);
        }

        try {
            Double salary = employeeRepository.getTotalSalary();

            response.setTotalSalary(
                    salary == null ? 0.0 : salary);

        } catch (Exception e) {
            response.setTotalSalary(0.0);
        }

        try {
            response.setPresentToday(
                    attendanceRepository.countByAttendanceStatus("PRESENT"));
        } catch (Exception e) {
            response.setPresentToday(0);
        }

        try {
            response.setAbsentToday(
                    attendanceRepository.countByAttendanceStatus("ABSENT"));
        } catch (Exception e) {
            response.setAbsentToday(0);
        }

        long total = response.getTotalEmployees();
        long present = response.getPresentToday();

        if (total > 0) {
            response.setAttendancePercentage(
                    (double) present * 100 / total);
        } else {
            response.setAttendancePercentage(0);
        }

        return response;
    }
}