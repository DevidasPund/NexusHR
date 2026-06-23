package com.nexushr.dto;

import java.util.Map;

public class DashboardSummaryDTO {

    private long totalEmployees;
    private long presentToday;
    private long absentToday;
    private long pendingLeaves;
    private double totalPayroll;
    private Map<String, Long> departmentStats;

    public long getTotalEmployees() {
        return totalEmployees;
    }

    public void setTotalEmployees(long totalEmployees) {
        this.totalEmployees = totalEmployees;
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

    public long getPendingLeaves() {
        return pendingLeaves;
    }

    public void setPendingLeaves(long pendingLeaves) {
        this.pendingLeaves = pendingLeaves;
    }

    public double getTotalPayroll() {
        return totalPayroll;
    }

    public void setTotalPayroll(double totalPayroll) {
        this.totalPayroll = totalPayroll;
    }

    public Map<String, Long> getDepartmentStats() {
        return departmentStats;
    }

    public void setDepartmentStats(Map<String, Long> departmentStats) {
        this.departmentStats = departmentStats;
    }
}