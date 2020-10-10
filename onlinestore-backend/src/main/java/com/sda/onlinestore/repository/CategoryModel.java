package com.sda.onlinestore.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CategoryModel extends JpaRepository<CategoryModel, Long> {
}
