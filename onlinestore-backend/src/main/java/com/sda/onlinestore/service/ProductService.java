package com.sda.onlinestore.service;

import com.sda.onlinestore.model.OrderModel;
import com.sda.onlinestore.model.ProductModel;
import com.sda.onlinestore.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    public void save(ProductModel productModel){
        productRepository.save(productModel);
    }

    public void deleteById(Long id){
        productRepository.deleteById(id);
    }

    public List<ProductModel> findAll(){
      return   productRepository.findAll();
    }

    public void update(ProductModel productModel){
        productRepository.save(productModel);
    }

    public ProductModel findById(Long id){
        return productRepository.findById(id).orElse(null);
    }


}
