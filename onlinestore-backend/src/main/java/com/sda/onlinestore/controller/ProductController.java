package com.sda.onlinestore.controller;

import com.sda.onlinestore.dto.ProductDto;
import com.sda.onlinestore.model.ProductModel;
import com.sda.onlinestore.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
public class ProductController {

<<<<<<< HEAD
    @Autowired
    private ProductService productService;

    @PostMapping("/products")
    private void save(@RequestBody ProductDto productDto){
        productService.addProduct(productDto);
    }

    @DeleteMapping("/products/{id}")
    private void deleteById(@PathVariable(name = "id") Long id){
        productService.deleteById(id);
    }
    @GetMapping("/products/{id}")
    private ProductDto findById(@PathVariable(name = "id") Long id){
        return productService.getProductById(id);
    }
    @GetMapping("/products")
    private List<ProductDto> findAll(){
        return productService.getProducts();
    }

    @PutMapping("/products/{id}")
    public void update(@RequestBody ProductDto productDto){
        productService.update(productDto);
    }
=======
//    @Autowired
//    private ProductService productService;
//
//    @PostMapping("/products")
//    private void save(@RequestBody ProductModel productmodel){
//        productService.save(productmodel);
//    }
//
//    @DeleteMapping("/products/{id}")
//    private void deleteById(@PathVariable(name = "id") Long id){
//        productService.deleteById(id);
//    }
//    @GetMapping("/products/{id}")
//    private ProductModel findById(@PathVariable(name = "id") Long id){
//        return productService.findById(id);
//    }
//    @GetMapping("/products")
//    private List<ProductModel> findAll(){
//        return productService.findAll();
//    }
//
//    @PutMapping("/products/{id}")
//    public void update(@RequestBody ProductModel productModel){
//        productService.update(productModel);
//    }
>>>>>>> 9bfa0857b99b54fbc5e090c141951e6c32608311
}
