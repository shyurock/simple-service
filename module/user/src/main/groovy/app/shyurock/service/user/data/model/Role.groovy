package app.shyurock.service.user.data.model

import app.shyurock.service.core.data.BaseEntity
import org.springframework.data.mongodb.core.index.Indexed
import org.springframework.data.mongodb.core.mapping.Document

@Document(collection = 'roles')
class Role extends BaseEntity {
    @Indexed(unique = true)
    String name
    String description
    Set<UserPermission> permissions = []

    Role() {}
    Role(String name) { this.name = name }
}
