package app.shyurock.service.user.dto

import app.shyurock.service.user.data.model.User
import app.shyurock.service.user.data.model.UserPermission
import groovy.transform.ToString

@ToString
class UserDto {
    String username
    Date createdAt
    String avatar
    Boolean blocked
    Date lastLoginDate
    List<String> roles
    List<UserPermission> individualPermissions

    static UserDto of(User user) {
        new UserDto(
                username: user.username,
                createdAt: user.createdAt,
                avatar: user.avatar,
                blocked: user.blocked,
                roles: user.roles,
                lastLoginDate: user.lastLoginDate,
                individualPermissions: user.individualPermissions
        )
    }
}
