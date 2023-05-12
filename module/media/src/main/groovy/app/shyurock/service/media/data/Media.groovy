package app.shyurock.service.media.data

import app.shyurock.service.core.data.BaseEntity
import org.bson.types.Binary
import org.springframework.data.mongodb.core.index.Indexed
import org.springframework.data.mongodb.core.mapping.Document

import java.time.Duration

@Document
class Media extends BaseEntity {
    @Indexed(unique = true)
    String path

    int size
    Binary content
    String contentType
    String filename
    boolean readOnly
    String ext

    Duration cacheControlTime = Duration.ofHours(4)
}
