package com.sda.onlinestore.service;

import com.sda.onlinestore.exceptions.EmailAlreadyRegisteredException;
import com.sda.onlinestore.persistence.model.ImageModelUser;
import com.sda.onlinestore.persistence.model.UserModel;
import com.sda.onlinestore.persistence.repository.ImageRepositoryUser;
import com.sda.onlinestore.persistence.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.TimeUnit;
import java.util.stream.Stream;

@Service
public class ImageServiceUser {

    @Autowired
    private ImageRepositoryUser imageRepositoryUser;

    @Autowired
    private UserRepository userRepository;

    public ImageModelUser store(MultipartFile file) throws IOException, InterruptedException, EmailAlreadyRegisteredException {
        String fileName = StringUtils.cleanPath(file.getOriginalFilename());
        ImageModelUser image = new ImageModelUser(fileName, file.getContentType(), file.getBytes());
        TimeUnit.SECONDS.sleep(3);
        List<UserModel> users = userRepository.findAll();
        UserModel userModel = users.get(users.size() - 1);
        image.setUser(userModel);
        return imageRepositoryUser.save(image);
    }

    public ImageModelUser getPhoto(String id) {
        return imageRepositoryUser.findById(id).get();
    }

    public Stream<ImageModelUser> getImages() {
        return imageRepositoryUser.findAll().stream();
    }

    public Stream<ImageModelUser> getUserImage(long id) {
        UserModel userModel = userRepository.findById(id).orElse(null);
        List<ImageModelUser> images = new ArrayList<>();
        if (userModel != null) {
            images.add(userModel.getImage());
        }
        return images.stream();
    }


}
