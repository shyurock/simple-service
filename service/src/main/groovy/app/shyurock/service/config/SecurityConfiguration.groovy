package app.shyurock.service.config

import app.shyurock.service.user.service.UserService
import groovy.util.logging.Slf4j
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.security.core.userdetails.ReactiveUserDetailsService
import org.springframework.security.core.userdetails.User
import org.springframework.security.core.userdetails.UserDetails
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder
import org.springframework.security.crypto.password.PasswordEncoder
import reactor.core.publisher.Mono

@Slf4j
@Configuration
class SecurityConfiguration {

    @Bean
    PasswordEncoder passwordEncoder() {
        new BCryptPasswordEncoder()
    }

    @Bean
    ReactiveUserDetailsService userDetailsService(UserService userService) {
        new ReactiveUserDetailsService() {
            @Override
            Mono<UserDetails> findByUsername(String username) {
                userService.findUserByName(username)
                        .map {user ->
                            log.debug("User by $username found, try auth")
                            User.withUsername(username)
                                    .password(user.passwordHash)
                                    .build()
                        }
                        .doOnSubscribe { log.info("Try log in with username $username") }
            }
        }
    }
}
