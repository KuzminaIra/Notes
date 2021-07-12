package com.KuzminaIra.notes.config;

import org.springframework.context.annotation.*;

@Configuration
@ComponentScan(basePackages = "com.KuzminaIra.notes.utils")
@Import({DatabaseConfig.class, WebConfig.class})
public class MainConfig {
}
