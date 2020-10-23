package com.sda.onlinestore.persistence.dto;

import java.util.ArrayList;
import java.util.List;

public class PrivilegeDTO {

    private Long id;

    private String name;

    private List<RoleDTO> roleDTOList = new ArrayList<>();

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<RoleDTO> getRoleDTOList() {
        return roleDTOList;
    }

    public void setRoleDTOList(List<RoleDTO> roleDTOList) {
        this.roleDTOList = roleDTOList;
    }
}
