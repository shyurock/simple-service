package app.shyurock.service.config

import app.shyurock.service.user.data.repository.UserRepository
import app.shyurock.service.user.service.UserService
import groovy.transform.CompileStatic
import groovy.util.logging.Slf4j
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.http.HttpStatus
import org.springframework.security.config.annotation.method.configuration.EnableReactiveMethodSecurity
import org.springframework.security.config.annotation.web.reactive.EnableWebFluxSecurity
import org.springframework.security.config.web.server.ServerHttpSecurity
import org.springframework.security.core.Authentication
import org.springframework.security.core.userdetails.ReactiveUserDetailsService
import org.springframework.security.core.userdetails.User
import org.springframework.security.core.userdetails.UserDetails
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder
import org.springframework.security.crypto.password.PasswordEncoder
import org.springframework.security.web.server.SecurityWebFilterChain
import org.springframework.security.web.server.WebFilterExchange
import org.springframework.security.web.server.authentication.HttpStatusServerEntryPoint
import org.springframework.security.web.server.authentication.ServerAuthenticationSuccessHandler
import org.springframework.security.web.server.authentication.logout.HttpStatusReturningServerLogoutSuccessHandler
import org.springframework.security.web.server.authentication.logout.ServerLogoutSuccessHandler
import org.springframework.security.web.server.authorization.HttpStatusServerAccessDeniedHandler
import reactor.core.publisher.Mono

@Slf4j
@Configuration
@EnableWebFluxSecurity
@EnableReactiveMethodSecurity
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
                log.info("Try log in with username $username")
                userService.findUserByName(username)
                        .map {user ->
                            log.debug("User by $username found, try auth")
                            User.withUsername(username)
                                    .password(user.passwordHash)
                                    .authorities(user.individualPermissions.collect {"ROLE_${it.name()}".toString() }.toArray() as String[])
                                    .build()
                        }
            }
        }
    }

    @Bean
    SecurityWebFilterChain securityWebFilterChain(ServerHttpSecurity http, UserRepository userRepository) {
        http
                .csrf().disable()
                .authorizeExchange {
                    it.pathMatchers('/actuator', '/actuator/**').permitAll()
                            .pathMatchers('/api/swagger/**').permitAll()
                            .pathMatchers('/*', '/assets/**').permitAll()
                            .pathMatchers('/api/login').permitAll()
                            .anyExchange().authenticated()
                }
                .formLogin {
                    it.loginPage('/api/login')
                            .authenticationSuccessHandler(new ServerAuthenticationSuccessHandler() {
                                @Override
                                Mono<Void> onAuthenticationSuccess(WebFilterExchange webFilterExchange, Authentication authentication) {
                                    userRepository.findById(authentication.name)
                                            .flatMap { user ->
                                                webFilterExchange.exchange.response.statusCode = HttpStatus.OK
                                                user.lastLoginDate = new Date()
                                                userRepository.save(user)
                                            }.then()
                                }
                            })
                            .authenticationFailureHandler { ex, e ->
                                Mono.error(new Exception())
                            }
                }
                .logout { ServerHttpSecurity.LogoutSpec spec ->
                    spec.logoutUrl('/api/logout')
                            .logoutSuccessHandler(new HttpStatusReturningServerLogoutSuccessHandler(HttpStatus.OK))
                }
                .exceptionHandling {
                    it.authenticationEntryPoint(new HttpStatusServerEntryPoint(HttpStatus.UNAUTHORIZED))
                            .accessDeniedHandler(new HttpStatusServerAccessDeniedHandler(HttpStatus.FORBIDDEN))
                }
                .build()
    }
}
