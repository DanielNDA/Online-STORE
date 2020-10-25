package com.sda.onlinestore;

import com.fasterxml.jackson.databind.Module;
import com.fasterxml.jackson.datatype.hibernate5.Hibernate5Module;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class OnlinestoreApplication {

	public static void main(String[] args) {
		SpringApplication.run(OnlinestoreApplication.class, args);
	}

	@Bean
	public Module hibernate5Module()
	{
		return new Hibernate5Module();
	}

}
