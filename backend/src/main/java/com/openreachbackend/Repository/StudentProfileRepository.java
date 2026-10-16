package com.openreachbackend.Repository;

import com.openreachbackend.Model.StudentProfile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface StudentProfileRepository  extends JpaRepository<StudentProfile,Integer> {
    Optional<StudentProfile> findByUserId(int userId);
    boolean existsByUserId(int userId);
}
