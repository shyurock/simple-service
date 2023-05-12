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
        mediaFileRepository.findByPath(path)
                .defaultIfEmpty(new Media(
                        cacheControlTime: Duration.ofHours(4),
                        path            : path,
                        readOnly        : false
                ))
                .filter { !it.readOnly }
                .flatMap {file ->
                        mediaFileRepository.save(file.tap {
                            content = new Binary(data)
                            size = data.size()
                            filename = fileName
                            contentType = type.toString()
                        })
                }
                .switchIfEmpty(Mono.error(new FileAlreadyExistsException("File read only")))
    }
}
