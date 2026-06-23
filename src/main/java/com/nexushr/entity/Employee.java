package com.nexushr.entity;

import jakarta.persistence.*;

@Entity
public class Employee {


@Id
@GeneratedValue(strategy = GenerationType.IDENTITY)
private Long id;

private String firstName;

private String lastName;

private String email;

private String phone;

private String department;

private String designation;

private Double salary;

private String status;

private String profileImage;

private String skills;

private String currentProject;

private Integer projectCount;

private Double attendancePercentage;

private String username;
private String role;
private Double attritionScore;

private String attritionRisk;

private Double performanceScore;
private String requiredSkills;

private String missingSkills;
private String password;
public String getPassword() {
	return password;
}

public void setPassword(String password) {
	this.password = password;
}

private Integer taskCompleted;

private Integer taskPending;

public String getRequiredSkills() {
	return requiredSkills;
}

public void setRequiredSkills(String requiredSkills) {
	this.requiredSkills = requiredSkills;
}

public String getMissingSkills() {
	return missingSkills;
}

public void setMissingSkills(String missingSkills) {
	this.missingSkills = missingSkills;
}

public Integer getTaskCompleted() {
	return taskCompleted;
}

public void setTaskCompleted(Integer taskCompleted) {
	this.taskCompleted = taskCompleted;
}

public Integer getTaskPending() {
	return taskPending;
}

public void setTaskPending(Integer taskPending) {
	this.taskPending = taskPending;
}

public Double getAttritionScore() {
	return attritionScore;
}

public void setAttritionScore(Double attritionScore) {
	this.attritionScore = attritionScore;
}

public String getAttritionRisk() {
	return attritionRisk;
}

public void setAttritionRisk(String attritionRisk) {
	this.attritionRisk = attritionRisk;
}

public Double getPerformanceScore() {
	return performanceScore;
}

public void setPerformanceScore(Double performanceScore) {
	this.performanceScore = performanceScore;
}

public String getRole() {
    return role;
}

public void setRole(String role) {
    this.role = role;
}

public String getUsername() {
    return username;
}

public void setUsername(
        String username) {
    this.username = username;
}

public Long getId() {
	return id;
}

public void setId(Long id) {
	this.id = id;
}

public String getFirstName() {
	return firstName;
}

public void setFirstName(String firstName) {
	this.firstName = firstName;
}

public String getLastName() {
	return lastName;
}

public void setLastName(String lastName) {
	this.lastName = lastName;
}

public String getEmail() {
	return email;
}

public void setEmail(String email) {
	this.email = email;
}

public String getPhone() {
	return phone;
}

public void setPhone(String phone) {
	this.phone = phone;
}

public String getDepartment() {
	return department;
}

public void setDepartment(String department) {
	this.department = department;
}

public String getDesignation() {
	return designation;
}

public void setDesignation(String designation) {
	this.designation = designation;
}

public Double getSalary() {
	return salary;
}

public void setSalary(Double salary) {
	this.salary = salary;
}

public String getStatus() {
	return status;
}

public void setStatus(String status) {
	this.status = status;
}

public String getProfileImage() {
	return profileImage;
}

public void setProfileImage(String profileImage) {
	this.profileImage = profileImage;
}

public String getSkills() {
	return skills;
}

public void setSkills(String skills) {
	this.skills = skills;
}

public String getCurrentProject() {
	return currentProject;
}

public void setCurrentProject(String currentProject) {
	this.currentProject = currentProject;
}

public Integer getProjectCount() {
	return projectCount;
}

public void setProjectCount(Integer projectCount) {
	this.projectCount = projectCount;
}

public Double getAttendancePercentage() {
	return attendancePercentage;
}

public void setAttendancePercentage(Double attendancePercentage) {
	this.attendancePercentage = attendancePercentage;
}



}
