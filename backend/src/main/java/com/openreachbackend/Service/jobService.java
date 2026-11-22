package com.openreachbackend.Service;

import com.openreachbackend.Model.JobPost;
import com.openreachbackend.Model.User;
import com.openreachbackend.Repository.jobRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import com.openreachbackend.Repository.userRepository;
import org.springframework.security.core.userdetails.UsernameNotFoundException;


import java.util.List;

@Service
public class jobService {

    @Autowired
    private jobRepository jobRepo;

    @Autowired
    private userRepository userRepo;

    public JobPost addJob(JobPost job) {

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email=authentication.getName();

        User loggedInuser = userRepo.findByEmail(email).orElseThrow(()-> new UsernameNotFoundException("user not found"));

        job.setUser(loggedInuser);
        return jobRepo.save(job);
    }

    public List<JobPost> getAllJobs() {
        return jobRepo.findAll();
    }

    public  JobPost getJobById(int jobId) {
       JobPost job= jobRepo.findById(jobId).orElse(null);
       return job;
    }

    public List<JobPost> searchJob(String keyword) {
        return jobRepo.searchJob(keyword);
    }

    public JobPost updateJob(int id, JobPost updatedjob) {
        Authentication authentication =
                SecurityContextHolder.getContext().getAuthentication();

        String email = authentication.getName();

        //currently loggedIn user
        User loggedInUser = userRepo.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

         //existing job
        JobPost existingJob = jobRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Job not found"));

         //user associated with existing job
        User jobOwner = existingJob.getUser();

        if(!jobOwner.getId().equals(loggedInUser.getId())){
            throw new AccessDeniedException("You are not allowed to update this job");
        }

        existingJob.setTitle(updatedjob.getTitle());
        existingJob.setDescription(updatedjob.getDescription());
        existingJob.setSkills(updatedjob.getSkills());
        existingJob.setCategory(updatedjob.getCategory());
        existingJob.setJobType(updatedjob.getJobType());
        existingJob.setBudget(updatedjob.getBudget());

        return jobRepo.save(existingJob);
    }

    public boolean deleteJob(int jobId) {
        Authentication authentication =
                SecurityContextHolder.getContext().getAuthentication();

        String email = authentication.getName();

        //currently loggedIn user
        User loggedInUser = userRepo.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        //existing job
        JobPost existingJob = jobRepo.findById(jobId).orElseThrow(()->new RuntimeException("Job not found"));
        //user associated with existing job
        User jobOwner = existingJob.getUser();

        if(!jobOwner.getId().equals(loggedInUser.getId())){
            throw new AccessDeniedException("You are not allowed to delete this job");
        }

        jobRepo.delete(existingJob);
        return true;
    }
}
