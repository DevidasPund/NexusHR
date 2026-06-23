package com.nexushr.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.nexushr.entity.AuditLog;
import com.nexushr.service.AuditLogService;

@RestController
@RequestMapping("/audit")
@CrossOrigin("*")
public class AuditLogController {

    @Autowired
    private AuditLogService service;

    @GetMapping
    public List<AuditLog> getAllLogs() {

        return service.getAllLogs();
    }
}