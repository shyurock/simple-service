package app.shyurock.service.user.data.model

import app.shyurock.service.core.data.BaseEntity
import org.springframework.data.mongodb.core.index.Indexed
import org.springframework.data.mongodb.core.mapping.Document

@Document
class Role extends BaseEntity {
    @Indexed(unique = true)
    String name
    Set<String> permissions = []
}
