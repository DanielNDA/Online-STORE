package com.sda.onlinestore.controller;

import com.sda.onlinestore.persistence.dto.AddressDTO;
import com.sda.onlinestore.persistence.dto.UserDTO;
import com.sda.onlinestore.persistence.dto.file.ResponseFile;
import com.sda.onlinestore.persistence.dto.file.ResponseMessage;
import com.sda.onlinestore.persistence.model.ImageModelUser;
import com.sda.onlinestore.service.ImageServiceUser;
import com.sda.onlinestore.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@CrossOrigin
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private ImageServiceUser imageServiceUser;

    @PostMapping("/register")
    public void save(@RequestBody UserDTO userDTO) {
        userService.save(userDTO);
    }

    @DeleteMapping("/users/{id}")
    public void deleteById(@PathVariable(name = "id") Long id) {
        userService.deleteById(id);
    }

    @GetMapping("/users/{id}")
    public UserDTO findById(@PathVariable(name = "id") Long id) {
        return userService.findById(id);
    }

    @GetMapping("/users")
    public List<UserDTO> findAll() {
        return userService.findAll();
    }

    @PutMapping("/users")
    public void update(@RequestBody UserDTO userDTO) {
        userService.update(userDTO);
    }

    @PostMapping("/images")
    public ResponseEntity<ResponseMessage> uploadFile(@RequestParam("image") MultipartFile photo) {
        String message;
        try {
            imageServiceUser.store(photo);
            message = "Uploaded the file successfully: " + photo.getOriginalFilename();
            return ResponseEntity.status(HttpStatus.OK).body(new ResponseMessage(message));
        } catch (Exception e) {
            message = "Could not upload the file: " + photo.getOriginalFilename() + "!";
            return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body(new ResponseMessage(message));
        }
    }

    @RequestMapping(value = "/images", method = RequestMethod.GET)
    public ResponseEntity<List<ResponseFile>> getListFiles() {
        List<ResponseFile> files = imageServiceUser.getImages().map(dbFile -> {
            String fileDownloadUri = ServletUriComponentsBuilder
                    .fromCurrentContextPath()
                    .path("/images/")
                    .path(dbFile.getId())
                    .toUriString();
            return new ResponseFile(
                    dbFile.getName(),
                    fileDownloadUri,
                    dbFile.getType(),
                    dbFile.getData().length);
        }).collect(Collectors.toList());
        return ResponseEntity.status(HttpStatus.OK).body(files);
    }
    @GetMapping("/image/{id}")
    public ResponseEntity<List<ResponseFile>> getUserPhoto(@PathVariable(name = "id") Long id){
        List<ResponseFile> files = imageServiceUser.getUserImage(id).map(dbFile -> {
            String fileDownloadUri = ServletUriComponentsBuilder.fromCurrentContextPath().path("/images/").path(dbFile.getId()).toUriString();
            return new ResponseFile(dbFile.getName(), fileDownloadUri, dbFile.getType(), dbFile.getData().length);
        }).collect(Collectors.toList());
        return ResponseEntity.status(HttpStatus.OK).body(files);
    }

    @GetMapping("/images/{id}")
    public ResponseEntity<byte[]> getFile(@PathVariable String id) {
        ImageModelUser imageModelUser = imageServiceUser.getPhoto(id);
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + imageModelUser.getName() + "\"")
                .body(imageModelUser.getData());
    }
}
