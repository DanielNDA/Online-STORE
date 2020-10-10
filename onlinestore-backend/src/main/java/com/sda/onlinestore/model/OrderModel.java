package com.sda.onlinestore.model;

import javax.persistence.*;
import java.util.Date;
import java.util.List;

@Entity
public class OrderModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String userName;

    private Double total;

    private String deliveryAddress;

    private String userAddress;

    private Date dateOfOrder;

    @OneToMany(fetch = FetchType.EAGER, mappedBy = "orderModel")
    private List<OrderLineModel> orderLines;

    @OneToOne(cascade = CascadeType.ALL)
    private UserModel customer;

    @Enumerated(EnumType.STRING)
    private Status status;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public Double getTotal() {
        return total;
    }

    public void setTotal(Double total) {
        this.total = total;
    }

    public String getDeliveryAddress() {
        return deliveryAddress;
    }

    public void setDeliveryAddress(String deliveryAddress) {
        this.deliveryAddress = deliveryAddress;
    }

    public Date getDateOfOrder() {
        return dateOfOrder;
    }

    public void setDateOfOrder(Date dateOfOrder) {
        this.dateOfOrder = dateOfOrder;
    }

    public Status getStatus() {
        return status;
    }

    public void setStatus(Status status) {
        this.status = status;
    }

    public String getUserAddress() {
        return userAddress;
    }

    public void setUserAddress(String userAddress) {
        this.userAddress = userAddress;
    }

    public List<OrderLineModel> getOrderLines() {
        return orderLines;
    }

    public void setOrderLines(List<OrderLineModel> orderLines) {
        this.orderLines = orderLines;
    }

    public UserModel getCustomer() {
        return customer;
    }

    public void setCustomer(UserModel customer) {
        this.customer = customer;
    }
}
