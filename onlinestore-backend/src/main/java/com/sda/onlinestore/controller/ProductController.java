package com.sda.onlinestore.controller;

import com.sda.onlinestore.persistence.dto.ProductDTO;
import com.sda.onlinestore.persistence.dto.file.ResponseFile;
import com.sda.onlinestore.persistence.dto.file.ResponseMessage;
import com.sda.onlinestore.persistence.model.ImageProductModel;
import com.sda.onlinestore.persistence.repository.ImageProductRepository;
import com.sda.onlinestore.service.ImageProductService;
import com.sda.onlinestore.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@CrossOrigin
public class ProductController {

    @Autowired
    private ProductService productService;

    @Autowired
    private ImageProductService imageService;

    @Autowired
    private ImageProductRepository imageRepository;


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

    @PutMapping("/products")
    public void update(@RequestBody ProductDTO productDto) {
        productService.update(productDto);
    }

    @GetMapping("/thumbnail/{id}")
    public ResponseEntity<List<ResponseFile>> getImage(@PathVariable(name = "id") Long id) {
        List<ResponseFile> files = imageService.getProductImage(id).map(dbFile -> {
            String fileDownloadUri = ServletUriComponentsBuilder
                    .fromCurrentContextPath()
                    .path("/img/")
                    .path(dbFile.getId())
                    .toUriString();
            return new ResponseFile(
                    dbFile.getName(),
                    fileDownloadUri,
                    dbFile.getType(),
                    dbFile.getData().length);
        }).collect(Collectors.toList());
        return ResponseEntity.status(HttpStatus.OK).body(files);
    }

    @GetMapping("/img/{id}")
    public ResponseEntity<byte[]> getFile(@PathVariable String id) {
        ImageProductModel image = imageService.getImage(id);
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + image.getName() + "\"")
                .body(image.getData());
    }


    @PostMapping("/img")
    public ResponseEntity<ResponseMessage> uploadFile(@RequestParam("img") MultipartFile image) {
        String message;
        try {
            imageService.save(image);
            message = "Uploaded the file successfully: " + image.getOriginalFilename();
            return ResponseEntity.status(HttpStatus.OK).body(new ResponseMessage(message));
        } catch (Exception e) {
            message = "Could not upload the file: " + image.getOriginalFilename() + "!";
            return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body(new ResponseMessage(message));
        }
    }
    @GetMapping("/products-by-category/{id}")
    public List<ProductDTO> findByCategory(@PathVariable(name = "id") Long id) {
        return productService.getProductsByCategory(id);
    }


}
