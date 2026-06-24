package com.nexushr.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.nexushr.entity.Rating;

public interface RatingRepository
        extends JpaRepository<Rating, Long> {

    List<Rating> findByEmployeeId(
            Long employeeId);
}