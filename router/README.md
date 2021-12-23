<!-- omit in toc -->
# **API endpoints**

## **Breafly about realization**

The authorization based on JWT([JSON Web Tokens](https://jwt.io/ "jwt.io"))

To store ACCESS token I use cookies.
To store REFRESH token I use httpOnly cookies.

Endpoints list:

- [`Registration`](#registration)
- [`Log-in`](#log-in)
- [`Log-out`](#log-out)
- [`Refresh`](#refresh)
- [`Users`](#users)

## **Registration**

URL:

```http
POST /auth/sign-up
```

Body:

```json
{
    "username": "<useraneme>",
    "emial": "<email>",
    "password": "<password>"
}
```

| Name | Type | Description |
| :--- | :--- | :--- |
| `username` | `string` | Username |
| `email` | `string` | User email |
| `password` | `string` | User password |

Return:

```json
{
    "id": "<user_id>",
    "email": "<email>",
    "username": "<username>",
    "accessToken": "<token>"
}
```

| Name | Type | Description |
| :--- | :--- | :--- |
| `id` | `int` | User id in database |
| `username` | `string` | Username |
| `email` | `string` | User email |
| `accessToken` | `string` | ACCESS token |

Also it set refreshToken in cookies, as **httpOnly** cookie.

## **Log-in**

URL:

```http
POST /auth/log-in
```

Body:

```json
{
    "email": "<email>",
    "password": "<password>"
}
```

| Name | Type | Description |
| :--- | :--- | :--- |
| `email` | `string` | User email |
| `password` | `string` | User password |

## **Log-out**

URL:

```http
DELETE /auth/log-out
```

Has not body, it just delete your ACCESS and REFRESH tokens, also it delete REFRESH token from database.

## **Refresh**

URL:

```http
GET /auth/refresh
```

Return:

| Name | Type | Description |
| :--- | :--- | :--- |
| `id` | `int` | User id in database |
| `username` | `string` | Username |
| `email` | `string` | User email |
| `accessToken` | `string` | ACCESS token |

## **Users**

URL:

```http
GET /auth/users
```

Test endpoint. Require ACCESS token.

Return:

```json
[
    {
        "id": 1,
        "username": "example1",
        "email": "example1@gmail.com",
        "password": "$2b$04$M/cbbN2ZW0DUytrmF..."
    },
    {
        "id": 2,
        "username": "example2",
        "email": "example2@gmail.com",
        "password": "$2b$04$LMsSfdDCJONTBjIrp..."
    },
    {
        "id": 3,
        "username": "example3",
        "email": "example3@gmail.com",
        "password": "$2b$04$gFqVnZ61YsLIgZRZp..."
    }
]
```
