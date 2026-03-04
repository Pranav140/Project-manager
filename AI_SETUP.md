# 🚀 AI Features Quick Setup Guide

Get your AI-powered project management tool running in 5 minutes!

## Step 1: Get Free Google Gemini API Key

1. Visit: **https://makersuite.google.com/app/apikey**
2. Sign in with your Google account
3. Click **"Create API Key"**
4. Copy the generated API key

> 💡 The Gemini API is completely FREE with generous rate limits (60 requests/minute)

## Step 2: Configure Environment

Add your API key to `backend/.env`:

```env
GEMINI_API_KEY=your_actual_api_key_here
```

## Step 3: Install Dependencies

```bash
cd backend
npm install
```

## Step 4: Start the Application

```bash
# From project root
npm run dev:all
```

Or separately:

```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend
cd frontend
npm start
```

## Step 5: Test AI Features

1. Open **http://localhost:3000**
2. Click the **AI Assistant** button (floating robot icon in bottom-right)
3. Try any AI feature:
   - Generate Description
   - Task Suggestions
   - Project Analysis
   - Smart Search

## 🎯 AI Features Overview

### 1. AI Description Generator
- Input: Project name + tech stack
- Output: Professional 2-3 sentence description
- Use case: Portfolio projects, README files

### 2. Smart Task Suggestions
- Input: Project details
- Output: 5 prioritized tasks (High/Medium/Low)
- Use case: Project planning, sprint planning

### 3. Project Complexity Analysis
- Input: Project ID
- Output: Complexity rating, time estimate, challenges, improvements
- Use case: Project estimation, technical interviews

### 4. AI-Enhanced Search
- Input: Search query
- Output: Ranked results with relevance scores and reasoning
- Use case: Finding relevant projects quickly

## 🔧 Troubleshooting

### "API key not found" error
- Make sure `GEMINI_API_KEY` is set in `backend/.env`
- Restart the backend server after adding the key

### "Rate limit exceeded" error
- Free tier: 60 requests/minute
- Wait a minute and try again
- Consider implementing request queuing for production

### "AI service unavailable" error
- Check your internet connection
- Verify API key is valid
- The app will gracefully fall back to standard features

## 📊 API Rate Limits (Free Tier)

- **Requests per minute**: 60
- **Requests per day**: 1,500
- **Cost**: FREE forever
- **No credit card required**

## 🎨 UI Features

The AI Assistant includes:
- ✨ Floating button with smooth animations
- 🎯 4 AI-powered features in a beautiful menu
- 📱 Responsive design for mobile
- 🌈 Glassmorphism UI with gradients
- ⚡ Real-time loading states
- 🎉 Toast notifications for feedback

## 💡 Tips for Best Results

1. **Be Specific**: Provide detailed project information for better AI suggestions
2. **Use Context**: The more context you provide, the better the AI recommendations
3. **Iterate**: Try different inputs to get varied suggestions
4. **Combine Features**: Use multiple AI features together for comprehensive insights

## 🚀 Next Steps

1. Create some projects in the app
2. Try all AI features with your projects
3. Customize the AI prompts in `backend/services/ai.service.js`
4. Add more AI features based on your needs

## 📚 Resources

- [Google Gemini AI Docs](https://ai.google.dev/docs)
- [API Key Management](https://makersuite.google.com/app/apikey)
- [Complete AI Features Guide](./AI_FEATURES.md)
- [Backend API Documentation](./backend/README_BACKEND.md)

## 🎯 For Your Resume

Highlight these points:
- ✅ Integrated Google Gemini AI for intelligent features
- ✅ Implemented service layer pattern with error handling
- ✅ Added rate limiting and caching for optimization
- ✅ Created responsive UI with modern animations
- ✅ Built production-ready AI features with graceful degradation

---

**Ready to impress recruiters?** 🚀

Your AI-powered project management tool is now ready to showcase!
