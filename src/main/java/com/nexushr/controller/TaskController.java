package com.nexushr.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.nexushr.entity.Employee;
import com.nexushr.repository.EmployeeRepository;

import com.nexushr.entity.Task;
import com.nexushr.repository.TaskRepository;

@RestController
@RequestMapping("/tasks")
@CrossOrigin(origins = "http://localhost:3000")
public class TaskController {
	@Autowired
	private EmployeeRepository employeeRepository;
    @Autowired
    private TaskRepository taskRepository;

    // Get all tasks
    @GetMapping
    public List<Task> getAllTasks() {
        return taskRepository.findAll();
    }

    // Add task
    @PostMapping
    public Task addTask(@RequestBody Task task) {

        if (task.getStatus() == null ||
            task.getStatus().isEmpty()) {

            task.setStatus("PENDING");
        }

        return taskRepository.save(task);
    }

    // Employee tasks
    @GetMapping("/employee/{username}")
    public List<Task> getEmployeeTasks(
            @PathVariable String username) {

        Employee employee = employeeRepository
                .findByUsername(username)
                .orElseThrow(() ->
                        new RuntimeException("Employee Not Found"));

        String fullName =
                employee.getFirstName() + " " +
                employee.getLastName();

        System.out.println("Searching: " + fullName);

        List<Task> tasks =
                taskRepository.findEmployeeTasks(fullName);

        System.out.println("Found: " + tasks.size());

        return tasks;
    }

    // Update status
    @PutMapping("/{id}")
    public Task updateTask(
            @PathVariable Long id,
            @RequestBody Task updatedTask) {

        Task task =
                taskRepository.findById(id)
                .orElseThrow();

        task.setStatus(updatedTask.getStatus());

        return taskRepository.save(task);
    }

    // Delete task
    @DeleteMapping("/{id}")
    public void deleteTask(
            @PathVariable Long id) {

        taskRepository.deleteById(id);
    }
}