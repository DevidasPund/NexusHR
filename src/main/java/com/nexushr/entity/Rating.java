package com.nexushr.entity;

import java.time.LocalDateTime;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
@Entity
public class Rating {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long employeeId;

    private String employeeName;

    private Double attendanceScore;

    private Double taskScore;

    private Double managerRating;

    private Double finalScore;

    private String feedback;

    private String performanceLevel;

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

	public void setEmployeeName(String employeeName) {
		this.employeeName = employeeName;
	}

	public Double getAttendanceScore() {
		return attendanceScore;
	}

	public void setAttendanceScore(Double attendanceScore) {
		this.attendanceScore = attendanceScore;
	}

	public Double getTaskScore() {
		return taskScore;
	}

	public void setTaskScore(Double taskScore) {
		this.taskScore = taskScore;
	}

	public Double getManagerRating() {
		return managerRating;
	}

	public void setManagerRating(Double managerRating) {
		this.managerRating = managerRating;
	}

	public Double getFinalScore() {
		return finalScore;
	}

	public void setFinalScore(Double finalScore) {
		this.finalScore = finalScore;
	}

	public String getFeedback() {
		return feedback;
	}

	public void setFeedback(String feedback) {
		this.feedback = feedback;
	}

	public String getPerformanceLevel() {
		return performanceLevel;
	}

	public void setPerformanceLevel(String performanceLevel) {
		this.performanceLevel = performanceLevel;
	}

   
}