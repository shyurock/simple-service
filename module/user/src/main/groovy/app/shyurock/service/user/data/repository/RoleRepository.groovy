package app.shyurock.service.user.data.repository

import app.shyurock.service.user.data.model.Role
import org.springframework.data.mongodb.repository.ReactiveMongoRepository

interface RoleRepository extends ReactiveMongoRepository<Role, String> {
}
