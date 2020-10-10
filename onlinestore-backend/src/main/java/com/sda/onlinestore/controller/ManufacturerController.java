package com.sda.onlinestore.controller;

import com.sda.onlinestore.model.ManufacturerModel;
import com.sda.onlinestore.model.ProductModel;
import com.sda.onlinestore.service.ManufacturerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
public class ManufacturerController {

    @Autowired
    private ManufacturerService manufacturerService;

    @PostMapping("/manufacturers")
    private void save(@RequestBody ManufacturerModel manufacturerModel){
        manufacturerService.save(manufacturerModel);
    }

    @DeleteMapping("/manufacturers/{id}")
    private void deleteById(@PathVariable(name = "id") Long id){
        manufacturerService.deleteById(id);
    }
    @GetMapping("/manufacturers/{id}")
    private ManufacturerModel findById(@PathVariable(name = "id") Long id){
        return manufacturerService.findById(id);
    }
    @GetMapping("/manufacturers")
    private List<ManufacturerModel> findAll(){
        return manufacturerService.findAll();
    }

    @PutMapping("/manufacturers/{id}")
    public void update(@RequestBody ManufacturerModel manufacturerModel){
        manufacturerService.update(manufacturerModel);
    }

}
