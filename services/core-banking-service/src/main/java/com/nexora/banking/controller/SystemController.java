package com.nexora.banking.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api/v1/system")
public class SystemController {

    @GetMapping("/status")
    public Map<String, String> getStatus() {
        return Map.of(
                "application", "Nexora",
                "status", "UP",
                "message", "Core Banking API is runnung");
    }
}