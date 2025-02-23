package app.shyurock.service

import org.springframework.boot.SpringApplication
import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.data.mongodb.config.EnableReactiveMongoAuditing

@EnableReactiveMongoAuditing
@SpringBootApplication
class MainApplication {

	static void main(String[] args) {
		SpringApplication.run(MainApplication, args)
	}
}
