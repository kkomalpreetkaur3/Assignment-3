# Event Management API

## Project Overview

This API allows users to manage events by creating, updating, retrieving, and deleting event data. It provides structured storage for event details such as name, date, capacity, category, and status.

The API solves the problem of organizing and managing event information in a consistent and validated way. It ensures proper data validation using Joi and provides clear API documentation using OpenAPI and Swagger.

This API is designed for developers who want to integrate event management functionality into their applications, such as booking systems, event platforms, or internal tools.

---

## Installation Instructions

### Prerequisites
- Node.js
- npm

### Setup Steps

1. Install dependencies:
   ```bash
   npm install
  ```   
2. Create a `.env` file in the root directory and add the following environment variables:
   NODE_ENV=development
   PORT=3000
   SWAGGER_SERVER_URL=http://localhost:3000/api/v1
3. start the server:
   ```bash
   npm run dev
   ```

## API Response Examples

1. Get All Events

   Request:
   curl -X GET http://localhost:3000/api/v1/events
   
   Response (200 OK):
   {
    "message": "Events retrieved successfully",
    "data": []
   }

2. Create Event

   Request:
    curl -X POST http://localhost:3000/api/v1/events \
    Headers: Content-Type: application/json \
    Body: {
    "name": "Tech Conference",
    "date": "2026-04-01T10:00:00Z",
    "capacity": 100
    }'

    Response (201 Created):
    {
     "message": "Event created successfully",
     "data": {
      "id": "123",
      "name": "Tech Conference"
    }
  }

3. Get Event By ID

   Request:
   curl -X GET http://localhost:3000/api/v1/events/123

   Response (200 OK):
   {
    "message": "Event retrieved successfully",
    "data": {
     "id": "123",
     "name": "Tech Conference"
    }
   }

## Link to Public Documentation

   Full API documentation link:
   https://kkomalpreetkaur3.github.io/Assignment-3/

## Local Documentation Access

   After starting the server, access the API documentation at:
   http://localhost:3000/api-docs