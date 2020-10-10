package com.sda.onlinestore.service;

import com.sda.onlinestore.model.OrderModel;
import com.sda.onlinestore.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrderService {
    @Autowired
    private OrderRepository orderRepository;

    public void save(OrderModel order){
        orderRepository.save(order);
    }

    public void deleteById(Long id){
        orderRepository.deleteById(id);
    }

    public OrderModel findById(Long id){
        return orderRepository.findById(id).orElse(null);
    }

    public List<OrderModel> findAll(){
        return orderRepository.findAll();
    }

    public void update(OrderModel order){
        OrderModel orderToBeUpdated = orderRepository.findById(order.getId()).orElse(null);
        orderToBeUpdated.setCustomer(order.getCustomer());
        orderToBeUpdated.setDateOfOrder(order.getDateOfOrder());
        orderToBeUpdated.setUserName(order.getUserName());
        orderToBeUpdated.setUserAddress(order.getUserAddress());
        orderToBeUpdated.setStatus(order.getStatus());
        orderToBeUpdated.setOrderLines(order.getOrderLines());
        orderToBeUpdated.setTotal(order.getTotal());
        orderToBeUpdated.setDeliveryAddress(order.getDeliveryAddress());
        orderRepository.save(orderToBeUpdated);
    }
}
