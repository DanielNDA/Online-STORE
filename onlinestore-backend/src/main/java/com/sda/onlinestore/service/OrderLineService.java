package com.sda.onlinestore.service;

import com.sda.onlinestore.model.OrderLineModel;
import com.sda.onlinestore.repository.OrderLineRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrderLineService {
    @Autowired
    private OrderLineRepository orderLineRepository;

    public void save(OrderLineModel orderLine){
        orderLineRepository.save(orderLine);
    }

    public void deleteById(Long id){
        orderLineRepository.deleteById(id);
    }

    public OrderLineModel findById(Long id){
        return orderLineRepository.findById(id).orElse(null);
    }

    public List<OrderLineModel> findAll(){
        return orderLineRepository.findAll();
    }

    public void update(OrderLineModel orderLine){
        orderLineRepository.save(orderLine);
    }
}
