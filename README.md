# Website

active-server-api

# Active (Server Side)

## Endpoints :

List of available endpoints:

- `POST /register`
- `POST /login`
- `POST /workout`
- `GET /analytics`
  &nbsp;


### 6. GET /articles

Description:

- Get articles, this endpoint can be accessed with access_token

Request:

- headers:

```json
{
  "access_token": "string"
}
```

_Response (200 - OK)_

```json
{
  "title": "string",
  "description": "string",
  "date": "string",
  "imageUrl": "string"
}
```

&nbsp;

### 7. GET /posts

Description:

- Get posts, this endpoint can be accessed with access_token

Request:

- headers:

```json
{
  "access_token": "string"
}
```

_Response (200 - OK)_

```json
{
  "UserId": "string",
  "description": "string",
  "date": "string",
  "imageUrl": "string"
}
```

&nbsp;

### 8. POST /posts

Description:

- Create posts, this endpoint can be accessed with access_token

Request:

- headers:

```json
{
  "access_token": "string"
}
```

- body:

```json
{
  "thumbnail": "string",
  "caption": "string",
  "likes": [Like],
  "comments": [Comment]

}
```

_Response (201 - Created)_

```json
{
  "id": "number",
  "thumbnail": "string",
  "caption": "string",
  "likes": [Like],
  "comments": [Comment],
  "updatedAt": "string",
  "createdAt": "string"
}
```

_Response (400 - Bad Request)_



### 9. PUT /Comment/:idPost

Description:

- Create comment posts, this endpoint can be accessed with access_token

Request:

- headers:

```json
{
  "access_token": "string"
}
```

- body:

```json
{
  "thumbnail": "string",
  "caption": "string",
  "likes": [Like],
  "comments": [Comment]

}
```

_Response (201 - Created)_

```json
{
  "id": "number",
  "thumbnail": "string",
  "caption": "string",
  "likes": [Like],
  "comments": [Comment],
  "updatedAt": "string",
  "createdAt": "string"
}
```

### 10. DELETE /Post/:idPost

Description

- Delete a post, this endpoint need authentication and authorization that belongs to the user

Request:

- headers:

```json
{
  "access_token": "string"
}
```

_Response (200 - OK)_

```json
{
  "message": "Post id ${id} success to delete"
}
```

_Response (203 - Forbidden)_

```json
{
  "message": "Forbidden"
}
```

### 11. PATCH /Like/:idPost

Description

- This endpoint allows users to like a specific post. Users must be authenticated to access this endpoint, but no special authorization with specific roles is required, as all users have equal access. The :idPost in the URL is the unique identifier of the post to be liked. This operation updates the like count for the post and records the user's action.

Request:

- headers:

```json
{
  "access_token": "string"
}
```

- body:

```json
{
  "likes": [Like]
}
```

_Response (200 - OK)_

```json
{
  "message": "Post liked successfully.",
  "likesCount": "number"
}
```

_Response (203 - Forbidden)_

```json
{
  "message": "Forbidden"
}
```

&nbsp;


### Global Error

_Response (401 - Unauthorized)_

```json
{
  "message": "Unauthenticated"
}
```

_Response (404 - Not Found)_

```json
{
  "message": "Not Found"
}
```

_Response (500 - Internal Server Error)_

```json
{
  "message": "Internal server error"
}
```



