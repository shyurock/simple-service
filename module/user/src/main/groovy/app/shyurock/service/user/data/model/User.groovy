package app.shyurock.service.user.data.model

import app.shyurock.service.core.data.BaseEntity
import org.springframework.data.mongodb.core.index.Indexed
import org.springframework.data.mongodb.core.mapping.Document

@Document(collection = 'users')
class User extends BaseEntity {

    @Indexed(unique = true)
    String username
    String passwordHash
    String avatar
    Boolean blocked = false

    Date lastLoginDate
    UserProfile profile

    List<String> roles
    List<UserPermission> individualPermissions
}
