# Backend - Node.js/Express API

Modern REST API for the Project Management Tool.

## Quick Start

```bash
# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Start development server
npm run dev

# Start production server
npm start
```

## Environment Variables

Create a `.env` file in the backend directory:

```env
MONGODB_URI=mongodb://localhost:27017/project-management
PORT=8000
NODE_ENV=development
CLIENT_URL=http://localhost:3000
```

## Project Structure

```
backend/
├── server.js              # Server entry point
├── app.js                 # Express configuration
├── config/
│   └── database.js        # MongoDB connection
├── controllers/           # Business logic
├── models/                # Mongoose schemas
├── routes/                # API routes
├── middleware/            # Custom middleware
├── validators/            # Input validation
├── utils/                 # Utilities
└── public/                # Static files
    └── images/            # Uploaded images
```

## API Endpoints

### Base URL
```
http://localhost:8000/api
```

### Projects
- `GET /api/projects` - Get all projects
- `GET /api/projects/:id` - Get single project
- `POST /api/projects` - Create project
- `PUT /api/projects/:id` - Update project
- `DELETE /api/projects/:id` - Delete project

### Stacks
- `GET /api/stacks` - Get all stacks
- `GET /api/stacks/:id` - Get single stack
- `POST /api/stacks` - Create stack
- `PUT /api/stacks/:id` - Update stack
- `DELETE /api/stacks/:id` - Delete stack

### Profile
- `GET /api/profile` - Get profile
- `POST /api/profile` - Create profile
- `PUT /api/profile/:id` - Update profile

### Health Check
- `GET /health` - Server health status

## Scripts

```bash
npm start          # Start production server
npm run dev        # Start development server with nodemon
```

## Technologies

- Node.js
- Express.js
- MongoDB with Mongoose
- Express Validator
- Multer (file uploads)
- Helmet (security)
- Morgan (logging)
- Compression

## Documentation

See [README_BACKEND.md](./README_BACKEND.md) for detailed documentation.
