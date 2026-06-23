package com.nexushr.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.nexushr.entity.UserSettings;
import com.nexushr.service.SettingsService;
@RestController
@RequestMapping("/settings")
@CrossOrigin("*")
public class SettingsController {

    @Autowired
    private SettingsService service;

    @GetMapping("/{username}")
    public UserSettings getSettings(
            @PathVariable String username){

        return service.getSettings(
                username);
    }

    @PutMapping("/{username}")
    public UserSettings saveSettings(
            @PathVariable String username,
            @RequestBody UserSettings settings){

        return service.saveSettings(
                username,
                settings);
    }
}