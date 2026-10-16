package com.openreachbackend.Repository;

import com.openreachbackend.Model.Application;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ApplicationRepository extends JpaRepository<Application , Integer> {

    boolean existsByJobIdAndStudentId(
            int jobId, int studentId);
}
