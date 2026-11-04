package com.openreachbackend.Service;

import com.openreachbackend.Model.LoginRequest;
import com.openreachbackend.Model.StudentVerification;
import com.openreachbackend.Model.User;
import com.openreachbackend.Repository.StudentVerificationRepository;
import com.openreachbackend.Repository.userRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Map;
import java.util.Optional;

@Service
public class userService {

   private final userRepository userRepo;
   private final StudentVerificationRepository studentVerificationRepository;
   private final FileStorageService fileStorageService;

    public userService(userRepository userRepo, StudentVerificationRepository studentVerificationRepository, FileStorageService fileStorageService) {
        this.userRepo = userRepo;
        this.studentVerificationRepository = studentVerificationRepository;
        this.fileStorageService = fileStorageService;
    }


    @Transactional(rollbackFor = Exception.class)
    public ResponseEntity<?> registerUser(
            String name,
            String email,
            String password,
            String role,
            String collegeName,
            String collegeId,
            MultipartFile idCard
    ) throws IOException {

        //Creating the object user
        User user = new User();
        user.setName(name);
        user.setEmail(email);
        user.setPassword(password);
        user.setRole(role);



        if(userRepo.existsByEmail(user.getEmail())){
           return ResponseEntity.status(409).body(Map.of("message","User already exists"));
       }

        // Check whether the role is valid
        if (!role.equalsIgnoreCase("STUDENT") &&
                !role.equalsIgnoreCase("CLIENT")) {

            return ResponseEntity.badRequest()
                    .body(Map.of("message", "Invalid role"));
        }

        // Validate student details
        if (role.equalsIgnoreCase("STUDENT")) {

            if (collegeName == null || collegeName.isBlank() ||
                    collegeId == null || collegeId.isBlank() ||
                    idCard == null || idCard.isEmpty()) {

                return ResponseEntity.badRequest()
                        .body(Map.of("message",
                                "College name, college ID and ID card are required"));
            }
        }
         String filePath = null;
         User savedUser;
        try {


             savedUser = userRepo.save(user);

            if (role.equalsIgnoreCase("STUDENT")) {

                StudentVerification verification = new StudentVerification();

                verification.setCollegeName(collegeName);
                verification.setCollegeId(collegeId);
                verification.setStatus("PENDING");

                // Save actual file in private folder
                filePath = fileStorageService.saveFile(idCard);
                verification.setIdCardPath(filePath);

                verification.setUser(savedUser);

                studentVerificationRepository.save(verification);
            }
        } catch (Exception e) {
            if (filePath!=null){
                try {
                    fileStorageService.deleteFile(filePath);
                }catch(IOException ex){
                    e.addSuppressed(ex);
                }

            }
            throw new RuntimeException("Registration failed",e);
        }

       return ResponseEntity.status(201).body(Map.of(
               "message","User registered successfully",
               "userId",savedUser.getId(),
               "role",savedUser.getRole()
       ));
    }


    public ResponseEntity<?> loginUser(LoginRequest loginReq) {
        Optional<User> user = userRepo.findByEmail(loginReq.getEmail());
        if(user.isEmpty()){
            return ResponseEntity.status(404).body("Email not registered");

        }

        if(!user.get().getPassword().equals(loginReq.getPassword())){
            return ResponseEntity.status(401).body("Invalid password");
        }



        return ResponseEntity.ok(
                Map.of(
                        "message","login successfull",
                        "userId",user.get().getId(),
                        "role",user.get().getRole()

                )
        );
    }
}
