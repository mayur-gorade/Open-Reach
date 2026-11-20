package com.openreachbackend.Config;

import com.openreachbackend.Security.JwtAuthenticationFilter;
import jakarta.servlet.DispatcherType;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.ProviderManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

@Configuration
public class SecurityConfig {
    @Autowired
    JwtAuthenticationFilter jwtAuthenticationFilter;

          //Configure CORS rules
           @Bean
          public CorsConfigurationSource corsConfigurationSource() {

              CorsConfiguration configuration = new CorsConfiguration();

              configuration.setAllowedOrigins(
                      List.of("http://localhost:5173")
              );

              configuration.setAllowedMethods(
                      List.of("GET", "POST", "PUT", "DELETE", "OPTIONS")
              );

              configuration.setAllowedHeaders(
                      List.of("*")
              );

              configuration.setAllowCredentials(false);

              UrlBasedCorsConfigurationSource source =
                      new UrlBasedCorsConfigurationSource();

              source.registerCorsConfiguration("/**", configuration);

              return source;
          }


            //Configure Spring Security filter chain
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http)
            throws Exception {

        http
                .csrf(csrf -> csrf.disable())
                .cors(Customizer.withDefaults())
                .authorizeHttpRequests(auth -> auth
                             //public endpoint
                        .requestMatchers(
                                HttpMethod.POST,
                                "/users/login",
                                "/users/register"
                        ).permitAll()
                        .requestMatchers(HttpMethod.GET ,"/jobs/**").permitAll()

                          //student-only endpoint
                        .requestMatchers("/api/student-profiles/**").hasRole("STUDENT")
                        .requestMatchers(HttpMethod.POST ,"/application/apply").hasRole("STUDENT")

                        // Client-only endpoints
                        .requestMatchers(HttpMethod.POST, "/jobs/addjob").hasRole("CLIENT")
                        .requestMatchers(HttpMethod.PUT, "/jobs/job/**").hasRole("CLIENT")
                        .requestMatchers(HttpMethod.DELETE, "/jobs/job/**").hasRole("CLIENT")


                        .dispatcherTypeMatchers(DispatcherType.ERROR).permitAll()
                        .anyRequest().authenticated()
                ).exceptionHandling(exception ->
                        exception.authenticationEntryPoint((request, response, authException) -> {
                            response.sendError(HttpServletResponse.SC_UNAUTHORIZED,"Invalid Token");
                        })
                )
                .sessionManagement(session->
                        session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }


    // Configure AuthenticationManager

    @Bean
    public AuthenticationManager authenticationManager(
            DaoAuthenticationProvider authenticationProvider) {

        return new ProviderManager(authenticationProvider);
    }
}