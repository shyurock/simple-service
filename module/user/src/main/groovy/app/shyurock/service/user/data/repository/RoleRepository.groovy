package app.shyurock.service.user.data.repository

import app.shyurock.service.user.data.model.Role
import org.springframework.data.mongodb.repository.ReactiveMongoRepository
import reactor.core.publisher.Mono

interface RoleRepository extends ReactiveMongoRepository<Role, String> {
    Mono<Role> findByName(String name)
}
