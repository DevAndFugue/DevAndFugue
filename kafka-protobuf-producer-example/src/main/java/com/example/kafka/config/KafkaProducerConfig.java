package com.example.kafka.config;

import java.util.HashMap;
import java.util.Map;

import org.apache.kafka.clients.producer.KafkaProducer;
import org.apache.kafka.clients.producer.Producer;
import org.apache.kafka.clients.producer.ProducerConfig;
import org.apache.kafka.common.serialization.ByteArraySerializer;
import org.apache.kafka.common.serialization.StringSerializer;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/**
 * KafkaProducer 는 thread-safe 하다.
 * 요청마다 new 하지 말고 Spring 싱글톤 Bean 으로 1개만 재사용한다.
 */
@Configuration
@EnableConfigurationProperties(KafkaProducerProperties.class)
public class KafkaProducerConfig {

    @Bean(destroyMethod = "close")
    public Producer<String, byte[]> kafkaProducer(KafkaProducerProperties props) {
        Map<String, Object> config = new HashMap<>();
        config.put(ProducerConfig.BOOTSTRAP_SERVERS_CONFIG, props.bootstrapServers());
        config.put(ProducerConfig.KEY_SERIALIZER_CLASS_CONFIG, StringSerializer.class.getName());
        // Protobuf 는 앱에서 toByteArray() 후 byte[] 로 전송 → 직렬화 오버헤드/리플렉션 최소화
        config.put(ProducerConfig.VALUE_SERIALIZER_CLASS_CONFIG, ByteArraySerializer.class.getName());

        // ---- 처리량 최대화 핵심 ----
        config.put(ProducerConfig.LINGER_MS_CONFIG, props.lingerMs());
        config.put(ProducerConfig.BATCH_SIZE_CONFIG, props.batchSize());
        config.put(ProducerConfig.BUFFER_MEMORY_CONFIG, props.bufferMemory());
        config.put(ProducerConfig.COMPRESSION_TYPE_CONFIG, props.compressionType());
        config.put(ProducerConfig.ACKS_CONFIG, props.acks());
        config.put(ProducerConfig.MAX_IN_FLIGHT_REQUESTS_PER_CONNECTION, props.maxInFlightRequests());

        // 네트워크/재시도
        config.put(ProducerConfig.RETRIES_CONFIG, 3);
        config.put(ProducerConfig.DELIVERY_TIMEOUT_MS_CONFIG, 120_000);
        config.put(ProducerConfig.REQUEST_TIMEOUT_MS_CONFIG, 30_000);

        // 메타데이터 캐시 히트율 유지 (불필요한 브로커 조회 감소)
        config.put(ProducerConfig.METADATA_MAX_AGE_CONFIG, 300_000);

        return new KafkaProducer<>(config);
    }
}
