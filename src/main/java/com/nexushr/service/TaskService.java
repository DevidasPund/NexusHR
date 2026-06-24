package com.nexushr.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.nexushr.entity.Task;
import com.nexushr.repository.TaskRepository;

@Service
public class TaskService {

    @Autowired
    private TaskRepository repository;

    public List<Task> getAllTasks() {
        return repository.findAll();
    }

    public Task save(Task task) {

        if (task.getStatus() == null ||
            task.getStatus().isEmpty()) {

            task.setStatus("PENDING");
        }

        return repository.save(task);
    }

    public List<Task> getEmployeeTasks(
            String employeeName) {

        return repository.findEmployeeTasks(
                employeeName);
    }

    public Task updateStatus(
            Long id,
            String status) {

        Task task =
                repository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Task Not Found"));

        task.setStatus(status);

        return repository.save(task);
    }

    public void delete(Long id) {

        repository.deleteById(id);
    }

    public long countTasks() {

        return repository.count();
    }
}