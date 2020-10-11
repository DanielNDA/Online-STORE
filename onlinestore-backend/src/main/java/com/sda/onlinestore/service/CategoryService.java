package com.sda.onlinestore.service;

import com.sda.onlinestore.dto.CategoryDTO;
import com.sda.onlinestore.model.CategoryModel;
import com.sda.onlinestore.model.UserModel;
import com.sda.onlinestore.repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Locale;
import java.util.Optional;

@Service
public class CategoryService {

    @Autowired
    private CategoryRepository categoryRepository;

    public void save(CategoryDTO categoryDTO) {
        CategoryModel categoryModel = new CategoryModel();
        categoryModel.setName(categoryDTO.getName());

        CategoryDTO parent = categoryDTO.getParent();
        Optional<CategoryModel> parentCategoryModelOptional = categoryRepository.findById(parent.getId());
        if(parentCategoryModelOptional.isPresent()) {
            CategoryModel parentCategoryModel = parentCategoryModelOptional.get();
            categoryModel.setCategoryModelParent(parentCategoryModel);
        }
        categoryRepository.save(categoryModel);
    }

    public List<CategoryDTO> findAll() {
        List<CategoryModel> categories = categoryRepository.findAll();
        List<CategoryDTO> categoriesDTO = new ArrayList<>();

        for (CategoryModel categoryModel : categories) {
            CategoryDTO categoryDTO = new CategoryDTO();
            categoryDTO.setId(categoryModel.getId());
            categoryDTO.setName(categoryModel.getName());

            List<CategoryModel> subCategories = categoryModel.getSubCategories();
            List<CategoryDTO> subCategoriesDTO = new ArrayList<>();

            for (CategoryModel subCategory : subCategories) {
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

    public void update(CategoryDTO categoryDTO) {
        Optional<CategoryModel> newCategory = categoryRepository.findById(categoryDTO.getId());
        if(newCategory.isPresent()) {
            CategoryModel categoryModel = newCategory.get();
            categoryModel.setName(categoryDTO.getName());

            if()

            userRepository.save(userModel);
        }
    }

    public CategoryDTO findById(Long id) {
        CategoryModel categoryModel = categoryRepository.findById(id).orElse(null);
        CategoryDTO categoryDTO = new CategoryDTO();

        if (categoryModel != null) {
            categoryDTO.setId(categoryModel.getId());
            categoryDTO.setName(categoryModel.getName());

            List<CategoryModel> subCategories = categoryModel.getSubCategories();
            List<CategoryDTO> subCategoriesDTO = new ArrayList<>();

            for (CategoryModel subCategory : subCategories) {
                CategoryDTO subCategoryDTO = new CategoryDTO();

                subCategoryDTO.setId(subCategory.getId());
                subCategoryDTO.setName(subCategory.getName());
                subCategoriesDTO.add(subCategoryDTO);
            }
            categoryDTO.setSubCategories(subCategoriesDTO);
        }
        return categoryDTO;
    }
}
