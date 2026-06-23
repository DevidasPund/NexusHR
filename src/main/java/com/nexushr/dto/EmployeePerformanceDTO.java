package com.nexushr.dto;

public class EmployeePerformanceDTO {


private Long id;

private String firstName;

private String lastName;

private String designation;

private String department;

private String currentProject;

private String skills;

private String profileImage;

private String status;

private Integer projectCount;

private Double attendancePercentage;

private Double rating;

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

public String getDesignation() {
	return designation;
}

public void setDesignation(String designation) {
	this.designation = designation;
}

public String getDepartment() {
	return department;
}

public void setDepartment(String department) {
	this.department = department;
}

public String getCurrentProject() {
	return currentProject;
}

public void setCurrentProject(String currentProject) {
	this.currentProject = currentProject;
}

public String getSkills() {
	return skills;
}

public void setSkills(String skills) {
	this.skills = skills;
}

public String getProfileImage() {
	return profileImage;
}

public void setProfileImage(String profileImage) {
	this.profileImage = profileImage;
}

public String getStatus() {
	return status;
}

public void setStatus(String status) {
	this.status = status;
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

public Double getRating() {
	return rating;
}

public void setRating(Double rating) {
	this.rating = rating;
}



}
