package com.nexushr.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.nexushr.dto.DashboardResponse;
import com.nexushr.service.DashboardService;

@RestController
@RequestMapping("/dashboard")
@CrossOrigin("*")
public class DashboardController {

    @Autowired
    private DashboardService service;

    @GetMapping
    public DashboardResponse getDashboard(){

        return service.getDashboard();
    }
}