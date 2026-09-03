package com.example.kafka.demo;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;

import com.example.kafka.producer.ProtobufKafkaSender;
import com.example.kafka.proto.UserEvent;

/**
 * 로컬 검증용. 실행: --spring.profiles.active=demo
 */
@Configuration
@Profile("demo")
public class DemoSendRunner {

    @Bean
    CommandLineRunner sendSample(ProtobufKafkaSender sender) {
        return args -> {
            UserEvent event = UserEvent.newBuilder()
                    .setEventId("evt-001")
                    .setUserId("user-42")
                    .setOccurredAtEpochMs(System.currentTimeMillis())
                    .setPayload("hello-protobuf")
                    .build();

            sender.sendAsync(event);
            sender.flush();
        };
    }
}
