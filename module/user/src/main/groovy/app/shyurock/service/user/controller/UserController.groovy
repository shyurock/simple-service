package app.shyurock.service.user.controller


import app.shyurock.service.user.dto.RoleDto
import app.shyurock.service.user.dto.UserDto
import app.shyurock.service.user.dto.UserInfo
import app.shyurock.service.user.service.UserService
import groovy.util.logging.Slf4j
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.security.core.Authentication
import org.springframework.web.bind.annotation.*
import reactor.core.publisher.Flux
import reactor.core.publisher.Mono

@Slf4j
@RestController
class UserController {
    @Autowired private UserService userService

    /**
     * Gets information about the current user
     * @param auth Authentication object
     * @return Mono with user information
     */
    @GetMapping('/api/users/me')
    Mono<UserInfo> userInfo(Authentication auth) {

        userService.userInfoByName(auth.name)
    }

    /**
     * Gets a list of all users
     * @return Flux with the list of users
     */
    @GetMapping('/api/users')
    Flux<UserDto> users() {

        userService.users()
    }

    /**
     * Creates a new user
     * @param authentication Authentication object
     * @param user New user data
     * @return Mono with the created user
     */
    @PostMapping('/api/users')
    Mono<UserDto> updateUser(Authentication authentication, @RequestBody UserDto user) {

        log.info("Adding new user: {}", user.username)
        userService.updateOrCreateUser(authentication.name, user)
    }

    /**
     * Deletes an existing user
     * @param username Username of the user to delete
     * @return Mono<Void> indicating completion
     */
    @DeleteMapping('/api/users/{username}')
    Mono<Void> deleteUser(@PathVariable String username) {

        log.info("Deleting user: {}", username)
        userService.deleteUser(username)
    }

    /**
     * Retrieves all roles.
     *
     * @return a Flux of all roles
     */
    @GetMapping('/api/roles')
    Flux<RoleDto> roles() {
        userService.roles()
    }

    /**
     * Adds a new role.
     *
     * @param authentication Authentication object
     * @param role the role to add
     * @return a Mono with the added role
     */
    @PostMapping('/api/roles')
    Mono<RoleDto> updateRole(Authentication authentication, @RequestBody RoleDto role) {

        log.info("Adding new role: {}", role.name)
        userService.updateOrCreateRole(authentication.name, role)
    }

    /**
     * Deletes an existing role.
     *
     * @param authentication Authentication object
     * @param name the name of the role to delete
     * @return a Mono<Void> indicating completion
     */
    @PutMapping('/api/roles/{name}')
    Mono<Void> deleteRole(Authentication authentication, @PathVariable String name) {

        log.info("Deleting role: {}", name)
        userService.deleteRole(authentication.name, name)
    }
}
