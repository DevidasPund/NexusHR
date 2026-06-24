package com.nexushr.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.nexushr.entity.LeaveRequest;
import com.nexushr.repository.LeaveRepository;

@Service
public class LeaveService {

    @Autowired
    private LeaveRepository repository;

    // Apply Leave
    public LeaveRequest applyLeave(
            LeaveRequest leave) {

        leave.setManagerStatus("PENDING");
        leave.setAdminStatus("PENDING");
        leave.setStatus("PENDING");

        return repository.save(leave);
    }

    // Employee Leave History
    public List<LeaveRequest> getEmployeeLeaves(
            Long employeeId) {

        return repository.findByEmployeeId(
                employeeId);
    }

    // Get All Leaves
    public List<LeaveRequest> getAll() {

        return repository.findAll();
    }

    // Manager Approve
    public LeaveRequest managerApprove(
            Long id) {

        LeaveRequest leave =
                repository.findById(id)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Leave Not Found"));

        leave.setManagerStatus(
                "APPROVED");

        leave.setStatus(
                "MANAGER_APPROVED");

        return repository.save(leave);
    }

    // Manager Reject
    public LeaveRequest managerReject(
            Long id) {

        LeaveRequest leave =
                repository.findById(id)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Leave Not Found"));

        leave.setManagerStatus(
                "REJECTED");

        leave.setStatus(
                "REJECTED");

        return repository.save(leave);
    }

    // Admin Approve
    public LeaveRequest adminApprove(
            Long id) {

        LeaveRequest leave =
                repository.findById(id)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Leave Not Found"));

        leave.setAdminStatus(
                "APPROVED");

        leave.setStatus(
                "APPROVED");

        return repository.save(leave);
    }

    // Admin Reject
    public LeaveRequest reject(
            Long id) {

        LeaveRequest leave =
                repository.findById(id)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Leave Not Found"));

        leave.setAdminStatus(
                "REJECTED");

        leave.setStatus(
                "REJECTED");

        return repository.save(leave);
    }

    // Delete Leave
    public void delete(
            Long id) {

        repository.deleteById(id);
    }

    // Dashboard Counts
    public long getPendingLeaves() {

        return repository.countByStatus(
                "PENDING");
    }

    public long getApprovedLeaves() {

        return repository.countByStatus(
                "APPROVED");
    }

    public long getRejectedLeaves() {

        return repository.countByStatus(
                "REJECTED");
    }
}