package com.sda.onlinestore.persistence.model;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
public class RoleModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private String name;

    @ManyToMany(fetch = FetchType.LAZY)
    private List<PrivilegeModel> privilegeList = new ArrayList<>();

    @ManyToMany(fetch = FetchType.LAZY)
    private List<UserModel> userList;

    public List<PrivilegeModel> getPrivilegeList() {
        return privilegeList;
    }

    public void setPrivilegeList(List<PrivilegeModel> privilegeList) {
        this.privilegeList = privilegeList;
    }

    public List<UserModel> getUserList() {
        return userList;
    }

    public void setUserList(List<UserModel> userList) {
        this.userList = userList;
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

