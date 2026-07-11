package com.nexushr.config;

import java.util.Arrays;
import java.util.List;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

@Configuration
public class CorsConfig {

	@Bean
	public CorsFilter corsFilter() {

	    CorsConfiguration config = new CorsConfiguration();

	    config.setAllowCredentials(true);

	    config.setAllowedOriginPatterns(List.of(
	            "https://nexus-hr-85yz.vercel.app",
	            "https://nexushr-hrms.netlify.app",
	            "http://localhost:3000"));

	    config.addAllowedHeader("*");
	    config.addAllowedMethod("*");

	    UrlBasedCorsConfigurationSource source =
	            new UrlBasedCorsConfigurationSource();

	    source.registerCorsConfiguration("/**", config);

	    return new CorsFilter(source);
	}
}