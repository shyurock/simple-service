package app.shyurock.service.user.controller


import app.shyurock.service.user.data.model.User
import groovy.util.logging.Slf4j
import org.springframework.web.bind.annotation.*
import reactor.core.publisher.Flux
import reactor.core.publisher.Mono

@Slf4j
@RestController
class UserController {

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
