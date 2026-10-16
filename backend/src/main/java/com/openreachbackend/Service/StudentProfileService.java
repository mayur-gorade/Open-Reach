package com.openreachbackend.Service;

import com.openreachbackend.Model.StudentProfile;
import com.openreachbackend.Repository.StudentProfileRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.Optional;

@Service
public class StudentProfileService {

    StudentProfileRepository studentProfileRepo;

    public StudentProfileService (StudentProfileRepository studentProfileRepo){
        this.studentProfileRepo=studentProfileRepo;
    }

    public Optional<StudentProfile> getProfileByUser(int userId) {
        return studentProfileRepo.findByUserId(userId);
    }

    public StudentProfile createProfile(StudentProfile profile){
        boolean exist=studentProfileRepo.existsByUserId(profile.getUserId());

        if(exist){
           throw new IllegalStateException("profile already exist");
        }

        return studentProfileRepo.save(profile);
    }

    public StudentProfile updateProfile(StudentProfile updatedProfile,int userId){
        StudentProfile existingProfile=studentProfileRepo.findByUserId(userId).orElseThrow(()-> new IllegalStateException("Profile not found"));

        existingProfile.setCollege(updatedProfile.getCollege());
        existingProfile.setCourse(updatedProfile.getCourse());
        existingProfile.setSkills(updatedProfile.getSkills());
        existingProfile.setExperience(updatedProfile.getExperience());
        existingProfile.setBio(updatedProfile.getBio());
        existingProfile.setGithub(updatedProfile.getGithub());
        existingProfile.setPortfolio(updatedProfile.getPortfolio());

        return studentProfileRepo.save(existingProfile);
    }
}

