package com.example.demo.config;

// NOTE: This entire file was commented out to fix a crash!
// Background: Spring Boot was crashing with 'BeanDefinitionOverrideException'
// because BOTH 'Config.java' and 'RestTemplateConfig.java' were trying to 
// create a @Bean named 'restTemplate'. 
// Feel free to safely delete this file completely.

public class RestTemplateConfig {
}
