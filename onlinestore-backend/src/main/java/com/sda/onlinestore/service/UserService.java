package com.sda.onlinestore.service;

import com.sda.onlinestore.model.UserModel;
import com.sda.onlinestore.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public void save(UserModel userModel) {
        userRepository.save(userModel);
    }

    public void deleteById(Long id) {
        userRepository.deleteById(id);
    }

    public List<UserModel> findAll() {
        return userRepository.findAll();
    }

    public void update(UserModel userModel) {
        UserModel userToBeUpdated = userRepository.findById(userModel.getId()).orElse(null);
        userToBeUpdated.setEmail(userModel.getEmail());
        userToBeUpdated.setAddressModel(userModel.getAddressModel());
        userRepository.save(userToBeUpdated);
    }

    public UserModel findById(Long id) {
        return userRepository.findById(id).orElse(null);
    }
}
