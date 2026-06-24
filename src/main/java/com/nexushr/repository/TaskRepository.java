package com.nexushr.repository;

import java.util.List;

import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;

import com.nexushr.entity.Task;

public interface TaskRepository
        extends JpaRepository<Task, Long> {

    @Query("""
           SELECT t
           FROM Task t
           WHERE LOWER(t.employeeName)
           = LOWER(:employeeName)
           """)
    List<Task> findEmployeeTasks(
            @Param("employeeName")
            String employeeName);

    List<Task> findByStatus(
            String status);
}