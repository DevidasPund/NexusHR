package com.nexushr.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.nexushr.entity.Attendance;
import com.nexushr.entity.Performance;
import com.nexushr.entity.Task;
import com.nexushr.repository.AttendanceRepository;
import com.nexushr.repository.PerformanceRepository;
import com.nexushr.repository.TaskRepository;

@Service
public class PerformanceService {

    @Autowired
    private PerformanceRepository repository;

    @Autowired
    private AttendanceRepository attendanceRepository;

    @Autowired
    private TaskRepository taskRepository;

    public Performance save(
            Performance performance) {

        Long employeeId =
                performance.getEmployeeId();

        // Attendance Score

        List<Attendance> attendanceList =
                attendanceRepository
                .findByEmployeeId(
                        employeeId);

        long presentDays =
                attendanceList.stream()
                .filter(a ->
                        "PRESENT".equalsIgnoreCase(
                                a.getStatus()))
                .count();

        double attendanceScore =
                attendanceList.size() > 0
                ? (presentDays * 100.0)
                  / attendanceList.size()
                : 0;

        // Task Score

        List<Task> taskList =
                taskRepository.findAll()
                .stream()
                .filter(t ->
                        employeeId.equals(
                                t.getEmployeeId()))
                .toList();

        long completedTasks =
                taskList.stream()
                .filter(t ->
                        "COMPLETED".equalsIgnoreCase(
                                t.getStatus()))
                .count();

        double taskScore =
                taskList.size() > 0
                ? (completedTasks * 100.0)
                  / taskList.size()
                : 0;

        // Save Auto Calculated Scores

        performance.setAttendanceScore(
                attendanceScore);

        performance.setTaskScore(
                taskScore);

        // Final Score

        double overallScore =
                performance.getKpiScore() * 0.4
                + attendanceScore * 0.3
                + taskScore * 0.3;

        performance.setOverallScore(
                Math.round(
                        overallScore * 100.0)
                        / 100.0);

        // Rating

        if (overallScore >= 90) {

            performance.setRating(
                    "EXCELLENT");

        } else if (overallScore >= 75) {

            performance.setRating(
                    "GOOD");

        } else if (overallScore >= 60) {

            performance.setRating(
                    "AVERAGE");

        } else {

            performance.setRating(
                    "NEEDS IMPROVEMENT");
        }

        return repository.save(
                performance);
    }

    public List<Performance> getAll() {

        return repository.findAll();
    }

    public Performance getById(
            Long id) {

        return repository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Performance Not Found"));
    }

    public void delete(
            Long id) {

        repository.deleteById(id);
    }
}