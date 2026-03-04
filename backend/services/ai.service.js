/**
 * AI Service
 * Integration with Google Gemini AI (Free API)
 */

const axios = require('axios');

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent';

/**
 * Generate project description using AI
 */
exports.generateProjectDescription = async (projectName, techStack) => {
  try {
    const prompt = `Generate a professional and engaging project description for a software project named "${projectName}" that uses the following technologies: ${techStack.join(', ')}. 
    
    The description should be:
    - 2-3 sentences long
    - Highlight key features and benefits
    - Professional and technical
    - Suitable for a portfolio or resume
    
    Return only the description without any additional text.`;

    const response = await axios.post(
      `${GEMINI_API_URL}?key=${GEMINI_API_KEY}`,
      {
        contents: [{
          parts: [{
            text: prompt
          }]
        }]
      }
    );

    const generatedText = response.data.candidates[0].content.parts[0].text;
    return generatedText.trim();
  } catch (error) {
    console.error('AI Description Generation Error:', error.message);
    throw new Error('Failed to generate AI description');
  }
};

/**
 * Generate smart task suggestions based on project
 */
exports.generateTaskSuggestions = async (projectName, projectDescription, currentStatus) => {
  try {
    const prompt = `As a project management AI assistant, suggest 5 specific, actionable tasks for a project named "${projectName}".
    
    Project Description: ${projectDescription}
    Current Status: ${currentStatus}
    
    Provide tasks that are:
    - Specific and actionable
    - Relevant to the project stage
    - Prioritized by importance
    - Technical and practical
    
    Format: Return a JSON array of objects with "task" and "priority" (High/Medium/Low) fields.
    Example: [{"task": "Set up CI/CD pipeline", "priority": "High"}]`;

    const response = await axios.post(
      `${GEMINI_API_URL}?key=${GEMINI_API_KEY}`,
      {
        contents: [{
          parts: [{
            text: prompt
          }]
        }]
      }
    );

    const generatedText = response.data.candidates[0].content.parts[0].text;
    
    // Extract JSON from response
    const jsonMatch = generatedText.match(/\[[\s\S]*\]/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }
    
    throw new Error('Invalid response format');
  } catch (error) {
    console.error('AI Task Suggestions Error:', error.message);
    throw new Error('Failed to generate task suggestions');
  }
};

/**
 * Analyze project complexity and provide insights
 */
exports.analyzeProjectComplexity = async (project) => {
  try {
    const prompt = `Analyze this software project and provide insights:
    
    Project: ${project.name}
    Description: ${project.description}
    Tech Stack: ${project.stack.map(s => s.name).join(', ')}
    Status: ${project.status}
    Year: ${project.year}
    
    Provide:
    1. Complexity Level (Beginner/Intermediate/Advanced)
    2. Estimated Development Time
    3. Key Technical Challenges (3 points)
    4. Recommended Improvements (3 points)
    5. Market Potential Score (1-10)
    
    Format as JSON:
    {
      "complexity": "string",
      "estimatedTime": "string",
      "challenges": ["string"],
      "improvements": ["string"],
      "marketScore": number,
      "summary": "string"
    }`;

    const response = await axios.post(
      `${GEMINI_API_URL}?key=${GEMINI_API_KEY}`,
      {
        contents: [{
          parts: [{
            text: prompt
          }]
        }]
      }
    );

    const generatedText = response.data.candidates[0].content.parts[0].text;
    
    // Extract JSON from response
    const jsonMatch = generatedText.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }
    
    throw new Error('Invalid response format');
  } catch (error) {
    console.error('AI Analysis Error:', error.message);
    throw new Error('Failed to analyze project');
  }
};

/**
 * Generate project name suggestions
 */
exports.generateProjectNames = async (description, techStack) => {
  try {
    const prompt = `Generate 5 creative and professional project names based on:
    
    Description: ${description}
    Technologies: ${techStack.join(', ')}
    
    Names should be:
    - Memorable and catchy
    - Professional
    - Related to the project purpose
    - 2-3 words maximum
    
    Return as JSON array: ["Name1", "Name2", ...]`;

    const response = await axios.post(
      `${GEMINI_API_URL}?key=${GEMINI_API_KEY}`,
      {
        contents: [{
          parts: [{
            text: prompt
          }]
        }]
      }
    );

    const generatedText = response.data.candidates[0].content.parts[0].text;
    
    // Extract JSON from response
    const jsonMatch = generatedText.match(/\[[\s\S]*\]/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }
    
    throw new Error('Invalid response format');
  } catch (error) {
    console.error('AI Name Generation Error:', error.message);
    throw new Error('Failed to generate project names');
  }
};

/**
 * Smart search with AI-powered relevance
 */
exports.enhanceSearchResults = async (searchQuery, results) => {
  try {
    if (results.length === 0) return results;

    const prompt = `Given a search query "${searchQuery}" and these project results, rank them by relevance and provide a relevance score (0-100) for each.
    
    Projects:
    ${results.map((r, i) => `${i + 1}. ${r.name}: ${r.description}`).join('\n')}
    
    Return JSON array with project indices and scores:
    [{"index": 0, "score": 95, "reason": "exact match"}]`;

    const response = await axios.post(
      `${GEMINI_API_URL}?key=${GEMINI_API_KEY}`,
      {
        contents: [{
          parts: [{
            text: prompt
          }]
        }]
      }
    );

    const generatedText = response.data.candidates[0].content.parts[0].text;
    
    // Extract JSON from response
    const jsonMatch = generatedText.match(/\[[\s\S]*\]/);
    if (jsonMatch) {
      const rankings = JSON.parse(jsonMatch[0]);
      
      // Add AI scores to results
      return results.map((result, index) => {
        const ranking = rankings.find(r => r.index === index);
        return {
          ...result,
          aiRelevanceScore: ranking?.score || 50,
          aiReason: ranking?.reason || 'Standard match'
        };
      }).sort((a, b) => b.aiRelevanceScore - a.aiRelevanceScore);
    }
    
    return results;
  } catch (error) {
    console.error('AI Search Enhancement Error:', error.message);
    return results; // Return original results on error
  }
};

/**
 * Generate README content for project
 */
exports.generateProjectReadme = async (project) => {
  try {
    const prompt = `Generate a professional README.md content for this project:
    
    Name: ${project.name}
    Description: ${project.description}
    Tech Stack: ${project.stack.map(s => s.name).join(', ')}
    Status: ${project.status}
    
    Include:
    - Project title and description
    - Features list
    - Tech stack
    - Installation instructions
    - Usage examples
    - Contributing guidelines
    
    Use proper Markdown formatting.`;

    const response = await axios.post(
      `${GEMINI_API_URL}?key=${GEMINI_API_KEY}`,
      {
        contents: [{
          parts: [{
            text: prompt
          }]
        }]
      }
    );

    return response.data.candidates[0].content.parts[0].text.trim();
  } catch (error) {
    console.error('AI README Generation Error:', error.message);
    throw new Error('Failed to generate README');
  }
};
