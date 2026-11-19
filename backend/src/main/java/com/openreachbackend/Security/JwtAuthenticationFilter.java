package com.openreachbackend.Security;
import com.openreachbackend.Service.CustomUserDetailsSevice;
import com.openreachbackend.Service.JwtService;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter{

    private final JwtService jwtService;
    private final CustomUserDetailsSevice userDetailsService;
    public JwtAuthenticationFilter(JwtService jwtService , CustomUserDetailsSevice userDetailsService){
        this.jwtService=jwtService;
        this.userDetailsService = userDetailsService;

    }
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException{
        String authHeader=request.getHeader("Authorization");


        if(authHeader==null || !authHeader.startsWith("Bearer ")){
            filterChain.doFilter(request,response);  // send the req to next filter
            return;
        }

        String token = authHeader.substring(7);
        try{
            Claims claims=jwtService.extractAllClaims(token);
            String email = claims.getSubject();

            UserDetails userDetails =
                    userDetailsService.loadUserByUsername(email);

            Authentication authentication = new UsernamePasswordAuthenticationToken(
                    userDetails,
                    null,
                    userDetails.getAuthorities()
            );

            SecurityContextHolder.getContext()
                    .setAuthentication(authentication);

        }catch (JwtException e) {
            response.sendError(401, "Invalid or expired token");
            return;
        }
        catch (UsernameNotFoundException e){
            response.sendError(
                    HttpServletResponse.SC_UNAUTHORIZED,"user not found"
            );

            return;
        }

        filterChain.doFilter(request, response);

    }
}
