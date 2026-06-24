package com.nexushr.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.nexushr.entity.Notification;
import com.nexushr.repository.NotificationRepository;

@Service
public class NotificationService {

    @Autowired
    private NotificationRepository repository;

    // Save Notification
    public Notification save(
            Notification notification) {

        if (notification.getStatus() == null ||
                notification.getStatus().isEmpty()) {

            notification.setStatus("SENT");
        }

        return repository.save(notification);
    }

    // Get All Notifications
    public List<Notification> getAll() {

        return repository.findAll();
    }

    // Get Notifications For Employee
    public List<Notification> getByReceiver(
            String receiver) {

        return repository.findEmployeeNotifications(
                receiver);
    }

    // Delete Notification
    public void delete(
            Long id) {

        repository.deleteById(id);
    }

    // Total Notifications
    public long totalNotifications() {

        return repository.count();
    }
}