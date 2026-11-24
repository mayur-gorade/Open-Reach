package com.openreachbackend.Controller;

import com.openreachbackend.Model.Application;
import com.openreachbackend.Model.StudentProfile;
import com.openreachbackend.Model.User;
import com.openreachbackend.Repository.StudentProfileRepository;
import com.openreachbackend.Repository.userRepository;
import com.openreachbackend.Service.ApplicationService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@RestController
@RequestMapping("/application")
public class ApplicationController {
    private final ApplicationService Applicationservice;
    private final StudentProfileRepository studentProfileRepo;
    private final userRepository userRepo;


    public ApplicationController(ApplicationService Applicationservice, StudentProfileRepository studentProfileRepo, userRepository userRepo){
        this.Applicationservice= Applicationservice;

        this.studentProfileRepo = studentProfileRepo;
        this.userRepo = userRepo;
    }

    @PostMapping("/apply")
    public ResponseEntity<Application>applyForJob(@RequestBody Application application){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email=authentication.getName();

        User loggedInUser=userRepo.findByEmail(email).orElseThrow(()->new UsernameNotFoundException("user not Found"));
        int loggedInId=Math.toIntExact(loggedInUser.getId());

        StudentProfile studentProfile = studentProfileRepo.findByUserId(loggedInId)
                .orElseThrow(() ->
                        new IllegalStateException("Student profile not found"));

        application.setStudentId(studentProfile.getId());

        Application savedApplication = Applicationservice.applyForJob(application);

        return ResponseEntity.ok(savedApplication);
    }
}
