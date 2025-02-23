package app.shyurock.service.user.service

import app.shyurock.service.user.data.model.User
import app.shyurock.service.user.data.repository.RoleRepository
import app.shyurock.service.user.data.repository.UserRepository
import app.shyurock.service.user.dto.UserInfo
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
        userRepository.findByUsername(username)
    }

    Mono<UserInfo> userInfoByName(String username) {
        userRepository.findByUsername(username)
            .map { user ->
                new UserInfo(
                        name        : "${user.profile?.firstName} ${user.profile?.lastName}".toString() ?: username,
                        avatar      : user.profile?.avatar ?: '',
                        permissions : user.permission?.permissions ?: []
                )
            }
    }
}
