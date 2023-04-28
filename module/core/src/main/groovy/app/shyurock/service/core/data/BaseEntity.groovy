package app.shyurock.service.core.data

import org.springframework.data.annotation.CreatedDate
import org.springframework.data.annotation.Id
import org.springframework.data.annotation.LastModifiedDate
import org.springframework.data.annotation.Version

class BaseEntity {
    @Id
    String id

    @CreatedDate
    Date createdAt

    @LastModifiedDate
    Date updatedAt

    @Version
    long version
}
