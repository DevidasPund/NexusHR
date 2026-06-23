package com.nexushr.service;

import java.time.LocalDate;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.nexushr.dto.DashboardResponse;
import com.nexushr.repository.AttendanceRepository;
import com.nexushr.repository.DepartmentRepository;
import com.nexushr.repository.EmployeeRepository;
import com.nexushr.repository.LeaveRepository;
import com.nexushr.repository.PerformanceRepository;

@Service
public class DashboardService {

    @Autowired
    private EmployeeRepository employeeRepository;

    @Autowired
    private PerformanceRepository performanceRepository;
    @Autowired
    private DepartmentRepository departmentRepository;

    @Autowired
    private AttendanceRepository attendanceRepository;

    @Autowired
    private LeaveRepository leaveRepository;

    public DashboardResponse getDashboard() {

    	
        DashboardResponse response =
                new DashboardResponse();

        long totalEmployees =
                employeeRepository.count();

        long presentToday =
                attendanceRepository.countByAttendanceDate(
                        LocalDate.now());

        long absentToday =
                totalEmployees - presentToday;

        double attendancePercentage = 0;

        if (totalEmployees > 0) {

            attendancePercentage =
                    (presentToday * 100.0)
                    / totalEmployees;
        }

        // Basic Dashboard

        response.setTotalEmployees(
                totalEmployees);
        response.setTopPerformers(
                performanceRepository
                .countByRating(
                        "EXCELLENT"));
        response.setActiveEmployees(
                employeeRepository.countByStatus(
                        "ACTIVE"));

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

        response.setTotalSalary(
                employeeRepository.getTotalSalary());

        response.setPresentToday(
                presentToday);

        response.setAbsentToday(
                absentToday);

        response.setAttendancePercentage(
                Math.round(
                        attendancePercentage * 100.0)
                        / 100.0);

        // AI Workforce Insights

        response.setHighRiskEmployees(
                employeeRepository.countByAttritionRisk(
                        "HIGH"));

        response.setMediumRiskEmployees(
                employeeRepository.countByAttritionRisk(
                        "MEDIUM"));

        response.setLowRiskEmployees(
                employeeRepository.countByAttritionRisk(
                        "LOW"));

        // Average Performance

        double averagePerformance =
                employeeRepository.findAll()
                .stream()
                .filter(e ->
                        e.getPerformanceScore() != null)
                .mapToDouble(
                        e -> e.getPerformanceScore())
                .average()
                .orElse(0);

        response.setAveragePerformance(
                Math.round(
                        averagePerformance * 100.0)
                        / 100.0);

        // Top Skill Gaps

        String skillGaps =
                employeeRepository.findAll()
                .stream()
                .map(e -> e.getMissingSkills())
                .filter(s ->
                        s != null &&
                        !s.isEmpty())
                .limit(5)
                .reduce((a, b) ->
                        a + ", " + b)
                .orElse("None");

        response.setTopSkillGaps(
                skillGaps);
        long topPerformers =
                employeeRepository.findAll()
                .stream()
                .filter(e ->
                    e.getPerformanceScore() != null
                    && e.getPerformanceScore() >= 80)
                .count();

        long averagePerformers =
                employeeRepository.findAll()
                .stream()
                .filter(e ->
                    e.getPerformanceScore() != null
                    && e.getPerformanceScore() >= 50
                    && e.getPerformanceScore() < 80)
                .count();

        long lowPerformers =
                employeeRepository.findAll()
                .stream()
                .filter(e ->
                    e.getPerformanceScore() != null
                    && e.getPerformanceScore() < 50)
                .count();

        response.setTopPerformers(
                topPerformers);

        response.setAveragePerformers(
                averagePerformers);

        response.setLowPerformers(
                lowPerformers);

        return response;
    }
}