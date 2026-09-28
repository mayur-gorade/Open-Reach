package com.openreachbackend.Controller;

import com.openreachbackend.Model.LoginRequest;
import com.openreachbackend.Model.User;
import com.openreachbackend.Service.userService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/users")
@CrossOrigin(origins = "http://localhost:5174")
public class userController {

    private final userService userservice;


    public userController(userService userservice) {
        this.userservice = userservice;
    }

    @PostMapping("/register")
    public String  registerUser(@RequestBody User user){
       return  userservice.registerUser(user);

    }

    @PostMapping("/login")
    public ResponseEntity<String> loginUser(@RequestBody LoginRequest loginReq){
        return userservice.loginUser(loginReq);

    }
}
