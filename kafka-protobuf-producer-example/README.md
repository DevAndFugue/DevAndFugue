# Spring Boot — Singleton Kafka Protobuf Producer (처리량 최대화)

KafkaProducer는 **thread-safe**이므로 Spring 싱글톤 Bean으로 **1개만** 만들고 전 요청에서 재사용한다.
요청마다 `new KafkaProducer`를 만들면 커넥션/스레드/메타데이터 비용으로 성능이 급락한다.

## 핵심 구조

| 구성요소 | 역할 |
|---------|------|
| `KafkaProducerConfig` | `Producer<String, byte[]>` 싱글톤 Bean (`destroyMethod=close`) |
| `ProtobufKafkaSender` | Protobuf → `toByteArray()` 후 비동기 `send` |
| `ByteArraySerializer` | 값 직렬화는 앱에서 끝냄 (리플렉션/중간 변환 제거) |

## 처리량 튜닝 포인트

1. **싱글톤 Producer 재사용** — 필수
2. **비동기 send + Callback** — `Future.get()` 블로킹 금지
3. **배치/지연**: `linger.ms=5~20`, `batch.size=32KB~64KB+`
4. **압축**: `lz4` 또는 `zstd` (CPU와 대역폭 트레이드오프)
5. **acks**: 최대 처리량이면 `"1"`, 내구성이면 `"all"` + idempotence
6. **파티션 키**: 동일 키 = 순서 보장 / 키 분산 = 병렬 처리량↑
7. **종료 시 `flush()`** — 버퍼에 남은 레코드 유실 방지

## 실행

```bash
# Protobuf 생성 + 빌드
mvn -f kafka-protobuf-producer-example/pom.xml -DskipTests package

# 데모 전송 (로컬 Kafka 필요)
mvn -f kafka-protobuf-producer-example/pom.xml spring-boot:run \
  -Dspring-boot.run.profiles=demo
```

## 사용 예시

```java
UserEvent event = UserEvent.newBuilder()
    .setEventId("evt-001")
    .setUserId("user-42")
    .setOccurredAtEpochMs(System.currentTimeMillis())
    .setPayload("hello")
    .build();

protobufKafkaSender.sendAsync(event); // 논블로킹
```

## 내구성이 필요할 때

`acks=all`, `enable.idempotence=true`, `max.in.flight.requests.per.connection≤5` 로 바꾼다.
처리량은 다소 줄고 Exactly-once/중복 방지에 가깝게 동작한다.

## Schema Registry를 쓸 때

Confluent `KafkaProtobufSerializer` + Schema Registry로 교체 가능.
순수 처리량만 보면 `byte[]` 직접 전송이 보통 더 가볍다.
