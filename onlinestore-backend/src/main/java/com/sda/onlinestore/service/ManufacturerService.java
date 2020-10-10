package com.sda.onlinestore.service;

import com.sda.onlinestore.model.ManufacturerModel;
import com.sda.onlinestore.repository.ManufacturerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ManufacturerService {

    @Autowired
    private ManufacturerRepository manufacturerRepository;

    public void save(ManufacturerModel manufacturerModel){
        manufacturerRepository.save(manufacturerModel);
    }

    public void deleteById(Long id){
        manufacturerRepository.deleteById(id);
    }

    public List<ManufacturerModel> findAll(){
        return   manufacturerRepository.findAll();
    }

    public void update(ManufacturerModel manufacturerModel){
        manufacturerRepository.save(manufacturerModel);
    }

    public ManufacturerModel findById(Long id){
        return manufacturerRepository.findById(id).orElse(null);
    }

}
