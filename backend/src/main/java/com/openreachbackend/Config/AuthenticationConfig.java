package com.openreachbackend.Config;


import com.openreachbackend.Service.CustomUserDetailsSevice;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class AuthenticationConfig {

    @Bean
    public DaoAuthenticationProvider authenticationProvider (CustomUserDetailsSevice userDetailsSevice ,
                                                             PasswordEncoder passwordEncoder){
        DaoAuthenticationProvider provider = new DaoAuthenticationProvider(userDetailsSevice);
        provider.setPasswordEncoder(passwordEncoder);

        return provider;


    }
}
