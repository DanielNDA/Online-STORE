package com.sda.onlinestore.controller;

import com.sda.onlinestore.dto.UserDTO;
import com.sda.onlinestore.model.UserModel;
import com.sda.onlinestore.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/users")
    private void save(@RequestBody UserDTO userDTO) {
        userService.save(userDTO);
    }

    @DeleteMapping("/users/{id}")
    private void deleteById(@PathVariable(name = "id") Long id) {
        userService.deleteById(id);
    }

    @GetMapping("/users/{id}")
    private UserDTO findById(@PathVariable(name = "id") Long id) {
        return userService.findById(id);
    }

    @GetMapping("/users")
    private List<UserDTO> findAll() {
        return userService.findAll();
    }

    @PutMapping("/users/{id}")
    private void update(@RequestBody UserDTO userDTO) {
        userService.update(userDTO);
    }
}
