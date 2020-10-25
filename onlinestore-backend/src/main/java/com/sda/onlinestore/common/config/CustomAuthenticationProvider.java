package com.sda.onlinestore.common.config;

import com.sda.onlinestore.common.utils.Hasher;
import com.sda.onlinestore.persistence.model.UserModel;
import com.sda.onlinestore.persistence.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

@Component
public class CustomAuthenticationProvider implements AuthenticationProvider {

    @Autowired
    private UserRepository userRepository;

    @Override
    public Authentication authenticate(Authentication authentication)
            throws AuthenticationException {

        String email = authentication.getName();
        String password = authentication.getCredentials().toString();

        UserModel userModel = userRepository.findUserModelByEmail(email).orElse(null);

        Set<SimpleGrantedAuthority> authorities = new HashSet<>();
        SimpleGrantedAuthority simpleGrantedAuthority = new SimpleGrantedAuthority("ROLE_" + (userModel != null ? userModel.getRole().getName() : null));
        authorities.add(simpleGrantedAuthority);

        if (shouldAuthenticateAgainstThirdPartySystem(email, password)) {
            return new UsernamePasswordAuthenticationToken(
                    email, password, authorities);
        } else {
            return null;
        }
    }
    private boolean shouldAuthenticateAgainstThirdPartySystem(String email, String password){
        UserModel user = userRepository.findUserModelByEmail(email).orElse(null);
        if(user != null && user.getPassword().equals(Hasher.encode(password))){
            return true;
        } else {
            return false;
        }
    }

    @Override
    public boolean supports(Class<?> authentication) {
        return authentication.equals(UsernamePasswordAuthenticationToken.class);
    }
}
