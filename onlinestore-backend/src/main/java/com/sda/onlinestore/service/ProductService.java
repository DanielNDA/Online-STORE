package com.sda.onlinestore.service;


import com.sda.onlinestore.persistence.dto.CategoryDTO;
import com.sda.onlinestore.persistence.dto.ManufacturerDTO;
import com.sda.onlinestore.persistence.dto.ProductDTO;
import com.sda.onlinestore.persistence.model.*;
import com.sda.onlinestore.persistence.repository.CategoryRepository;
import com.sda.onlinestore.persistence.repository.ImageProductRepository;
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
    @Autowired
    private ImageProductService imageProductService;
    @Autowired
    private ImageProductRepository imageProductRepository;


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
        if (categoryDTO != null) {
            CategoryModel categoryModel = categoryRepository.findById(categoryDTO.getId()).orElse(null);
            productModel.setCategoryModel(categoryModel);
        }
        ManufacturerDTO manufacturerDto = productDto.getManufacturerDto();
        if (manufacturerDto != null) {
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

    public List<ProductDTO> getProductsByCategory(Long id) {
        List<ProductModel> productModelList = productRepository.findAllByCategoryModelId(id);
        List<ProductDTO> productDTOList = new ArrayList<>();

        for (ProductModel productModel : productModelList) {
            ProductDTO productDto = new ProductDTO();
            productDto.setId(productModel.getId());
            productDto.setName(productModel.getName());
            productDto.setThumbnail(productModel.getThumbnail());
            productDto.setDescription(productModel.getDescription());
            productDto.setPrice(productModel.getPrice());


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

            productDTOList.add(productDto);
        }
        return productDTOList;
    }

    public void deleteById(Long id) {
        ProductModel productModel = productRepository.findById(id).orElse(null);
        CategoryModel categoryModel = productModel.getCategoryModel();
        categoryModel.getProducts().removeIf(a->a.getId().equals(id));
        categoryRepository.save(categoryModel);

        productRepository.deleteById(id);
    }

}
