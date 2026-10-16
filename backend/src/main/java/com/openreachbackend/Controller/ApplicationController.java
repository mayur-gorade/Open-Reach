package com.openreachbackend.Controller;

import com.openreachbackend.Model.Application;
import com.openreachbackend.Service.ApplicationService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/application")
public class ApplicationController {
    private final ApplicationService Applicationservice;

    public ApplicationController(ApplicationService Applicationservice){
        this.Applicationservice= Applicationservice;
    }

    @PostMapping("/apply")
    public ResponseEntity<Application>applyForJob(@RequestBody  Application appication){
        Application savedApplication = Applicationservice.applyForJob(appication);

        return ResponseEntity.ok(savedApplication);
    }
}
