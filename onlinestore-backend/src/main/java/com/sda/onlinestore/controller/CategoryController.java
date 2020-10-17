package com.sda.onlinestore.controller;

import com.sda.onlinestore.persistence.dto.CategoryDTO;
import com.sda.onlinestore.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
public class CategoryController {

    @Autowired
    private CategoryService categoryService;

    @PostMapping("/categories")
    public  void save(@RequestBody CategoryDTO categoryDTO) {
        categoryService.save(categoryDTO);
    }

    @DeleteMapping("/categories/{id}")
    public void deleteById(@PathVariable(name = "id") Long id) {
        categoryService.deleteById(id);
    }

    @GetMapping("/categories/{id}")
    public CategoryDTO findById(@PathVariable(name = "id") Long id) {
        return categoryService.findById(id);
    }

    @GetMapping("/categories")
    public List<CategoryDTO> findAll() {
        return categoryService.findAll();
    }

    @GetMapping("/categories-by-parent")
    public List<CategoryDTO> findAllByParentNull() {
        return categoryService.findAllByParentNull();
    }

    @PutMapping("/categories/{id}")
    public void update(@RequestBody CategoryDTO categoryDTO) {
        categoryService.update(categoryDTO);
    }
}
