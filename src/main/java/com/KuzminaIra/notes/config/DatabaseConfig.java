package com.KuzminaIra.notes.config;

import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;

@Configuration
@ComponentScan(basePackages = "com.KuzminaIra.notes.database")
public class DatabaseConfig {
}
