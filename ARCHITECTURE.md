# Project Architecture

## Overview

This is a **MERN Stack** application (MongoDB, Express, React, Node.js) following modern best practices.

## Frontend Architecture (React SPA)

### What is a Single Page Application (SPA)?

A Single Page Application loads a **single HTML file** and dynamically updates content without page reloads. This project uses React to build the SPA.

### File Structure Explained

```
frontend/
├── public/
│   └── index.html          ← ONLY HTML FILE (Entry point)
├── src/
│   ├── index.jsx           ← React app initialization
│   ├── components/         ← Reusable UI components (.jsx)
│   ├── containers/         ← Page-level components (.jsx)
│   ├── actions/            ← Redux actions (.js)
│   ├── reducers/           ← Redux reducers (.js)
│   ├── store/              ← Redux store config (.js)
│   ├── helpers/            ← Utility functions (.js)
│   └── style/              ← CSS modules (.css)
```

### Why Only One HTML File?

**Traditional Multi-Page App:**
```
about.html
contact.html
projects.html
profile.html
← Multiple HTML files, page reloads
```

**Modern React SPA:**
```
index.html ← Single entry point
React Router handles all pages in JavaScript
No page reloads, instant navigation
```

### React Component Flow

```
index.html
    ↓
index.jsx (React initialization)
    ↓
App.jsx (Main component with React Router)
    ↓
NavBar.jsx (Layout wrapper)
    ↓
Routes (Home, Projects, Profile, etc.)
```

### File Extensions

- **`.jsx`** - React components (UI with JSX syntax)
- **`.js`** - Pure JavaScript (utilities, actions, reducers)
- **`.css`** - Styles (CSS Modules for scoped styling)

### Modern React Patterns Used

1. **Functional Components**
   ```jsx
   // Old way (Class)
   class NavBar extends Component { ... }
   
   // New way (Function)
   const NavBar = () => { ... }
   ```

2. **React Hooks**
   ```jsx
   const [state, setState] = useState(false);
   useEffect(() => { ... }, []);
   ```

3. **React Router v6**
   ```jsx
   // Old: <Switch> and component prop
   <Switch>
     <Route path="/" component={Home} />
   </Switch>
   
   // New: <Routes> and element prop
   <Routes>
     <Route path="/" element={<Home />} />
   </Routes>
   ```

4. **Redux Toolkit**
   ```jsx
   // Simplified Redux with less boilerplate
   import { configureStore } from '@reduxjs/toolkit';
   ```

5. **No jQuery**
   - Pure React state management
   - Native JavaScript for DOM manipulation
   - React Bootstrap for UI components

## Backend Architecture (Node.js + Express)

```
backend/
├── app.js              ← Express server setup
├── bin/www             ← Server entry point
├── controllers/        ← Business logic
├── models/             ← MongoDB schemas (Mongoose)
├── routes/             ← API endpoints
├── validations/        ← Input validation
└── uploadImages/       ← File upload handling
```

### API Structure

```
/api/projects           ← Project CRUD operations
/api/stacks             ← Technology stack management
/api/profile            ← User profile management
```

## How It All Works Together

1. **User visits the site**
   - Server sends `index.html`
   - React app loads and takes over

2. **User navigates**
   - React Router changes URL
   - No page reload, instant navigation
   - Components render based on route

3. **User interacts**
   - React updates UI (Virtual DOM)
   - API calls to backend when needed
   - Redux manages global state

4. **Data flow**
   ```
   User Action
       ↓
   React Component
       ↓
   Redux Action
       ↓
   API Call (fetch)
       ↓
   Express Backend
       ↓
   MongoDB Database
       ↓
   Response back to React
       ↓
   Redux State Update
       ↓
   UI Re-renders
   ```

## Key Technologies

### Frontend
- **React 18** - UI library
- **Redux Toolkit** - State management
- **React Router v6** - Client-side routing
- **CSS Modules** - Scoped styling
- **Bootstrap 5** - UI framework (CSS only)

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB ODM
- **Multer** - File uploads
- **Helmet** - Security headers

## Development Workflow

```bash
# Backend (Terminal 1)
npm start              # Runs on port 8000

# Frontend (Terminal 2)
cd frontend
npm start              # Runs on port 3000
                       # Proxies API calls to port 8000
```

## Production Build

```bash
cd frontend
npm run build          # Creates optimized build/

# Backend serves the built React app
# All routes go through Express
# React Router handles client-side routing
```

## Why This Architecture?

✅ **Separation of Concerns** - Frontend and backend are independent
✅ **Scalability** - Easy to scale frontend and backend separately
✅ **Modern Stack** - Industry-standard technologies
✅ **Developer Experience** - Hot reload, component reusability
✅ **Performance** - SPA provides instant navigation
✅ **Maintainability** - Clear structure, modular code

## Common Misconceptions

❌ **"React needs multiple HTML files"**
✅ React is a SPA - one HTML file, dynamic content

❌ **"Need jQuery with React"**
✅ React manages DOM, jQuery is redundant

❌ **"Need Bootstrap JS with React"**
✅ Use React Bootstrap for React-friendly components

❌ **".js and .jsx are the same"**
✅ .jsx clearly indicates React components with JSX syntax
