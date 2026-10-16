package com.openreachbackend.Controller;

import com.openreachbackend.Model.StudentProfile;
import com.openreachbackend.Service.StudentProfileService;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/student-profiles")
@CrossOrigin
public class StudentProfileController {

    StudentProfileService studentProfileservice;
    public StudentProfileController (StudentProfileService studentProfileservice){
        this.studentProfileservice=studentProfileservice;
    }

     @GetMapping("/{userId}")
     public ResponseEntity<StudentProfile> getProfile(@PathVariable int userId){
         Optional<StudentProfile> profile =  studentProfileservice.getProfileByUser(userId);

         if(profile.isPresent()){
             return ResponseEntity.ok(profile.get());
         }

         return ResponseEntity.notFound().build();
     }


      @PostMapping
     public ResponseEntity<?> createProfile(@RequestBody StudentProfile studentProfile){

        try{
            StudentProfile savedProfile=studentProfileservice.createProfile(studentProfile);

            return ResponseEntity.status(201).body(savedProfile);
        }catch (IllegalStateException e){
            return ResponseEntity.status(409).body(e.getMessage());
        }

      }

    @PutMapping("/{userId}")
    public ResponseEntity<?> updateProfile(@RequestBody StudentProfile updatedProfile,@PathVariable int userId){
        try{
            StudentProfile savedProfile=studentProfileservice.updateProfile(updatedProfile,userId);
            return ResponseEntity.ok(savedProfile);
        }catch (IllegalStateException e){
            return ResponseEntity.notFound().build();
        }
    }
}
