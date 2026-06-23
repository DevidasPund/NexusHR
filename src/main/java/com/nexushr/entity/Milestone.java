package com.nexushr.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Milestone {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String projectName;

    private String milestoneName;

    private String dueDate;

    private String status;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getProjectName() {
        return projectName;
    }

    public void setProjectName(
            String projectName) {
        this.projectName = projectName;
    }

    public String getMilestoneName() {
        return milestoneName;
    }

    public void setMilestoneName(
            String milestoneName) {
        this.milestoneName = milestoneName;
    }

    public String getDueDate() {
        return dueDate;
    }

    public void setDueDate(
            String dueDate) {
        this.dueDate = dueDate;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(
            String status) {
        this.status = status;
    }
}