package app.shyurock.service.user.controller

import app.shyurock.service.user.data.model.Role
import groovy.util.logging.Slf4j
import org.springframework.web.bind.annotation.*
import reactor.core.publisher.Flux
import reactor.core.publisher.Mono

@Slf4j
@RestController
class RoleController {

    @GetMapping('/api/roles')
    Flux<Role> roles() {
        Flux.empty()
    }

    @PostMapping('/api/roles')
    Mono<Role> addRole(@RequestBody Role role) {
        Mono.empty()
    }

    @PutMapping('/api/roles/{name}')
    Mono<Role> updateRole(@PathVariable String name,
                          @RequestBody Role role) {
        Mono.empty()
    }
}
