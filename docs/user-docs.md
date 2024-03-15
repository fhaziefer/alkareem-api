# ALKAREEM API DOCUMENTATION

- **HOST**: `https://api.alkareemlirboyo.com`

## Register New User

### Endpoint

- **Method**: `POST`
- **URL**: `/register`

### Parameters

| Parameter  | Description             |
|------------|-------------------------|
| `username` | New user's username.    |
| `password` | New user's password.    |

### Example Request

```http
POST /register HTTP/1.1
Content-Type: application/json

{
  "username": "test",
  "password": "test12345678"
}
```

### Validation

- **Username**: Alphanumeric, minimum 3 characters, must be unique.
- **Password**: Minimum 8 characters.

### Example Success Response

```json
{
  "data": {
    "id": "12a14b93-41cc-4df9-afcc-3f168ce7a059",
    "username": "test"
  }
}
```

### Example Error Response

```json
{
  "errors": "Response Error"
}
```

## User Login

### Endpoint

- **Method**: `POST`
- **URL**: `/login`

### Parameters

| Parameter  | Description                |
|------------|----------------------------|
| `username` | Registered user's username.|
| `password` | User's password.           |

### Example Request

```http
POST /login HTTP/1.1
Content-Type: application/json

{
  "username": "test",
  "password": "test12345678"
}
```

### Validation

- **Username**: Must use a registered username.
- **Password**: Minimum 8 characters.

### Example Success Response

```json
{
  "data": {
    "id": "5a1a6cac-7bc1-4758-b00b-fbaa9cdedc86",
    "username": "test",
    "token": "cdedca70-3072-41c0-a52d-b39ac6488867"
  }
}
```

### Example Error Response

```json
{
  "errors": "Username or password is wrong"
}
```

## Get Current User Data

Get data of the currently logged-in user using authorization token.

### Endpoint

- **Method**: `GET`
- **URL**: `/user/current`

### Parameter

- **Authorization**: Token for authorization. Must be included in the request header.

### Example Request

```http
GET /user/current HTTP/1.1
Authorization: 3f3d7761-7d45-44ac-a440-e5896c4492a4
Accept: application/json
Content-Type: application/json
```

### Example Success Response

```json
{
  "data": {
    "id": "46e10066-b11f-4b1d-b6c5-e13ffc1207e1",
    "username": "test"
  }
}
```

### Example Error Response

```json
{
  "errors": "Unauthorized"
}
```

## Get All Registered Users' Data

Get data of all registered users using authorization token.

### Endpoint

- **Method**: `GET`
- **URL**: `/user`

### Parameter

- **Authorization**: Token for authorization. Must be included in the request header.

### Example Request

```http
GET /user HTTP/1.1
Authorization: 3f3d7761-7d45-44ac-a440-e5896c4492a4
Accept: application/json
Content-Type: application/json
```

### Example Success Response

```json
{
  "data": [
    {
      "id": "26ab8784-90cd-483f-ae00-3dd886ca0a2a",
      "username": "user1"
    },
    {
      "id": "b6ed4621-036e-48ba-b978-f1588ff8f5c7",
      "username": "user2"
    },
    {
      "id": "d021b4ba-92ed-47a6-ae3b-e53055b59d7b",
      "username": "user3"
    }
  ]
}
```

### Example Error Response

```json
{
  "errors": "Unauthorized"
}
```

## Update Current User Data

Update data of the currently logged-in user using authorization token.

### Endpoint

- **Method**: `PATCH`
- **URL**: `/user/current`

### Parameters

| Parameter  | Description             |
|------------|-------------------------|
| `Authorization` | Token for authorization.|
| `password` | New user's password.    |

### Example Request

```http
PATCH /user/current HTTP/1.1
Authorization: 3f3d7761-7d45-44ac-a440-e5896c4492a4
Accept: application/json
Content-Type: application/json

{
  "password": "test12345678"
}
```

### Validation

- **Username**: Alphanumeric, minimum 3 characters, must be unique.
- **Password**: Minimum 8 characters.

### Example Success Response

```json
{
  "data": "User data is successfully updated"
}
```

### Example Error Response

```json
{
  "errors": "Unauthorized"
}
```

## User Logout

Logout the currently logged-in user using authorization token.

### Endpoint

- **Method**: `DELETE`
- **URL**: `/logout`

### Parameter

- **Authorization**: Token for authorization. Must be included in the request header.

### Example Request

```http
DELETE /logout HTTP/1.1
Authorization: 3f3d7761-7d45-44ac-a440-e5896c4492a4
Accept: application/json
Content-Type: application/json
```

### Example Success Response

```json
{
  "data": "User is logged out"
}
```

### Example Error Response

```json
{
  "errors": "Unauthorized"
}
```