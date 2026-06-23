package com.nexushr.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.nexushr.entity.Department;
import com.nexushr.repository.DepartmentRepository;

@Service
public class DepartmentService {

    @Autowired
    private DepartmentRepository repository;

    public Department save(
            Department department) {

        return repository.save(department);
    }

    public List<Department> getAll() {

        return repository.findAll();
    }

    public Department getById(
            Long id) {

        return repository.findById(id)
                .orElseThrow();
    }

    public Department update(
            Long id,
            Department department) {

        Department existing =
                repository.findById(id)
                .orElseThrow();

        existing.setDepartmentName(
                department.getDepartmentName());

        existing.setDescription(
                department.getDescription());

        return repository.save(existing);
    }

    public void delete(Long id) {

        repository.deleteById(id);
    }

    public long count() {

        return repository.count();
    }
}