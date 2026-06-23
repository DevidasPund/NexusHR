package com.nexushr.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.nexushr.entity.Rating;
import com.nexushr.repository.RatingRepository;
import com.nexushr.service.RatingService;

@RestController
@RequestMapping("/rating")
@CrossOrigin("*")
public class RatingController {

    @Autowired
    private RatingService service;

    @Autowired
    private RatingRepository repository;

    @PostMapping
    public Rating save(
            @RequestBody Rating rating){

        return service.save(rating);
    }

    @GetMapping("/{employeeId}")
    public List<Rating> getRatings(
            @PathVariable Long employeeId){

        return service.getEmployeeRatings(
                employeeId);
    }

    @GetMapping
    public List<Rating> getAllRatings(){

        return repository.findAll();
    }

    @GetMapping("/stats")
    public Map<String,Object> getStats(){

        Map<String,Object> stats =
                new HashMap<>();

        long total =
                repository.count();

        stats.put(
                "totalRatings",
                total);

        stats.put(
                "excellent",
                repository
                .findAll()
                .stream()
                .filter(r ->
                        "Excellent"
                        .equalsIgnoreCase(
                                r.getPerformanceLevel()))
                .count());

        stats.put(
                "good",
                repository
                .findAll()
                .stream()
                .filter(r ->
                        "Good"
                        .equalsIgnoreCase(
                                r.getPerformanceLevel()))
                .count());

        stats.put(
                "average",
                repository
                .findAll()
                .stream()
                .filter(r ->
                        "Average"
                        .equalsIgnoreCase(
                                r.getPerformanceLevel()))
                .count());

        return stats;
    }
}