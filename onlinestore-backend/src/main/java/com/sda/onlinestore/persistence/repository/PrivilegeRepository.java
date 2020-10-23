package com.sda.onlinestore.persistence.repository;

import com.sda.onlinestore.persistence.model.PrivilegeModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PrivilegeRepository extends JpaRepository<PrivilegeModel, Long> {

    @Query(nativeQuery = true,
            value = "SELECT * FROM privilege_model WHERE id NOT IN(SELECT privilege_list_id FROM role_model_privilege_list WHERE role_list_id= ?1)")
    Optional<List<PrivilegeModel>> getUnassignedPrivileges(long roleId);
}
