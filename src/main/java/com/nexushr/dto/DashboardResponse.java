package com.nexushr.dto;

public class DashboardResponse {


private long totalEmployees;

private long totalDepartments;

private long totalAttendance;

private long pendingLeaves;

private long approvedLeaves;

private long activeEmployees;
private Long highRiskEmployees;

private Long mediumRiskEmployees;

private Long lowRiskEmployees;
private Long topPerformers;
private Long averagePerformers;

public Long getTopPerformers() {
	return topPerformers;
}

public void setTopPerformers(Long topPerformers) {
	this.topPerformers = topPerformers;
}

public Long getAveragePerformers() {
	return averagePerformers;
}

public void setAveragePerformers(Long averagePerformers) {
	this.averagePerformers = averagePerformers;
}

public Long getLowPerformers() {
	return lowPerformers;
}

public void setLowPerformers(Long lowPerformers) {
	this.lowPerformers = lowPerformers;
}

private Long lowPerformers;
public Long getMediumRiskEmployees() {
	return mediumRiskEmployees;
}

public void setMediumRiskEmployees(Long mediumRiskEmployees) {
	this.mediumRiskEmployees = mediumRiskEmployees;
}

public Long getLowRiskEmployees() {
	return lowRiskEmployees;
}

public void setLowRiskEmployees(Long lowRiskEmployees) {
	this.lowRiskEmployees = lowRiskEmployees;
}

public Double getAveragePerformance() {
	return averagePerformance;
}

public void setAveragePerformance(Double averagePerformance) {
	this.averagePerformance = averagePerformance;
}

public String getTopSkillGaps() {
	return topSkillGaps;
}

public void setTopSkillGaps(String topSkillGaps) {
	this.topSkillGaps = topSkillGaps;
}

private Double averagePerformance;

private String topSkillGaps;
public Long getHighRiskEmployees() {
	return highRiskEmployees;
}

public void setHighRiskEmployees(Long highRiskEmployees) {
	this.highRiskEmployees = highRiskEmployees;
}

private Double totalSalary;
private Long presentToday;
private Long absentToday;

private Double attendancePercentage;
public long getTotalEmployees() {
    return totalEmployees;
}

public Long getPresentToday() {
	return presentToday;
}

public void setPresentToday(Long presentToday) {
	this.presentToday = presentToday;
}

public Long getAbsentToday() {
	return absentToday;
}

public void setAbsentToday(Long absentToday) {
	this.absentToday = absentToday;
}

public Double getAttendancePercentage() {
	return attendancePercentage;
}

public void setAttendancePercentage(Double attendancePercentage) {
	this.attendancePercentage = attendancePercentage;
}

public void setTotalEmployees(
        long totalEmployees) {
    this.totalEmployees = totalEmployees;
}

public long getTotalDepartments() {
    return totalDepartments;
}

public void setTotalDepartments(
        long totalDepartments) {
    this.totalDepartments = totalDepartments;
}

public long getTotalAttendance() {
    return totalAttendance;
}

public void setTotalAttendance(
        long totalAttendance) {
    this.totalAttendance = totalAttendance;
}

public long getPendingLeaves() {
    return pendingLeaves;
}

public void setPendingLeaves(
        long pendingLeaves) {
    this.pendingLeaves = pendingLeaves;
}

public long getApprovedLeaves() {
    return approvedLeaves;
}

public void setApprovedLeaves(
        long approvedLeaves) {
    this.approvedLeaves = approvedLeaves;
}

public long getActiveEmployees() {
    return activeEmployees;
}

public void setActiveEmployees(
        long activeEmployees) {
    this.activeEmployees = activeEmployees;
}

public Double getTotalSalary() {
    return totalSalary;
}

public void setTotalSalary(
        Double totalSalary) {
    this.totalSalary = totalSalary;
}


}
