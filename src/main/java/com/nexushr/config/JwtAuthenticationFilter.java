package com.nexushr.config;

import java.io.IOException;
import java.util.Collections;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class JwtAuthenticationFilter
        extends OncePerRequestFilter {

    private final JwtUtil jwtUtil;

    public JwtAuthenticationFilter(
            JwtUtil jwtUtil) {

        this.jwtUtil = jwtUtil;
    }

    @Override
    protected boolean shouldNotFilter(
            HttpServletRequest request) {

        return request.getServletPath()
                .startsWith("/auth/");
    }

    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain chain)
            throws ServletException, IOException {

        try {

            String header =
                    request.getHeader(
                            "Authorization");

            if (header != null &&
                    header.startsWith(
                            "Bearer ")) {

                String token =
                        header.substring(7);

                String username =
                        jwtUtil.extractUsername(
                                token);

                if (username != null) {

                    UsernamePasswordAuthenticationToken auth =
                            new UsernamePasswordAuthenticationToken(
                                    username,
                                    null,
                                    Collections.emptyList());

                    SecurityContextHolder
                            .getContext()
                            .setAuthentication(auth);
                }
            }

        } catch (Exception e) {

            System.out.println(
                    "JWT Error: "
                            + e.getMessage());
        }

        chain.doFilter(
                request,
                response);
    }
}