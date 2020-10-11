package com.sda.onlinestore.service;

import com.sda.onlinestore.dto.ProductDto;
import com.sda.onlinestore.model.ProductModel;
import com.sda.onlinestore.model.ProductType;
import com.sda.onlinestore.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
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
        productModel.setId(productDto.getId());
        productModel.setName(productDto.getName());
        productModel.setThumbnail(productDto.getThumbnail());
        productModel.setDescription(productDto.getDescription());
        productModel.setProductType(ProductType.valueOf(productDto.getProductType()));
        productModel.setPrice(productDto.getPrice());
        productRepository.save(productModel);
    }

    public List<ProductDto> getProducts(){
        List<ProductModel> productModelList = productRepository.findAll();
        List<ProductDto> productDtoList = new ArrayList<>();

        for(ProductModel productModel : productModelList){
            ProductDto productDto = new ProductDto();
            productDto.setId(productModel.getId());
            productDto.setName(productModel.getName());
            productDto.setThumbnail(productModel.getThumbnail());
            productDto.setDescription(productModel.getDescription());
            productDto.setPrice(productModel.getPrice());
            productDtoList.add(productDto);
        }
        return productDtoList;
    }

    public void deleteById(Long id){
        productRepository.deleteById(id);
    }


    public void update(ProductDto productDto){
        Optional<ProductModel> productModelOptional = productRepository.findById(productDto.getId());
        if(productModelOptional.isPresent()){
            ProductModel productModel = productModelOptional.get();
            productModel.setName(productDto.getName());
            productModel.setDescription(productDto.getDescription());
            productModel.setThumbnail(productDto.getThumbnail());
            productModel.setPrice(productDto.getPrice());
            productRepository.save(productModel);
        }
    }

}
