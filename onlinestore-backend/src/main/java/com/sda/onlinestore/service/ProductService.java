package com.sda.onlinestore.service;


import com.sda.onlinestore.persistence.dto.CategoryDTO;
import com.sda.onlinestore.persistence.dto.ManufacturerDTO;
import com.sda.onlinestore.persistence.dto.ProductDTO;
import com.sda.onlinestore.persistence.model.CategoryModel;
import com.sda.onlinestore.persistence.model.ManufacturerModel;
import com.sda.onlinestore.persistence.model.ProductModel;
import com.sda.onlinestore.persistence.model.ProductType;
import com.sda.onlinestore.persistence.repository.CategoryRepository;
import com.sda.onlinestore.persistence.repository.ManufacturerRepository;
import com.sda.onlinestore.persistence.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;
    @Autowired
    private CategoryRepository categoryRepository;
    @Autowired
    private ManufacturerRepository manufacturerRepository;


    public ProductDTO getProductById(Long id) {
        Optional<ProductModel> productModelOptional = productRepository.findById(id);
        if (productModelOptional.isPresent()) {
            ProductModel productModel = productModelOptional.get();
            ProductDTO productDto = new ProductDTO();
            productDto.setId(productModel.getId());
            productDto.setName(productModel.getName());
            productDto.setDescription(productModel.getDescription());
            productDto.setPrice(productModel.getPrice());
            return productDto;
        }
        return null;
    }

    public void addProduct(ProductDTO productDto) {
        ProductModel productModel = new ProductModel();
        productModel.setId(productDto.getId());
        productModel.setName(productDto.getName());
        productModel.setDescription(productDto.getDescription());
        productModel.setProductType(ProductType.valueOf(productDto.getProductType()));
        productModel.setPrice(productDto.getPrice());
        CategoryDTO categoryDTO = productDto.getCategoryDTO();
        if(categoryDTO != null){
            CategoryModel categoryModel = categoryRepository.findById(categoryDTO.getId()).orElse(null);
            productModel.setCategoryModel(categoryModel);
        }
        ManufacturerDTO manufacturerDto = productDto.getManufacturerDto();
        if(manufacturerDto != null){
            ManufacturerModel manufacturerModel = manufacturerRepository.findById(manufacturerDto.getId()).orElse(null);
            productModel.setManufacturerModel(manufacturerModel);
        }
        productRepository.save(productModel);
    }

    public List<ProductDTO> getProducts() {
        List<ProductModel> productModelList = productRepository.findAll();
        List<ProductDTO> productDTOList = new ArrayList<>();

        for (ProductModel productModel : productModelList) {
            ProductDTO productDto = new ProductDTO();
            productDto.setId(productModel.getId());
            productDto.setName(productModel.getName());
            productDto.setThumbnail(productModel.getThumbnail());
            productDto.setDescription(productModel.getDescription());
            productDto.setPrice(productModel.getPrice());
            productDTOList.add(productDto);

            CategoryModel categoryModel = productModel.getCategoryModel();
            CategoryDTO categoryDTO = new CategoryDTO();
            categoryDTO.setName(categoryModel.getName());
            categoryDTO.setId(categoryModel.getId());

            ManufacturerModel manufacturerModel = productModel.getManufacturerModel();
            ManufacturerDTO manufacturerDTO = new ManufacturerDTO();
            manufacturerDTO.setName(manufacturerModel.getName());
            manufacturerDTO.setId(manufacturerModel.getId());

            productDto.setCategoryDTO(categoryDTO);
            productDto.setManufacturerDto(manufacturerDTO);
            productDto.setProductType(productModel.getProductType().name());
        }
        return productDTOList;
    }

    public void deleteById(Long id) {
        productRepository.deleteById(id);
    }


    public void update(ProductDTO productDto) {
        Optional<ProductModel> productModelOptional = productRepository.findById(productDto.getId());
        if (productModelOptional.isPresent()) {
            ProductModel productModel = productModelOptional.get();
            productModel.setName(productDto.getName());
            productModel.setDescription(productDto.getDescription());
            productModel.setThumbnail(productDto.getThumbnail());
            productModel.setPrice(productDto.getPrice());
            productRepository.save(productModel);
        }
    }

}
