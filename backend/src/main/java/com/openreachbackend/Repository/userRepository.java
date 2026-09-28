package com.openreachbackend.Repository;
import com.openreachbackend.Model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface userRepository extends JpaRepository<User,Long>{


    boolean existsByEmail(String email);  //use for registration
    Optional<User> findByEmail(String email); //use for login
}
