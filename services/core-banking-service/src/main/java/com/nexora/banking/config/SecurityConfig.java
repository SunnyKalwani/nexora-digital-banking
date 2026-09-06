package com.nexora.banking.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http)
            throws Exception {

        http
            .csrf(csrf -> csrf.disable())

            .authorizeHttpRequests(auth -> auth
                .requestMatchers(
                    "/api/v1/system/status",
                    "/actuator/health",
                    "/api/v1/accounts",
                    "/api/v1/accounts/**"
                ).permitAll()

                .anyRequest().authenticated()
            );

        return http.build();
    }
}