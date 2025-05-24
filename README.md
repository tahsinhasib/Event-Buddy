# Event-Buddy

npm install --save @nestjs/typeorm typeorm pg
npm install --save @nestjs/config
npm install --save @nestjs/jwt passport-jwt @nestjs/passport passport bcrypt
npm install --save-dev @types/bcrypt
npm i --save class-validator class-transformer
npm install --save @nestjs/swagger swagger-ui-express


Event Buddy API

localhost:3000/auth/register
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

localhost:3000/auth/login
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

localhost:3000/events/create-event
```bash
{
  "title": ".NET Conference 2025",
  "description": "A full-day event on .NET practices.",
  "date": "2025-08-10T10:00:00.000Z",
  "totalCapacity": 50,
  "tags": ["csharp", "frontend", "backend"]
}
```

