package com.sda.onlinestore.persistence.repository;

import com.sda.onlinestore.persistence.model.ImageModelUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ImageRepositoryUser extends JpaRepository<ImageModelUser, String> {
}
