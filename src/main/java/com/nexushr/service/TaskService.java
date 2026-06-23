package com.nexushr.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.nexushr.entity.Notification;
import com.nexushr.entity.Task;
import com.nexushr.repository.TaskRepository;

@Service
public class TaskService {

    @Autowired
    private TaskRepository taskRepository;

    @Autowired
    private NotificationService notificationService;

    @Autowired
    private AuditLogService auditLogService;

    // GET ALL TASKS

    public List<Task> getAllTasks() {
        return taskRepository.findAll();
    }

    // ADD TASK

    public Task addTask(Task task) {

        if (task.getStatus() == null ||
            task.getStatus().isEmpty()) {

            task.setStatus("PENDING");
        }

        Task savedTask = taskRepository.save(task);

        Notification notification = new Notification();

        notification.setTitle("New Task Assigned");

        notification.setMessage(
                task.getTaskName()
                + " assigned to "
                + task.getEmployeeName());

        notification.setSender("MANAGER");

        notification.setReceiver(
                task.getEmployeeName());

        notificationService.save(notification);

        auditLogService.saveLog(
                "MANAGER",
                "TASK_ASSIGNED",
                "Task : "
                + task.getTaskName()
                + " assigned to "
                + task.getEmployeeName());

        return savedTask;
    }

    // GET EMPLOYEE TASKS

    public List<Task> getEmployeeTasks(
            String employeeName) {

        return taskRepository.findByEmployeeName(
                employeeName);
    }

    // UPDATE TASK

    public Task updateTask(
            Long id,
            Task updatedTask) {

        Task task = taskRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Task Not Found"));

        task.setTaskName(
                updatedTask.getTaskName());

        task.setEmployeeName(
                updatedTask.getEmployeeName());

        task.setEmployeeEmail(
                updatedTask.getEmployeeEmail());

        task.setProjectName(
                updatedTask.getProjectName());

        task.setDueDate(
                updatedTask.getDueDate());

        task.setPriority(
                updatedTask.getPriority());

        task.setStatus(
                updatedTask.getStatus());

        Task savedTask =
                taskRepository.save(task);

        Notification notification =
                new Notification();

        notification.setTitle(
                "Task Updated");

        notification.setMessage(
                task.getTaskName()
                + " status changed to "
                + task.getStatus());

        notification.setSender(
                "MANAGER");

        notification.setReceiver(
                task.getEmployeeName());

        notificationService.save(
                notification);

        auditLogService.saveLog(
                "MANAGER",
                "TASK_UPDATED",
                "Task : "
                + task.getTaskName()
                + " Status : "
                + task.getStatus());

        return savedTask;
    }

    // DELETE TASK

    public void deleteTask(Long id) {

        Task task =
                taskRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Task Not Found"));

        auditLogService.saveLog(
                "MANAGER",
                "TASK_DELETED",
                "Task : "
                + task.getTaskName());

        taskRepository.deleteById(id);
    }

    // GET TASK BY ID

    public Task getTaskById(Long id) {

        return taskRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Task Not Found"));
    }
}