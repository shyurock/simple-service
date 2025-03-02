package app.shyurock.service.user.service

import app.shyurock.service.user.data.model.Role
import app.shyurock.service.user.data.model.User
import app.shyurock.service.user.data.model.UserPermission
import app.shyurock.service.user.data.repository.RoleRepository
import app.shyurock.service.user.data.repository.UserRepository
import app.shyurock.service.user.dto.PermissionDto
import app.shyurock.service.user.dto.RoleDto
import app.shyurock.service.user.dto.UserDto
import app.shyurock.service.user.dto.UserInfo
import groovy.transform.CompileStatic
import groovy.util.logging.Slf4j
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service
import reactor.core.publisher.Flux
import reactor.core.publisher.Mono

@Slf4j
@Service
@CompileStatic
class UserService {
    @Autowired private UserRepository userRepository
    @Autowired private RoleRepository roleRepository

    /**
     * Finds a user by username
     * @param username Username to search for
     * @return Mono with the found user
     */
    Mono<User> findUserByName(String username) {
        userRepository.findByUsername(username)
                .flatMap { user ->
                    loadUserPermissions(user)
                            .map { permissions ->
                                user.individualPermissions = permissions
                                user
                            }
                }
    }

    /**
     * Gets user information by username
     * @param username Username
     * @return Mono with user information (UserInfo)
     */
    Mono<UserInfo> userInfoByName(String username) {

        userRepository.findByUsername(username)
                .flatMap { user ->
                    loadUserPermissions(user)
                            .map { permissions ->
                                new UserInfo(
                                        name: "${user.profile?.firstName} ${user.profile?.lastName}".toString() ?: username,
                                        avatar: user.profile?.avatar ?: '',
                                        permissions: permissions.collect { x -> "ROLE_${x.name()}".toString() }
                                )
                            }
                }
    }

    /**
     * Retrieves all users
     * @return Flux of UserDto objects representing all users
     */
    Flux<UserDto> users() {
        userRepository.findAll()
                .map(UserDto::of)
    }

    /**
     * Updates an existing user or creates a new one if it doesn't exist
     * @param initiator Username of the user initiating the update
     * @param user Updated user data
     * @return Mono with the updated or created user as UserDto
     */
    Mono<UserDto> updateOrCreateUser(String initiator, UserDto user) {
        userRepository.findByUsername(user.username)
                .defaultIfEmpty(new User(username: user.username))
                .flatMap { entity ->
                    entity.username = user.username
                    entity.avatar = user.avatar
                    entity.blocked = user.blocked
                    entity.roles = user.roles
                    entity.individualPermissions = user.individualPermissions
                    userRepository.save(entity)
                }
                .map(UserDto::of)
    }

    /**
     * Deletes a user
     * @param username Username of the user to delete
     * @return Mono<Void> after successful deletion
     */
    Mono<Void> deleteUser(String username) {
        userRepository.findByUsername(username)
                .flatMap { userRepository.delete(it) }
    }

    /**
     * Retrieves all roles
     * @return Flux of RoleDto objects representing all roles
     */
    Flux<RoleDto> roles() {
        roleRepository.findAll()
                .flatMap { toRoleDto(it) }
    }

    /**
     * Creates or Updates an existing role
     * @param initiator Username of the user initiating the update
     * @param role Updated role data
     * @return Mono with the updated or created role as RoleDto
     */
    Mono<RoleDto> updateOrCreateRole(String initiator, RoleDto role) {
        roleRepository.findByName(role.name)
                .defaultIfEmpty(new Role(role.name))
                .flatMap { entity ->
                    entity.description = role.description
                    entity.permissions = role.permissions.toSet()
                    roleRepository.save(entity)
                }
                .flatMap { toRoleDto(it) }
    }

    /**
     * Deletes a role
     * @param initiator Username of the user initiating the deletion
     * @param name Name of the role to delete
     * @return Mono<Void> after successful deletion
     */
    Mono<Void> deleteRole(String initiator, String name) {
        roleRepository.findByName(name)
                .flatMap { roleRepository.delete(it) }
    }

    /**
     * Loads permissions for a user by combining role-based permissions and individual permissions.
     *
     * @param user The user whose permissions need to be loaded
     * @return A Mono containing a list of unique user permissions
     */
    private Mono<List<UserPermission>> loadUserPermissions(User user) {
        roleRepository.findAllById(user.roles ?: [])
                .collectList()
                .map { roles ->
                    def list = roles.collectMany { x -> x.permissions }
                    list.addAll(user.individualPermissions)
                    list.unique()
                }
    }

    /**
     * Converts a Role entity to a RoleDto.
     *
     * @param role the role entity to convert
     * @return a Mono containing the converted RoleDto with associated users
     */
    private Mono<RoleDto> toRoleDto(Role role) {
        userRepository.findAllByRolesContaining(role.name)
                .map { it.username }
                .collectList()
                .map { users ->
                    new RoleDto(
                            name: role.name,
                            description: role.description,
                            permissions: role.permissions.toList(),
                            users: users
                    )
                }
    }


    /**
     * Retrieves all available user permissions as a Flux of PermissionDto objects.
     *
     * @return Flux containing PermissionDto objects representing all possible user permissions
     */
    Flux<PermissionDto> permissions() {

        Flux.fromArray(UserPermission.values())
                .map { permission ->
                    new PermissionDto(
                            name: permission.name(),
                            description: permission.description
                    )
                }
    }
}