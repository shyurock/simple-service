package app.shyurock.service.user.service

import app.shyurock.service.user.data.model.User
import app.shyurock.service.user.data.repository.RoleRepository
import app.shyurock.service.user.data.repository.UserRepository
import groovy.util.logging.Slf4j
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service
import reactor.core.publisher.Mono

@Slf4j
@Service
class UserService {
    @Autowired private UserRepository userRepository
    @Autowired private RoleRepository roleRepository

    Mono<User> findUserByName(String username) {
        userRepository.finByUsername(username)
    }
}
