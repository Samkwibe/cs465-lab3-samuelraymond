const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 3002;

// Middleware
app.use(cors());
app.use(express.json());

// ADD THIS ROOT ROUTE
app.get('/', (req, res) => {
  res.json({ 
    message: 'Qzicl Server API',
    version: '1.0.0',
    endpoints: {
      health: '/health',
      api: '/api/*',
      hello: 'POST /api/hello',
      topics: 'GET /api/topics',
      quizzes: 'GET /api/quizzes',
      go: 'GET /api/go',
      continue: 'GET /api/continue',
      exit: 'POST /api/exit'
    }
  });
});

// In-memory storage for active sessions
let sessions = new Map();
let sessionCounter = 1;

// Load your enhanced quiz data
function loadQuizData() {
    return {
      app: {
        title: "Qzicl",
        subtitle: "Learn • Grow • Achieve", 
        description: "Master new topics with interactive quizzes designed to challenge and educate."
      },
  
      // **FIXED SYNTAX ERROR: Only one stats object now.**
      stats: {
        totalQuizzes: 15,
        totalQuestions: 200,
        activeLearners: "10K+" // The property that was causing the original error
      },
      topics: [
        {
          id: "1",
          title: "Mathematics",
          icon: "🧮",
          description: "Master arithmetic, algebra, geometry, and advanced math concepts",
          color: "#4f46e5"
        },
        {
          id: "2", 
          title: "Geography",
          icon: "🌍",
          description: "Explore countries, capitals, landmarks, and world cultures",
          color: "#06d6a0"
        },
        {
          id: "3",
          title: "Science",
          icon: "🔬",
          description: "Discover biology, chemistry, physics, and scientific principles",
          color: "#ef4444"
        },
        {
          id: "4",
          title: "History",
          icon: "🏛️",
          description: "Journey through ancient civilizations and modern historical events",
          color: "#f59e0b"
        },
        {
          id: "5",
          title: "Technology",
          icon: "💻",
          description: "Learn about programming, computers, and digital innovations",
          color: "#8b5cf6"
        },
        {
          id: "6",
          title: "Languages",
          icon: "🗣️",
          description: "Practice vocabulary, grammar, and language fundamentals",
          color: "#ec4899"
        },
        {
          id: "7",
          title: "Arts & Culture",
          icon: "🎨",
          description: "Explore music, literature, visual arts, and cultural movements",
          color: "#10b981"
        },
        {
          id: "8",
          title: "Business & Economics",
          icon: "💼",
          description: "Understand markets, finance, entrepreneurship, and economics",
          color: "#6366f1"
        }
      ],
      quizzes: {
        "1": [
          {
            id: "1",
            title: "Algebra Fundamentals",
            intro: "Master the building blocks of algebra including equations, variables, and expressions. Perfect for beginners and those looking to refresh their skills.",
            estimatedQuestions: 12,
            difficulty: "Beginner",
            timeEstimate: "8 min",
            questions: [
              {
                id: "1",
                text: "Solve for x: 2x + 5 = 17",
                options: [
                  { id: "1", text: "x = 6" },
                  { id: "2", text: "x = 7" },
                  { id: "3", text: "x = 8" },
                  { id: "4", text: "x = 9" }
                ],
                correctAnswerId: "1"
              },
              {
                id: "2",
                text: "What is the solution to the equation 3(x - 4) = 15?",
                options: [
                  { id: "1", text: "x = 7" },
                  { id: "2", text: "x = 9" },
                  { id: "3", text: "x = 11" },
                  { id: "4", text: "x = 13" }
                ],
                correctAnswerId: "2"
              }
            ]
          },
          {
            id: "2",
            title: "Geometry Mastery",
            intro: "Explore geometric shapes, theorems, and spatial reasoning with challenging problems.",
            estimatedQuestions: 15,
            difficulty: "Intermediate",
            timeEstimate: "12 min",
            questions: [
              {
                id: "1",
                text: "What is the sum of the angles in a triangle?",
                options: [
                  { id: "1", text: "90°" },
                  { id: "2", text: "120°" },
                  { id: "3", text: "180°" },
                  { id: "4", text: "360°" }
                ],
                correctAnswerId: "3"
              },
              {
                id: "2",
                text: "How many sides does a hexagon have?",
                options: [
                  { id: "1", text: "5" },
                  { id: "2", text: "6" },
                  { id: "3", text: "7" },
                  { id: "4", text: "8" }
                ],
                correctAnswerId: "2"
              }
            ]
          }
        ],
        "2": [
          {
            id: "3",
            title: "World Capitals",
            intro: "Test your knowledge of global capitals and improve your geographic literacy.",
            estimatedQuestions: 20,
            difficulty: "Beginner",
            timeEstimate: "15 min",
            questions: [
              {
                id: "1",
                text: "What is the capital of Japan?",
                options: [
                  { id: "1", text: "Seoul" },
                  { id: "2", text: "Beijing" },
                  { id: "3", text: "Tokyo" },
                  { id: "4", text: "Bangkok" }
                ],
                correctAnswerId: "3"
              },
              {
                id: "2",
                text: "Which city serves as the capital of Australia?",
                options: [
                  { id: "1", text: "Sydney" },
                  { id: "2", text: "Melbourne" },
                  { id: "3", text: "Canberra" },
                  { id: "4", text: "Perth" }
                ],
                correctAnswerId: "3"
              }
            ]
          }
        ],
        "3": [
          {
            id: "4",
            title: "Biology Basics",
            intro: "Explore fundamental biological concepts from cells to ecosystems.",
            estimatedQuestions: 10,
            difficulty: "Beginner",
            timeEstimate: "8 min",
            questions: [
              {
                id: "1",
                text: "What is the basic unit of life?",
                options: [
                  { id: "1", text: "Atom" },
                  { id: "2", text: "Cell" },
                  { id: "3", text: "Molecule" },
                  { id: "4", text: "Organ" }
                ],
                correctAnswerId: "2"
              }
            ]
          }
        ]
      }
    };
}

