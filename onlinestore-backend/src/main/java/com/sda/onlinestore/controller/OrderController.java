package com.sda.onlinestore.controller;

import com.sda.onlinestore.persistence.dto.OrderDTO;
import com.sda.onlinestore.persistence.model.UserModel;
import com.sda.onlinestore.repository.UserRepository;
import com.sda.onlinestore.service.OrderService;
import com.sda.onlinestore.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
public class OrderController {
    @Autowired
    private OrderService orderService;

    @PostMapping("/add-to-cart/{username}/{productID}")
    public void save(@PathVariable(name = "username") String username, @PathVariable(name = "productID") Long productID){
        orderService.addToCart(username, productID);
    }

    @GetMapping("/orders/{id}")
    public OrderDTO findById(@PathVariable(name = "id") Long id){
        return orderService.findById(id);
    }

    @GetMapping("/orders")
    public List<OrderDTO> findAll(){
        return orderService.findAll();
    }

    @DeleteMapping("/delete-order/{id}")
    public void deleteById(@PathVariable(name = "id") Long id){
        orderService.deleteById(id);
    }

    @PutMapping("/update-order/{username}/{orderLineID}/{quantity}")
    public void update(@PathVariable(name = "username") String username, @PathVariable(name = "orderLineID") Long orderLineID, @PathVariable(name = "quantity") int quantity){
        orderService.update(username, orderLineID, quantity);
    }

    @PutMapping("/update-order/{username}/{orderLineID}")
    public void update(@PathVariable(name = "username") String username, @PathVariable(name = "orderLineID") Long orderLineID){
        orderService.removeOrderLine(username, orderLineID);
    }

    @GetMapping("/orders/shopping-cart/{id}")
    public OrderDTO getOrderLines(@PathVariable(name = "id") Long id){
        OrderDTO orderDTO = orderService.findById(id);
        return orderDTO;
    }
}
