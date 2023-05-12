package app.shyurock.service.media.data

import org.springframework.data.mongodb.repository.ReactiveMongoRepository
import reactor.core.publisher.Mono

interface MediaRepository extends ReactiveMongoRepository<Media, String> {

    Mono<Media> findByPath(String path)
}