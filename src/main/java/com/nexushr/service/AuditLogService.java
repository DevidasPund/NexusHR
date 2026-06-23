package com.nexushr.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.nexushr.entity.AuditLog;
import com.nexushr.repository.AuditLogRepository;

@Service
public class AuditLogService {

    @Autowired
    private AuditLogRepository repository;

    public void saveLog(
            String username,
            String action,
            String details){

        AuditLog log =
                new AuditLog();

        log.setUsername(
                username);

        log.setAction(
                action);

        log.setDetails(
                details);

        log.setCreatedAt(
                LocalDateTime.now());

        repository.save(
                log);
    }

    public List<AuditLog> getAllLogs(){

        return repository.findAll();
    }
}