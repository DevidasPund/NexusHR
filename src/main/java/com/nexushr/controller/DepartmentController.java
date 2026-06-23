package com.nexushr.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.nexushr.entity.Department;
import com.nexushr.service.DepartmentService;

@RestController
@RequestMapping("/departments")
@CrossOrigin("*")
public class DepartmentController {

    @Autowired
    private DepartmentService service;

    @PostMapping
    public Department save(
            @RequestBody Department department) {

        return service.save(department);
    }

    @GetMapping
    public List<Department> getAll() {

        return service.getAll();
    }

    @GetMapping("/{id}")
    public Department getById(
            @PathVariable Long id) {

        return service.getById(id);
    }

    @PutMapping("/{id}")
    public Department update(
            @PathVariable Long id,
            @RequestBody Department department) {

        return service.update(
                id,
                department);
    }

    @DeleteMapping("/{id}")
    public void delete(
            @PathVariable Long id) {

        service.delete(id);
    }

    @GetMapping("/count")
    public long count() {

        return service.count();
    }
}