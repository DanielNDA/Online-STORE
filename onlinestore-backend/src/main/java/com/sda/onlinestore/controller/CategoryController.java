package com.sda.onlinestore.controller;

import com.sda.onlinestore.model.CategoryModel;
import com.sda.onlinestore.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
public class CategoryController {

    @Autowired
    private CategoryService categoryService;

//    @PostMapping("/categories")
//    private void save(@RequestBody CategoryModel categoryModel) {
//        categoryService.save(categoryModel);
//    }

    @DeleteMapping("/categories/{id}")
    private void deleteById(@PathVariable(name = "id") Long id) {
        categoryService.deleteById(id);
    }

    @GetMapping("/categories/{id}")
    private CategoryModel findById(@PathVariable(name = "id") Long id) {
        return categoryService.findById(id);
    }

//    @GetMapping("/categories")
//    private List<CategoryModel> findAll() {
//        return categoryService.findAll();
//    }

    @PutMapping("/categories/{id}")
    private void update(@RequestBody CategoryModel categoryModel) {
        CategoryModel newCategory = categoryService.findById(categoryModel.getId());
        newCategory.setName(categoryModel.getName());
        categoryService.update(newCategory);
    }
}
