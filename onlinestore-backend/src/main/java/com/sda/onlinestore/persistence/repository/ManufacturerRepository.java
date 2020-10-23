package com.sda.onlinestore.persistence.repository;

import com.sda.onlinestore.persistence.model.ManufacturerModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ManufacturerRepository extends JpaRepository<ManufacturerModel,Long> {
}
