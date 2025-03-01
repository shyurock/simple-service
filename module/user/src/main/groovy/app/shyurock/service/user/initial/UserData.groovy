package app.shyurock.service.user.initial


import app.shyurock.service.user.data.model.User
import app.shyurock.service.user.data.model.UserPermission
import app.shyurock.service.user.data.repository.RoleRepository
import app.shyurock.service.user.data.repository.UserRepository
import groovy.util.logging.Slf4j
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.context.event.ContextRefreshedEvent
import org.springframework.context.event.EventListener
import org.springframework.security.crypto.password.PasswordEncoder
import org.springframework.stereotype.Component
import reactor.core.publisher.Mono

@Slf4j
@Component
class UserData {
    final ADMIN_USER_NAME = 'admin'
    final ADMIN_USER_PASSWORD = 'admin'

    @Autowired private UserRepository userRepository
    @Autowired private RoleRepository roleRepository
    @Autowired private PasswordEncoder passwordEncoder

    @EventListener
    void contextRefresh(ContextRefreshedEvent event) {
        createAdminUser()
                .onErrorResume {
                    log.error(it.message)
                    Mono.just(false)
                }
                .block()
    }

    private Mono<User> createAdminUser() {
        userRepository.findByUsername(ADMIN_USER_NAME)
            .switchIfEmpty(
                userRepository.save(new User(
                    username: ADMIN_USER_NAME,
                    passwordHash: passwordEncoder.encode(ADMIN_USER_PASSWORD),
                    individualPermissions: [UserPermission.ADMIN]
                ))
            )
    }
}
