package com.sda.onlinestore.persistence.dto;

public class OrderLineDTO {
    private Long id;
    private Integer quantity;
    private Double price;
    private ProductDto productDTO;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public ProductDto getProductDTO() {
        return productDTO;
    }

    public void setProductDTO(ProductDto productDTO) {
        this.productDTO = productDTO;
    }
}
