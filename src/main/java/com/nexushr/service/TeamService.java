package com.nexushr.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.nexushr.entity.Team;
import com.nexushr.repository.TeamRepository;

@Service
public class TeamService {

    @Autowired
    private TeamRepository teamRepository;

    public List<Team> getAllTeams() {

        return teamRepository.findAll();
    }

    public Team saveTeam(
            Team team) {

        return teamRepository.save(team);
    }

    public void deleteTeam(
            Long id) {

        teamRepository.deleteById(id);
    }
}