package com.sda.onlinestore.exceptions;

public class EmailAlreadyRegisteredException extends Exception {

    public EmailAlreadyRegisteredException(){
        super("Email already taken.");
    }
}
