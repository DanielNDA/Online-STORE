package com.sda.onlinestore.controller;

import com.sda.onlinestore.persistence.dto.ProductDTO;
import com.sda.onlinestore.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
public class ProductController {

    @Autowired
    private ProductService productService;

    @PostMapping("/products")
    public void save(@RequestBody ProductDTO productDto) {
        productService.addProduct(productDto);
    }

    @DeleteMapping("/deleteProducts/{id}")
    public void deleteById(@PathVariable(name = "id") Long id) {
        productService.deleteById(id);
    }

    @GetMapping("/products/{id}")
    public ProductDTO findById(@PathVariable(name = "id") Long id) {
        return productService.getProductById(id);
    }

    @GetMapping("/products")
    public List<ProductDTO> findAll() {
        return productService.getProducts();
    }

    @PutMapping("/products/{id}")
    public void update(@RequestBody ProductDTO productDto) {
        productService.update(productDto);
    }
}
