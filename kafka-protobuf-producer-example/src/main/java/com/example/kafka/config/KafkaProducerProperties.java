package com.example.kafka.config;

import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties(prefix = "app.kafka")
public record KafkaProducerProperties(
        String bootstrapServers,
        String topic,
        int lingerMs,
        int batchSize,
        long bufferMemory,
        String compressionType,
        String acks,
        int maxInFlightRequests
) {
}
