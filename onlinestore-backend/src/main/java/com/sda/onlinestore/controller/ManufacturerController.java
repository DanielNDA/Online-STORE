package com.sda.onlinestore.controller;

import com.sda.onlinestore.persistence.dto.ManufacturerDTO;
import com.sda.onlinestore.repository.ManufacturerRepository;
import com.sda.onlinestore.service.ManufacturerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@RestController
@CrossOrigin
public class ManufacturerController {

    @Autowired
    private ManufacturerService manufacturerService;
    @Autowired
    private ManufacturerRepository manufacturerRepository;

    @PostMapping("/manufacturer")
    public void add(@RequestBody ManufacturerDTO manufacturerDto) {
        manufacturerService.addManufacturer(manufacturerDto);
    }
    @DeleteMapping("/manufacturer/{id}")
    public void delete(@PathVariable(name = "id") Long id) {
        manufacturerService.deleteById(id);
    }
    @GetMapping("/manufacturer")
    public List<ManufacturerDTO> getAll() {
        return manufacturerService.getManufacturer();
    }

    @GetMapping("/manufacturer/{id}")
    public ManufacturerDTO get(@PathVariable(name = "id") Long id) {
        return manufacturerService.get(id);
    }

    @PutMapping("/manufacturer")
    public void update(@RequestBody ManufacturerDTO manufacturerDto) {
        manufacturerService.update(manufacturerDto);

    }
}
