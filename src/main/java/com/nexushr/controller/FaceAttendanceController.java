package com.nexushr.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.nexushr.dto.FaceRequest;
import com.nexushr.service.FaceAttendanceService;

@RestController
@RequestMapping("/attendance")
@CrossOrigin("*")
public class FaceAttendanceController {

    @Autowired
    private FaceAttendanceService service;

    @PostMapping("/face")
    public Map<String,Object> markAttendance(
            @RequestBody FaceRequest request){

        boolean success =
                service.markAttendance(
                        request);

        Map<String,Object> response =
                new HashMap<>();

        if(success){

            response.put(
                    "message",
                    "Attendance Marked Successfully");
        }
        else{

            response.put(
                    "message",
                    "Face Verification Failed");
        }

        return response;
    }
}