# Backend - Node.js/Express API

Modern, scalable REST API built with Express.js and MongoDB.

## Project Structure

```
src/
├── server.js              # Server entry point
├── app.js                 # Express app configuration
├── config/
│   └── database.js        # MongoDB connection
├── controllers/           # Business logic
│   ├── project.controller.js
│   ├── stack.controller.js
│   └── profile.controller.js
├── models/                # Mongoose schemas
│   ├── Project.js
│   ├── Stack.js
│   └── Profile.js
├── routes/                # API routes
│   ├── index.js           # Route aggregator
│   ├── project.routes.js
│   ├── stack.routes.js
│   └── profile.routes.js
├── middleware/            # Custom middleware
│   ├── errorHandler.js    # Global error handler
│   ├── notFound.js        # 404 handler
│   └── asyncHandler.js    # Async wrapper
├── validators/            # Input validation
│   ├── index.js
│   ├── project.validator.js
│   ├── stack.validator.js
│   └── profile.validator.js
└── utils/                 # Utilities
    ├── upload.js          # File upload config
    └── errors.js          # Custom error classes
```

## Architecture Pattern: MVC

**Model-View-Controller** pattern for clean separation of concerns:

- **Models** - Data structure and database interaction
- **Controllers** - Business logic and request handling
- **Routes** - API endpoints and routing

## Key Features

### 1. Modern ES6+ Syntax
```javascript
// Async/await instead of callbacks
const projects = await Project.find();

// Arrow functions
exports.getAllProjects = asyncHandler(async (req, res) => {
  // ...
});

// Destructuring
const { name, description } = req.body;
```

### 2. Centralized Error Handling
```javascript
// No try-catch needed in controllers
exports.getProject = asyncHandler(async (req, res) => {
  const project = await Project.findById(req.params.id);
  if (!project) {
    throw new AppError('Project not found', 404);
  }
  res.json({ success: true, data: project });
});
```

### 3. Consistent API Responses
```javascript
// Success response
{
  "success": true,
  "data": { ... }
}

// Error response
{
  "success": false,
  "error": "Error message"
}
```

### 4. Input Validation
```javascript
// Express-validator for robust validation
router.post('/',
  projectValidation,  // Validation rules
  validate,           // Check results
  createProject       // Controller
);
```

### 5. Security Best Practices
- Helmet for security headers
- CORS configuration
- Input sanitization
- File upload restrictions
- Error message sanitization

## API Endpoints

### Projects
```
GET    /api/projects       - Get all projects
GET    /api/projects/:id   - Get single project
POST   /api/projects       - Create project
PUT    /api/projects/:id   - Update project
DELETE /api/projects/:id   - Delete project
```

### Stacks
```
GET    /api/stacks         - Get all stacks
GET    /api/stacks/:id     - Get single stack
POST   /api/stacks         - Create stack
PUT    /api/stacks/:id     - Update stack
DELETE /api/stacks/:id     - Delete stack
```

### Profile
```
GET    /api/profile        - Get profile
POST   /api/profile        - Create profile
PUT    /api/profile/:id    - Update profile
```

### Health Check
```
GET    /health             - Server health status
```

## Middleware Flow

```
Request
  ↓
Security (Helmet)
  ↓
CORS
  ↓
Body Parser
  ↓
Logger (Morgan)
  ↓
Routes
  ↓
Validation
  ↓
Controller (asyncHandler)
  ↓
Response / Error Handler
```

## Error Handling

### Custom Error Class
```javascript
throw new AppError('Resource not found', 404);
```

### Automatic Error Handling
- Mongoose validation errors
- Duplicate key errors
- Cast errors (invalid ObjectId)
- All async errors caught automatically

## Database

### Mongoose Features Used
- Schema validation
- Virtuals
- Timestamps (createdAt, updatedAt)
- Population (references)
- Indexes for performance

### Connection Management
- Automatic reconnection
- Connection event logging
- Graceful shutdown

## File Uploads

### Multer Configuration
- Max file size: 5MB
- Allowed types: jpeg, jpg, png, gif, webp
- Unique filename generation
- Storage in `/public/images`

## Environment Variables

```env
MONGODB_URI=mongodb://localhost:27017/project-management
PORT=8000
NODE_ENV=development
CLIENT_URL=http://localhost:3000
```

## Development

```bash
npm run dev        # Start with nodemon (auto-reload)
npm start          # Start production server
```

## Production Considerations

### Implemented
- ✅ Environment-based configuration
- ✅ Error logging
- ✅ Security headers
- ✅ Request compression
- ✅ Graceful shutdown
- ✅ Process error handling

### Recommended Additions
- [ ] Rate limiting
- [ ] Authentication/Authorization (JWT)
- [ ] Request logging to file
- [ ] Database backup strategy
- [ ] API documentation (Swagger)
- [ ] Unit/Integration tests
- [ ] Docker containerization
- [ ] CI/CD pipeline

## Code Style

### Naming Conventions
- **Files**: `kebab-case.js` (e.g., `project.controller.js`)
- **Models**: `PascalCase` (e.g., `Project.js`)
- **Functions**: `camelCase` (e.g., `getAllProjects`)
- **Constants**: `UPPER_SNAKE_CASE`

### File Organization
- One controller per resource
- One route file per resource
- Validators grouped by resource
- Utilities in separate files

## Differences from Old Structure

### Old (bin/www + app.js)
```
bin/www              ← Server startup
app.js               ← App configuration
controllers/         ← Mixed patterns
routes/              ← Basic routing
validations/         ← Single file
uploadImages/        ← Unclear naming
```

### New (src/ structure)
```
src/
  server.js          ← Clean entry point
  app.js             ← Express config only
  controllers/       ← Consistent patterns
  routes/            ← RESTful routing
  validators/        ← Organized by resource
  utils/             ← Clear utilities
  middleware/        ← Reusable middleware
  config/            ← Configuration files
```

## Benefits of New Structure

1. **Scalability** - Easy to add new features
2. **Maintainability** - Clear file organization
3. **Testability** - Isolated components
4. **Readability** - Consistent patterns
5. **Industry Standard** - Follows best practices
