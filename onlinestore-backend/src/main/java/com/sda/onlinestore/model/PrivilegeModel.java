package com.sda.onlinestore.model;

import javax.persistence.*;
import java.util.List;

@Entity
public class PrivilegeModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private String name;

    @ManyToMany(fetch = FetchType.LAZY, mappedBy = "privilegeList" )
    private List<RoleModel> roleList;


    public List<RoleModel> getRoleList() {
        return roleList;
    }

    public void setRoleList(List<RoleModel> roleList) {
        this.roleList = roleList;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
