package com.nexushr.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.nexushr.entity.Performance;
import com.nexushr.repository.PerformanceRepository;

@Service
public class PerformanceService {

    @Autowired
    private PerformanceRepository repository;

    public Performance save(
            Performance performance) {

        double attendanceScore =
                performance.getAttendanceScore();

        double taskScore =
                performance.getTaskScore();

        double overallScore =
                (attendanceScore + taskScore) / 2;

        performance.setOverallScore(
                overallScore);

        if (overallScore >= 90) {

            performance.setRating(
                    "EXCELLENT");

        } else if (overallScore >= 75) {

            performance.setRating(
                    "GOOD");

        } else if (overallScore >= 60) {

            performance.setRating(
                    "AVERAGE");

        } else {

            performance.setRating(
                    "NEEDS IMPROVEMENT");
        }

        return repository.save(
                performance);
    }

    public List<Performance> getAll() {

        return repository.findAll();
    }

    public Performance getById(
            Long id) {

        return repository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Performance Record Not Found"));
    }

    public void delete(
            Long id) {

        repository.deleteById(id);
    }
}