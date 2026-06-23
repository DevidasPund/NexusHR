package com.nexushr.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
//@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    public void sendEmail(
            String to,
            String subject,
            String body) {

        SimpleMailMessage message =
                new SimpleMailMessage();

        message.setFrom(
                "devidaspund3@gmail.com");

        message.setTo(to);
        message.setSubject(subject);
        message.setText(body);

        mailSender.send(message);
    }
    public void sendPayslipEmail(
            String to,
            String employeeName,
            Double salary) {

        SimpleMailMessage mail =
                new SimpleMailMessage();

        mail.setFrom(
                "devidaspund3@gmail.com");

        mail.setTo(to);

        mail.setSubject(
                "NexusHR Payslip");

        mail.setText(
                "Hello "
                + employeeName
                + ",\n\nYour salary has been processed successfully.\n\nNet Salary: ₹"
                + salary
                + "\n\nRegards,\nNexusHR Team");

        mailSender.send(mail);
    }
}