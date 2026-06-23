package com.nexushr.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
@Entity
@Table(name = "user_settings")
public class UserSettings {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String username;

    private Boolean darkMode;

    private Boolean emailNotifications;

    private Boolean smsNotifications;

    private Boolean taskAlerts;

    public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public Boolean getDarkMode() {
		return darkMode;
	}

	public void setDarkMode(Boolean darkMode) {
		this.darkMode = darkMode;
	}

	public Boolean getEmailNotifications() {
		return emailNotifications;
	}

	public void setEmailNotifications(Boolean emailNotifications) {
		this.emailNotifications = emailNotifications;
	}

	public Boolean getSmsNotifications() {
		return smsNotifications;
	}

	public void setSmsNotifications(Boolean smsNotifications) {
		this.smsNotifications = smsNotifications;
	}

	public Boolean getTaskAlerts() {
		return taskAlerts;
	}

	public void setTaskAlerts(Boolean taskAlerts) {
		this.taskAlerts = taskAlerts;
	}

	public Boolean getLeaveAlerts() {
		return leaveAlerts;
	}

	public void setLeaveAlerts(Boolean leaveAlerts) {
		this.leaveAlerts = leaveAlerts;
	}

	public Boolean getAttendanceAlerts() {
		return attendanceAlerts;
	}

	public void setAttendanceAlerts(Boolean attendanceAlerts) {
		this.attendanceAlerts = attendanceAlerts;
	}

	private Boolean leaveAlerts;

    private Boolean attendanceAlerts;

    // ALL getters and setters
}