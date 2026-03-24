package com.example.demo.dto;

import jakarta.validation.constraints.NotBlank;

public class GenerationRequestDto {

    @NotBlank(message = "Prompt cannot be empty")
    private String prompt;

    @NotBlank(message = "Generation Type must be selected (Meme, Logo, Poster)")
    private String generationType;

    public GenerationRequestDto() {}

    public String getPrompt() {
        return prompt;
    }

    public void setPrompt(String prompt) {
        this.prompt = prompt;
    }

    public String getGenerationType() {
        return generationType;
    }

    public void setGenerationType(String generationType) {
        this.generationType = generationType;
    }
}
