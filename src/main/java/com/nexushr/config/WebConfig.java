package com.nexushr.config;

import java.io.File;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.*;

@Configuration
public class WebConfig
        implements WebMvcConfigurer {

    @Override
    public void addResourceHandlers(
            ResourceHandlerRegistry registry) {

        String uploadPath =
                System.getProperty("user.dir")
                        + File.separator
                        + "uploads"
                        + File.separator;

        registry.addResourceHandler(
                        "/uploads/**")
                .addResourceLocations(
                        "file:" + uploadPath);
    }
}