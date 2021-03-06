package com.sda.onlinestore.persistence.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "categories")
public class CategoryModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JsonIgnoreProperties("subCategories")
    private CategoryModel categoryModelParent;

    @OneToMany(fetch = FetchType.EAGER, mappedBy = "categoryModelParent", orphanRemoval = true)
    @JsonIgnoreProperties("categoryModelParent")
    private List<CategoryModel> subCategories = new ArrayList<>();

    @OneToMany(fetch = FetchType.EAGER, mappedBy = "categoryModel")
    private List<ProductModel> products = new ArrayList<>();

    public List<ProductModel> getProducts() {
        return products;
    }

    public void setProducts(List<ProductModel> products) {
        this.products = products;
    }

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

    public CategoryModel getCategoryModelParent() {
        return categoryModelParent;
    }

    public void setCategoryModelParent(CategoryModel categoryModelParent) {
        this.categoryModelParent = categoryModelParent;
    }

    public List<CategoryModel> getSubCategories() {
        return subCategories;
    }

    public void setSubCategories(List<CategoryModel> subCategories) {
        this.subCategories = subCategories;
    }
}
