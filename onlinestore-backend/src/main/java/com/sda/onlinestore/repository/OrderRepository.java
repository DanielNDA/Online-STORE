package com.sda.onlinestore.repository;

import com.sda.onlinestore.persistence.model.OrderModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface OrderRepository extends JpaRepository<OrderModel, Long> {
    public Optional<OrderModel> findOrderModelByUserNameAndStatus_Hold(String username);
    public Optional<OrderModel> findOrderModelByUserName(String username);
}
