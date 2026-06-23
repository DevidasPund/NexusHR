package com.nexushr.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.nexushr.entity.Task;
@Repository
public interface TaskRepository
        extends JpaRepository<Task, Long> {

    @Query("""
        SELECT t
        FROM Task t
        WHERE LOWER(TRIM(t.employeeName))
              =
              LOWER(TRIM(:employeeName))
    """)
    List<Task> findEmployeeTasks(
            @Param("employeeName")
            String employeeName);

	List<Task> findByEmployeeName(String employeeName);
}