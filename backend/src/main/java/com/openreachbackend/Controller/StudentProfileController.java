package com.openreachbackend.Controller;

import com.openreachbackend.Model.StudentProfile;
import com.openreachbackend.Model.User;
import com.openreachbackend.Repository.userRepository;
import com.openreachbackend.Service.StudentProfileService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/student-profiles")
@CrossOrigin
public class StudentProfileController {
    StudentProfileService studentProfileservice;
    userRepository useRepo;

    public StudentProfileController (StudentProfileService studentProfileservice,userRepository useRepo){
        this.studentProfileservice=studentProfileservice;
        this.useRepo=useRepo;
    }

     @GetMapping("/me")
     public ResponseEntity<StudentProfile> getProfile(){
         Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
         String email=authentication.getName();

         User logedInuser = useRepo.findByEmail(email).orElseThrow(()->new UsernameNotFoundException("User not found"));
         int userId = Math.toIntExact(logedInuser.getId());

         Optional<StudentProfile> profile =  studentProfileservice.getProfileByUserId(userId);

         if(profile.isPresent()){
             return ResponseEntity.ok(profile.get());
         }

         return ResponseEntity.notFound().build();
     }


      @PostMapping
     public ResponseEntity<?> createProfile(@RequestBody StudentProfile studentProfile){
          Authentication authentication =
                  SecurityContextHolder.getContext().getAuthentication();

          String email = authentication.getName();

          User loggedInUser = useRepo.findByEmail(email)
                  .orElseThrow(() ->
                          new UsernameNotFoundException("User not found"));
          studentProfile.setUserId(Math.toIntExact(loggedInUser.getId()));

        try{
            StudentProfile savedProfile=
                    studentProfileservice.createProfile(studentProfile);

            return ResponseEntity.status(201).body(savedProfile);
        }catch (IllegalStateException e){
            return ResponseEntity.status(409).body(e.getMessage());
        }

      }

    @PutMapping("/me")
    public ResponseEntity<?> updateProfile(@RequestBody StudentProfile updatedProfile){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email=authentication.getName();

        User logedInuser = useRepo.findByEmail(email).orElseThrow(()->new UsernameNotFoundException("User not found"));
        int userId = Math.toIntExact(logedInuser.getId());

        try{
            StudentProfile savedProfile=studentProfileservice.updateProfile(updatedProfile,userId);
            return ResponseEntity.ok(savedProfile);
        }catch (IllegalStateException e){
            return ResponseEntity.notFound().build();
        }
    }
}
