package com.openreachbackend.Service;

import com.openreachbackend.Model.LoginRequest;
import com.openreachbackend.Model.StudentVerification;
import com.openreachbackend.Model.User;
import com.openreachbackend.Repository.StudentVerificationRepository;
import com.openreachbackend.Repository.userRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Map;
import java.util.Optional;



@Service
public class userService {
    private final PasswordEncoder passwordEncoder;
   private final userRepository userRepo;
   private final StudentVerificationRepository studentVerificationRepository;
   private final FileStorageService fileStorageService;
   private final AuthenticationManager authenticationManager;
   private final JwtService jwtService;

    public userService(PasswordEncoder passwordEncoder, userRepository userRepo, StudentVerificationRepository studentVerificationRepository, FileStorageService fileStorageService, AuthenticationManager authenticationManager, JwtService jwtService, JwtService jwtService1) {
        this.passwordEncoder = passwordEncoder;
        this.userRepo = userRepo;
        this.studentVerificationRepository = studentVerificationRepository;
        this.fileStorageService = fileStorageService;
        this.authenticationManager = authenticationManager;

        this.jwtService = jwtService;
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


        // Check whether the role is valid
        if (!role.equalsIgnoreCase("STUDENT") &&
                !role.equalsIgnoreCase("CLIENT")) {

            return ResponseEntity.badRequest()
                    .body(Map.of("message", "Invalid role"));
        }


        //Creating the object user
        User user = new User();
        user.setName(name);
        user.setEmail(email);
        user.setPassword(passwordEncoder.encode(password));
        user.setRole(role);



        if(userRepo.existsByEmail(user.getEmail())){
           return ResponseEntity.status(409).body(Map.of("message","User already exists"));
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

    @Transactional
    public ResponseEntity<?> loginUser(LoginRequest loginReq) {
        Optional<User> user = userRepo.findByEmail(loginReq.getEmail());

        if(user.isEmpty()){
            return  ResponseEntity.status(404).body(Map.of("message","Email not registered"));
        }

        try{
            //Create authentication request
            Authentication authenticationRequest =
                    new UsernamePasswordAuthenticationToken(
                           loginReq.getEmail(),
                            loginReq.getPassword()
            );

            //Ask Spring Security to authenticate the user
            Authentication authentication =
                     authenticationManager.authenticate(authenticationRequest);

            //Authentication succeeded
            // Fetch our application User to get its database ID and role.
            User existingUser = user.get();

            //generating token after authentication is successful
           String token =jwtService.generateToken(
                    existingUser.getEmail(),
                    existingUser.getId(),
                    existingUser.getRole()
            );


            //Return login response
            return ResponseEntity.ok(
                    Map.of(
                            "message", "Login successful",
                            "userId", existingUser.getId(),
                            "role", existingUser.getRole(),
                            "token",token
                    )
            );
        }catch (AuthenticationException e) {

             //Email exists but password is incorrect

            return ResponseEntity.status(401).body(Map.of("message","Incorrect password"));

        }
    }

//
}
