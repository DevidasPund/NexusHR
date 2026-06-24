package com.nexushr.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.nexushr.entity.Project;
import com.nexushr.repository.ProjectRepository;

@Service
public class ProjectService {

    @Autowired
    private ProjectRepository repository;

    public List<Project> getAllProjects() {
        return repository.findAll();
    }

    public Project save(Project project) {

        if (project.getStatus() == null ||
            project.getStatus().isEmpty()) {

            project.setStatus("PLANNING");
        }

        return repository.save(project);
    }

    public Project getById(Long id) {

        return repository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Project Not Found"));
    }

    public Project update(
            Long id,
            Project project) {

        Project existing = getById(id);

        existing.setProjectName(
                project.getProjectName());

        existing.setClientName(
                project.getClientName());

        existing.setManagerName(
                project.getManagerName());

        existing.setStartDate(
                project.getStartDate());

        existing.setEndDate(
                project.getEndDate());

        existing.setStatus(
                project.getStatus());

        return repository.save(existing);
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }

    public long countProjects() {
        return repository.count();
    }
}