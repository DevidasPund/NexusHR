package com.nexushr.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "ratings")
public class Rating {

    @Id
    @GeneratedValue(
            strategy = GenerationType.IDENTITY)
    private Long id;

    private Long employeeId;

    private String employeeName;

    private Double attendanceScore;

    private Double projectScore;

    private Double finalRating;

    private String performanceLevel;

    @Column(length = 1000)
    private String managerFeedback;

    // Getters & Setters

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getEmployeeId() {
        return employeeId;
    }

    public void setEmployeeId(Long employeeId) {
        this.employeeId = employeeId;
    }

    public String getEmployeeName() {
        return employeeName;
    }

    public void setEmployeeName(
            String employeeName) {
        this.employeeName = employeeName;
    }

    public Double getAttendanceScore() {
        return attendanceScore;
    }

    public void setAttendanceScore(
            Double attendanceScore) {
        this.attendanceScore = attendanceScore;
    }

    public Double getProjectScore() {
        return projectScore;
    }

    public void setProjectScore(
            Double projectScore) {
        this.projectScore = projectScore;
    }

    public Double getFinalRating() {
        return finalRating;
    }

    public void setFinalRating(
            Double finalRating) {
        this.finalRating = finalRating;
    }

    public String getPerformanceLevel() {
        return performanceLevel;
    }

    public void setPerformanceLevel(
            String performanceLevel) {
        this.performanceLevel = performanceLevel;
    }

    public String getManagerFeedback() {
        return managerFeedback;
    }

    public void setManagerFeedback(
            String managerFeedback) {
        this.managerFeedback = managerFeedback;
    }
}