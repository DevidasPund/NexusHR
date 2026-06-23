package com.nexushr.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.nexushr.entity.Performance;
import com.nexushr.service.PerformanceService;

@RestController
@RequestMapping("/performance")
@CrossOrigin("*")
public class PerformanceController {

    @Autowired
    private PerformanceService service;

    @PostMapping
    public Performance save(
            @RequestBody Performance performance) {

        return service.save(performance);
    }

    @GetMapping
    public List<Performance> getAll() {

        return service.getAll();
    }
}