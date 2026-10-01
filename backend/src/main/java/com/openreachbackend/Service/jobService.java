package com.openreachbackend.Service;

import com.openreachbackend.Model.JobPost;
import com.openreachbackend.Repository.jobRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.List;

@Service
public class jobService {

    @Autowired
    private jobRepository jobRepo;

    public JobPost addJob(JobPost job) {
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
        JobPost exsitingJob = jobRepo.getById(id);

        exsitingJob.setTitle(updatedjob.getTitle());
        exsitingJob.setDescription(updatedjob.getDescription());exsitingJob.setSkills(updatedjob.getSkills());
        exsitingJob.setExperience(updatedjob.getExperience());
        exsitingJob.setCategory(updatedjob.getCategory());
        exsitingJob.setJobType(updatedjob.getJobType());
        exsitingJob.setBudget(updatedjob.getBudget());

        return jobRepo.save(exsitingJob);
    }

    public boolean deleteJob(int jobId) {
        if (jobRepo.existsById(jobId)) {
            jobRepo.deleteById(jobId);
            return true;
        }

        return false;
    }
}
