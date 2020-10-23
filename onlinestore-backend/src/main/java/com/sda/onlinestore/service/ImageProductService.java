package com.sda.onlinestore.service;

import com.sda.onlinestore.persistence.model.ImageProductModel;
import com.sda.onlinestore.persistence.model.ProductModel;
import com.sda.onlinestore.persistence.repository.ImageProductRepository;
import com.sda.onlinestore.persistence.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.TimeUnit;
import java.util.stream.Stream;

@Service
public class ImageProductService {

    @Autowired
    private ImageProductRepository imageRepository;

    @Autowired
    private ProductRepository productRepository;

    public ImageProductModel getImage(String id) {
        return imageRepository.findById(id).get();
    }


    public Stream<ImageProductModel> getProductImage(Long id) {
        ProductModel product = productRepository.findById(id).orElse(null);
        List<ImageProductModel> images = new ArrayList<>();
        images.add(product.getImage());
        return images.stream();
    }
    public ImageProductModel save(MultipartFile file) throws IOException, InterruptedException {
        String fileName = StringUtils.cleanPath(file.getOriginalFilename());
        ImageProductModel image = new ImageProductModel(fileName, file.getContentType(), file.getBytes());
        TimeUnit.SECONDS.sleep(3);
        List<ProductModel> products = productRepository.findAll();
        ProductModel product = products.get(products.size()-1);
        image.setProduct(product);
        return imageRepository.save(image);
    }



}
