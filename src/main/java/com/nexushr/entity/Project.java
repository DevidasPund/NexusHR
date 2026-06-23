package com.nexushr.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class Project {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String projectName;

    private String clientName;

    private String managerName;

    private String status;

    private String startDate;

    private String endDate;
}