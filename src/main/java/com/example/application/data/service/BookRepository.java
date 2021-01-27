package com.example.application.data.service;

import com.example.application.data.entity.Book;

import org.springframework.data.jpa.repository.JpaRepository;
import javax.persistence.Lob;
import java.time.LocalDate;
import javax.annotation.Nullable;

public interface BookRepository extends JpaRepository<Book, Integer> {

}