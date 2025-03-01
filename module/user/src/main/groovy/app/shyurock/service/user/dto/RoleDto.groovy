package app.shyurock.service.user.dto

import app.shyurock.service.user.data.model.UserPermission
import groovy.transform.ToString

@ToString
class RoleDto {
    String name
    String description
    List<UserPermission> permissions = [] // List of permission names associated with the role
    List<String> users = [] // List of usernames associated with the role (optional)
}
