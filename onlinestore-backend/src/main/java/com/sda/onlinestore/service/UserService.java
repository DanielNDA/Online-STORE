package com.sda.onlinestore.service;

import com.sda.onlinestore.common.utils.Hasher;
import com.sda.onlinestore.exceptions.EmailAlreadyRegisteredException;
import com.sda.onlinestore.persistence.dto.AddressDTO;
import com.sda.onlinestore.persistence.dto.RoleDTO;
import com.sda.onlinestore.persistence.dto.UserDTO;
import com.sda.onlinestore.persistence.model.AddressModel;
import com.sda.onlinestore.persistence.model.RoleModel;
import com.sda.onlinestore.persistence.model.UserModel;
import com.sda.onlinestore.persistence.repository.RoleRepository;
import com.sda.onlinestore.persistence.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    public void save(UserDTO userDTO){
        UserModel userModel = new UserModel();

        AddressDTO addressDTO = userDTO.getAddressDTO();
        AddressModel addressModel = new AddressModel();

        RoleModel roleAdmin = new RoleModel();
        RoleModel roleUser = new RoleModel();
        String adminRole = "ADMIN";
        String userRole = "USER";

        List<UserModel> users = userRepository.findAll();
        int size = users.size();

        if (size == 0) {
            roleAdmin.setName(adminRole);
            roleRepository.save(roleAdmin);
            userModel.setRole(roleAdmin);
        } else if (size == 1) {
            roleUser.setName(userRole);
            roleRepository.save(roleUser);
            userModel.setRole(roleUser);
        } else {
            RoleModel roleModel = new RoleModel();
            Optional<RoleModel> userRoleModel = roleRepository.findByName(userRole);
            if (userRoleModel.isPresent()) {
                RoleModel role = userRoleModel.get();
                roleModel.setName(role.getName());
                userModel.setRole(role);
            }
        }

        if (addressDTO != null) {
            addressModel.setId(addressDTO.getId());
            addressModel.setCountry(addressDTO.getCountry());
            addressModel.setCity(addressDTO.getCity());
            addressModel.setStreet(addressDTO.getStreet());
            addressModel.setZipCode(addressDTO.getZipCode());

            userModel.setAddressModel(addressModel);
        }

        userModel.setPassword(Hasher.encode(userDTO.getPassword()));
        userModel.setChannel(userDTO.getChannel());
        userModel.setFirstName(userDTO.getFirstName());
        userModel.setLastName(userDTO.getLastName());
        userModel.setEmail(userDTO.getEmail());

        userRepository.save(userModel);
    }

    public void deleteById(Long id) {
        userRepository.deleteById(id);
    }

    public List<UserDTO> findAll() {
        List<UserModel> users = userRepository.findAll();
        List<UserDTO> usersDTO = new ArrayList<>();

        for (UserModel userModel : users) {
            UserDTO userDTO = new UserDTO();
            AddressDTO addressDTO = new AddressDTO();

            userDTO.setId(userModel.getId());
            userDTO.setEmail(userModel.getEmail());
            userDTO.setFirstName(userModel.getFirstName());
            userDTO.setLastName(userModel.getLastName());
            userDTO.setChannel(userModel.getChannel());

            AddressModel addressModel = userModel.getAddressModel();

            if (addressModel != null) {
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
        if (newUser.isPresent()) {
            UserModel userModel = newUser.get();
            userModel.setId(userDTO.getId());
            userModel.setEmail(userDTO.getEmail());
            userModel.setChannel(userDTO.getChannel());
            userModel.setFirstName(userDTO.getFirstName());
            userModel.setLastName(userDTO.getLastName());

            AddressModel addressModel = new AddressModel();
            AddressDTO addressDto = userDTO.getAddressDTO();

            addressModel.setCountry(addressDto.getCountry());
            addressModel.setCity(addressDto.getCity());
            addressModel.setStreet(addressDto.getStreet());
            addressModel.setZipCode(addressDto.getZipCode());

            if (userDTO.getNewPassword() != null) {
                userModel.setPassword(Hasher.encode(userDTO.getNewPassword()));
            }
            userModel.setAddressModel(addressModel);
            userRepository.save(userModel);
        }
    }

    public UserDTO findById(Long id) {
        Optional<UserModel> userModel = userRepository.findById(id);
        UserDTO userDTO = new UserDTO();

        if (userModel.isPresent()) {
            userDTO.setId(userModel.get().getId());
            userDTO.setEmail(userModel.get().getEmail());
            userDTO.setChannel(userModel.get().getChannel());
            userDTO.setUrl(userModel.get().getUrl());
            userDTO.setFirstName(userModel.get().getFirstName());
            userDTO.setLastName(userModel.get().getLastName());

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

    public UserDTO findByEmail(String email) {
        Optional<UserModel> userModel = userRepository.findUserModelByEmail(email);
        UserDTO userDTO = new UserDTO();

        if (userModel.isPresent()) {
            userDTO.setId(userModel.get().getId());
            userDTO.setEmail(userModel.get().getEmail());
            userDTO.setPassword(userModel.get().getPassword());
            userDTO.setUrl(userModel.get().getUrl());
            userDTO.setChannel(userModel.get().getChannel());
            userDTO.setFirstName(userModel.get().getFirstName());
            userDTO.setLastName(userModel.get().getLastName());

            AddressModel addressModel = userModel.get().getAddressModel();
            AddressDTO addressDTO = new AddressDTO();

            if (addressModel != null) {

                addressDTO.setId(addressModel.getId());
                addressDTO.setCountry(addressModel.getCountry());
                addressDTO.setCity(addressModel.getCity());
                addressDTO.setStreet(addressModel.getStreet());
                addressDTO.setZipCode(addressModel.getZipCode());
            }
            RoleModel roleModel = userModel.get().getRole();
            RoleDTO roleDTO = new RoleDTO();

            if (roleModel != null) {
                roleDTO.setId(roleModel.getId());
                roleDTO.setName(roleModel.getName());
            }

            userDTO.setRoleDTO(roleDTO);
            userDTO.setAddressDTO(addressDTO);
        }
        return userDTO;
    }
}
