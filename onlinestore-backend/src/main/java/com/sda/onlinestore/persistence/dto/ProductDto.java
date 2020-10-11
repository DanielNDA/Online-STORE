package com.sda.onlinestore.persistence.dto;


public class ProductDTO {

    private Long id;
    private String name;
    private String description;
    private String thumbnail;
    private double price;
    private String productType;
    private ManufacturerDTO manufacturerDto;
    private CategoryDTO categoryDTO;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getThumbnail() {
        return thumbnail;
    }

    public void setThumbnail(String thumbnail) {
        this.thumbnail = thumbnail;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public String getProductType() {
        return productType;
    }

    public void setProductType(String productType) {
        this.productType = productType;
    }

    public ManufacturerDTO getManufacturerDto() {
        return manufacturerDto;
    }

    public void setManufacturerDto(ManufacturerDTO manufacturerDto) {
        this.manufacturerDto = manufacturerDto;
    }

    public CategoryDTO getCategoryDTO() {
        return categoryDTO;
    }

    public void setCategoryDTO(CategoryDTO categoryDTO) {
        this.categoryDTO = categoryDTO;
    }
}
