package com.sda.onlinestore.controller;

import com.sda.onlinestore.model.AddressModel;
import com.sda.onlinestore.service.AddressService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
public class AddressController {

    @Autowired
    private AddressService addressService;

    @PostMapping("/addresses")
    private void save(@RequestBody AddressModel addressModel) {
        addressService.save(addressModel);
    }

    @DeleteMapping("/addresses/{id}")
    private void deleteById(@PathVariable(name = "id") Long id) {
        addressService.deleteById(id);
    }

    @GetMapping("/addresses/{id}")
    private AddressModel findById(@PathVariable(name = "id") Long id) {
        return addressService.findById(id);
    }

    @GetMapping("/addresses")
    private List<AddressModel> findAll() {
        return addressService.findAll();
    }

    @PutMapping("/addresses/{id}")
    private void update(@RequestBody AddressModel addressModel) {
        AddressModel newAddress = addressService.findById(addressModel.getId());
        newAddress.setCountry(addressModel.getCountry());
        newAddress.setCity(addressModel.getCity());
        newAddress.setStreet(addressModel.getStreet());
        newAddress.setZipCode(addressModel.getZipCode());
        addressService.update(newAddress);
    }
}
