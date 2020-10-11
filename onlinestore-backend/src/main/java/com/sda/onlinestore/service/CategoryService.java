package com.sda.onlinestore.service;

import com.sda.onlinestore.dto.CategoryDTO;
import com.sda.onlinestore.model.CategoryModel;
import com.sda.onlinestore.repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class CategoryService {

    @Autowired
    private CategoryRepository categoryRepository;

    public void save(CategoryDTO categoryDTO) {
        CategoryModel categoryModel = new CategoryModel();
        categoryModel.setId(categoryDTO.getId());
        categoryModel.setName(categoryDTO.getName());
        categoryRepository.save(categoryModel);
    }

    public List<CategoryDTO> getCategories() {
        List<CategoryModel> categories = categoryRepository.findAll();
        List<CategoryDTO> categoriesDTO = new ArrayList<>();

        for(CategoryModel categoryModel : categories) {
            CategoryDTO categoryDTO = new CategoryDTO();
            categoryDTO.setId(categoryModel.getId());
            categoryDTO.setName(categoryModel.getName());

            List<CategoryModel> subCategories = categoryModel.getSubCategories();
            List<CategoryDTO> subCategoriesDTO = new ArrayList<>();

            for(CategoryModel subCategory : subCategories) {
                CategoryDTO subCategoryDTO = new CategoryDTO();

                subCategoryDTO.setId(subCategory.getId());
                subCategoryDTO.setName(subCategory.getName());
                subCategoriesDTO.add(subCategoryDTO);
            }
            categoryDTO.setSubCategories(subCategoriesDTO);
            categoriesDTO.add(categoryDTO);
        }
        return categoriesDTO;
    }

    public void deleteById(Long id) {
        categoryRepository.deleteById(id);
    }

    public void update(CategoryModel categoryModel) {
        categoryRepository.save(categoryModel);
    }

    public CategoryModel findById(Long id) {
        return categoryRepository.findById(id).orElse(null);
    }
}
