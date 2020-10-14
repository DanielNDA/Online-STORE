package com.sda.onlinestore.controller;

import com.sda.onlinestore.persistence.dto.AddressDTO;
import com.sda.onlinestore.service.AddressService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin
public class AddressController {

    @Autowired
    private AddressService addressService;

    @PostMapping("/addresses")
    private void save(@RequestBody AddressDTO addressDTO) {
        addressService.save(addressDTO);
    }
}
