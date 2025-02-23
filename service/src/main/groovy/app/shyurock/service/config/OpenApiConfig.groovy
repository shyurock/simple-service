package app.shyurock.service.config

import io.swagger.v3.oas.models.Components
import io.swagger.v3.oas.models.OpenAPI
import io.swagger.v3.oas.models.Operation
import io.swagger.v3.oas.models.PathItem
import io.swagger.v3.oas.models.media.ArraySchema
import io.swagger.v3.oas.models.media.Content
import io.swagger.v3.oas.models.media.IntegerSchema
import io.swagger.v3.oas.models.media.MediaType
import io.swagger.v3.oas.models.media.ObjectSchema
import io.swagger.v3.oas.models.media.Schema
import io.swagger.v3.oas.models.media.StringSchema
import io.swagger.v3.oas.models.parameters.RequestBody
import io.swagger.v3.oas.models.responses.ApiResponse
import io.swagger.v3.oas.models.responses.ApiResponses
import org.springdoc.core.customizers.OperationCustomizer
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.web.method.HandlerMethod

@Configuration
class OpenApiConfig {
    @Bean
    OpenAPI openAPI() {
        def loginPath = new PathItem()
                .post(new Operation(
                        tags: ['auth-controller'],
                        operationId: 'login',
                        responses: new ApiResponses().addApiResponse('200', new ApiResponse()),
                        requestBody: new RequestBody()
                                .content(new Content()
                                        .addMediaType(org.springframework.http.MediaType.APPLICATION_FORM_URLENCODED_VALUE,
                                                new MediaType().schema(new Schema().properties([
                                                        'username': new Schema().type('string'),
                                                        'password': new Schema().type('string')
                                                ]))))
                ))

        def logOutPath = new PathItem()
                .post(new Operation(
                        operationId: 'logout',
                        tags: ['auth-controller'],
                        responses: new ApiResponses().addApiResponse('200', new ApiResponse())
                ))

        new OpenAPI()
                .path('/api/login', loginPath)
                .path('/api/logout', logOutPath)
                .components(
                    new Components()
                            .addSchemas('ApiErrorResponse', new ObjectSchema()
                                    .addProperty('status', new IntegerSchema())
                                    .addProperty('code', new StringSchema())
                                    .addProperty('message', new StringSchema())
                                    .addProperty('fieldErrors', new ArraySchema()
                                            .items(new Schema().$ref('ApiFieldError'))
                                    )
                            )
                            .addSchemas('ApiFieldError', new ObjectSchema()
                                    .addProperty('code', new StringSchema())
                                    .addProperty('message', new StringSchema())
                                    .addProperty('property', new StringSchema())
                                    .addProperty('rejectedValue', new ObjectSchema())
                                    .addProperty('path', new StringSchema())
                            )
                )
    }

    @Bean
    OperationCustomizer operationCustomizer() {
        new OperationCustomizer() {

            @Override
            Operation customize(Operation operation, HandlerMethod handlerMethod) {
                operation.getResponses().addApiResponse('4xx/5xx', new ApiResponse()
                        .description('Error')
                        .content(new Content().addMediaType('*/*', new MediaType().schema(
                                new Schema().$ref('ApiErrorResponse'))
                        )))
                operation
            }
        }
    }
}
