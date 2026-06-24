package com.nexushr.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.nexushr.entity.Notification;
import com.nexushr.service.NotificationService;

@RestController
@RequestMapping("/notifications")
@CrossOrigin("*")
public class NotificationController {

    @Autowired
    private NotificationService service;

    @PostMapping
    public Notification save(
            @RequestBody Notification notification){

        return service.save(notification);
    }

    @GetMapping
    public List<Notification> getAll(){

        return service.getAll();
    }

    @GetMapping("/receiver/{receiver}")
    public List<Notification> getByReceiver(
            @PathVariable String receiver){

        return service.getByReceiver(
                receiver);
    }
    @PostMapping("/reply")
    public Notification reply(
            @RequestBody Notification notification){

        return service.save(notification);
    }

    @DeleteMapping("/{id}")
    public void delete(
            @PathVariable Long id){

        service.delete(id);
    }
    
}