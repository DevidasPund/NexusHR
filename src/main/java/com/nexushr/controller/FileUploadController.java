package com.nexushr.controller;

import java.io.File;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/upload")
@CrossOrigin("*")
public class FileUploadController {

    @PostMapping
    public Map<String, Object> uploadFile(
            @RequestParam("file")
            MultipartFile file)
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

        Map<String, Object> response =
                new HashMap<>();

        response.put("success", true);
        response.put("fileName", fileName);
        response.put(
                "filePath",
                "/uploads/" + fileName);

        return response;
    }
}