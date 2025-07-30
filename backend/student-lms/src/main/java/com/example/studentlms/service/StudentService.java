<<<<<<< HEAD
package com.example.studentlms.service;

import com.example.studentlms.model.Student;
import com.example.studentlms.repository.StudentRepository;

import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class StudentService {

    private final StudentRepository repository;

    public StudentService(StudentRepository repository) {
        this.repository = repository;
    }

    public List<Student> getAll() {
        return repository.findAll();
    }

    public Student add(Student student) {
        return repository.save(student);
    }

    public Student update(Student student) {
        if (repository.existsById(student.getId())) {
            return repository.save(student);
        } else {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND,
                    "Student with ID " + student.getId() + " not found");
        }
    }

    public void delete(Long id) {
            repository.deleteById(id);
        }
    }
=======
package com.example.studentlms.service;

import com.example.studentlms.model.Student;
import com.example.studentlms.repository.StudentRepository;

import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class StudentService {

    private final StudentRepository repository;

    public StudentService(StudentRepository repository) {
        this.repository = repository;
    }

    public List<Student> getAll() {
        return repository.findAll();
    }

    public Student add(Student student) {
        return repository.save(student);
    }

    public Student update(Student student) {
        if (repository.existsById(student.getId())) {
            return repository.save(student);
        } else {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND,
                    "Student with ID " + student.getId() + " not found");
        }
    }

    public void delete(Long id) {
            repository.deleteById(id);
        }
    }
>>>>>>> 4db849a765839e431ad08a842dc99e01a0be34a1
