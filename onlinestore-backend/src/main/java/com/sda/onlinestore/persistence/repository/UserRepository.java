package com.sda.onlinestore.persistence.repository;

import com.sda.onlinestore.persistence.model.UserModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<UserModel, Long> {

    Optional<UserModel> findUserModelByEmail(String email);

    @Query(nativeQuery = true,
            value = "SELECT * FROM accounts WHERE id NOT IN(SELECT user_list_id FROM role_model_user_list WHERE role_list_id= ?1)")
    Optional<List<UserModel>> getUnassignedUsers(long roleId);
}
