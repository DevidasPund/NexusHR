package com.nexushr.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.nexushr.dto.FaceRequest;

@Service
public class FaceAttendanceService {

    @Autowired
    private AttendanceService attendanceService;

//    @Autowired
//    private EmployeeService employeeService;

    public boolean markAttendance(
            FaceRequest request){

        try{

            RestTemplate restTemplate =
                    new RestTemplate();

            String result =
                    restTemplate.getForObject(
                            "http://localhost:5000/verify",
                            String.class);

            System.out.println(
                    "Python Response: "
                    + result);

            if(!"Matched".equals(result)){

                return false;
            }

            var employee =
                    employeeService
                    .getByUsername(
                            request.getUsername());

            if(employee == null){

                return false;
            }

            attendanceService.checkIn(
                    employee.getId());

            return true;

        }catch(Exception e){

            e.printStackTrace();

            return false;
        }
    }
}