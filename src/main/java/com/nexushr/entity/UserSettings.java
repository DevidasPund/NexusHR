package com.nexushr.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "user_settings")
public class UserSettings {

    @Id
    @GeneratedValue(strategy =
            GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true)
    private String username;

    private boolean darkMode;

    private boolean emailNotifications;

    private boolean smsNotifications;

    private boolean taskAlerts;

    private boolean leaveAlerts;

    private boolean attendanceAlerts;

    public UserSettings() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(
            String username) {
        this.username = username;
    }

    public boolean isDarkMode() {
        return darkMode;
    }

    public void setDarkMode(
            boolean darkMode) {
        this.darkMode = darkMode;
    }

    public boolean isEmailNotifications() {
        return emailNotifications;
    }

    public void setEmailNotifications(
            boolean emailNotifications) {
        this.emailNotifications = emailNotifications;
    }

    public boolean isSmsNotifications() {
        return smsNotifications;
    }

    public void setSmsNotifications(
            boolean smsNotifications) {
        this.smsNotifications = smsNotifications;
    }

    public boolean isTaskAlerts() {
        return taskAlerts;
    }

    public void setTaskAlerts(
            boolean taskAlerts) {
        this.taskAlerts = taskAlerts;
    }

    public boolean isLeaveAlerts() {
        return leaveAlerts;
    }

    public void setLeaveAlerts(
            boolean leaveAlerts) {
        this.leaveAlerts = leaveAlerts;
    }

    public boolean isAttendanceAlerts() {
        return attendanceAlerts;
    }

    public void setAttendanceAlerts(
            boolean attendanceAlerts) {
        this.attendanceAlerts = attendanceAlerts;
    }
}