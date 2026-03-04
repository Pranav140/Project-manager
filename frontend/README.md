# Frontend - React Application

This is a modern React 18 application built with functional components and hooks.

## Project Structure

```
src/
├── components/          # Reusable React components (.jsx)
│   ├── App.jsx         # Main app component with routing
│   ├── NavBar.jsx      # Navigation sidebar (functional component)
│   ├── LoadingSpinner.jsx
│   ├── DonutChart.jsx
│   ├── HorizontalBarChart.jsx
│   └── NoPageMatch.jsx
├── containers/          # Page-level components (.jsx)
│   ├── Home.jsx
│   ├── ProjectsList.jsx
│   ├── ProjectDetail.jsx
│   ├── ProjectForm.jsx
│   ├── StacksList.jsx
│   ├── StackDetail.jsx
│   ├── StackForm.jsx
│   ├── Profile.jsx
│   └── ProfileForm.jsx
├── actions/            # Redux actions
├── reducers/           # Redux reducers
├── store/              # Redux store configuration
├── helpers/            # Utility functions
├── style/              # CSS modules
├── assets/             # Images and static files
└── index.jsx           # App entry point

public/
└── index.html          # Single HTML file (SPA entry)
```

## Key Features

- **React 18** with modern hooks (useState, useEffect, etc.)
- **Functional Components** - No class components
- **Redux Toolkit** for state management
- **React Router v6** for navigation
- **CSS Modules** for scoped styling
- **No jQuery** - Pure React implementation
- **Single Page Application** - Only one HTML file

## Why .jsx Extension?

- Clear distinction between React components and regular JavaScript
- Better IDE support and syntax highlighting
- Industry standard for React projects
- Explicit JSX syntax indication

## Why Only One HTML File?

This is a **Single Page Application (SPA)**:
- React dynamically renders all pages in the browser
- Only `public/index.html` serves as the entry point
- All routing happens client-side via React Router
- Better performance and user experience
- No page reloads when navigating

## Development

```bash
npm start       # Start development server
npm run build   # Build for production
npm test        # Run tests
```

## Modern React Patterns Used

1. **Functional Components with Hooks**
2. **React Router v6** (Routes instead of Switch)
3. **Redux Toolkit** (simplified Redux)
4. **CSS Modules** for component-scoped styles
5. **Modern ES6+ syntax**
6. **No jQuery or Bootstrap JS** (pure React)
