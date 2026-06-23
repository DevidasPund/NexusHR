package com.nexushr.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.nexushr.dto.EmailRequest;
import com.nexushr.service.EmailService;

@RestController
@RequestMapping("/email")
@CrossOrigin("*")
public class EmailController {

    @Autowired
    private EmailService emailService;

    @PostMapping("/send")
    public String sendEmail(
            @RequestBody EmailRequest request) {

        emailService.sendEmail(
                request.getTo(),
                request.getSubject(),
                request.getBody());

        return "Email Sent Successfully";
    }
}