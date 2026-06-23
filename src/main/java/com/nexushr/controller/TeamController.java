package com.nexushr.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.nexushr.entity.Team;
import com.nexushr.service.TeamService;

@RestController
@RequestMapping("/teams")
@CrossOrigin(origins = "*")
public class TeamController {

    @Autowired
    private TeamService teamService;

    @GetMapping
    public List<Team> getAllTeams() {

        return teamService.getAllTeams();
    }

    @PostMapping
    public Team createTeam(
            @RequestBody Team team) {

        return teamService.saveTeam(team);
    }

    @DeleteMapping("/{id}")
    public String deleteTeam(
            @PathVariable Long id) {

        teamService.deleteTeam(id);

        return "Team Deleted Successfully";
    }
}