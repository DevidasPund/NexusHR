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

            milestone.setStatus("PENDING");
        }

        return repository.save(milestone);
    }

    public List<Milestone> getAll() {

        return repository.findAll();
    }

    public Milestone getById(
            Long id) {

        return repository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Milestone Not Found"));
    }

    public Milestone update(
            Long id,
            Milestone milestone) {

        Milestone existing =
                getById(id);

        existing.setProjectName(
                milestone.getProjectName());

        existing.setMilestoneName(
                milestone.getMilestoneName());

        existing.setDescription(
                milestone.getDescription());

        existing.setDueDate(
                milestone.getDueDate());

        existing.setStatus(
                milestone.getStatus());

        existing.setProgress(
                milestone.getProgress());

        return repository.save(
                existing);
    }

    public void delete(
            Long id) {

        repository.deleteById(id);
    }

    public long totalMilestones() {

        return repository.count();
    }

    public long completedMilestones() {

        return repository.countByStatus(
                "COMPLETED");
    }

    public long pendingMilestones() {

        return repository.countByStatus(
                "PENDING");
    }
}