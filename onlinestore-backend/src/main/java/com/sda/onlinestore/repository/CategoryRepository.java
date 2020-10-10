package com.sda.onlinestore.repository;

<<<<<<< HEAD
import com.sda.onlinestore.model.CategoryModel;
=======
>>>>>>> bf8d64197561932d8186b756200fd068f1b79931
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
<<<<<<< HEAD
public interface CategoryRepository extends JpaRepository<CategoryModel, Long> {
=======
public interface CategoryRepository extends JpaRepository<CategoryRepository, Long> {
>>>>>>> bf8d64197561932d8186b756200fd068f1b79931
}
