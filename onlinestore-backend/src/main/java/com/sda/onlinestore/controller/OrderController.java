package com.sda.onlinestore.controller;

import com.sda.onlinestore.persistence.dto.OrderDTO;
import com.sda.onlinestore.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;
import java.util.List;

@RestController
@CrossOrigin
public class OrderController {
    @Autowired
    private OrderService orderService;

    @GetMapping("/add-to-cart/{productID}")
    public void save(@PathVariable(name = "productID") Long productID) {
        String username = (String) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
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
    @GetMapping("/order-history")
    public List<OrderDTO> findAllByUsername() {
        String username = (String) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return orderService.findAllByUsername(username);
    }

    @DeleteMapping("/delete-order/{id}")
    public void deleteById(@PathVariable(name = "id") Long id) {
        orderService.deleteById(id);
    }

    @GetMapping("/update-order/{orderLineID}/{quantity}")
    public OrderDTO update(@PathVariable(name = "orderLineID") Long orderLineID, @PathVariable(name = "quantity") int quantity) {
        String username = (String) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return orderService.update(username, orderLineID, quantity);
    }

    @PutMapping("/update-order/{orderLineID}")
    public void removeOrderLine(@PathVariable(name = "orderLineID") Long orderLineID) {
        String username = (String) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        orderService.removeOrderLine(username, orderLineID);
    }

    @GetMapping("/checkout/{id}")
    public OrderDTO checkout(@PathVariable(name = "id") Long id) throws ParseException {
        return orderService.checkout(id);
    }

}
