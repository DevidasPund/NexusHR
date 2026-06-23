package com.nexushr.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.nexushr.entity.Role;

public interface RoleRepository
extends JpaRepository<Role, Long>{
}