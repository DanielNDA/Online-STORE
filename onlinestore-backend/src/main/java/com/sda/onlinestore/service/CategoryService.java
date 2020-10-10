package com.sda.onlinestore.service;

import com.sda.onlinestore.model.CategoryModel;
import com.sda.onlinestore.repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoryService {

    @Autowired
    private CategoryRepository categoryRepository;

    public void save(CategoryModel categoryModel) {
        categoryRepository.save(categoryModel);
    }

    public void deleteById(Long id) {
        categoryRepository.deleteById(id);
    }

    public List<CategoryModel> findAll() {
        return categoryRepository.findAll();
    }

    public void update(CategoryModel categoryModel) {
        categoryRepository.save(categoryModel);
    }
}
