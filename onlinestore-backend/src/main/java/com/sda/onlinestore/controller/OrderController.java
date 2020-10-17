package com.sda.onlinestore.controller;

import com.sda.onlinestore.persistence.dto.OrderDTO;
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
    private ProductService productService;

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

    @DeleteMapping("/orders/{id}")
    public void deleteById(@PathVariable(name = "id") Long id){
        orderService.deleteById(id);
    }

    @PutMapping("/orders")
    public void update(@RequestBody OrderDTO orderDTO){
        orderService.update(orderDTO);
    }

    @GetMapping("/orders/shopping-cart/{id}")
    public OrderDTO getOrderLines(@PathVariable(name = "id") Long id){
        OrderDTO orderDTO = orderService.findById(id);
        return orderDTO;
    }

//    @PostMapping("/orders/shopping-cart/{id}")
//    public OrderLineModel addProductToOrderLine(@PathVariable (name = "id") Long id, @RequestParam(name="quantity") Integer quantity){
//        ProductModel productModel = productService.findById(id);
//        OrderLineModel orderLine = new OrderLineModel();
//        orderLine.setQuantity(quantity);
//        orderLine.setProductModel(productModel);
//        orderLine.setPrice(productModel.getPrice() * quantity);
//    return orderLine;
//    }

//    @DeleteMapping("/orders/shopping-cart/{id}")
//    public void removeOrderLine(@PathVariable (name = "id") Long id){
//        orderLineService.deleteById(id);
//
//    }
}
