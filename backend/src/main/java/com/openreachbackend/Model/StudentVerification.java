package com.openreachbackend.Model;

import jakarta.persistence.*;

@Entity
@Table(name="student_verification")
public class StudentVerification {

    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private int id;

    private String collegeName;
    private String collegeId;
    private String idCardPath;
    private String status;

    @OneToOne
    @JoinColumn(name = "user_id" , unique = true)
    private User user ;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getCollegeName() {
        return collegeName;
    }

    public void setCollegeName(String collegeName) {
        this.collegeName = collegeName;
    }

    public String getCollegeId() {
        return collegeId;
    }

    public void setCollegeId(String collegeId) {
        this.collegeId = collegeId;
    }

    public String getIdCardPath() {
        return idCardPath;
    }

    public void setIdCardPath(String idCardPath) {
        this.idCardPath = idCardPath;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
