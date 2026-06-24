package com.nexushr.controller;

import java.io.File;
import java.io.IOException;

import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/upload")
@CrossOrigin(origins = {
        "https://nexushr-hrms.netlify.app",
        "http://localhost:3000"
})
public class FileUploadController {

    @PostMapping
    public String uploadFile(
            @RequestParam("file") MultipartFile file)
            throws IOException {

        String uploadDir =
                System.getProperty("user.dir")
                + File.separator
                + "uploads";

        File directory = new File(uploadDir);

        if (!directory.exists()) {
            directory.mkdirs();
        }

        String fileName =
                System.currentTimeMillis()
                + "_"
                + file.getOriginalFilename();

        File destination =
                new File(uploadDir
                        + File.separator
                        + fileName);

        file.transferTo(destination);

        return fileName;
    }
}