const quizData = loadQuizData();

// Utility function to generate session ID
function generateSessionId() {
  return sessionCounter++;
}

// API Routes

// ADD THIS GET ENDPOINT FOR /api/hello
app.get('/api/hello', (req, res) => {
  res.json({ 
    message: 'Backend server connected successfully!',
    status: 'healthy',
    timestamp: new Date().toISOString(),
    endpoints: {
      health: '/health',
      topics: '/api/topics',
      quizzes: '/api/quizzes'
    }
  });
});

// POST /api/hello - Initialize app and get all data
app.post('/api/hello', (req, res) => {
  console.log('POST /api/hello', req.body);
  
  if (req.body.who !== 'qzicl' || req.body.action !== 'hello') {
    return res.status(400).json({ error: 'Invalid request format' });
  }
  
  // Return complete app data for your enhanced structure
  res.json(quizData);
});

// GET /api/topics - Get specific topic data
app.get('/api/topics', (req, res) => {
  console.log('GET /api/topics', req.query);
  
  const { topicID } = req.query;
  
  if (!topicID) {
    return res.status(400).json({ error: 'Topic ID required' });
  }
  
  const topic = quizData.topics.find(t => t.id === topicID);
  if (!topic) {
    return res.status(404).json({ 
      error: "Topic not found", 
      topicID: topicID 
    });
  }
  
  // Return topic with its quizzes
  const response = {
    ...topic,
    quizzes: quizData.quizzes[topicID] || []
  };
  
  res.json(response);
});

// GET /api/quizzes - Start a quiz session
app.get('/api/quizzes', (req, res) => {
  console.log('GET /api/quizzes', req.query);
  
  const { quizID, topicID } = req.query;
  
  if (!quizID || !topicID) {
    return res.status(400).json({ error: 'Quiz ID and Topic ID required' });
  }
  
  const topicQuizzes = quizData.quizzes[topicID];
  if (!topicQuizzes) {
    return res.status(404).json({ 
      error: "Topic not found", 
      topicID: topicID 
    });
  }
  
  const quiz = topicQuizzes.find(q => q.id === quizID);
  if (!quiz) {
    return res.status(404).json({ 
      error: "Quiz not found", 
      quizID: quizID 
    });
  }
  
  const sessionID = generateSessionId();
  
  // Create new session
  sessions.set(sessionID, {
    quizID: quizID,
    topicID: topicID,
    currentQuestionIndex: 0,
    userAnswers: [],
    startTime: new Date(),
    completed: false,
    quizData: quiz // Store full quiz data for this session
  });
  
  res.json({
    sessionID: sessionID,
    quiz: quiz
  });
});

