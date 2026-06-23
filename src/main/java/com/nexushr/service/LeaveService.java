package com.nexushr.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.nexushr.entity.LeaveRequest;
import com.nexushr.entity.Notification;
import com.nexushr.repository.LeaveRepository;

@Service
public class LeaveService {


@Autowired
private LeaveRepository repository;

@Autowired
private NotificationService notificationService;

// Employee Apply Leave

public LeaveRequest applyLeave(
        LeaveRequest leave) {

    leave.setStatus("PENDING");

    leave.setManagerStatus(
            "PENDING");

    leave.setAdminStatus(
            "PENDING");

    LeaveRequest savedLeave =
            repository.save(leave);

    Notification notification =
            new Notification();

    notification.setTitle(
            "New Leave Request");

    notification.setMessage(
            "Employee ID "
            + leave.getEmployeeId()
            + " applied for "
            + leave.getLeaveType()
            + " leave");

    notification.setSender(
            "EMPLOYEE");

    notification.setReceiver(
            "MANAGER");

    notificationService.save(
            notification);

    return savedLeave;
}

// Get All Leaves

public List<LeaveRequest> getAll() {

    return repository.findAll();
}

// Get Employee Leaves

public List<LeaveRequest> getEmployeeLeaves(
        Long employeeId) {

    return repository.findByEmployeeId(
            employeeId);
}

// Manager Approve

public LeaveRequest managerApprove(
        Long id) {

    LeaveRequest leave =
            repository.findById(id)
                    .orElseThrow();

    leave.setManagerStatus(
            "APPROVED");

    leave.setStatus(
            "PENDING_ADMIN");

    LeaveRequest updated =
            repository.save(leave);

    Notification notification =
            new Notification();

    notification.setTitle(
            "Leave Approved By Manager");

    notification.setMessage(
            "Leave request requires final admin approval");

    notification.setSender(
            "MANAGER");

    notification.setReceiver(
            "ADMIN");

    notificationService.save(
            notification);

    return updated;
}

// Manager Reject

public LeaveRequest managerReject(
        Long id) {

    LeaveRequest leave =
            repository.findById(id)
                    .orElseThrow();

    leave.setManagerStatus(
            "REJECTED");

    leave.setStatus(
            "REJECTED");

    LeaveRequest updated =
            repository.save(leave);

    Notification notification =
            new Notification();

    notification.setTitle(
            "Leave Rejected");

    notification.setMessage(
            "Manager rejected your leave request");

    notification.setSender(
            "MANAGER");

    notification.setReceiver(
            "EMPLOYEE");

    notificationService.save(
            notification);

    return updated;
}

// Admin Final Approval

public LeaveRequest adminApprove(
        Long id) {

    LeaveRequest leave =
            repository.findById(id)
                    .orElseThrow();

    leave.setAdminStatus(
            "APPROVED");

    leave.setStatus(
            "APPROVED");

    LeaveRequest updated =
            repository.save(leave);

    Notification notification =
            new Notification();

    notification.setTitle(
            "Leave Approved");

    notification.setMessage(
            "Your leave request has been approved");

    notification.setSender(
            "ADMIN");

    notification.setReceiver(
            "EMPLOYEE");

    notificationService.save(
            notification);

    return updated;
}

// Admin Reject

public LeaveRequest reject(
        Long id) {

    LeaveRequest leave =
            repository.findById(id)
                    .orElseThrow();

    leave.setAdminStatus(
            "REJECTED");

    leave.setStatus(
            "REJECTED");

    LeaveRequest updated =
            repository.save(leave);

    Notification notification =
            new Notification();

    notification.setTitle(
            "Leave Rejected");

    notification.setMessage(
            "Admin rejected your leave request");

    notification.setSender(
            "ADMIN");

    notification.setReceiver(
            "EMPLOYEE");

    notificationService.save(
            notification);

    return updated;
}

// Delete Leave

public void delete(
        Long id) {

    repository.deleteById(id);
}


}
