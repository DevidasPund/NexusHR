package com.nexushr.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.nexushr.entity.Rating;
import com.nexushr.repository.RatingRepository;

@Service
public class RatingService {

    @Autowired
    private RatingRepository repository;

    public Rating save(
            Rating rating){

        return repository.save(
                rating);
    }

    public List<Rating>
    getEmployeeRatings(
            Long employeeId){

        return repository
                .findByEmployeeId(
                        employeeId);
    }

    public List<Rating> getAllRatings(){

        return repository.findAll();
    }

    public Map<String,Object> getStats(){

        Map<String,Object> stats =
                new HashMap<>();

        List<Rating> ratings =
                repository.findAll();

        stats.put(
                "totalRatings",
                ratings.size());

        stats.put(
                "excellent",
                ratings.stream()
                .filter(r ->
                    "Excellent".equalsIgnoreCase(
                        r.getPerformanceLevel()))
                .count());

        stats.put(
                "good",
                ratings.stream()
                .filter(r ->
                    "Good".equalsIgnoreCase(
                        r.getPerformanceLevel()))
                .count());

        stats.put(
                "average",
                ratings.stream()
                .filter(r ->
                    "Average".equalsIgnoreCase(
                        r.getPerformanceLevel()))
                .count());

        stats.put(
                "poor",
                ratings.stream()
                .filter(r ->
                    "Poor".equalsIgnoreCase(
                        r.getPerformanceLevel()))
                .count());

        return stats;
    }
}