/**
 * Project DNA Service
 * Revolutionary feature: Generate unique DNA visualization and insights for projects
 */

const axios = require('axios');

class ProjectDNAService {
  constructor() {
    this.apiKey = process.env.GEMINI_API_KEY;
    this.apiUrl = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent';
  }

  /**
   * Generate Project DNA - Unique genetic code for each project
   * Returns: DNA sequence, visual pattern, genetic traits
   */
  async generateProjectDNA(project) {
    try {
      const prompt = `
You are a Project DNA Analyzer. Generate a unique "genetic code" for this project:

Project: ${project.name}
Description: ${project.description}
Tech Stack: ${project.stack?.join(', ') || 'Not specified'}
Status: ${project.status}
Created: ${project.createdAt}

Generate a JSON response with:
1. dnaSequence: A unique 12-character code (like "ATCG-XYZW-QRST") representing project traits
2. geneticTraits: Array of 5 unique traits this project has (e.g., "Scalability Gene", "Innovation Marker")
3. dominantGenes: Top 3 strongest characteristics
4. mutationPotential: Areas where project could evolve (array of 3)
5. compatibility: What types of projects this pairs well with
6. evolutionStage: Current stage (Embryonic/Growing/Mature/Legacy)
7. healthScore: 0-100 score
8. uniqueSignature: A poetic one-liner describing this project's essence

Be creative and unique for each project!
`;

      const response = await axios.post(
        `${this.apiUrl}?key=${this.apiKey}`,
        {
          contents: [{ parts: [{ text: prompt }] }]
        }
      );

      const text = response.data.candidates[0].content.parts[0].text;
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      const dnaData = jsonMatch ? JSON.parse(jsonMatch[0]) : null;

      // Generate visual DNA pattern (color codes based on traits)
      const visualPattern = this.generateVisualDNA(dnaData.dnaSequence);

      return {
        ...dnaData,
        visualPattern,
        generatedAt: new Date().toISOString()
      };
    } catch (error) {
      console.error('Project DNA generation error:', error.message);
      return this.generateFallbackDNA(project);
    }
  }

  /**
   * AI Time Traveler - Predict project evolution
   * Shows past, present, and 3 possible futures
   */
  async timeTravel(project) {
    try {
      const prompt = `
You are an AI Time Traveler analyzing project evolution.

Current Project: ${project.name}
Description: ${project.description}
Tech Stack: ${project.stack?.join(', ') || 'Not specified'}
Age: ${this.calculateProjectAge(project.createdAt)}

Generate a JSON response with:
1. pastVersion: How this project might have looked 2 years ago (tech, features, scale)
2. presentAnalysis: Current state assessment
3. futureTimelines: Array of 3 possible futures (6 months, 1 year, 2 years):
   - timeline: "6 months" | "1 year" | "2 years"
   - scenario: "Conservative" | "Moderate" | "Ambitious"
   - features: Array of new features
   - techStack: Evolved tech stack
   - marketPosition: Market standing
   - challenges: Potential obstacles
   - opportunities: Growth opportunities
4. recommendedPath: Which future to pursue and why
5. timelineVisualization: ASCII art showing evolution path

Be specific and realistic!
`;

      const response = await axios.post(
        `${this.apiUrl}?key=${this.apiKey}`,
        {
          contents: [{ parts: [{ text: prompt }] }]
        }
      );

      const text = response.data.candidates[0].content.parts[0].text;
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      return jsonMatch ? JSON.parse(jsonMatch[0]) : null;
    } catch (error) {
      console.error('Time travel error:', error.message);
      throw new Error('Time travel failed');
    }
  }

  /**
   * Project Health Monitor - Real-time health analysis
   */
  async analyzeProjectHealth(project) {
    try {
      const prompt = `
You are a Project Health Monitor AI. Analyze this project's vital signs:

Project: ${project.name}
Description: ${project.description}
Tech Stack: ${project.stack?.join(', ') || 'Not specified'}
Status: ${project.status}
Last Updated: ${project.updatedAt}

Generate a JSON response with:
1. overallHealth: 0-100 score
2. vitalSigns: Object with scores (0-100) for:
   - codeQuality
   - techStackModernity
   - scalability
   - security
   - performance
   - maintainability
3. symptoms: Array of issues detected (if any)
4. diagnosis: Overall health assessment
5. prescription: Array of 5 specific actions to improve health
6. urgentActions: Critical items needing immediate attention
7. healthTrend: "Improving" | "Stable" | "Declining"
8. nextCheckup: When to reassess (in days)
9. riskFactors: Potential future problems
10. strengths: What's working well

Be honest and actionable!
`;

      const response = await axios.post(
        `${this.apiUrl}?key=${this.apiKey}`,
        {
          contents: [{ parts: [{ text: prompt }] }]
        }
      );

      const text = response.data.candidates[0].content.parts[0].text;
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      return jsonMatch ? JSON.parse(jsonMatch[0]) : null;
    } catch (error) {
      console.error('Health analysis error:', error.message);
      throw new Error('Health analysis failed');
    }
  }

