package com.openreachbackend.Controller;

import com.openreachbackend.Model.LoginRequest;
import com.openreachbackend.Model.User;
import com.openreachbackend.Service.JwtService;
import com.openreachbackend.Service.userService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequestMapping("/users")
@CrossOrigin(origins = "http://localhost:5173")
public class userController {


    private final userService userservice;


    public userController(userService userservice, JwtService jwtService) {
        this.userservice = userservice;
    }

    @PostMapping(value="/register",
            consumes = MediaType.MULTIPART_FORM_DATA_VALUE    )
    public ResponseEntity<?> registerUser(
            @RequestParam String name,
            @RequestParam String email,
            @RequestParam String password,
            @RequestParam String role,

            @RequestParam(required = false) String collegeName,
            @RequestParam(required = false) String collegeId,
            @RequestParam(required = false) MultipartFile idCard

    ) throws IOException {

       return  userservice.registerUser(
               name,
               email,
               password,
               role,
               collegeName,
               collegeId,
               idCard
       );

    }

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody LoginRequest loginReq){
        System.out.println("LOGIN CONTROLLER REACHED");
        return userservice.loginUser(loginReq);

    }
}
