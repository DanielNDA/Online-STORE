package com.sda.onlinestore.persistence.repository;

import com.sda.onlinestore.persistence.model.ProductModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductRepository extends JpaRepository<ProductModel,Long> {
}
