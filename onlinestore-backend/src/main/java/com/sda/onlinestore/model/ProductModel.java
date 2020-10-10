package com.sda.onlinestore.model;

import javax.persistence.*;

@Entity
public class ProductModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String description;

    private String thumbnail;

    private double price;

    @ManyToOne(fetch = FetchType.LAZY)
    private ManufacturerModel manufacturerModel;

    @OneToOne(mappedBy = "productModel")
    private OrderLineModel orderLine;

    @ManyToOne(fetch = FetchType.LAZY)
    private CategoryModel categoryModel;

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

    public ManufacturerModel getManufacturerModel() {
        return manufacturerModel;
    }

    public void setManufacturerModel(ManufacturerModel manufacturerModel) {
        this.manufacturerModel = manufacturerModel;
    }

    public OrderLineModel getOrderLine() {
        return orderLine;
    }

    public void setOrderLine(OrderLineModel orderLine) {
        this.orderLine = orderLine;
    }
}
