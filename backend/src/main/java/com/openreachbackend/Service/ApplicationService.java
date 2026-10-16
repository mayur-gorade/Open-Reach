package com.openreachbackend.Service;

import com.openreachbackend.Model.Application;
import com.openreachbackend.Model.StudentProfile;
import com.openreachbackend.Repository.ApplicationRepository;
import com.openreachbackend.Repository.StudentProfileRepository;
import com.openreachbackend.Repository.jobRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class ApplicationService {

    @Autowired
    private final ApplicationRepository ApplicationRepo;
    private final jobRepository jobRepo;
    private final StudentProfileRepository studentRepo;

    public  ApplicationService (ApplicationRepository ApplicationRepo,jobRepository jobRepo,
                                StudentProfileRepository studentRepo){
        this.ApplicationRepo = ApplicationRepo;
        this.jobRepo=jobRepo;
        this.studentRepo=studentRepo;
    }


    public Application applyForJob(Application application) {

          //checking whether the Job Exists
        if(!jobRepo.existsById(application.getJobId())){
            throw new  RuntimeException("Job not found");
        }

          //Check whether the student profile exists
        if(!studentRepo.existsById(application.getStudentId())){
            throw new RuntimeException("Student not found");
        }


        if (ApplicationRepo.existsByJobIdAndStudentId(
                application.getJobId(),
                application.getStudentId())) {

            throw new RuntimeException("You have already applied for this job");
        }


        application.setStatus("PENDING");
        application.setAppliedAt(LocalDateTime.now());
       return ApplicationRepo.save(application);
    }
}
