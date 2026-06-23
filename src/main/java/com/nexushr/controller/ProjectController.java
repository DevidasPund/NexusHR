package com.nexushr.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.nexushr.entity.Project;
import com.nexushr.service.ProjectService;

@RestController
@RequestMapping("/projects")
@CrossOrigin("*")
public class ProjectController {

    @Autowired
    private ProjectService service;

    @GetMapping
    public List<Project> getAllProjects() {
        return service.getAllProjects();
    }

    @PostMapping
    public Project save(
            @RequestBody Project project) {

        return service.save(project);
    }

    @DeleteMapping("/{id}")
    public String delete(
            @PathVariable Long id) {

        service.delete(id);

        return "Project Deleted";
    }
}