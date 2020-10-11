package com.sda.onlinestore.dto;

import java.util.ArrayList;
import java.util.List;

public class CategoryDTO {

    private Long id;

    private String name;

    private List<CategoryDTO> subCategories = new ArrayList<>();

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<CategoryDTO> getSubCategories() {
        return subCategories;
    }

    public void setSubCategories(List<CategoryDTO> subCategories) {
        this.subCategories = subCategories;
    }
}
