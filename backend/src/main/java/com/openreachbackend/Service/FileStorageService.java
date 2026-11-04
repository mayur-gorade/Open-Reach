package com.openreachbackend.Service;

import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;

@Service
public class FileStorageService {
    @Value("${app.upload.dir}")
    private String uploadDir;

    public String saveFile(MultipartFile file) throws IOException {

        validateFile(file);
        String contentType = file.getContentType();

        String extension;

        if (contentType.equals("application/pdf")) {
            extension = ".pdf";
        } else if (contentType.equals("image/jpeg")) {
            extension = ".jpg";
        } else {
            extension = ".png";
        }

        // 1. Get the destination folder
        Path uploadPath = Paths.get(uploadDir);

        // 2. Create the folder if it does not exist
        Files.createDirectories(uploadPath);

        // 3. Generate a unique filename
        String fileName = UUID.randomUUID() +extension ;

        // 4. Create the complete destination path
        Path filePath = uploadPath.resolve(fileName);

        // 5. Copy the uploaded file into the destination
        Files.copy(file.getInputStream(), filePath);

        // 6. Return the saved file path
        return filePath.toString();
    }

    private void validateFile(MultipartFile file) {

        // Check whether file is empty
        if (file == null || file.isEmpty()) {
            throw new IllegalArgumentException("ID card is required");
        }

        // Check file size (5 MB)
        if (file.getSize() > 5 * 1024 * 1024) {
            throw new IllegalArgumentException("File size must be less than 5 MB");
        }

        // Check content type
        String contentType = file.getContentType();

        if (contentType == null ||
                !(contentType.equals("application/pdf") ||
                        contentType.equals("image/jpeg") ||
                        contentType.equals("image/png"))) {

            throw new IllegalArgumentException(
                    "Only PDF, JPG and PNG files are allowed"
            );
        }
    }

    public void deleteFile(String filePath) throws IOException{

        if(filePath!=null){
            Path path = Paths.get(filePath);

            Files.deleteIfExists(path);

        }
    }
}
