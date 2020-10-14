package com.sda.onlinestore.service;

import com.sda.onlinestore.persistence.dto.AddressDTO;
import com.sda.onlinestore.persistence.dto.UserDTO;
import com.sda.onlinestore.persistence.model.AddressModel;
import com.sda.onlinestore.persistence.model.UserModel;
import com.sda.onlinestore.repository.AddressRepository;
import com.sda.onlinestore.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AddressService {

    @Autowired
    private AddressRepository addressRepository;

    public void save(AddressDTO addressDTO) {
        AddressModel addressModel = new AddressModel();

        addressModel.setId(addressDTO.getId());
        addressModel.setCountry(addressDTO.getCountry());
        addressModel.setCity(addressDTO.getCity());
        addressModel.setStreet(addressDTO.getStreet());
        addressModel.setZipCode(addressDTO.getZipCode());

        addressRepository.save(addressModel);
    }

    public AddressDTO findById(Long id) {
        Optional<AddressModel> addressModel = addressRepository.findById(id);
        AddressDTO addressDTO = new AddressDTO();

        if (addressModel.isPresent()) {
            addressDTO.setId(addressModel.get().getId());
            addressDTO.setCountry(addressModel.get().getCountry());
            addressDTO.setCity(addressModel.get().getCity());
            addressDTO.setStreet(addressModel.get().getStreet());
            addressDTO.setZipCode(addressModel.get().getZipCode());
        }
        return addressDTO;
    }
}
