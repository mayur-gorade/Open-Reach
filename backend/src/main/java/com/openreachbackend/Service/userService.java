package com.openreachbackend.Service;

import com.openreachbackend.Model.LoginRequest;
import com.openreachbackend.Model.User;
import com.openreachbackend.Repository.userRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class userService {

   private final userRepository userRepo;

    public userService(userRepository userRepo) {
        this.userRepo = userRepo;
    }


    public  String registerUser(User user) {
        if(userRepo.existsByEmail(user.getEmail())){
            return "user already exist";
        }

        userRepo.save(user);
        return "User registered successfully";
    }


    public ResponseEntity<String> loginUser(LoginRequest loginReq) {
        Optional<User> user = userRepo.findByEmail(loginReq.getEmail());
        if(user.isEmpty()){
            return ResponseEntity.status(404).body("Email not registered");

        }

        if(!user.get().getPassword().equals(loginReq.getPassword())){
            return ResponseEntity.status(401).body("Invalid password");
        }
        return ResponseEntity.ok("Login successful");
    }
}
