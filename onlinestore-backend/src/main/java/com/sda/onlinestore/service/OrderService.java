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
        orderRepository.save(order);
    }
}
