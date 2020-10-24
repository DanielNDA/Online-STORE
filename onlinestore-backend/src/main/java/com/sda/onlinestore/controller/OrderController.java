package com.sda.onlinestore.controller;

import com.sda.onlinestore.persistence.dto.OrderDTO;
import com.sda.onlinestore.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
public class OrderController {
    @Autowired
    private OrderService orderService;

    @GetMapping("/add-to-cart/{username}/{productID}")
    public void save(@PathVariable(name = "username") String username,@PathVariable(name = "productID") Long productID) {
        //User user = (User)SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        orderService.addToCart(username, productID);
    }

    @GetMapping("/orders/{id}")
    public OrderDTO findById(@PathVariable(name = "id") Long id) {
        return orderService.findById(id);
    }

    @GetMapping("/orders")
    public List<OrderDTO> findAll() {
        return orderService.findAll();
    }

    @DeleteMapping("/delete-order/{id}")
    public void deleteById(@PathVariable(name = "id") Long id) {
        orderService.deleteById(id);
    }

    @GetMapping("/update-order/{username}/{orderLineID}/{quantity}")
    public void update(@PathVariable(name = "username") String username, @PathVariable(name = "orderLineID") Long orderLineID, @PathVariable(name = "quantity") int quantity) {
        orderService.update(username, orderLineID, quantity);
    }

    @PutMapping("/update-order/{username}/{orderLineID}")
    public void removeOrderLine(@PathVariable(name = "username") String username, @PathVariable(name = "orderLineID") Long orderLineID) {
        orderService.removeOrderLine(username, orderLineID);
    }

    @GetMapping("/checkout/{id}")
    public OrderDTO checkout(@PathVariable(name = "id") Long id) {
        return orderService.checkout(id);
    }

    @GetMapping("/orders/shopping-cart/{email}")
    public OrderDTO getOrderLines(@PathVariable(name = "email") String email) {
        OrderDTO orderDTO = orderService.findByUsername(email);
        return orderDTO;
    }
}
