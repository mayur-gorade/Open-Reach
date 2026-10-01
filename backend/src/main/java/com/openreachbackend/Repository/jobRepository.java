package com.openreachbackend.Repository;

import com.openreachbackend.Model.JobPost;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface jobRepository extends JpaRepository<JobPost , Integer> {
    @Query("""
        SELECT j FROM JobPost j
        WHERE LOWER(j.title) LIKE LOWER(CONCAT('%', :keyword, '%'))
        OR LOWER(j.description) LIKE LOWER(CONCAT('%', :keyword, '%'))
        OR LOWER(j.skills) LIKE LOWER(CONCAT('%', :keyword, '%'))
    """)
    List<JobPost> searchJob(@Param("keyword") String keyword);


}
