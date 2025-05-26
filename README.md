# Event-Buddy Documentation

This section lists the npm packages required for the Event-Buddy project:

- `@nestjs/typeorm`, `typeorm`, `pg`: Integrate TypeORM with NestJS and provide PostgreSQL database support.
- `@nestjs/config`: Manage and load environment variables and configuration in a NestJS application.
- `@nestjs/jwt`, `passport-jwt`, `@nestjs/passport`, `passport`, `bcrypt`: Implement authentication and authorization using JWT and Passport strategies, with bcrypt for password hashing.
- `@types/bcrypt`: TypeScript type definitions for bcrypt, used during development.
- `class-validator`, `class-transformer`: Enable validation and transformation of request/response objects using decorators.
- `@nestjs/swagger`, `swagger-ui-express`: Generate and serve OpenAPI (Swagger) documentation for the NestJS API.

Install these packages to enable database integration, configuration management, authentication, validation, and API documentation in your NestJS project.


```bash
npm install --save @nestjs/typeorm typeorm pg
npm install --save @nestjs/config
npm install --save @nestjs/jwt passport-jwt @nestjs/passport passport bcrypt
npm install --save-dev @types/bcrypt
npm i --save class-validator class-transformer
npm install --save @nestjs/swagger swagger-ui-express
```

# API Documentation

## Register


This section documents example payloads for user registration via the `/auth/register` endpoint on a local development server (`localhost:3000`). 
Two sample JSON objects are provided: one for registering a standard user and another for registering an admin user. 
Each object includes the required fields: `name`, `email`, `password`, and `role`. 
Replace the sample values with actual user data as needed when making registration requests.

