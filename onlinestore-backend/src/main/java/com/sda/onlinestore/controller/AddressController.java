package com.sda.onlinestore.controller;

import com.sda.onlinestore.persistence.dto.AddressDTO;
import com.sda.onlinestore.service.AddressService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
public class AddressController {

    @Autowired
    private AddressService addressService;

    @PostMapping("/addresses")
    public void save(@RequestBody AddressDTO addressDTO) {
        addressService.save(addressDTO);
    }

    @GetMapping("/addresses/{id}")
    public AddressDTO findById(@PathVariable(name = "id") Long id) {
        return addressService.findById(id);
    }
}
