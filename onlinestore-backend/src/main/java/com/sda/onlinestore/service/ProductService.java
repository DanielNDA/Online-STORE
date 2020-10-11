package com.sda.onlinestore.service;

import com.sda.onlinestore.dto.ProductDto;
import com.sda.onlinestore.model.ProductModel;
import com.sda.onlinestore.model.ProductType;
import com.sda.onlinestore.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    public ProductDto getProductById(Long id){
        Optional<ProductModel> productModelOptional = productRepository.findById(id);
        if(productModelOptional.isPresent()){
            ProductModel productModel = productModelOptional.get();
            ProductDto productDto = new ProductDto();
            productDto.setId(productModel.getId());
            productDto.setName(productModel.getName());
            productDto.setDescription(productModel.getDescription());
            productDto.setPrice(productModel.getPrice());
            return productDto;
        }
        return null;
    }

    public void addProduct(ProductDto productDto){
        ProductModel productModel = new ProductModel();
        productModel.setName(productDto.getName());
        productModel.setProductType(ProductType.valueOf(productDto.getProductType()));
        productModel.setId(productDto.getId());
        productModel.setPrice(productDto.getPrice());
        productModel.setThumbnail(productDto.getThumbnail());
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




}
