package com.example.studentlms.model;

import jakarta.persistence.*;

@Entity
public class Student {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String email;
    private String course;
    private Long uid; // ✅ fixed casing

    // Getters and setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getCourse() { return course; }
    public void setCourse(String course) { this.course = course; }

    public Long getUid() { return uid; }
    public void setUid(Long uid) { this.uid = uid; }

    // Constructors
    public Student() {}
    public Student(Long id, String name, String email, String course, Long uid) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.course = course;
        this.uid = uid;
    }

    @Override
    public String toString() {
        return "Student [id=" + id + ", name=" + name + ", email=" + email +
               ", course=" + course + ", uid=" + uid + "]";
    }
}
