package com.sda.onlinestore.controller;

import com.sda.onlinestore.persistence.model.PrivilegeModel;
import com.sda.onlinestore.persistence.model.RoleModel;
import com.sda.onlinestore.persistence.model.UserModel;
import com.sda.onlinestore.persistence.repository.PrivilegeRepository;
import com.sda.onlinestore.persistence.repository.RoleRepository;
import com.sda.onlinestore.persistence.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@CrossOrigin
public class SecurityController {

    @Autowired
    private PrivilegeRepository privilegeRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private UserRepository userRepository;

//    @GetMapping("/role")
//    public List<RoleModel> getRoles() {
//        return roleRepository.findAll();
//    }
//
//    @PostMapping("/role")
//    public void addRole(@RequestBody RoleModel role) {
//        roleRepository.save(role);
//    }
//
//    @DeleteMapping("/role/{id}")
//    public void deleteRole(@PathVariable(name = "id") Long roleId){
//        roleRepository.deleteById(roleId);
//    }
//
//    @GetMapping("/role/{id}")
//    public RoleModel getRole(@PathVariable(name = "id") Long roleId){
//        RoleModel role=roleRepository.findById(roleId).orElse(null);
//        role.getPrivilegeList().size();
//        role.getUserList().size();
//        return role;
//    }
//
//    @PutMapping("/role")
//    public void updateRole(@RequestBody RoleModel role){
//        roleRepository.save(role);
//    }
//
//    @PostMapping("/role/assign-privileges/{id}")
//    public void assignPrivilegesToRole(@PathVariable(name = "id") Long roleId, @RequestBody List<PrivilegeModel> privilegeList) {
//        RoleModel role= roleRepository.findById(roleId).orElse(null);
//        role.getPrivilegeList().addAll(privilegeList);
//        roleRepository.save(role);
//    }
//
//    @PostMapping("/role/un-assign-privileges/{id}")
//    public void unAssignPrivilegesFromRole(@PathVariable(name = "id") Long roleId, @RequestBody List<PrivilegeModel> privilegeList) {
//        RoleModel role= roleRepository.findById(roleId).orElse(null);
//        role.getPrivilegeList().removeIf(a -> privilegeList.stream().filter(b -> b.getId() == a.getId()).collect(Collectors.toList()).size() > 0);
//        roleRepository.save(role);
//    }
//
//    @GetMapping("/role/un-assigned-privileges/{id}")
//    public List<PrivilegeModel> getUnassignedPrivileges(@PathVariable(name = "id") Long roleId){
//        return privilegeRepository.getUnassignedPrivileges(roleId).orElse(null);
//    }
//
//    @PostMapping("/role/assign-users/{id}")
//    public void assignUsersToRole(@PathVariable(name = "id") Long roleId, @RequestBody List<UserModel> userList) {
//        RoleModel role= roleRepository.findById(roleId).orElse(null);
//        role.getUserList().addAll(userList);
//        roleRepository.save(role);
//    }
//
//    @PostMapping("/role/un-assign-users/{id}")
//    public void unAssignUsersFromRole(@PathVariable(name = "id") Long roleId, @RequestBody List<UserModel> userList) {
//        RoleModel role= roleRepository.findById(roleId).orElse(null);
//        role.getUserList().removeIf(a->userList.stream().filter(b-> b.getId().equals(a.getId())).collect(Collectors.toList()).size()>0);
//        roleRepository.save(role);
//    }
//
//    @GetMapping("/role/un-assigned-users/{id}")
//    public List<UserModel> getUnassignedUsers(@PathVariable(name = "id") Long roleId){
//        return userRepository.getUnassignedUsers(roleId).orElse(null);
//    }
//
//    @GetMapping("/privilege")
//    public List<PrivilegeModel> getPrivileges() {
//        return privilegeRepository.findAll();
//    }
//
//    @PostMapping("/privilege")
//    public void addPrivilege(@RequestBody PrivilegeModel privilege) {
//        privilegeRepository.save(privilege);
//    }
//
//    @DeleteMapping("/privilege/{id}")
//    public void deletePrivilege(@PathVariable(name = "id") Long privilegeId){
//        privilegeRepository.deleteById(privilegeId);
//    }
//
//    @GetMapping("/privilege/{id}")
//    public PrivilegeModel getPrivilege(@PathVariable(name = "id") Long privilegeId){
//        return privilegeRepository.findById(privilegeId).orElse(null);
//    }
//
//    @PutMapping("/privilege")
//    public void updatePrivilege(@RequestBody PrivilegeModel privilege){
//        privilegeRepository.save(privilege);
//    }
}
