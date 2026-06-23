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
        return repository.save(project);
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }
}