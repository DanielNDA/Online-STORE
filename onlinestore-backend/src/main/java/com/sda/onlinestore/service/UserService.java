package com.sda.onlinestore.service;

import com.sda.onlinestore.persistence.dto.AddressDTO;
import com.sda.onlinestore.persistence.dto.UserDTO;
import com.sda.onlinestore.persistence.model.AddressModel;
import com.sda.onlinestore.persistence.model.UserModel;
import com.sda.onlinestore.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public void save(UserDTO userDTO) {
        UserModel userModel = new UserModel();
        AddressDTO addressDTO = userDTO.getAddressDTO();
        AddressModel addressModel = new AddressModel();

        if(addressDTO != null) {
            addressModel.setId(addressDTO.getId());
            addressModel.setCountry(addressDTO.getCountry());
            addressModel.setCity(addressDTO.getCity());
            addressModel.setStreet(addressDTO.getStreet());
            addressModel.setZipCode(addressDTO.getZipCode());
            userModel.setAddressModel(addressModel);
        }

        userModel.setChannel(userDTO.getChannel());
        userModel.setEmail(userDTO.getEmail());

        userRepository.save(userModel);
    }

    public void deleteById(Long id) {
        userRepository.deleteById(id);
    }

    public List<UserDTO> findAll() {
        List<UserModel> users = userRepository.findAll();
        List<UserDTO> usersDTO = new ArrayList<>();

        for(UserModel userModel : users) {
            UserDTO userDTO = new UserDTO();
            AddressDTO addressDTO = new AddressDTO();

            userDTO.setId(userModel.getId());
            userDTO.setEmail(userModel.getEmail());
            userDTO.setUrl(userModel.getUrl());
            userDTO.setChannel(userModel.getChannel());

            AddressModel addressModel = userModel.getAddressModel();

            if(addressModel != null) {
                addressDTO.setId(addressModel.getId());
                addressDTO.setCountry(addressModel.getCountry());
                addressDTO.setCity(addressModel.getCity());
                addressDTO.setStreet(addressModel.getStreet());
                addressDTO.setZipCode(addressModel.getZipCode());
            }
            userDTO.setAddressDTO(addressDTO);

            usersDTO.add(userDTO);
        }
        return usersDTO;
    }

    public void update(UserDTO userDTO) {
        Optional<UserModel> newUser = userRepository.findById(userDTO.getId());
        if(newUser.isPresent()) {
            UserModel userModel = newUser.get();
            userModel.setEmail(userDTO.getEmail());
            userModel.setUrl(userDTO.getUrl());
            userModel.setChannel(userDTO.getChannel());

            if(userDTO.getNewPassword() != null && !userDTO.getNewPassword().equals("")) {
                userModel.setNewPassword(userDTO.getNewPassword());
            }
            userRepository.save(userModel);
        }
    }

    public UserDTO findById(Long id) {
        Optional<UserModel> userModel = userRepository.findById(id);
        UserDTO userDTO = new UserDTO();

        if(userModel.isPresent()) {
            userDTO.setId(userModel.get().getId());
            userDTO.setEmail(userModel.get().getEmail());
            userDTO.setChannel(userModel.get().getChannel());

            AddressModel addressModel = userModel.get().getAddressModel();
            AddressDTO addressDTO = new AddressDTO();

            addressDTO.setId(addressModel.getId());
            addressDTO.setCountry(addressModel.getCountry());
            addressDTO.setCity(addressModel.getCity());
            addressDTO.setStreet(addressModel.getStreet());
            addressDTO.setZipCode(addressModel.getZipCode());

            userDTO.setAddressDTO(addressDTO);
        }
        return userDTO;
    }
}
