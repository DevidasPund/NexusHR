package com.nexushr.service;

import org.springframework.stereotype.Service;

import com.nexushr.entity.Employee;

@Service
public class AIWorkforceService {

    public Employee analyzeEmployee(
            Employee employee) {

        double riskScore = 0;

        // Attendance Risk

        if(employee.getAttendancePercentage() != null
                && employee.getAttendancePercentage() < 70) {

            riskScore += 40;
        }

        // Project Risk

        if(employee.getProjectCount() != null
                && employee.getProjectCount() == 0) {

            riskScore += 20;
        }

        // Salary Risk

        if(employee.getSalary() != null
                && employee.getSalary() < 25000) {

            riskScore += 20;
        }

        // Inactive Risk

        if(employee.getStatus() != null
                && employee.getStatus()
                .equalsIgnoreCase("INACTIVE")) {

            riskScore += 20;
        }

        // Attrition Score

        employee.setAttritionScore(
                riskScore);

        if(riskScore >= 70) {

            employee.setAttritionRisk(
                    "HIGH");

        } else if(riskScore >= 40) {

            employee.setAttritionRisk(
                    "MEDIUM");

        } else {

            employee.setAttritionRisk(
                    "LOW");
        }

        // Performance Score

        Integer completed =
                employee.getTaskCompleted() == null
                ? 0
                : employee.getTaskCompleted();

        Integer pending =
                employee.getTaskPending() == null
                ? 0
                : employee.getTaskPending();

        if(completed + pending > 0) {

            double performance =
                    (completed * 100.0)
                    / (completed + pending);

            employee.setPerformanceScore(
                    Math.round(
                            performance * 100.0)
                            / 100.0);
        }
        else {

            employee.setPerformanceScore(
                    0.0);
        }

        // Skill Gap Analysis

        if(employee.getSkills() != null
                && employee.getRequiredSkills() != null) {

            String missing =
                    calculateMissingSkills(
                            employee.getSkills(),
                            employee.getRequiredSkills());

            employee.setMissingSkills(
                    missing);
        }

        return employee;
    }

    private String calculateMissingSkills(
            String skills,
            String requiredSkills) {

        StringBuilder missing =
                new StringBuilder();

        String[] required =
                requiredSkills.split(",");

        for(String skill : required) {

            if(!skills.toLowerCase()
                    .contains(
                            skill.trim()
                            .toLowerCase())) {

                if(missing.length() > 0) {

                    missing.append(", ");
                }

                missing.append(
                        skill.trim());
            }
        }

        return missing.toString();
    }
}