package app.shyurock.service.controller

import io.swagger.v3.oas.annotations.Parameter

class TestDto {
    @Parameter(description = "Інформація про параметр", example = 'John')
    String name
    String old
}