const goHandler = (req, res) => {
  console.log('GET /api/go', req.query);
  
  const { sessionID, answerID } = req.query;
  const session = sessions.get(parseInt(sessionID));
  
  if (!session) {
    return res.status(404).json({ 
      error: "Session not found", 
      sessionID: parseInt(sessionID) 
    });
  }
  
  const quiz = session.quizData;

  // The index of the question the user just answered (i.e., the question the client is moving *from*)
  const answeredQuestionIndex = session.currentQuestionIndex - 1;

  // If answerID is provided, record the answer for the PREVIOUS question
  // **FIXED LOGIC HERE to use the index of the question just completed**
  if (answerID && answeredQuestionIndex >= 0) {
    session.userAnswers[answeredQuestionIndex] = answerID;
  }
  
  // Check if quiz is complete
  if (session.currentQuestionIndex >= quiz.questions.length) {
    // Calculate results
    let correct = 0;
    quiz.questions.forEach((question, index) => {
      // Use the recorded answer at the corresponding index
      if (session.userAnswers[index] === question.correctAnswerId) {
        correct++;
      }
    });
    
    const percentage = Math.round((correct / quiz.questions.length) * 100);
    
    const results = {
      score: percentage,
      correct: correct,
      total: quiz.questions.length,
      message: `You scored ${percentage}% (${correct}/${quiz.questions.length} correct)`
    };
    
    // Sessions should ideally be marked complete, not deleted here, 
    // but sticking to original delete logic for now.
    sessions.delete(parseInt(sessionID)); 
    
    return res.json({
      results: results,
      complete: true
    });
  }
  
  // Get current question (The one the client is moving *to*)
  const currentQuestion = quiz.questions[session.currentQuestionIndex];
  
  const response = {
    question: currentQuestion,
    currentQuestion: session.currentQuestionIndex + 1,
    totalQuestions: quiz.questions.length,
    complete: false
  };
  
  // Move to next question for next call
  session.currentQuestionIndex++;
  
  res.json(response);
};

// GET /api/go - Get current question or submit answer
// Note: This endpoint is expected to be called with no answerID on the first question,
// and with an answerID for subsequent calls.
app.get('/api/go', goHandler);

// GET /api/continue - Submit answer and continue
app.get('/api/continue', (req, res, next) => {
  console.log('GET /api/continue', req.query);
  
  const { sessionID, answerID } = req.query; // questionID is redundant as it's tracked by session.currentQuestionIndex
  
  // Pass to goHandler which has the correct logic for recording the answer
  // (using currentQuestionIndex - 1) and then incrementing the index.
  return goHandler(req, res); 
});

// POST /api/exit - Cancel a quiz session
app.post('/api/exit', (req, res) => {
  console.log('POST /api/exit', req.body);
  
  const { sessionID } = req.body;
  
  if (sessionID && sessions.has(parseInt(sessionID))) {
    sessions.delete(parseInt(sessionID));
  }
  
  res.json({ exited: true });
});

// Catch-all for undefined API routes
app.all('/api/*', (req, res) => {
  console.log('Invalid API route:', req.method, req.path);
  res.status(400).json({ error: "bad route" });
});

// Health check
// **FIXED TYPO: Changed aapp to app**
app.get('/health', (req, res) => {
    res.json({ 
      status: 'OK', 
      timestamp: new Date().toISOString(),
      activeSessions: sessions.size
    });
});

// Start server
// **FIXED TYPO: Changed aapp to app**
app.listen(PORT, () => {
    console.log(`🚀 Qzicl server running on http://localhost:${PORT}`);
    console.log(`📚 Loaded ${quizData.topics.length} topics and ${Object.keys(quizData.quizzes).length} quiz categories`);
});