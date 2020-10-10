package com.sda.onlinestore.service;

import com.sda.onlinestore.model.AddressModel;
import com.sda.onlinestore.repository.AddressRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AddressService {

    @Autowired
    private AddressRepository addressRepository;

    public void save(AddressModel addressModel) {
        addressRepository.save(addressModel);
    }

    public void deleteById(Long id) {
        addressRepository.deleteById(id);
    }

    public List<AddressModel> findAll() {
        return addressRepository.findAll();
    }

    public void update(AddressModel addressModel) {
        addressRepository.save(addressModel);
    }
}
