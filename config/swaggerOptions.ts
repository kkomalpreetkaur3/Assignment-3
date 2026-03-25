import swaggerJsdoc from "swagger-jsdoc";

const swaggerOptions = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "API Documentation",
            version: "1.0.0",
            description: "API docs",
        },
        servers: [
            {
                url: process.env.SWAGGER_SERVER_URL,
            },
        ],
    },
    apis: ["./src/api/v1/routes/*.ts", "./src/api/v1/validation/*.ts"],
};

export const generateSwaggerSpec = () => swaggerJsdoc(swaggerOptions);