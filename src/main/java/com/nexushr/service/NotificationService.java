package com.nexushr.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import com.nexushr.entity.Notification;
import com.nexushr.repository.NotificationRepository;

@Service
public class NotificationService {

    @Autowired
    private NotificationRepository repository;

    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    // SAVE + SEND REAL TIME

    public Notification save(
            Notification notification) {

        notification.setCreatedAt(
                LocalDateTime.now());

        notification.setStatus(
                "ACTIVE");

        Notification saved =
                repository.save(
                        notification);

        // Send to all connected users

        messagingTemplate.convertAndSend(
                "/topic/notifications",
                saved);

        return saved;
    }

    // GET ALL

    public List<Notification> getByReceiver(
            String receiver) {

        return repository
                .findByReceiverOrReceiverOrderByCreatedAtDesc(
                        receiver,
                        "ALL");
    }

    // GET BY RECEIVER

    

    // DELETE

    public void delete(Long id) {

        repository.deleteById(id);
    }

    // CUSTOM REAL TIME MESSAGE

    public void sendRealtimeNotification(
            String title,
            String message,
            String receiver) {

        Notification notification =
                new Notification();

        notification.setTitle(
                title);

        notification.setMessage(
                message);

        notification.setReceiver(
                receiver);

        notification.setStatus(
                "ACTIVE");

        notification.setCreatedAt(
                LocalDateTime.now());

        Notification saved =
                repository.save(
                        notification);

        messagingTemplate.convertAndSend(
                "/topic/notifications",
                saved);
    }

    public List<Notification> getAll() {

        return repository
                .findAllByOrderByCreatedAtDesc();
    }
    
}