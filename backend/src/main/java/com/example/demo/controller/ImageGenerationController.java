package com.example.demo.controller;

import com.example.demo.dto.GenerationRequestDto;
import com.example.demo.dto.GenerationResponseDto;
import com.example.demo.service.ImageGenerationService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@CrossOrigin(originPatterns = "*")
public class ImageGenerationController {

    private final ImageGenerationService service;

    public ImageGenerationController(ImageGenerationService service) {
        this.service = service;
    }

    @PostMapping("/generate")
    public ResponseEntity<GenerationResponseDto> generateImage(@Valid @RequestBody GenerationRequestDto request) {
        String imageUrl = service.generateImage(request);
        GenerationResponseDto response = new GenerationResponseDto(imageUrl, request.getPrompt());
        return ResponseEntity.ok(response);
    }
}
