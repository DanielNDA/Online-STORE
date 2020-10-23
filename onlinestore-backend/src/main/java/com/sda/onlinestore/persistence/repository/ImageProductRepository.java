package com.sda.onlinestore.persistence.repository;

import com.sda.onlinestore.persistence.model.ImageProductModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ImageProductRepository extends JpaRepository<ImageProductModel,String> {
}
