package com.sda.onlinestore.persistence.dto;

import com.sda.onlinestore.persistence.model.AddressModel;

import java.util.Date;
import java.util.List;

public class OrderDTO {

    private Long id;
    private String userName;
    private Double total;
    private Date dateOfOrder;
    private String status;
    private List<OrderLineDTO> orderLines;
    private AddressDTO deliveryAddress;
    private AddressModel userAddress;

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

    public Date getDateOfOrder() {
        return dateOfOrder;
    }

    public void setDateOfOrder(Date dateOfOrder) {
        this.dateOfOrder = dateOfOrder;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public List<OrderLineDTO> getOrderLines() {
        return orderLines;
    }

    public void setOrderLines(List<OrderLineDTO> orderLines) {
        this.orderLines = orderLines;
    }

    public AddressDTO getDeliveryAddress() {
        return deliveryAddress;
    }

    public void setDeliveryAddress(AddressDTO deliveryAddress) {
        this.deliveryAddress = deliveryAddress;
    }

    public AddressModel getUserAddress() {
        return userAddress;
    }

    public void setUserAddress(AddressModel userAddress) {
        this.userAddress = userAddress;
    }
}
