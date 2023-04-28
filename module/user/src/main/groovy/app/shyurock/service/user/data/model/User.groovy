package app.shyurock.service.user.data.model

import app.shyurock.service.core.data.BaseEntity
import org.springframework.data.mongodb.core.index.Indexed
import org.springframework.data.mongodb.core.mapping.Document

@Document
class User extends BaseEntity {

    @Indexed(unique = true)
    String username
    String passwordHash

    UserProfile profile

    UserPermission permission
}
