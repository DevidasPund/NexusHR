package com.nexushr.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.nexushr.entity.LeaveRequest;
import com.nexushr.service.LeaveService;

@RestController
@RequestMapping("/leave")
@CrossOrigin("*")
public class LeaveController {


@Autowired
private LeaveService service;

// Apply Leave

@PostMapping
public LeaveRequest apply(
        @RequestBody LeaveRequest leave){

    return service.applyLeave(
            leave);
}

// Employee Leave History

@GetMapping("/employee/{employeeId}")
public List<LeaveRequest> getEmployeeLeaves(
        @PathVariable Long employeeId){

    return service.getEmployeeLeaves(
            employeeId);
}

// Get All Leaves

@GetMapping
public List<LeaveRequest> getAll(){

    return service.getAll();
}

// Manager Approve

@PutMapping("/manager-approve/{id}")
public LeaveRequest managerApprove(
        @PathVariable Long id){

    return service.managerApprove(
            id);
}

// Manager Reject

@PutMapping("/manager-reject/{id}")
public LeaveRequest managerReject(
        @PathVariable Long id){

    return service.managerReject(
            id);
}

// Admin Final Approve

@PutMapping("/admin-approve/{id}")
public LeaveRequest adminApprove(
        @PathVariable Long id){

    return service.adminApprove(
            id);
}

// Admin Reject

@PutMapping("/reject/{id}")
public LeaveRequest reject(
        @PathVariable Long id){

    return service.reject(
            id);
}

// Delete Leave

@DeleteMapping("/{id}")
public void delete(
        @PathVariable Long id){

    service.delete(id);
}


}
