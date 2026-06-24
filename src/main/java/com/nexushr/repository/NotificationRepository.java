package com.nexushr.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.nexushr.entity.Notification;

public interface NotificationRepository
        extends JpaRepository<Notification, Long> {

    List<Notification> findByReceiver(
            String receiver);
    
    @Query("""
    		SELECT n FROM Notification n
    		WHERE n.receiver = :receiver
    		OR n.receiver = 'ALL'
    		OR n.receiver = 'EMPLOYEE'
    		""")
    		List<Notification> findEmployeeNotifications(
    		        @Param("receiver") String receiver);
}