Here's the setup instructions and API documentation in markdown format, with a placeholder for the deployed website link:

```markdown
# Todo Application Setup Instructions

## Clone the Repository

1. Clone the repository and navigate to the project directory.

## Install Dependencies

2. Run the following command to install dependencies:
   ```bash
   npm install
   ```

## Set Up PostgreSQL Database

3. Set up your PostgreSQL database.

## Configure Environment Variables

4. Create a `.env` file in the root directory with the following content:
   ```env
   DATABASE_URL="postgresql://username:password@localhost:5432/todo_db?schema=public"
   JWT_SECRET="your-secret-key"
   PORT=3000
   ```
   Replace the database credentials with your own.

## Generate Prisma Client

5. Generate the Prisma client by running:
   ```bash
   npx prisma generate
   ```

## Run Database Migrations

6. Run database migrations:
   ```bash
   npx prisma migrate dev
   ```

## Build the TypeScript Code

7. Build the TypeScript code:
   ```bash
   npm run build
   ```

## Start the Server

8. Start the server:
   ```bash
   npm start
   ```

## Development with Auto-Reloading

For development with auto-reloading:
   ```bash
   npm run dev
   ```

The API will be available at [http://localhost:3000](http://localhost:3000).

## [Deployed Website](#) (Replace with your deployed link)

---

# API Documentation

## 1. User Registration

- **Endpoint:** `POST /api/auth/register`
- **Description:** Register a new user
- **Request body:**
  ```json
  {
    "email": "user@example.com",
    "password": "password123",
    "name": "John Doe"
  }
  ```
- **Response:**
  ```json
  {
    "user": {
      "id": 1,
      "email": "user@example.com",
      "name": "John Doe"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
  ```

## 2. User Login

- **Endpoint:** `POST /api/auth/login`
- **Description:** Authenticate a user
- **Request body:**
  ```json
  {
    "email": "user@example.com",
    "password": "password123"
  }
  ```
- **Response:**
  ```json
  {
    "user": {
      "id": 1,
      "email": "user@example.com",
      "name": "John Doe"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
  ```

## 3. Create Todo

- **Endpoint:** `POST /api/todos`
- **Description:** Create a new todo item
- **Headers:** `Authorization: Bearer <token>`
- **Request body:**
  ```json
  {
    "title": "Buy groceries",
    "description": "Milk, eggs, bread"
  }
  ```
- **Response:**
  ```json
  {
    "id": 1,
    "title": "Buy groceries",
    "description": "Milk, eggs, bread",
    "status": false,
    "userId": 1,
    "createdAt": "2023-05-10T12:00:00.000Z",
    "updatedAt": "2023-05-10T12:00:00.000Z"
  }
  ```

## 4. Get All Todos

- **Endpoint:** `GET /api/todos`
- **Description:** Retrieve all todos for the authenticated user
- **Headers:** `Authorization: Bearer <token>`
- **Query parameters:**
  - `status`: boolean (optional)
  - `search`: string (optional)
- **Response:**
  ```json
  [
    {
      "id": 1,
      "title": "Buy groceries",
      "description": "Milk, eggs, bread",
      "status": false,
      "userId": 1,
      "createdAt": "2023-05-10T12:00:00.000Z",
      "updatedAt": "2023-05-10T12:00:00.000Z"
    },
    ...
  ]
  ```

## 5. Get Todo by ID

- **Endpoint:** `GET /api/todos/:id`
- **Description:** Retrieve a specific todo by ID
- **Headers:** `Authorization: Bearer <token>`
- **Response:**
  ```json
  {
    "id": 1,
    "title": "Buy groceries",
    "description": "Milk, eggs, bread",
    "status": false,
    "userId": 1,
    "createdAt": "2023-05-10T12:00:00.000Z",
    "updatedAt": "2023-05-10T12:00:00.000Z"
  }
  ```

## 6. Update Todo

- **Endpoint:** `PUT /api/todos/:id`
- **Description:** Update a specific todo
- **Headers:** `Authorization: Bearer <token>`
- **Request body:**
  ```json
  {
    "title": "Buy groceries",
    "description": "Milk, eggs, bread, cheese",
    "status": true
  }
  ```
- **Response:**
  ```json
  {
    "id": 1,
    "title": "Buy groceries",
    "description": "Milk, eggs, bread, cheese",
    "status": true,
    "userId": 1,
    "createdAt": "2023-05-10T12:00:00.000Z",
    "updatedAt": "2023-05-10T13:00:00.000Z"
  }
  ```

## 7. Delete Todo

- **Endpoint:** `DELETE /api/todos/:id`
- **Description:** Delete a specific todo
- **Headers:** `Authorization: Bearer <token>`
- **Response:** `204 No Content`

---

**Note:** Replace `<token>` with the actual JWT token received from the login or register endpoint.
```

Replace the placeholder link for the deployed website with your actual deployed URL once available.
