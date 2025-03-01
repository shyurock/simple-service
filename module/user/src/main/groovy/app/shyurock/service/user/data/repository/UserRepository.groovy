package app.shyurock.service.user.data.repository

import app.shyurock.service.user.data.model.User
import org.springframework.data.mongodb.repository.ReactiveMongoRepository
import reactor.core.publisher.Flux
import reactor.core.publisher.Mono

interface UserRepository extends ReactiveMongoRepository<User, String> {
    Mono<User> findByUsername(String username)

    Flux<User> findAllByRolesContaining(String roleName)
}
