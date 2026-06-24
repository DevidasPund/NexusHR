package com.nexushr.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.nexushr.entity.Team;
import com.nexushr.repository.TeamRepository;

@Service
public class TeamService {

    @Autowired
    private TeamRepository repository;

    public List<Team> getAllTeams() {
        return repository.findAll();
    }

    public Team saveTeam(Team team) {

        if (team.getStatus() == null ||
            team.getStatus().isEmpty()) {

            team.setStatus("ACTIVE");
        }

        return repository.save(team);
    }

    public Team getById(Long id) {

        return repository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Team Not Found"));
    }

    public Team updateTeam(
            Long id,
            Team team) {

        Team existing = getById(id);

        existing.setTeamName(
                team.getTeamName());

        existing.setTeamLead(
                team.getTeamLead());

        existing.setProjectName(
                team.getProjectName());

        existing.setMembers(
                team.getMembers());

        existing.setStatus(
                team.getStatus());

        return repository.save(existing);
    }

    public void deleteTeam(Long id) {
        repository.deleteById(id);
    }

    public long countTeams() {
        return repository.count();
    }
}