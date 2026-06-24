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

    public Notification save(
            Notification notification) {

        if(notification.getStatus() == null) {
            notification.setStatus("SENT");
        }

        return repository.save(notification);
    }

    public List<Notification> getAll() {

        return repository.findAll();
    }

    public List<Notification> getByReceiver(
            String receiver) {

        return repository.findByReceiver(receiver);
    }

    public void delete(
            Long id) {

        repository.deleteById(id);
    }

    public long totalNotifications() {

        return repository.count();
    }
}