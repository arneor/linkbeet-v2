# Linkbeet API Documentation

## Base URL

All API requests go through the Kong API Gateway:

```
http://localhost:8000/api/v1
```

## Authentication

All protected endpoints require a Bearer token:

```
Authorization: Bearer <access_token>
```

---

## Auth Service (port 3001)

### POST /api/v1/auth/register

Register a new user.

**Body:**

```json
{
  "email": "user@example.com",
  "username": "johndoe",
  "password": "SecurePass1",
  "name": "John Doe"
}
```

### POST /api/v1/auth/login

Login and receive JWT tokens.

### POST /api/v1/auth/refresh

Refresh access token using refresh token.

### POST /api/v1/auth/logout

Invalidate refresh token.

---

## Profile Service (port 3002)

### GET /api/v1/profiles/:username

Get public profile by username.

### GET /api/v1/profile/me _(auth required)_

Get current user's profile.

### PATCH /api/v1/profile/me _(auth required)_

Update profile.

### POST /api/v1/profile/me/links _(auth required)_

Add a new link to profile.

### PATCH /api/v1/profile/me/links/:id _(auth required)_

Update a link.

### DELETE /api/v1/profile/me/links/:id _(auth required)_

Delete a link.

---

## Search Service (port 3003)

### GET /api/v1/search?q=:query

Search profiles and links.

---

## Analytics Service (port 3007)

### GET /api/v1/analytics/overview _(auth required)_

Get overview stats for current user.

### GET /api/v1/analytics/clicks _(auth required)_

Get link click analytics.

---

## Response Format

All responses follow this format:

```json
{
  "success": true,
  "data": {},
  "error": null,
  "message": null,
  "statusCode": 200
}
```

## Pagination

Paginated endpoints accept:

- `page` (default: 1)
- `limit` (default: 20, max: 100)

Response includes:

```json
{
  "data": [],
  "total": 100,
  "page": 1,
  "limit": 20,
  "totalPages": 5,
  "hasNextPage": true,
  "hasPrevPage": false
}
```
