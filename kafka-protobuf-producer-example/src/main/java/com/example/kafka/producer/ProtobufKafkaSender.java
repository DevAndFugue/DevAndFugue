package com.example.kafka.producer;

import java.util.concurrent.CompletableFuture;

import org.apache.kafka.clients.producer.Producer;
import org.apache.kafka.clients.producer.ProducerRecord;
import org.apache.kafka.clients.producer.RecordMetadata;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import com.example.kafka.config.KafkaProducerProperties;
import com.example.kafka.proto.UserEvent;
import com.google.protobuf.MessageLite;

/**
 * 싱글톤 Producer 를 주입받아 Protobuf 를 비동기로 전송.
 * <p>
 * 성능 포인트:
 * <ul>
 *   <li>Producer 재사용 (싱글톤)</li>
 *   <li>send() 비동기 + Callback (Future.get 블로킹 금지)</li>
 *   <li>Protobuf → byte[] 직접 직렬화</li>
 *   <li>파티션 키로 병렬성/순서 트레이드오프 제어</li>
 * </ul>
 */
@Service
public class ProtobufKafkaSender {

    private static final Logger log = LoggerFactory.getLogger(ProtobufKafkaSender.class);

    private final Producer<String, byte[]> producer;
    private final String topic;

    public ProtobufKafkaSender(Producer<String, byte[]> producer, KafkaProducerProperties props) {
        this.producer = producer;
        this.topic = props.topic();
    }

    /** fire-and-forget 에 가까운 비동기 전송 (최대 처리량) */
    public void sendAsync(UserEvent event) {
        sendAsync(event.getUserId(), event);
    }

    public void sendAsync(String partitionKey, MessageLite message) {
        byte[] value = message.toByteArray();
        ProducerRecord<String, byte[]> record = new ProducerRecord<>(topic, partitionKey, value);

        producer.send(record, (metadata, exception) -> {
            if (exception != null) {
                log.warn("Kafka send failed topic={} key={}", topic, partitionKey, exception);
                return;
            }
            if (log.isDebugEnabled()) {
                log.debug("sent topic={} partition={} offset={}",
                        metadata.topic(), metadata.partition(), metadata.offset());
            }
        });
    }

    /**
     * 대량 전송: 루프에서 send만 연속 호출하고, 필요 시 마지막에 한 번 flush.
     * 매 건마다 flush/get 하면 배치 효과가 사라진다.
     */
    public void sendBatchAsync(Iterable<? extends UserEvent> events) {
        for (UserEvent event : events) {
            sendAsync(event);
        }
    }

    /** 전송 완료를 기다려야 할 때만 사용 (처리량↓) */
    public CompletableFuture<RecordMetadata> sendAndAwait(String partitionKey, MessageLite message) {
        byte[] value = message.toByteArray();
        ProducerRecord<String, byte[]> record = new ProducerRecord<>(topic, partitionKey, value);
        CompletableFuture<RecordMetadata> future = new CompletableFuture<>();

        producer.send(record, (metadata, exception) -> {
            if (exception != null) {
                future.completeExceptionally(exception);
            } else {
                future.complete(metadata);
            }
        });
        return future;
    }

    /** 종료 직전 버퍼 flush (앱 종료 훅에서 호출) */
    public void flush() {
        producer.flush();
    }
}
