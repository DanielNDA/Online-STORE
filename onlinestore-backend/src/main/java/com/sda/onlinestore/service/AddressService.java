package com.sda.onlinestore.service;

import com.sda.onlinestore.persistence.dto.AddressDTO;
import com.sda.onlinestore.persistence.dto.UserDTO;
import com.sda.onlinestore.persistence.model.AddressModel;
import com.sda.onlinestore.persistence.model.UserModel;
import com.sda.onlinestore.repository.AddressRepository;
import com.sda.onlinestore.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AddressService {

    @Autowired
    private AddressRepository addressRepository;

    public void save(AddressDTO addressDTO) {
        AddressModel addressModel = new AddressModel();

        if(addressDTO != null) {
            addressModel.setId(addressDTO.getId());
            addressModel.setCountry(addressDTO.getCountry());
            addressModel.setCity(addressDTO.getCity());
            addressModel.setStreet(addressDTO.getStreet());
            addressModel.setZipCode(addressDTO.getZipCode());
        }
        addressRepository.save(addressModel);
    }
}
