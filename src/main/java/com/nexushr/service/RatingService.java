package com.nexushr.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.nexushr.entity.Rating;
import com.nexushr.repository.RatingRepository;

@Service
public class RatingService {

    @Autowired
    private RatingRepository repository;

    public Rating save(Rating rating) {

        double finalRating =
                (rating.getAttendanceScore()
                + rating.getProjectScore()) / 2;

        rating.setFinalRating(finalRating);

        if (finalRating >= 90) {
            rating.setPerformanceLevel("Excellent");
        } else if (finalRating >= 70) {
            rating.setPerformanceLevel("Good");
        } else {
            rating.setPerformanceLevel("Average");
        }

        return repository.save(rating);
    }

    public List<Rating> getEmployeeRatings(
            Long employeeId) {

        return repository.findByEmployeeId(
                employeeId);
    }

    public List<Rating> getAllRatings() {
        return repository.findAll();
    }

    public Rating getById(Long id) {

        return repository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Rating Not Found"));
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }
}