package com.nexushr.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.nexushr.entity.Milestone;
import com.nexushr.repository.MilestoneRepository;

@Service
public class MilestoneService {

    @Autowired
    private MilestoneRepository repository;

    public Milestone save(
            Milestone milestone) {

        if(milestone.getStatus() == null ||
           milestone.getStatus().isEmpty()) {

            milestone.setStatus(
                    "PENDING");
        }

        return repository.save(
                milestone);
    }

    public List<Milestone> getAll() {

        return repository.findAll();
    }

    public Milestone update(
            Long id,
            Milestone milestone) {

        Milestone existing =
                repository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Milestone Not Found"));

        existing.setProjectName(
                milestone.getProjectName());

        existing.setMilestoneName(
                milestone.getMilestoneName());

        existing.setDueDate(
                milestone.getDueDate());

        existing.setStatus(
                milestone.getStatus());

        return repository.save(
                existing);
    }

    public void delete(
            Long id) {

        repository.deleteById(id);
    }

    public Milestone getById(
            Long id) {

        return repository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Milestone Not Found"));
    }
}