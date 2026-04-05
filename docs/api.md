# Linkbeet V2 — API Documentation

All APIs are accessible via Kong API Gateway at port 8000.

## Auth endpoints

POST /auth/login POST /auth/register POST /auth/logout POST /auth/refresh GET /auth/me

## Profile endpoints

GET /profile/:username PATCH /profile

## Links endpoints

GET /links POST /links PATCH /links/:id DELETE /links/:id PUT /links/reorder

## Analytics endpoints

GET /analytics/overview GET /analytics/clicks
