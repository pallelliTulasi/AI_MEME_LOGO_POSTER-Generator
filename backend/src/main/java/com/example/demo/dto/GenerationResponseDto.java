package com.example.demo.dto;

public class GenerationResponseDto {

    private String imageUrl;
    private String prompt;

    // Constructor with parameters
    public GenerationResponseDto(String imageUrl, String prompt) {
        this.imageUrl = imageUrl;
        this.prompt = prompt;
    }

    // Default constructor
    public GenerationResponseDto() {
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public String getPrompt() {
        return prompt;
    }

    public void setPrompt(String prompt) {
        this.prompt = prompt;
    }
}