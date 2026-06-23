package com.nexushr.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.nexushr.entity.UserSettings;
import com.nexushr.repository.SettingsRepository;

@Service
public class SettingsService {

    @Autowired
    private SettingsRepository repository;

    // Get Settings

    public UserSettings getSettings(
            String username) {

        return repository
                .findByUsername(username)
                .orElseGet(() -> {

                    UserSettings settings =
                            new UserSettings();

                    settings.setUsername(
                            username);

                    settings.setDarkMode(
                            false);

                    settings.setEmailNotifications(
                            true);

                    settings.setSmsNotifications(
                            false);

                    settings.setTaskAlerts(
                            true);

                    settings.setLeaveAlerts(
                            true);

                    settings.setAttendanceAlerts(
                            true);

                    return repository.save(
                            settings);
                });
    }

    // Save Settings

    public UserSettings saveSettings(
            String username,
            UserSettings settings) {

        UserSettings existing =
                repository
                .findByUsername(
                        username)
                .orElse(new UserSettings());

        existing.setUsername(
                username);

        existing.setDarkMode(
                settings.getDarkMode());

        existing.setEmailNotifications(
                settings.getEmailNotifications());

        existing.setSmsNotifications(
                settings.getSmsNotifications());

        existing.setTaskAlerts(
                settings.getTaskAlerts());

        existing.setLeaveAlerts(
                settings.getLeaveAlerts());

        existing.setAttendanceAlerts(
                settings.getAttendanceAlerts());

        return repository.save(
                existing);
    }
}