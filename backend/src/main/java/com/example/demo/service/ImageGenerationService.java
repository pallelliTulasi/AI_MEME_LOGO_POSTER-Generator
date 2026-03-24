package com.example.demo.service;

import com.example.demo.dto.GenerationRequestDto;
import org.springframework.stereotype.Service;

import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;

@Service
public class ImageGenerationService {

    public String generateImage(GenerationRequestDto request) {

        String prompt = request.getPrompt();
        String generationType = request.getGenerationType();

        if (prompt == null || prompt.trim().isEmpty()) {
            throw new RuntimeException("Prompt cannot be empty");
        }

        try {
            if ("Meme".equalsIgnoreCase(generationType)) {
                return "/images/meme.svg";
            } else if ("Logo".equalsIgnoreCase(generationType)) {
                return "/images/logo.svg";
            } else if ("Poster".equalsIgnoreCase(generationType)) {
                return "/images/poster.svg";
            }
            
            // Fallback just in case
            return "/images/meme.svg";

        } catch (Exception e) {
            throw new RuntimeException("Error generating image");
        }
    }
}