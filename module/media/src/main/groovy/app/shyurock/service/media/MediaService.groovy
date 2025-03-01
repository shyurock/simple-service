package app.shyurock.service.media

import app.shyurock.service.media.data.Media
import app.shyurock.service.media.data.MediaRepository
import groovy.util.logging.Slf4j
import org.bson.types.Binary
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.MediaType
import org.springframework.stereotype.Service
import reactor.core.publisher.Mono

import java.nio.file.FileAlreadyExistsException
import java.time.Duration

@Slf4j
@Service
class MediaService {
    @Autowired private MediaRepository mediaFileRepository

    Mono<Media> findByPath(String path) {
        mediaFileRepository.findByPath(path)
    }

    Mono<Media> saveFile(String path, String fileName, MediaType type, InputStream stream) {
        saveFile(path, fileName, type, stream.readAllBytes())
    }

    Mono<Media> saveFile(String path, String fileName, MediaType type, byte[] data) {
        def newMedia = new Media(
                cacheControlTime: Duration.ofHours(4),
                path: path,
                readOnly: false
        )

        mediaFileRepository.findByPath(path)
                .defaultIfEmpty(newMedia)
                .filter { !it.readOnly }
                .map { file ->
                    file.content = new Binary(data)
                    file.size = data.size()
                    file.filename = fileName 
                    file.contentType = type.toString()
                    file
                }
                .flatMap { mediaFileRepository.save(it) }
                .switchIfEmpty(Mono.error(new FileAlreadyExistsException("Файл тільки для читання")))
    }
}
