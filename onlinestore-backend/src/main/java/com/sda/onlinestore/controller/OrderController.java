package com.sda.onlinestore.controller;

import com.sda.onlinestore.model.OrderLineModel;
import com.sda.onlinestore.model.OrderModel;
import com.sda.onlinestore.model.ProductModel;
import com.sda.onlinestore.service.OrderLineService;
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

    @Autowired
    private OrderLineService orderLineService;

    @Autowired
    private ProductService productService;

    @PostMapping("/orders")
    public void save(@RequestBody OrderModel order){
        orderService.save(order);
    }

    @GetMapping("/orders/{id}")
    public OrderModel findById(@PathVariable(name = "id") Long id){
        return orderService.findById(id);
    }

    @GetMapping("/orders")
    public List<OrderModel> findAll(){
        return orderService.findAll();
    }

    @DeleteMapping("/orders/{id}")
    public void deleteById(@PathVariable(name = "id") Long id){
        orderService.deleteById(id);
    }

    @PutMapping("/orders")
    public void update(@RequestBody OrderModel order){
        orderService.update(order);
    }

    @GetMapping("/orders/shopping-cart/{id}")
    public List<OrderLineModel> getOrderLines(@PathVariable(name = "id") Long id){
      OrderModel order = orderService.findById(id);
      List<OrderLineModel> orderLines = order.getOrderLines();
        return orderLines;
    }

    @PostMapping("/orders/shopping-cart/{id}")
    public OrderLineModel addProductToOrderLine(@PathVariable (name = "id") Long id, @RequestParam(name="quantity") Integer quantity){
        ProductModel productModel = productService.findById(id);
        OrderLineModel orderLine = new OrderLineModel();
        orderLine.setQuantity(quantity);
        orderLine.setProductModel(productModel);
        orderLine.setPrice(productModel.getPrice() * quantity);
        orderLineService.save(orderLine);
    return orderLine;
    }

    @DeleteMapping("/orders/shopping-cart/{id}")
    public void removeOrderLine(@PathVariable (name = "id") Long id){
        orderLineService.deleteById(id);

    }
}