  /**
   * Smart Project Relationships - Discover connections between projects
   */
  async discoverRelationships(projects) {
    try {
      const projectSummaries = projects.map(p => ({
        id: p._id,
        name: p.name,
        description: p.description,
        stack: p.stack
      }));

      const prompt = `
You are a Project Relationship AI. Analyze these projects and discover hidden connections:

Projects:
${JSON.stringify(projectSummaries, null, 2)}

Generate a JSON response with:
1. relationships: Array of discovered connections:
   - project1: Project ID
   - project2: Project ID
   - relationshipType: "Complementary" | "Synergistic" | "Sequential" | "Competitive"
   - strength: 0-100
   - reason: Why they're connected
   - potentialIntegration: How they could work together
2. clusters: Group projects into logical clusters
3. ecosystem: Describe the overall project ecosystem
4. recommendations: Suggestions for new projects that would complete the ecosystem
5. crossPollinationIdeas: Features from one project that could enhance another

Be creative in finding connections!
`;

      const response = await axios.post(
        `${this.apiUrl}?key=${this.apiKey}`,
        {
          contents: [{ parts: [{ text: prompt }] }]
        }
      );

      const text = response.data.candidates[0].content.parts[0].text;
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      return jsonMatch ? JSON.parse(jsonMatch[0]) : null;
    } catch (error) {
      console.error('Relationship discovery error:', error.message);
      throw new Error('Relationship discovery failed');
    }
  }

  /**
   * Voice to Project - Convert speech to complete project
   */
  async voiceToProject(transcription) {
    try {
      const prompt = `
You are a Voice-to-Project AI. A user spoke this idea:

"${transcription}"

Generate a COMPLETE project specification as JSON:
1. name: Creative project name
2. description: Professional 2-3 sentence description
3. techStack: Array of recommended technologies
4. features: Array of 8-10 specific features
5. architecture: Suggested architecture pattern
6. database: Recommended database schema (tables/collections)
7. apiEndpoints: Array of RESTful endpoints needed
8. uiComponents: Array of UI components to build
9. timeline: Estimated development timeline
10. team: Recommended team composition
11. budget: Rough cost estimate
12. risks: Potential challenges
13. marketAnalysis: Target audience and competition
14. monetization: Revenue model suggestions
15. mvpFeatures: Minimum viable product features

Be comprehensive and actionable!
`;

      const response = await axios.post(
        `${this.apiUrl}?key=${this.apiKey}`,
        {
          contents: [{ parts: [{ text: prompt }] }]
        }
      );

      const text = response.data.candidates[0].content.parts[0].text;
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      return jsonMatch ? JSON.parse(jsonMatch[0]) : null;
    } catch (error) {
      console.error('Voice to project error:', error.message);
      throw new Error('Voice to project conversion failed');
    }
  }

  /**
   * Project Cloning Predictor - Predict if project will be cloned/forked
   */
  async predictViralPotential(project) {
    try {
      const prompt = `
You are a Viral Potential Predictor. Analyze if this project will be popular:

Project: ${project.name}
Description: ${project.description}
Tech Stack: ${project.stack?.join(', ') || 'Not specified'}

Generate a JSON response with:
1. viralScore: 0-100 (likelihood of going viral)
2. githubStarsPrediction: Estimated stars in 1 year
3. forksPrediction: Estimated forks
4. viralFactors: What makes it shareable
5. improvementsForVirality: How to increase viral potential
6. targetAudience: Who will love this
7. marketingStrategy: How to promote it
8. competitiveAdvantage: What makes it unique
9. trendAlignment: How well it aligns with current trends
10. shareabilityScore: How easy it is to share/demo

Be realistic but encouraging!
`;

      const response = await axios.post(
        `${this.apiUrl}?key=${this.apiKey}`,
        {
          contents: [{ parts: [{ text: prompt }] }]
        }
      );

      const text = response.data.candidates[0].content.parts[0].text;
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      return jsonMatch ? JSON.parse(jsonMatch[0]) : null;
    } catch (error) {
      console.error('Viral prediction error:', error.message);
      throw new Error('Viral prediction failed');
    }
  }

  // Helper methods
  generateVisualDNA(sequence) {
    const colors = {
      A: '#FF6B6B', T: '#4ECDC4', C: '#45B7D1', G: '#FFA07A',
      X: '#98D8C8', Y: '#F7DC6F', Z: '#BB8FCE', W: '#85C1E2',
      Q: '#F8B739', R: '#52B788', S: '#E63946', U: '#457B9D'
    };

    return sequence.split('').map(char => ({
      base: char,
      color: colors[char] || '#CCCCCC'
    }));
  }

  calculateProjectAge(createdAt) {
    const now = new Date();
    const created = new Date(createdAt);
    const diffTime = Math.abs(now - created);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 30) return `${diffDays} days`;
    if (diffDays < 365) return `${Math.floor(diffDays / 30)} months`;
    return `${Math.floor(diffDays / 365)} years`;
  }

  generateFallbackDNA(project) {
    const hash = this.simpleHash(project.name + project.description);
    return {
      dnaSequence: this.generateSequenceFromHash(hash),
      geneticTraits: ['Unique', 'Innovative', 'Scalable', 'Modern', 'Efficient'],
      dominantGenes: ['Innovation', 'Quality', 'Performance'],
      mutationPotential: ['Feature expansion', 'Tech upgrade', 'Scale increase'],
      compatibility: ['Similar tech stack projects'],
      evolutionStage: 'Growing',
      healthScore: 75,
      uniqueSignature: 'A project with untapped potential',
      visualPattern: []
    };
  }

  simpleHash(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash;
    }
    return Math.abs(hash);
  }

  generateSequenceFromHash(hash) {
    const bases = 'ATCGXYZWQRSU';
    let sequence = '';
    for (let i = 0; i < 12; i++) {
      sequence += bases[Math.floor((hash / (i + 1)) % bases.length)];
      if (i === 3 || i === 7) sequence += '-';
    }
    return sequence;
  }
}

module.exports = new ProjectDNAService();
