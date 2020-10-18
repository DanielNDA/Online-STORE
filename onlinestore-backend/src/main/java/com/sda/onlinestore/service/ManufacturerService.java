package com.sda.onlinestore.service;

import com.sda.onlinestore.persistence.dto.ManufacturerDTO;
import com.sda.onlinestore.persistence.model.ManufacturerModel;
import com.sda.onlinestore.repository.ManufacturerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class ManufacturerService {

    @Autowired
    private ManufacturerRepository manufacturerRepository;

    public List<ManufacturerDTO> getManufacturer() {
        List<ManufacturerModel> manufacturerModelList = manufacturerRepository.findAll();
        List<ManufacturerDTO> manufacturerDtoList = new ArrayList<>();
        for (ManufacturerModel manufacturerModel : manufacturerModelList) {
            ManufacturerDTO manufacturerDto = new ManufacturerDTO();
            manufacturerDto.setId(manufacturerModel.getId());
            manufacturerDto.setName(manufacturerModel.getName());
            manufacturerDtoList.add(manufacturerDto);
        }
        return manufacturerDtoList;
    }

    public void addManufacturer(ManufacturerDTO manufacturerDto) {
        ManufacturerModel manufacturerModel = new ManufacturerModel();
        manufacturerModel.setId(manufacturerDto.getId());
        manufacturerModel.setName(manufacturerDto.getName());
        manufacturerRepository.save(manufacturerModel);
    }

    public void deleteById(Long Id) {
        manufacturerRepository.deleteById(Id);

    }

    public ManufacturerDTO get(long id){
        ManufacturerModel manufacturerModel = manufacturerRepository.findById(id).orElse(null);
        ManufacturerDTO manufacturerDto = new ManufacturerDTO();
        manufacturerDto.setId(manufacturerModel.getId());
        manufacturerDto.setName(manufacturerDto.getName());
        return manufacturerDto;

    }

    public void update(ManufacturerDTO manufacturerDto) {
        Optional<ManufacturerModel> manufacturerModelOptional = manufacturerRepository.findById(manufacturerDto.getId());
        if (manufacturerModelOptional.isPresent()) {
            ManufacturerModel manufacturerModel = manufacturerModelOptional.get();
            manufacturerModel.setId(manufacturerDto.getId());
            manufacturerModel.setName(manufacturerDto.getName());
            manufacturerRepository.save(manufacturerModel);
        }
    }
}
