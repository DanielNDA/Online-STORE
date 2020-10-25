package com.sda.onlinestore.controller;

import com.sda.onlinestore.common.utils.AuthenticationBean;
import com.sda.onlinestore.persistence.dto.UserDTO;
import com.sda.onlinestore.persistence.dto.file.ResponseFile;
import com.sda.onlinestore.persistence.dto.file.ResponseMessage;
import com.sda.onlinestore.persistence.model.ImageModelUser;
import com.sda.onlinestore.persistence.repository.RoleRepository;
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
    private RoleRepository roleRepository;

    @Autowired
    private ImageServiceUser imageServiceUser;

    @PostMapping("/register")
    public ResponseEntity register(@RequestBody UserDTO user) {
        userService.save(user);
        return new ResponseEntity(HttpStatus.OK);
    }

    @GetMapping(path = "/basicauth")
    public AuthenticationBean basicauth() {
        return new AuthenticationBean("You are authenticated");
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

    @GetMapping("/user/{email}")
    public UserDTO findByEmail(@PathVariable(name = "email") String email) {
        UserDTO user = userService.findByEmail(email);
//        RoleDTO roleDTO = user.getRoleDTO();
        return user;
    }

    @GetMapping("/image/{id}")
    public ResponseEntity<List<ResponseFile>> getImage(@PathVariable(name = "id") Long id) {
        List<ResponseFile> files = imageServiceUser.getUserImage(id).map(dbFile -> {
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

    @GetMapping("/images/{id}")
    public ResponseEntity<byte[]> getFile(@PathVariable String id) {
        ImageModelUser image = imageServiceUser.getPhoto(id);
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + image.getName() + "\"")
                .body(image.getData());
    }


    @PostMapping("/images")
    public ResponseEntity<ResponseMessage> uploadFile(@RequestParam("image") MultipartFile image) {
        String message;
        try {
            imageServiceUser.store(image);
            message = "Uploaded the file successfully: " + image.getOriginalFilename();
            return ResponseEntity.status(HttpStatus.OK).body(new ResponseMessage(message));
        } catch (Exception e) {
            message = "Could not upload the file: " + image.getOriginalFilename() + "!";
            return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body(new ResponseMessage(message));
        }
    }
}
