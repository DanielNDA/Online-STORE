package com.sda.onlinestore.controller;

import com.sda.onlinestore.dto.ProductDto;
import com.sda.onlinestore.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
public class ProductController {

    @Autowired
    private ProductService productService;

    @PostMapping("/addProducts")
    private void save(@RequestBody ProductDto productDto) {
        productService.addProduct(productDto);
    }

    @DeleteMapping("/deleteProducts/{id}")
    private void deleteById(@PathVariable(name = "id") Long id) {
        productService.deleteById(id);
    }

    @GetMapping("/products/{id}")
    private ProductDto findById(@PathVariable(name = "id") Long id) {
        return productService.getProductById(id);
    }

    @GetMapping("/products")
    private List<ProductDto> findAll() {
        return productService.getProducts();
    }

    @PutMapping("/products/{id}")
    public void update(@RequestBody ProductDto productDto) {
        productService.update(productDto);
    }
}
