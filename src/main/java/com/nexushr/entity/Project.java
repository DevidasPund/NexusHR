package com.nexushr.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "projects")
public class Project {

    @Id
    @GeneratedValue(
            strategy = GenerationType.IDENTITY)
    private Long id;

    private String projectName;

    private String clientName;

    private String managerName;

    private String startDate;

    private String endDate;

    private String status;

    public Project() {
    }

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

    public String getClientName() {
        return clientName;
    }

    public void setClientName(
            String clientName) {
        this.clientName = clientName;
    }

    public String getManagerName() {
        return managerName;
    }

    public void setManagerName(
            String managerName) {
        this.managerName = managerName;
    }

    public String getStartDate() {
        return startDate;
    }

    public void setStartDate(
            String startDate) {
        this.startDate = startDate;
    }

    public String getEndDate() {
        return endDate;
    }

    public void setEndDate(
            String endDate) {
        this.endDate = endDate;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(
            String status) {
        this.status = status;
    }
}