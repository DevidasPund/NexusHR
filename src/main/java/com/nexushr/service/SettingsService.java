package com.nexushr.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.nexushr.entity.UserSettings;
import com.nexushr.repository.SettingsRepository;


@Service
public class SettingsService {

    @Autowired
    private SettingsRepository repository;

    public UserSettings getSettings(
            String username) {

        return repository
                .findByUsername(username)
                .orElseGet(() -> {

                    UserSettings settings =
                            new UserSettings();

                    settings.setUsername(
                            username);

                    settings.setDarkMode(false);
                    settings.setEmailNotifications(true);
                    settings.setSmsNotifications(false);
                    settings.setTaskAlerts(true);
                    settings.setLeaveAlerts(true);
                    settings.setAttendanceAlerts(true);

                    return repository.save(settings);
                });
    }

    public UserSettings saveSettings(
            String username,
            UserSettings settings) {

        UserSettings existing =
                repository
                .findByUsername(username)
                .orElse(new UserSettings());

        existing.setUsername(username);
        existing.setDarkMode(
                settings.isDarkMode());
        existing.setEmailNotifications(
                settings.isEmailNotifications());
        existing.setSmsNotifications(
                settings.isSmsNotifications());
        existing.setTaskAlerts(
                settings.isTaskAlerts());
        existing.setLeaveAlerts(
                settings.isLeaveAlerts());
        existing.setAttendanceAlerts(
                settings.isAttendanceAlerts());

        return repository.save(existing);
    }
}