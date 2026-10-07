package com.openreachbackend.Controller;

import com.openreachbackend.Model.JobPost;
import com.openreachbackend.Service.jobService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/jobs")
@CrossOrigin(origins = "http://localhost:5173")
public class jobController {

    @Autowired
    private jobService jobservice ;

    @GetMapping("/findjob")
    public List<JobPost> getAllJobs(){
        return jobservice.getAllJobs();
    }

    @GetMapping("/job/{id}")
    public ResponseEntity<JobPost> getJobById(@PathVariable("id") int jobId){
       JobPost job = jobservice.getJobById(jobId);
       if(job.getId()>0){
           return new ResponseEntity<>(job , HttpStatus.OK);
       }else {
           return new ResponseEntity<>(HttpStatus.NOT_FOUND);
       }
    }

    @GetMapping("/search")
    public ResponseEntity<List<JobPost>> searchJobs(@RequestParam String keyword){
        List<JobPost> job = jobservice.searchJob(keyword);
        if(!job.isEmpty()){
            return new ResponseEntity<>(job , HttpStatus.OK);
        }else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

    }


    @PostMapping("/addjob")
    public JobPost addJob(@RequestBody JobPost job){
        return jobservice.addJob(job);


    }

    @PutMapping("/job/{id}")
    public ResponseEntity<JobPost> updateJob(@PathVariable int id , @RequestBody JobPost updatejob){
        JobPost job= jobservice.updateJob(id,updatejob);
        if(job!=null){
            return new ResponseEntity<>(job, HttpStatus.OK);
        }else{
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);

        }
    }

    @DeleteMapping("/job/{id}")
    public ResponseEntity<Void> deleteJob(@PathVariable("id") int jobId) {

        boolean deleted = jobservice.deleteJob(jobId);

        if (deleted) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }


}
