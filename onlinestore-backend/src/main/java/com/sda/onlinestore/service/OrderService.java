package com.sda.onlinestore.service;

import com.sda.onlinestore.persistence.dto.OrderDTO;
import com.sda.onlinestore.persistence.dto.OrderLineDTO;
import com.sda.onlinestore.persistence.dto.ProductDTO;
import com.sda.onlinestore.persistence.model.OrderLineModel;
import com.sda.onlinestore.persistence.model.OrderModel;
import com.sda.onlinestore.persistence.model.Status;
import com.sda.onlinestore.persistence.model.UserModel;
import com.sda.onlinestore.persistence.repository.OrderLineRepository;
import com.sda.onlinestore.persistence.repository.OrderRepository;
import com.sda.onlinestore.persistence.repository.ProductRepository;
import com.sda.onlinestore.persistence.repository.UserRepository;
import com.sda.onlinestore.persistence.dto.*;
import com.sda.onlinestore.persistence.model.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class OrderService {
    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private OrderLineRepository orderLineRepository;

    public void addToCart(String email, Long productID) {
        Optional<OrderModel> orderModelOptional = orderRepository.findOrderModelByUserNameAndStatus(email,Status.HOLD);
        UserModel userModel = userRepository.findUserModelByEmail(email).orElse(null);
        OrderModel order;

        boolean isAlreadyInBasket = false;
        if (orderModelOptional.isPresent()) {
            order = orderModelOptional.get();
            List<OrderLineModel> orderLineModels = order.getOrderLines();
            for (OrderLineModel olm : orderLineModels) {
                if (olm.getProductModel().getId() == productID) {
                    olm.setQuantity(olm.getQuantity() + 1);
                    olm.setPrice(olm.getQuantity() * olm.getProductModel().getPrice());
                    isAlreadyInBasket = true;
                }
            }
            if (!isAlreadyInBasket) {
                OrderLineModel orderLineModel = new OrderLineModel();
                orderLineModel.setQuantity(1);
                orderLineModel.setProductModel(productRepository.findById(productID).orElse(null));
                orderLineModel.setPrice(orderLineModel.getQuantity() * orderLineModel.getProductModel().getPrice());
                order.getOrderLines().add(orderLineModel);
                order.setTotal(totalPrice(order.getOrderLines()));
                orderRepository.save(order);
            }
            order.setDeliveryAddress(userModel.getAddressModel());
            order.setTotal(totalPrice(order.getOrderLines()));
            orderRepository.save(order);
        } else {
            order = new OrderModel();
            order.setStatus(Status.HOLD);
            order.setUserName(email);
            order.setCustomer(userModel);
            order.setDeliveryAddress(userModel.getAddressModel());
            order.setUserAddress(userModel.getAddressModel());
            OrderLineModel orderLineModel = new OrderLineModel();
            orderLineModel.setQuantity(1);
            orderLineModel.setProductModel(productRepository.findById(productID).orElse(null));
            orderLineModel.setPrice(orderLineModel.getQuantity() * orderLineModel.getProductModel().getPrice());
            order.getOrderLines().add(orderLineModel);
            order.setTotal(totalPrice(order.getOrderLines()));
            orderRepository.save(order);

        }

    }

    public void deleteById(Long id) {
        OrderModel order = orderRepository.findById(id).orElse(null);
        UserModel user = order.getCustomer();
        user.getOrders().removeIf(a -> a.getId().equals(id));
        userRepository.save(user);
        orderRepository.deleteById(id);
    }

    public OrderDTO findById(Long id) {
        Optional<OrderModel> order = orderRepository.findById(id);
        return convert(order.get());
}


    public List<OrderDTO> findAll(){
        List<OrderDTO> orderDTOS = new ArrayList<>();
        List<OrderModel> orderModels = orderRepository.findAll();
        for (OrderModel om: orderModels) {
            OrderDTO orderDTO = new OrderDTO();
            orderDTO.setId(om.getId());
            orderDTO.setTotal(om.getTotal());

            List<OrderLineDTO> orderLinesDTO = new ArrayList<>();

            for (OrderLineModel ol : om.getOrderLines()) {
                OrderLineDTO old = new OrderLineDTO();
                old.setId(ol.getId());
                old.setPrice(ol.getPrice());
                old.setQuantity(ol.getQuantity());

                ProductDTO productDto = new ProductDTO();
                ProductModel productModel = ol.getProductModel();

                productDto.setId(productModel.getId());
                productDto.setName(productModel.getName());
                productDto.setDescription(productModel.getDescription());
                productDto.setPrice(productModel.getPrice());
                productDto.setProductType(productModel.getProductType().name());

                CategoryDTO categoryDTO = new CategoryDTO();
                CategoryModel categoryModel = productModel.getCategoryModel();

                categoryDTO.setId(categoryModel.getId());
                categoryDTO.setName(categoryModel.getName());
                productDto.setCategoryDTO(categoryDTO);

                ManufacturerDTO manufacturerDTO = new ManufacturerDTO();
                ManufacturerModel manufacturerModel = productModel.getManufacturerModel();

                manufacturerDTO.setId(manufacturerModel.getId());
                manufacturerDTO.setName(manufacturerModel.getName());

                productDto.setManufacturerDto(manufacturerDTO);
                productDto.setCategoryDTO(categoryDTO);
                old.setProductDTO(productDto);
                orderLinesDTO.add(old);
            }
            AddressModel addressModel = om.getCustomer().getAddressModel();
            AddressDTO addressDTO = new AddressDTO();
            addressDTO.setId(addressModel.getId());
            addressDTO.setCity(addressModel.getCity());
            addressDTO.setStreet(addressModel.getStreet());
            addressDTO.setZipCode(addressModel.getZipCode());
            orderDTO.setDeliveryAddress(addressDTO);
            orderDTO.setOrderLines(orderLinesDTO);
            orderDTO.setStatus(om.getStatus().name());
            orderDTOS.add(orderDTO);
        }
        return orderDTOS;
    }

    public OrderDTO update(String username, Long orderLineID, int quantity){
        Optional<OrderModel> orderModelOptional = orderRepository.findOrderModelByUserNameAndStatus(username,Status.HOLD);
        if(orderModelOptional.isPresent()) {
            OrderModel order = orderModelOptional.get();

            for (OrderLineModel olm: order.getOrderLines()) {
                if(olm.getId().equals(orderLineID)){
                    if(quantity == 0){
                        order.getOrderLines().remove(olm);
                        break;
                    }
                    else {
                        olm.setQuantity(quantity);
                        olm.setPrice(olm.getQuantity() * olm.getProductModel().getPrice());
                        orderLineRepository.save(olm);
                    }
                }
            }
            order.setUserName(username);
            order.setTotal(totalPrice(order.getOrderLines()));
            orderRepository.save(order);

        }
        OrderDTO orderDTO = findByUsername(username);
        return orderDTO;
    }

    public Double totalPrice(List<OrderLineModel> orderLineModels){
        Double total = 0.0;
        for (OrderLineModel olm: orderLineModels) {
            total = total + olm.getProductModel().getPrice() * olm.getQuantity();
        }
        return total;
    }

    public void removeOrderLine(String username, Long orderLineID){
        update(username, orderLineID, 0);
    }

    public OrderDTO checkout(Long id) throws ParseException {
        Optional<OrderModel> order = orderRepository.findById(id);
        OrderDTO orderDTO = new OrderDTO();
        if (order.isPresent()) {
            order.get().setStatus(Status.DELIVERED);
            SimpleDateFormat formatter= new SimpleDateFormat("dd-MM-yyyy HH:mm");
            Date date = new Date(System.currentTimeMillis());
            String s = formatter.format(date);
            order.get().setDateOfOrder(new SimpleDateFormat("dd-MM-yyyy HH:mm").parse(s));
            orderRepository.save(order.get());

            orderDTO.setId(order.get().getId());
            orderDTO.setTotal(order.get().getTotal());

            List<OrderLineDTO> orderLinesDTO = new ArrayList<>();
            for (OrderLineModel ol : order.get().getOrderLines()) {
                OrderLineDTO old = new OrderLineDTO();
                old.setId(ol.getId());
                old.setPrice(ol.getPrice());
                old.setQuantity(ol.getQuantity());

                ProductDTO productDto = new ProductDTO();
                productDto.setId(ol.getProductModel().getId());
                productDto.setName(ol.getProductModel().getName());
                productDto.setPrice(ol.getProductModel().getPrice());
                old.setProductDTO(productDto);
                orderLinesDTO.add(old);
            }
            AddressModel addressModel = order.get().getCustomer().getAddressModel();
            AddressDTO addressDTO = new AddressDTO();
            addressDTO.setId(addressModel.getId());
            addressDTO.setCity(addressModel.getCity());
            addressDTO.setStreet(addressModel.getStreet());
            addressDTO.setZipCode(addressModel.getZipCode());
            orderDTO.setDeliveryAddress(addressDTO);
            orderDTO.setOrderLines(orderLinesDTO);
            orderDTO.setStatus(order.get().getStatus().name());
        }
        return orderDTO;
    }

    public OrderDTO findByUsername(String username) {
        Optional<OrderModel> order = orderRepository.findOrderModelByUserNameAndStatus(username,Status.HOLD);
        OrderDTO orderDTO = convert(order.get());
        orderDTO.setUserName(username);
            return orderDTO;
           }

    public OrderDTO convert(OrderModel order){
        OrderDTO orderDTO = new OrderDTO();
        orderDTO.setId(order.getId());
        orderDTO.setTotal(order.getTotal());
        List<OrderLineDTO> orderLinesDTO = new ArrayList<>();
        for (OrderLineModel ol : order.getOrderLines()) {
            OrderLineDTO old = new OrderLineDTO();
            old.setId(ol.getId());
            old.setPrice(ol.getPrice());
            old.setQuantity(ol.getQuantity());

            ProductDTO productDto = new ProductDTO();
            productDto.setId(ol.getProductModel().getId());
            productDto.setName(ol.getProductModel().getName());
            productDto.setPrice(ol.getProductModel().getPrice());

            old.setProductDTO(productDto);
            orderLinesDTO.add(old);
        }
        AddressModel addressModel = order.getCustomer().getAddressModel();
        AddressDTO addressDTO = new AddressDTO();
        addressDTO.setId(addressModel.getId());
        addressDTO.setCity(addressModel.getCity());
        addressDTO.setStreet(addressModel.getStreet());
        addressDTO.setZipCode(addressModel.getZipCode());
        orderDTO.setDeliveryAddress(addressDTO);
        orderDTO.setOrderLines(orderLinesDTO);
        orderDTO.setStatus(order.getStatus().name());

        return  orderDTO;
    }
}
