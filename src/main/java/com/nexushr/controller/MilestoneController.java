package com.nexushr.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.nexushr.entity.Milestone;
import com.nexushr.service.MilestoneService;

@RestController
@RequestMapping("/milestones")
@CrossOrigin("*")
public class MilestoneController {

    @Autowired
    private MilestoneService service;

    @PostMapping
    public Milestone save(
            @RequestBody Milestone milestone) {

        return service.save(
                milestone);
    }

    @GetMapping
    public List<Milestone> getAll() {

        return service.getAll();
    }

    @GetMapping("/{id}")
    public Milestone getById(
            @PathVariable Long id) {

        return service.getById(id);
    }

    @PutMapping("/{id}")
    public Milestone update(
            @PathVariable Long id,
            @RequestBody Milestone milestone) {

        return service.update(
                id,
                milestone);
    }

    @DeleteMapping("/{id}")
    public void delete(
            @PathVariable Long id) {

        service.delete(id);
    }
}