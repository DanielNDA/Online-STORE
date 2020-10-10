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

    @OneToMany(fetch = FetchType.LAZY)
    private ManufacturerModel manufacturerModel;

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
}
