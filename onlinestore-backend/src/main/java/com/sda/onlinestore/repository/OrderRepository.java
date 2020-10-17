package com.sda.onlinestore.repository;

import com.sda.onlinestore.persistence.model.OrderModel;
import com.sda.onlinestore.persistence.model.Status;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface OrderRepository extends JpaRepository<OrderModel, Long> {
    public Optional<OrderModel> findOrderModelByUserNameAndStatus(String username, Status status);
    public Optional<OrderModel> findOrderModelByUserName(String username);
}
