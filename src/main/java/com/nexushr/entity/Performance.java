package com.nexushr.entity;

import jakarta.persistence.*;

@Entity
public class Performance {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long employeeId;

    private String employeeName;

    private String reviewMonth;

  


   
    public Double getBehaviorScore() {
		return behaviorScore;
	}

	public void setBehaviorScore(Double behaviorScore) {
		this.behaviorScore = behaviorScore;
	}

	public String getManagerComments() {
		return managerComments;
	}

	public void setManagerComments(String managerComments) {
		this.managerComments = managerComments;
	}

	public Boolean getPromotionRecommended() {
		return promotionRecommended;
	}

	public void setPromotionRecommended(Boolean promotionRecommended) {
		this.promotionRecommended = promotionRecommended;
	}

	private Double kpiScore;
    private Double attendanceScore;
    private Double taskScore;
    private Double behaviorScore;

    private Double overallScore;

    private String rating;

    private String managerComments;

    private Boolean promotionRecommended;
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

	public String getReviewMonth() {
		return reviewMonth;
	}

	public void setReviewMonth(String reviewMonth) {
		this.reviewMonth = reviewMonth;
	}

	public Double getKpiScore() {
		return kpiScore;
	}

	public void setKpiScore(Double kpiScore) {
		this.kpiScore = kpiScore;
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

	public Double getOverallScore() {
		return overallScore;
	}

	public void setOverallScore(Double overallScore) {
		this.overallScore = overallScore;
	}

	public String getRating() {
		return rating;
	}

	public void setRating(String rating) {
		this.rating = rating;
	}

    // Getters and Setters
}