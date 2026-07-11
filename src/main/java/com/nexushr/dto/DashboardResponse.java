package com.nexushr.dto;

public class DashboardResponse {

    // ===============================
    // Employee Statistics
    // ===============================

    private long totalEmployees;
    private long activeEmployees;
    private long totalDepartments;

    // ===============================
    // Attendance Statistics
    // ===============================

    private long totalAttendance;
    private long presentToday;
    private long absentToday;
    private double attendancePercentage;

    // ===============================
    // Leave Statistics
    // ===============================

    private long pendingLeaves;
    private long approvedLeaves;

    // ===============================
    // Salary
    // ===============================

    private double totalSalary;

    // ===============================
    // AI Risk Analysis
    // ===============================

    private long highRiskEmployees;
    private long mediumRiskEmployees;
    private long lowRiskEmployees;

    // ===============================
    // Performance
    // ===============================

    private long topPerformers;
    private long averagePerformers;
    private long lowPerformers;

    private double averagePerformance;

    // ===============================
    // Skill Analysis
    // ===============================

    private String topSkillGaps;

    // ===============================
    // Project & Task Statistics
    // ===============================

    private long totalProjects;
    private long pendingTasks;
    private long completedTasks;

    // ===============================
    // Recruitment
    // ===============================

    private long totalCandidates;
    private long shortlistedCandidates;
    private long selectedCandidates;

    // ===============================
    // Ratings
    // ===============================

    private double averageRating;

    // =====================================================
    // Getters and Setters
    // =====================================================

    public long getTotalEmployees() {
        return totalEmployees;
    }

    public void setTotalEmployees(long totalEmployees) {
        this.totalEmployees = totalEmployees;
    }

    public long getActiveEmployees() {
        return activeEmployees;
    }

    public void setActiveEmployees(long activeEmployees) {
        this.activeEmployees = activeEmployees;
    }

    public long getTotalDepartments() {
        return totalDepartments;
    }

    public void setTotalDepartments(long totalDepartments) {
        this.totalDepartments = totalDepartments;
    }

    public long getTotalAttendance() {
        return totalAttendance;
    }

    public void setTotalAttendance(long totalAttendance) {
        this.totalAttendance = totalAttendance;
    }

    public long getPresentToday() {
        return presentToday;
    }

    public void setPresentToday(long presentToday) {
        this.presentToday = presentToday;
    }

    public long getAbsentToday() {
        return absentToday;
    }

    public void setAbsentToday(long absentToday) {
        this.absentToday = absentToday;
    }

    public double getAttendancePercentage() {
        return attendancePercentage;
    }

    public void setAttendancePercentage(double attendancePercentage) {
        this.attendancePercentage = attendancePercentage;
    }

    public long getPendingLeaves() {
        return pendingLeaves;
    }

    public void setPendingLeaves(long pendingLeaves) {
        this.pendingLeaves = pendingLeaves;
    }

    public long getApprovedLeaves() {
        return approvedLeaves;
    }

    public void setApprovedLeaves(long approvedLeaves) {
        this.approvedLeaves = approvedLeaves;
    }

    public double getTotalSalary() {
        return totalSalary;
    }

    public void setTotalSalary(double totalSalary) {
        this.totalSalary = totalSalary;
    }

    public long getHighRiskEmployees() {
        return highRiskEmployees;
    }

    public void setHighRiskEmployees(long highRiskEmployees) {
        this.highRiskEmployees = highRiskEmployees;
    }

    public long getMediumRiskEmployees() {
        return mediumRiskEmployees;
    }

    public void setMediumRiskEmployees(long mediumRiskEmployees) {
        this.mediumRiskEmployees = mediumRiskEmployees;
    }

    public long getLowRiskEmployees() {
        return lowRiskEmployees;
    }

    public void setLowRiskEmployees(long lowRiskEmployees) {
        this.lowRiskEmployees = lowRiskEmployees;
    }

    public long getTopPerformers() {
        return topPerformers;
    }

    public void setTopPerformers(long topPerformers) {
        this.topPerformers = topPerformers;
    }

    public long getAveragePerformers() {
        return averagePerformers;
    }

    public void setAveragePerformers(long averagePerformers) {
        this.averagePerformers = averagePerformers;
    }

    public long getLowPerformers() {
        return lowPerformers;
    }

    public void setLowPerformers(long lowPerformers) {
        this.lowPerformers = lowPerformers;
    }

    public double getAveragePerformance() {
        return averagePerformance;
    }

    public void setAveragePerformance(double averagePerformance) {
        this.averagePerformance = averagePerformance;
    }

    public String getTopSkillGaps() {
        return topSkillGaps;
    }

    public void setTopSkillGaps(String topSkillGaps) {
        this.topSkillGaps = topSkillGaps;
    }

    public long getTotalProjects() {
        return totalProjects;
    }

    public void setTotalProjects(long totalProjects) {
        this.totalProjects = totalProjects;
    }

    public long getPendingTasks() {
        return pendingTasks;
    }

    public void setPendingTasks(long pendingTasks) {
        this.pendingTasks = pendingTasks;
    }

    public long getCompletedTasks() {
        return completedTasks;
    }

    public void setCompletedTasks(long completedTasks) {
        this.completedTasks = completedTasks;
    }

    public long getTotalCandidates() {
        return totalCandidates;
    }

    public void setTotalCandidates(long totalCandidates) {
        this.totalCandidates = totalCandidates;
    }

    public long getShortlistedCandidates() {
        return shortlistedCandidates;
    }

    public void setShortlistedCandidates(long shortlistedCandidates) {
        this.shortlistedCandidates = shortlistedCandidates;
    }

    public long getSelectedCandidates() {
        return selectedCandidates;
    }

    public void setSelectedCandidates(long selectedCandidates) {
        this.selectedCandidates = selectedCandidates;
    }

    public double getAverageRating() {
        return averageRating;
    }

    public void setAverageRating(double averageRating) {
        this.averageRating = averageRating;
    }
}