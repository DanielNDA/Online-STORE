package com.sda.onlinestore.persistence.repository;

import com.sda.onlinestore.persistence.model.CategoryModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CategoryRepository extends JpaRepository<CategoryModel, Long> {

    public List<CategoryModel> findAllByCategoryModelParentIsNull();
    public List<CategoryModel> findAllByCategoryModelParentIsNotNull();
}
