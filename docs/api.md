# BurnerMarket API Documentation

## Base URL
```
/api
```

## Authentication
Currently, no authentication is required for API endpoints.

## Endpoints

### Recipes

#### Get All Recipes
```http
GET /recipes
```

Returns a list of all recipes.

**Response**
```json
{
  "recipes": [
    {
      "id": "string",
      "title": "string",
      "description": "string",
      "ingredients": [
        {
          "name": "string",
          "amount": "string",
          "unit": "string"
        }
      ],
      "instructions": ["string"],
      "cookingTime": "string",
      "servings": "number",
      "category": "string",
      "createdAt": "string (ISO date)",
      "updatedAt": "string (ISO date)"
    }
  ]
}
```

#### Get Recipe by ID
```http
GET /recipes/{id}
```

Returns a specific recipe by ID.

**Parameters**
- `id` (path parameter) - Recipe ID

**Response**
```json
{
  "id": "string",
  "title": "string",
  "description": "string",
  "ingredients": [
    {
      "name": "string",
      "amount": "string",
      "unit": "string"
    }
  ],
  "instructions": ["string"],
  "cookingTime": "string",
  "servings": "number",
  "category": "string",
  "createdAt": "string (ISO date)",
  "updatedAt": "string (ISO date)"
}
```

### Directory

#### Get All Directory Items
```http
GET /directory
```

Returns a list of all directory items.

**Response**
```json
{
  "directories": [
    {
      "id": "string",
      "name": "string",
      "description": "string",
      "category": "string",
      "usage": "string",
      "tips": ["string"],
      "substitutes": ["string"],
      "createdAt": "string (ISO date)",
      "updatedAt": "string (ISO date)"
    }
  ]
}
```

#### Get Directory Item by ID
```http
GET /directory/{id}
```

Returns a specific directory item by ID.

**Parameters**
- `id` (path parameter) - Directory item ID

**Response**
```json
{
  "id": "string",
  "name": "string",
  "description": "string",
  "category": "string",
  "usage": "string",
  "tips": ["string"],
  "substitutes": ["string"],
  "createdAt": "string (ISO date)",
  "updatedAt": "string (ISO date)"
}
```

## Error Responses

### 404 Not Found
```json
{
  "error": {
    "code": "NOT_FOUND",
    "message": "Resource not found"
  }
}
```

### 500 Internal Server Error
```json
{
  "error": {
    "code": "INTERNAL_SERVER_ERROR",
    "message": "An unexpected error occurred"
  }
}
```

## Rate Limiting
Currently, no rate limiting is implemented.

## Data Models

### Recipe
| Field | Type | Description |
|-------|------|-------------|
| id | string | Unique identifier |
| title | string | Recipe title |
| description | string | Brief description |
| ingredients | array | List of ingredients with amounts |
| instructions | array | Step-by-step cooking instructions |
| cookingTime | string | Total cooking time |
| servings | number | Number of servings |
| category | string | Recipe category |
| createdAt | string | Creation timestamp |
| updatedAt | string | Last update timestamp |

### Directory Item
| Field | Type | Description |
|-------|------|-------------|
| id | string | Unique identifier |
| name | string | Item name |
| description | string | Detailed description |
| category | string | Item category |
| usage | string | Usage instructions |
| tips | array | Cooking/usage tips |
| substitutes | array | Possible substitutes |
| createdAt | string | Creation timestamp |
| updatedAt | string | Last update timestamp |
