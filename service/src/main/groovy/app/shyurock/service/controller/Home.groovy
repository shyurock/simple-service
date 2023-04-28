package app.shyurock.service.controller


import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.RestController
import reactor.core.publisher.Mono

@RestController
class Home {

    @GetMapping('/api/test')
    Mono<TestDto> test(@RequestParam String test) {
      Mono.just(new TestDto())
    }
}
