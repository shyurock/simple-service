package app.shyurock.service.media


import groovy.util.logging.Slf4j
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.core.io.buffer.DataBufferUtils
import org.springframework.http.CacheControl
import org.springframework.http.MediaType
import org.springframework.http.ResponseEntity
import org.springframework.http.codec.multipart.FilePart
import org.springframework.http.server.reactive.ServerHttpRequest
import org.springframework.web.bind.annotation.*
import reactor.core.publisher.Mono
import reactor.core.scheduler.Schedulers

@Slf4j
@RestController
class MediaController {
    @Autowired private MediaService mediaFileService

    @GetMapping('/media/**')
    Mono<ResponseEntity> getFile(ServerHttpRequest request) {
        def path = request.path
                .toString()
                .replaceAll('/media', '')
                .replaceAll(/\/+/, '/')
        log.info("Request media file by name $path")
        mediaFileService.findByPath(path)
                    .map {file ->
                        ResponseEntity.ok()
                                .contentType(MediaType.valueOf(file.contentType ?: MediaType.TEXT_PLAIN.toString()))
                                .cacheControl(CacheControl.maxAge(file.cacheControlTime))
                                .body(file.content.data)
                    }
                    .defaultIfEmpty(ResponseEntity.notFound().build())
    }

    @PostMapping('/media')
    Mono<ResponseEntity> uploadFile(@RequestPart('file') FilePart file, @RequestParam String path) {
        log.info("Uploading file ${file.filename()} to path $path")
        DataBufferUtils.join(file.content())
                .subscribeOn(Schedulers.boundedElastic())
                .flatMap { buffer ->
                    mediaFileService.saveFile(path, file.filename(), file.headers()?.getContentType(), buffer.asInputStream())
                }
                .map {
                    ResponseEntity.ok("/media${it.path}".toString())
                }
    }
}
