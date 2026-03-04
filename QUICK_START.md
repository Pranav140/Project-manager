# ⚡ Quick Start Guide

Get the AI-powered project management tool running in 5 minutes!

## 🚀 Installation

```bash
# 1. Clone the repository
git clone https://github.com/Pranav140/Project-manager.git
cd Project-manager/Project-Management-Tool-MERN

# 2. Install all dependencies
npm run install-all

# 3. Setup environment
cd backend
cp .env.example .env
# Edit .env and add your MongoDB URI and Gemini API key
```

## 🔑 Get Free API Keys

### MongoDB (Database)
1. Visit: https://www.mongodb.com/cloud/atlas
2. Create free cluster
3. Get connection string
4. Add to `backend/.env` as `MONGODB_URI`

### Google Gemini (AI Features)
1. Visit: https://makersuite.google.com/app/apikey
2. Create API key (FREE)
3. Add to `backend/.env` as `GEMINI_API_KEY`

## ▶️ Run the Application

```bash
# Option 1: Run both servers together (Recommended)
npm run dev:all

# Option 2: Run separately
# Terminal 1 - Backend
cd backend && npm run dev

# Terminal 2 - Frontend
cd frontend && npm start
```

## 🌐 Access the Application

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8000
- **Health Check**: http://localhost:8000/health

## 🤖 Test AI Features

1. Open http://localhost:3000
2. Click the floating AI button (robot icon, bottom-right)
3. Try any feature:
   - Generate Description
   - Task Suggestions
   - Project Analysis
   - Smart Search

## 📁 Project Structure

```
Project-Management-Tool-MERN/
├── backend/              # Node.js/Express API
│   ├── controllers/      # Business logic
│   ├── models/          # Database schemas
│   ├── routes/          # API endpoints
│   ├── services/        # AI service layer
│   └── middleware/      # Custom middleware
├── frontend/            # React application
│   ├── src/
│   │   ├── components/  # React components
│   │   ├── containers/  # Page components
│   │   ├── services/    # API service
│   │   └── style/       # CSS modules
└── docs/                # Documentation
```

## 🛠️ Available Scripts

### Root Level
```bash
npm run install-all    # Install all dependencies
npm run dev:all        # Run both servers
npm run server         # Run backend only
npm run client         # Run frontend only
npm start              # Production mode
```

### Backend
```bash
npm run dev            # Development with nodemon
npm start              # Production mode
npm test               # Run tests
```

### Frontend
```bash
npm start              # Development server
npm run build          # Production build
npm test               # Run tests
```

## 🔧 Environment Variables

### Backend (.env)
```env
# Required
MONGODB_URI=mongodb://localhost:27017/project-management
PORT=8000
NODE_ENV=development
CLIENT_URL=http://localhost:3000

# AI Features (Optional but recommended)
GEMINI_API_KEY=your_api_key_here

# Optional
LOG_LEVEL=info
```

## 📚 Documentation

- [README.md](./README.md) - Full documentation
- [AI_FEATURES.md](./AI_FEATURES.md) - AI features guide
- [AI_SETUP.md](./AI_SETUP.md) - Detailed AI setup
- [PROJECT_HIGHLIGHTS.md](./PROJECT_HIGHLIGHTS.md) - Resume edition

## 🐛 Troubleshooting

### Port already in use
```bash
# Kill process on port 8000 (backend)
npx kill-port 8000

# Kill process on port 3000 (frontend)
npx kill-port 3000
```

### MongoDB connection error
- Check if MongoDB is running
- Verify MONGODB_URI in .env
- For Atlas: Check IP whitelist

### AI features not working
- Verify GEMINI_API_KEY in .env
- Check internet connection
- Restart backend server

### Module not found
```bash
# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

## 🎯 Next Steps

1. ✅ Create some projects
2. ✅ Try all AI features
3. ✅ Explore the codebase
4. ✅ Customize for your needs
5. ✅ Deploy to production

## 🚀 Deployment

### Quick Deploy Options

**Vercel (Frontend)**
```bash
cd frontend
vercel
```

**Railway (Full Stack)**
```bash
railway login
railway init
railway up
```

**Render (Full Stack)**
1. Connect GitHub repo
2. Add environment variables
3. Deploy

## 💡 Tips

- Use MongoDB Atlas for free cloud database
- Gemini API is free with generous limits
- Check logs in `backend/logs/` for debugging
- Use React DevTools for frontend debugging
- API documentation at `/api` endpoints

## 🆘 Need Help?

- Check [AI_FEATURES.md](./AI_FEATURES.md) for AI setup
- Read [ARCHITECTURE.md](./ARCHITECTURE.md) for system design
- See [CHANGES.md](./CHANGES.md) for what's new
- Review [PROJECT_HIGHLIGHTS.md](./PROJECT_HIGHLIGHTS.md) for interview prep

---

**Ready to build something amazing?** 🚀

Start with: `npm run dev:all`
