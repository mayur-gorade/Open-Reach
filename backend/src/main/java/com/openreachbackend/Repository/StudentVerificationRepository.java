package com.openreachbackend.Repository;

import com.openreachbackend.Model.StudentProfile;
import com.openreachbackend.Model.StudentVerification;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StudentVerificationRepository extends JpaRepository<StudentVerification,Integer> {

}
