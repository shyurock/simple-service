package app.shyurock.service.user.controller


import app.shyurock.service.user.data.model.User
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

    @GetMapping('/api/users/me')
    Mono<UserInfo> userInfo(Authentication auth) {
        userService.userInfoByName(auth.name)
    }

    @GetMapping('/api/users')
    Flux<User> users() {
        Flux.empty()
    }

    @PostMapping('/api/users')
    Mono<User> addUser(@RequestBody User user) {
        Mono.empty()
    }

    @PutMapping('/api/users/{username}')
    Mono<User> updateUser(@PathVariable String username,
                          @RequestBody User user) {
        Mono.empty()
    }
}