API Endpoint: <code>localhost:3000/auth/register</code> ![Static Badge](https://img.shields.io/badge/POST-yellow?style=flat&logo=--)

```bash
{
  "name": "User",
  "email": "user2@example.com",
  "password": "securePassword123",
  "role": "user"
}

{
  "name": "Admin",
  "email": "admin@gmail.com",
  "password": "admin1234",
  "role": "admin"
}
```

## Login

The `/auth/login` API endpoint allows users to authenticate by providing their email and password. To log in, send a POST request to `localhost:3000/auth/login` with a JSON body containing the user's email and password. Upon successful authentication, the server responds with an authentication token and user information. Example login requests for both a standard user and an admin are shown below.

API Endpoint: <code>localhost:3000/auth/login</code> ![Static Badge](https://img.shields.io/badge/POST-yellow?style=flat&logo=--) ![Static Badge](https://img.shields.io/badge/Authorization-red?style=flat&logo=--)


```bash
{
  "email": "user5@gmail.com",
  "password": "securePassword123"
}

{
  "email": "admin@gmail.com",
  "password": "admin1234"
}
```

## Create Event

This section demonstrates how to create a new event using the Event Buddy API. To create an event, send a POST request to the endpoint `localhost:3000/events/create-event` with a JSON payload containing the event's title, description, date, time, location, total capacity, relevant tags, and an image URL. The example provided illustrates the required structure and fields for a successful event creation request.

API Endpoint: <code>localhost:3000/events/create-event</code> ![Static Badge](https://img.shields.io/badge/POST-yellow?style=flat&logo=--) ![Static Badge](https://img.shields.io/badge/Authorization-red?style=flat&logo=--)


```bash
{
  "title": "Yesterday Fest 2025",
  "description": "An unforgettable night of live performances.",
  "date": "2025-05-23T00:00:00.000Z",
  "time": "18:30",
  "location": "Dhaka Stadium",
  "totalCapacity": 5,
  "tags": ["music", "live", "festival"],
  "image": "https://example.com/event-banner.jpg"
}
```

## Get all events

This section documents the API endpoint available at <code>localhost:3000/events/get-all</code>. This endpoint is used to retrieve all event records from the system, providing clients with a comprehensive list of events currently stored in the database. It is typically accessed via a GET request and is essential for features that require displaying or managing multiple events.

API Endpoint: <code>localhost:3000/events/get-all</code> ![Static Badge](https://img.shields.io/badge/GET-green?style=flat&logo=--) ![Static Badge](https://img.shields.io/badge/Authorization-red?style=flat&logo=--)


## Update an event

This API endpoint, accessible via <code>localhost:3000/events/update/:id</code>, allows updating the details of an existing event by specifying its unique identifier in the URL path. The request body should include the updated event information such as title, description, date, time, location, total capacity, tags, and an image URL. All fields are expected to be provided in JSON format. This endpoint is useful for modifying event details after creation, ensuring that event information remains accurate and up-to-date.

API Endpoint: <code>localhost:3000/events/update/:id</code> ![Static Badge](https://img.shields.io/badge/PATCH-purple?style=flat&logo=--) ![Static Badge](https://img.shields.io/badge/Authorization-red?style=flat&logo=--)

```bash
{
  "title": "Yesterday Fest 2025",
  "description": "An unforgettable night of live performances.",
  "date": "2025-05-23T00:00:00.000Z",
  "time": "18:30",
  "location": "Dhaka Stadium",
  "totalCapacity": 5,
  "tags": ["music", "live", "festival"],
  "image": "https://example.com/event-banner.jpg"
}
```

## Delete an event

To delete an event, send a request to the API endpoint at <code>localhost:3000/events/delete/{id}</code>, replacing <code>{id}</code> with the unique identifier of the event you wish to remove. For example, to delete the event with an ID of 3, use <code>localhost:3000/events/delete/3</code>. This endpoint allows you to permanently remove an event from the system.

API Endpoint: <code>localhost:3000/events/delete/3</code> ![Static Badge](https://img.shields.io/badge/DELETE-orange?style=flat&logo=--)
 ![Static Badge](https://img.shields.io/badge/Authorization-red?style=flat&logo=--)


## Get upcoming events

This endpoint retrieves a list of upcoming events, providing clients with information about events that are scheduled to occur in the future. It is typically accessed via a GET request and is essential for features that require displaying or managing future events.

API Endpoint: <code>localhost:3000/events/upcoming/</code> ![Static Badge](https://img.shields.io/badge/GET-green?style=flat&logo=--)



## Get past events

This endpoint retrieves a list of past events, providing clients with information about events that have already occurred. It is typically accessed via a GET request and is essential for features that require displaying or managing historical events.

API Endpoint: <code>localhost:3000/events/past/</code> ![Static Badge](https://img.shields.io/badge/GET-green?style=flat&logo=--)


## Get event by ID

This API endpoint allows you to retrieve detailed information about a specific event by its unique identifier. To use this endpoint, send a GET request to `localhost:3000/events/details/:id`, replacing `:id` with the actual ID of the event you want to fetch. This is useful for obtaining comprehensive details about a particular event, such as its title, description, date, time, location, and other relevant information.

API Endpoint: <code>localhost:3000/events/details/7</code> ![Static Badge](https://img.shields.io/badge/GET-green?style=flat&logo=--)


## Book an event


This section describes how to book an event using the Event Buddy API. To book an event, send a POST request to the endpoint `localhost:3000/bookings/book-event` with a JSON payload containing the `eventId` of the event you wish to book and the number of `seats` you want to reserve. The example provided illustrates the required structure and fields for a successful booking request.

API Endpoint: <code>localhost:3000/bookings/book-event</code> ![Static Badge](https://img.shields.io/badge/POST-yellow?style=flat&logo=--) ![Static Badge](https://img.shields.io/badge/Authorization-red?style=flat&logo=--)

```bash
{
  "eventId": 7,
  "seats": 5
}
```

## Display booked events

This section describes the API endpoint for displaying booked events. To retrieve a list of events that a user has booked, send a GET request to `localhost:3000/bookings/my-bookings`. This endpoint will return all events associated with the authenticated user, allowing them to view their bookings and manage their event participation.

API Endpoint: <code>localhost:3000/bookings/my-bookings</code> ![Static Badge](https://img.shields.io/badge/GET-green?style=flat&logo=--) ![Static Badge](https://img.shields.io/badge/Authorization-red?style=flat&logo=--)
