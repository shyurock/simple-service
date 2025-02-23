package app.shyurock.service

import groovy.transform.CompileStatic
import org.springframework.core.io.ClassPathResource
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RestController
import reactor.core.publisher.Mono

@RestController
@CompileStatic
class ForwardController {

    @GetMapping("/{path:^(?!api).*\$}")
    Mono<ResponseEntity<ClassPathResource>> forward() {
        return Mono.just(ResponseEntity.ok(new ClassPathResource("static/index.html")));
    }
}
