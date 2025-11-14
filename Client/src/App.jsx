// Import necessary modules from the React library.
import React, { useState, useEffect } from 'react' // useState for managing component state, useEffect for side effects (like data fetching).
import './App.css' // Import the CSS file for styling the application.

// Define the base URL for the backend API connection.
const API_BASE = 'http://localhost:3002/api';

// =============================================================================
// USER PROFILE DATA
// =============================================================================
// Define a constant object to hold the student's personal and academic profile data.
const userProfile = {
  name: "Samuel Raymond Kwibe", // Full name.
  title: "Computer Science Student", // Current academic status.
  bio: "I'm a Computer Science student at Southern New Hampshire University focused on Cloud Computing, AI/ML, and Web Development.", // A brief description of focus areas.
  image: "/profile-picture.jpg", // Path to the profile image file.
  location: "Manchester, NH • SNHU", // Current location and institution.
  email: "samuel.kwibe@snhu.edu", // Primary contact email.
  // List of technical skills relevant to the coursework and career goals.
  skills: ["JavaScript", "React", "Node.js", "CSS", "HTML", "Python", "AWS", "SQL"]
}

// =============================================================================
// MAIN APP COMPONENT
// =============================================================================
// Define the main functional component of the application.
function App() {
  // State Management: Using React Hooks to manage the application's internal state.
  
  // Controls which major screen is currently displayed ('topics', 'quizzes', 'quiz', 'results', 'review').
  const [currentView, setCurrentView] = useState('topics')
  // Stores the currently selected topic object for context (e.g., Mathematics).
  const [selectedTopic, setSelectedTopic] = useState(null)
  // Stores the full data object for the selected quiz (questions, intro, etc.).
  const [selectedQuiz, setSelectedQuiz] = useState(null)
  // Tracks the zero-based index of the question currently being displayed.
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  // An array to store the user's selected answer ID for each question.
  const [userAnswers, setUserAnswers] = useState([])
  // Stores the unique ID returned by the server for a live quiz session (null in offline mode).
  const [sessionId, setSessionId] = useState(null)
  // Holds all the application's structured data (topics, quizzes, stats).
  const [appData, setAppData] = useState(null)
  // Boolean flag to show a loading indicator during data fetching or processing.
  const [loading, setLoading] = useState(false)
  // Stores any error messages encountered during API calls or data handling.
  const [error, setError] = useState(null)
  // Stores the final score and results after a quiz is completed.
  const [quizResults, setQuizResults] = useState(null) 

  // Initialize app data from server upon component mounting.
  useEffect(() => {
    initializeApp(); // Call the initialization function once.
  }, []); // Empty dependency array ensures this runs only on the initial render.

  // API Functions
  // Function to load main application data (topics, stats) from the backend.
  const initializeApp = async () => {
    try {
      setLoading(true); // Start loading state.
      console.log('Initializing app from server...'); // Log the initiation of the process.
      
      // Attempt to fetch general app data from the defined API endpoint.
      const response = await fetch(`${API_BASE}/hello`, {
        method: 'POST', // Use POST method as specified by the mock backend logic.
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ who: 'qzicl', action: 'hello' }) // Send a placeholder body.
      });
      
      // Check if the network request succeeded (HTTP status 200-299).
      if (!response.ok) {
        // If not successful, throw an error with the status details.
        throw new Error(`Server returned ${response.status}: ${response.statusText}`);
      }
      
      // Parse the JSON response body into a JavaScript object.
      const data = await response.json();
      console.log('Server data loaded:', data);
      setAppData(data); // Set the received data into the state.
      setError(null); // Clear any previous errors.
    } catch (err) {
      console.error('Initialization error:', err); // Log the error to the console.
      // Set a user-friendly error message, guiding the user on the likely issue (server connection).
      setError(`Cannot connect to server: ${err.message}. Make sure the server is running on http://localhost:3001`);
      
      // =========================================================================
      // FALLBACK: Use mock data if the server connection fails.
      // =========================================================================
      // Define the full mock data structure as a constant object for offline functionality.
      const mockData = {
        app: {
          title: "Qzicl",
          subtitle: "Learn • Grow • Achieve (Offline Mode)",
          description: "Master new topics with interactive quizzes. Running in offline mode."
        },
        stats: {
          totalQuizzes: 15,
          totalQuestions: 200,
          activeLearners: "10K+"
        },
        // Detailed topic list, including an explicit color for styling.
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
        // Quiz data structured by Topic ID. This is a partial mock for demonstration.
        quizzes: {
          "1": [
            {
              id: "1",
              title: "Algebra Fundamentals",
              intro: "Master the building blocks of algebra.",
              estimatedQuestions: 5,
              difficulty: "Beginner",
              timeEstimate: "5 min",
              // Full question set for Algebra.
              questions: [
                { id: "1", text: "Solve for x: 2x + 5 = 17", options: [{ id: "1", text: "x = 6" }, { id: "2", text: "x = 7" }, { id: "3", text: "x = 8" }, { id: "4", text: "x = 9" }], correctAnswerId: "1" },
                { id: "2", text: "Simplify the expression: 3(y - 4) + 2y", options: [{ id: "1", text: "5y - 12" }, { id: "2", text: "5y - 4" }, { id: "3", text: "5y + 12" }, { id: "4", text: "5y + 4" }], correctAnswerId: "1" },
                { id: "3", text: "If a = 3 and b = 5, what is a² + b?", options: [{ id: "1", text: "8" }, { id: "2", text: "14" }, { id: "3", text: "18" }, { id: "4", text: "34" }], correctAnswerId: "2" },
                { id: "4", text: "What is the result of 10 / 2 + 3 * 4?", options: [{ id: "1", text: "23" }, { id: "2", text: "17" }, { id: "3", text: "32" }, { id: "4", text: "19" }], correctAnswerId: "2" },
                { id: "5", text: "Which number is prime?", options: [{ id: "1", text: "4" }, { id: "2", text: "9" }, { id: "3", text: "11" }, { id: "4", text: "15" }], correctAnswerId: "3" }
              ]
            }
          ],
          "2": [
            {
              id: "2",
              title: "World Capitals Quiz",
              intro: "Test your knowledge of global capitals.",
              estimatedQuestions: 5,
              difficulty: "Beginner",
              timeEstimate: "5 min",
              // Full question set for Capitals.
              questions: [
                { id: "1", text: "What is the capital of Japan?", options: [{ id: "1", text: "Seoul" }, { id: "2", text: "Beijing" }, { id: "3", text: "Tokyo" }, { id: "4", text: "Bangkok" }], correctAnswerId: "3" },
                { id: "2", text: "The capital of Australia is:", options: [{ id: "1", text: "Sydney" }, { id: "2", text: "Melbourne" }, { id: "3", text: "Canberra" }, { id: "4", text: "Perth" }], correctAnswerId: "3" },
                { id: "3", text: "Which city is the capital of Canada?", options: [{ id: "1", text: "Toronto" }, { id: "2", text: "Vancouver" }, { id: "3", text: "Montreal" }, { id: "4", text: "Ottawa" }], correctAnswerId: "4" },
                { id: "4", text: "What is the capital of Brazil?", options: [{ id: "1", text: "Rio de Janeiro" }, { id: "2", text: "São Paulo" }, { id: "3", text: "Brasília" }, { id: "4", text: "Salvador" }], correctAnswerId: "3" },
                { id: "5", text: "What is the capital of Egypt?", options: [{ id: "1", text: "Alexandria" }, { id: "2", text: "Cairo" }, { id: "3", text: "Giza" }, { id: "4", text: "Luxor" }], correctAnswerId: "2" }
              ]
            }
          ],
          "3": [
            {
              id: "3",
              title: "Biology Basics",
              intro: "Explore fundamental biological concepts from cells to ecosystems.",
              estimatedQuestions: 3,
              difficulty: "Beginner",
              timeEstimate: "3 min",
              // Full question set for Biology.
              questions: [
                { id: "1", text: "What is the basic unit of life?", options: [{ id: "1", text: "Atom" }, { id: "2", text: "Cell" }, { id: "3", text: "Molecule" }, { id: "4", text: "Organ" }], correctAnswerId: "2" },
                { id: "2", text: "What process do plants use to make food?", options: [{ id: "1", text: "Respiration" }, { id: "2", text: "Fermentation" }, { id: "3", text: "Photosynthesis" }, { id: "4", text: "Transpiration" }], correctAnswerId: "3" },
                { id: "3", text: "The human body's largest organ is the:", options: [{ id: "1", text: "Heart" }, { id: "2", text: "Liver" }, { id: "3", text: "Brain" }, { id: "4", text: "Skin" }], correctAnswerId: "4" }
              ]
            }
          ],
          "4": [
            {
              id: "401",
              title: "Ancient Civilizations",
              intro: "Explore the cultures of early human history.",
              estimatedQuestions: 3,
              difficulty: "Beginner",
              timeEstimate: "3 min",
              // Full question set for History.
              questions: [
                { id: "1", text: "Which ancient civilization built the pyramids of Giza?", options: [{ id: "1", text: "Maya" }, { id: "2", text: "Mesopotamian" }, { id: "3", text: "Roman" }, { id: "4", text: "Egyptian" }], correctAnswerId: "4" },
                { id: "2", text: "The Peloponnesian War was fought primarily between which two Greek city-states?", options: [{ id: "1", text: "Troy and Athens" }, { id: "2", text: "Corinth and Sparta" }, { id: "3", text: "Athens and Sparta" }, { id: "4", text: "Thebes and Athens" }], correctAnswerId: "3" },
                { id: "3", text: "Who was the first Roman Emperor?", options: [{ id: "1", text: "Julius Caesar" }, { id: "2", text: "Diocletian" }, { id: "3", text: "Nero" }, { id: "4", text: "Augustus" }], correctAnswerId: "4" }
              ]
            }
          ], // History
          "5": [], // Technology
          "6": [], // Languages
          "7": [], // Arts & Culture
          "8": [], // Business & Economics
        }
      };
      setAppData(mockData); // Load the mock data if API fails.
    } finally {
      setLoading(false); // End loading state regardless of success or failure.
    }
  };

  // Function to initiate a specific quiz session, either via API or locally.
  const startQuizSession = async (quizId, topicId) => {
    // Reset all quiz-related states before starting a new one.
    setCurrentQuestionIndex(0)
    setUserAnswers([])
    setQuizResults(null)
    setError(null) 
    
    try {
      setLoading(true); // Indicate that we are processing.
      console.log(`Starting quiz: quizID=${quizId}, topicID=${topicId}`);
      
      // Attempt to fetch the full quiz data from the API endpoint.
      const response = await fetch(`${API_BASE}/quizzes?quizID=${quizId}&topicID=${topicId}`);
      
      if (!response.ok) {
        throw new Error(`Server returned ${response.status}`);
      }
      
      const data = await response.json();
      console.log('Quiz session started:', data);
      
      setSessionId(data.sessionID); // Store the server-provided session ID.
      setSelectedQuiz(data.quiz); // Store the quiz data.
      setCurrentView('get-ready'); // Move to the introduction screen.
    } catch (err) {
      console.error('Error starting quiz:', err);
      const errorMessage = 'Failed to start quiz session. Running in offline mode.';
      setError(errorMessage);
      
      // Fallback Logic: Use client-side mock data if API call fails.
      const quiz = appData.quizzes[topicId]?.find(q => q.id === quizId);
      if (quiz) {
        setSessionId(null); // Explicitly clear session ID to confirm offline mode.
        setSelectedQuiz(quiz);
        setCurrentView('get-ready');
      } else {
         // If quiz data is also missing locally, show error and return to topics.
         setError(`${errorMessage} Quiz data missing.`);
         setCurrentView('topics');
      }
    } finally {
      setLoading(false); // Stop loading indicator.
    }
  };

  // Function to gracefully exit the quiz session, communicating to the server if necessary.
  const exitQuizSession = async () => {
    // Check if a server session ID exists.
    if (sessionId) {
        try {
            // Attempt to notify the server that the session is ending.
            await fetch(`${API_BASE}/exit`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ sessionID: sessionId })
            });
            console.log(`Session ${sessionId} exited on server.`);
        } catch (error) {
            console.warn("Could not communicate quiz exit to server:", error); // Warning if API fails on exit.
        }
    }
    // Reset all client-side state variables to return to the initial view.
    setCurrentView('topics');
    setSelectedTopic(null);
    setSelectedQuiz(null);
    setSessionId(null);
    setQuizResults(null);
    setError(null);
};


  // ===========================================================================
  // PROFILE COMPONENT (A sub-component for reusable display)
  // ===========================================================================
  const ProfileSection = () => (
    <div className="profile-section">
      <div className="profile-container">
        <div className="profile-image">
          <div className="image-placeholder">
            {/* Conditional rendering for the profile image or a simple avatar text */}
            {userProfile.image ? (
              <img src={userProfile.image} alt={userProfile.name} />
            ) : (
              // Generate initials if no image path is provided.
              <div className="avatar">{userProfile.name.split(' ').map(n => n[0]).join('')}</div>
            )}
          </div>
        </div>
        <div className="profile-info">
          <h1 className="profile-name">{userProfile.name}</h1>
          <p className="profile-title">{userProfile.title}</p>
          <p className="profile-bio">{userProfile.bio}</p>
          <div className="profile-details">
            <div className="detail-item">
              <span className="detail-icon">📍</span>
              <span>{userProfile.location}</span>
            </div>
            <div className="detail-item">
              <span className="detail-icon">📧</span>
              <span>{userProfile.email}</span>
            </div>
          </div>
          <div className="profile-skills">
            <h4>Skills & Interests:</h4>
            <div className="skills-list">
              {/* Map over the skills array to render each skill as a tag */}
              {userProfile.skills.map((skill, index) => (
                <span key={index} className="skill-tag">{skill}</span>
              ))}
            </div>
          </div>
        </div>
        </div>
      </div>
    )

  // ===========================================================================
  // COMPONENT: TOPIC SELECTION SCREEN (The main landing page)
  // ===========================================================================
  const TopicSelection = () => {
    // Show a basic loading screen if appData hasn't been fetched yet.
    if (!appData) {
      return (
        <div className="topic-selection">
          <ProfileSection />
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p>Loading Qzicl...</p>
          </div>
        </div>
      );
    }

    // Main render of the topic selection screen.
    return (
      <div className="topic-selection">
        <ProfileSection /> {/* Display the persistent user profile section. */}

        {/* Error Banner: Conditionally renders if an error state exists */}
        {error && (
          <div className="error-banner">
            <div className="error-content">
              <span className="error-icon">⚠️</span>
              <span className="error-message">{error}</span>
              <button 
                className="retry-btn"
                onClick={initializeApp} // Button allows the user to manually retry the connection.
              >
                Retry Connection
              </button>
            </div>
          </div>
        )}

        {/* Hero Section: Displays application title and key stats. */}
        <div className="hero-section">
          <div className="hero-content">
            <h1 className="hero-title">
              Welcome to <span className="brand-accent">{appData.app.title}</span>
            </h1>
            <p className="hero-subtitle">{appData.app.subtitle}</p>
            <p className="hero-description">{appData.app.description}</p>
            
            {/* Display application statistics fetched or mocked. */}
            <div className="hero-stats">
              <div className="stat-item">
                <div className="stat-number">{appData.stats.totalQuizzes}+</div>
                <div className="stat-label">Interactive Quizzes</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">{appData.stats.totalQuestions}+</div>
                <div className="stat-label">Learning Questions</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">{appData.stats.activeLearners}</div>
                <div className="stat-label">Active Learners</div>
              </div>
            </div>
          </div>
        </div>

        {/* Topics Section */}
        <div className="section-header">
          <h2>Explore Learning Topics</h2>
          <p>Choose from {appData.topics.length} diverse categories to start your learning journey</p>
        </div>

        {/* Grid layout for topic cards. */}
        <div className="topics-grid">
          {/* Map over the list of topics to render interactive cards. */}
          {appData.topics.map(topic => (
            <div 
              key={topic.id} 
              className="topic-card"
              // Set a CSS variable to apply the topic's color for visual theme.
              style={{ '--topic-color': topic.color }}
              onClick={() => {
                setSelectedTopic(topic) // Set the clicked topic as the selected one.
                setCurrentView('quizzes') // Change view to the quiz selection screen.
              }}
            >
              <div className="topic-icon">{topic.icon}</div>
              <div className="topic-content">
                <h3>{topic.title}</h3>
                <p>{topic.description}</p>
                <div className="topic-meta">
                  <span>
                    {/* Safely access the number of quizzes for this topic, defaulting to 0. */}
                    {appData.quizzes[topic.id]?.length || 0} quizzes available
                  </span>
                </div>
              </div>
              <div className="topic-action">
                <span>View Quizzes</span>
                <div className="action-arrow">→</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  // ===========================================================================
  // COMPONENT: QUIZ SELECTION SCREEN
  // ===========================================================================
  const QuizSelection = () => {
    // Basic guard clause: ensure context data is available.
    if (!selectedTopic || !appData) {
      return <div>Loading...</div>;
    }

    // Retrieve the array of quizzes specific to the selected topic ID.
    const topicQuizzes = appData.quizzes[selectedTopic.id] || []

    return (
      <div className="quiz-selection">
        {/* Breadcrumb Navigation: Allows easy return to previous screens. */}
        <nav className="breadcrumb">
          <button 
            onClick={() => { setCurrentView('topics'); setSelectedTopic(null); }}
            className="breadcrumb-link"
          >
            Home
          </button>
          <span className="breadcrumb-separator">/</span>
          <span>{selectedTopic.title}</span>
        </nav>

        {/* Header for the currently selected topic. */}
        <div className="topic-header">
          <div className="topic-icon-large" style={{ color: selectedTopic.color }}>
            {selectedTopic.icon}
          </div>
          <div className="topic-info">
            <h1>{selectedTopic.title}</h1>
            <p>{selectedTopic.description}</p>
            <div className="topic-stats">
              <span>{topicQuizzes.length} quizzes available</span>
            </div>
          </div>
        </div>
        
        {/* Display any specific errors related to quiz loading. */}
        {error && <div className="quiz-selection-error">⚠️ {error}</div>}


        {/* List of quizzes available within the topic. */}
        <div className="quizzes-list">
          {/* Map over the list of quizzes to render individual cards. */}
          {topicQuizzes.map(quiz => (
            <div 
              key={quiz.id} 
              className="quiz-item"
              // Visual Enhancement: Use topic color as a border for easy category identification.
              style={{ borderLeft: `5px solid ${selectedTopic.color}` }} 
            >
              <div className="quiz-info">
                <div className="quiz-header">
                  <h3>{quiz.title}</h3>
                  {/* Difficulty badge dynamically applies CSS class based on difficulty string. */}
                  <div className={`difficulty-badge difficulty-${quiz.difficulty.toLowerCase()}`}>
                    {quiz.difficulty}
                  </div>
                </div>
                <p className="quiz-description">{quiz.intro}</p>
                <div className="quiz-meta">
                  <span className="meta-item">
                    <strong>{quiz.estimatedQuestions}</strong> questions
                  </span>
                  <span className="meta-item">
                    <strong>{quiz.timeEstimate}</strong> average
                  </span>
                </div>
              </div>
              <button 
                className="get-ready-btn"
                onClick={() => {
                  // Call the async function to start the session.
                  startQuizSession(quiz.id, selectedTopic.id)
                }}
                disabled={loading} // Disable button while loading.
              >
                {loading ? 'Loading...' : 'Get Ready'}
              </button>
            </div>
          ))}
        </div>

        {/* Message displayed if no quizzes are found for the topic. */}
        {topicQuizzes.length === 0 && (
          <div className="no-quizzes">
            <h3>No quizzes available yet</h3>
            <p>Check back soon for new content in this topic!</p>
          </div>
        )}
      </div>
    )
  }

  // ===========================================================================
  // COMPONENT: GET READY SCREEN (Quiz Intro/Instructions)
  // ===========================================================================
  const GetReady = () => (
    <div className="get-ready">
      {/* Detailed breadcrumb navigation. */}
      <nav className="breadcrumb">
        <button onClick={() => exitQuizSession()} className="breadcrumb-link">
          Home
        </button>
        <span className="breadcrumb-separator">/</span>
        <button onClick={() => setCurrentView('quizzes')} className="breadcrumb-link">
          {selectedTopic.title}
        </button>
        <span className="breadcrumb-separator">/</span>
        <span>{selectedQuiz.title}</span>
      </nav>

      <div className="get-ready-content">
        <div className="quiz-header-card">
          <h2>Get Ready</h2>
          <h3>{selectedQuiz.title}</h3>
          <div className="quiz-meta-header">
            <span className="difficulty-tag">{selectedQuiz.difficulty}</span>
            <span className="time-estimate">{selectedQuiz.timeEstimate}</span>
            <span className="question-count">{selectedQuiz.estimatedQuestions} questions</span>
          </div>
        </div>

        <div className="quiz-intro-card">
          <p>{selectedQuiz.intro}</p>
          <div className="instructions-card">
            <h4>How it works:</h4>
            {/* List of instructions for the user. */}
            <ul>
              <li>Read each question carefully</li>
              <li>Select the best answer from multiple choices</li>
              <li>You can exit the quiz at any time</li>
              <li>See your results and explanations at the end</li>
            </ul>
          </div>
        </div>

        <div className="action-buttons">
          <button 
            className="start-quiz-btn"
            onClick={() => {
              setCurrentQuestionIndex(0) // Start from the first question.
              setUserAnswers([]) // Ensure answers array is clean.
              setCurrentView('quiz') // Transition to the live quiz session.
            }}
          >
            Start Quiz
          </button>
          <button 
            className="back-btn"
            onClick={() => setCurrentView('quizzes')}
          >
            Back to Quizzes
          </button>
        </div>
      </div>
    </div>
  )

  // ===========================================================================
  // COMPONENT: QUIZ SESSION SCREEN (The core quiz functionality)
  // ===========================================================================
  const QuizSession = () => {
    // Destructure necessary data for the current question.
    const questions = selectedQuiz?.questions || [];
    const currentQuestion = questions[currentQuestionIndex];
    // Check if the current question is the final one.
    const isLastQuestion = currentQuestionIndex === questions.length - 1;
    // Check if the user has selected an answer for the current question.
    const hasSelectedAnswer = userAnswers[currentQuestionIndex] !== undefined;
    // Calculate the percentage of quiz completion for the progress bar.
    const progressPercentage = ((currentQuestionIndex + 1) / questions.length) * 100;

    // Handler function when an option is clicked.
    const handleAnswerSelect = (answerId) => {
      const newAnswers = [...userAnswers]
      newAnswers[currentQuestionIndex] = answerId // Update the specific index with the selected answer ID.
      setUserAnswers(newAnswers)
    }

    // Utility function to calculate the score based on local data (used in offline mode/fallback).
    const calculateLocalScore = () => {
        let correct = 0;
        questions.forEach((question, index) => {
            // Check if the user's recorded answer matches the correct ID in the data.
            if (userAnswers[index] === question.correctAnswerId) {
                correct++;
            }
        });
        const percentage = Math.round((correct / questions.length) * 100);
        return {
            correct,
            total: questions.length,
            percentage,
            message: `You scored ${percentage}% (${correct}/${questions.length} correct)`
        };
    };

    // Main function to process the user's answer and move to the next step.
    const handleNext = async () => {
        const answerId = userAnswers[currentQuestionIndex];
        setLoading(true);
        setError(null); 

        // Check for server-based session (Online Mode).
        if (sessionId) {
            // --- API Mode: Send answer to server ---
            try {
                // Determine the correct API endpoint: '/go' for results, '/continue' for next question.
                const endpoint = isLastQuestion ? '/go' : '/continue';
                const url = `${API_BASE}${endpoint}?sessionID=${sessionId}&answerID=${answerId}`;
                
                const response = await fetch(url);
                if (!response.ok) throw new Error(`API call failed with status ${response.status}`);
                
                const data = await response.json();
                console.log('Quiz progression response:', data);

                if (data.complete && data.results) {
                    // If the server confirms completion, show final results.
                    setQuizResults(data.results);
                    setCurrentView('results');
                    setSessionId(null); 
                } else {
                    // Otherwise, move to the next question index.
                    setCurrentQuestionIndex(prev => prev + 1);
                }

            } catch (err) {
                console.error("Server interaction error during quiz:", err);
                // Enhanced Error Handling: Fallback to local calculation if server fails mid-quiz.
                setError("Server connection lost. Cannot submit results remotely. Calculating score locally."); 
                
                // Fallback action: calculate score client-side and show results.
                setQuizResults(calculateLocalScore());
                setCurrentView('results');
                setSessionId(null);
            }
        } else {
            // --- Offline Mode: Use local data ---
            if (isLastQuestion) {
                // If last question in offline mode, calculate and show local results.
                setQuizResults(calculateLocalScore());
                setCurrentView('results');
            } else {
                // Otherwise, just advance the question index.
                setCurrentQuestionIndex(prev => prev + 1);
            }
        }
        setLoading(false); // Stop processing indicator.
    }

    // Function to handle the user explicitly exiting the quiz.
    const handleExit = () => {
      if (window.confirm("Exit the current quiz? Your progress will be lost.")) {
        exitQuizSession(); // Call the shared exit function.
      }
    }

    // Error message if question data is unexpectedly missing.
    if (!currentQuestion) {
        return <div>{loading ? "Loading question..." : "Error: No question data."}</div>;
    }

    // Utility function to change the color of the progress bar based on completion.
    const getProgressColor = () => {
        if (progressPercentage < 33) return 'var(--color-primary-light)'; // Less than 1/3 complete.
        if (progressPercentage < 66) return 'var(--color-warning)'; // Between 1/3 and 2/3 complete.
        return 'var(--color-success)'; // More than 2/3 complete.
    }

    return (
      <div className="quiz-session">
        <div className="quiz-header">
          <div className="progress-info">
            <span className="progress-text">
              Question {currentQuestionIndex + 1} of {questions.length}
              {sessionId ? "" : " (Offline Mode)"} {/* Indicate offline status */}
            </span>
            <div className="progress-bar">
              <div 
                className="progress-fill"
                style={{
                  width: `${progressPercentage}%`,
                  backgroundColor: getProgressColor() // Apply dynamic color.
                }}
              ></div>
            </div>
          </div>
          <button onClick={handleExit} className="exit-quiz-btn">
            Exit Quiz
          </button>
        </div>

        <div className="question-card">
          <h3 className="question-text">{currentQuestion.text}</h3>
          <div className="options-list">
            {/* Map over the options for the current question. */}
            {currentQuestion.options.map(option => (
              <label key={option.id} className="option-item">
                <input
                  type="radio"
                  name="answer"
                  value={option.id}
                  // Check if this option ID matches the user's selection for this question index.
                  checked={userAnswers[currentQuestionIndex] === option.id}
                  onChange={() => handleAnswerSelect(option.id)}
                />
                <span className="option-text">{option.text}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="quiz-footer">
          <button 
            className="next-btn"
            onClick={handleNext}
            // Button is disabled if no answer is selected or if processing is underway.
            disabled={!hasSelectedAnswer || loading}
          >
            {/* Dynamic text based on quiz progression */}
            {loading ? 'Processing...' : (isLastQuestion ? 'See Results' : 'Next Question')}
          </button>
        </div>
        {error && <div className="quiz-error-message">⚠️ {error}</div>}
      </div>
    )
  }

  // ===========================================================================
  // COMPONENT: RESULTS SCREEN
  // ===========================================================================
  const Results = () => {
    const score = quizResults;
    if (!score) {
      return <div>Calculating results...</div>; // Safety check while results are being calculated.
    }

    // Function to provide motivational feedback based on the score percentage.
    const getPerformanceMessage = () => {
      if (score.percentage >= 90) return "Outstanding! 🎉 You're a master!"
      if (score.percentage >= 70) return "Great job! 👍 You passed with flying colors."
      if (score.percentage >= 50) return "Good effort! 💪 Keep practicing to improve."
      return "Keep practicing! 📚 Let's review the answers."
    }

    return (
      <div className="results">
        <div className="results-header">
          <h2>Quiz Complete!</h2>
          <h3>{selectedQuiz.title}</h3>
          {error && <div className="results-warning">⚠️ {error}</div>}
        </div>

        <div className="score-display">
          <div className="score-circle">
            <div className="score-percentage">{score.percentage}%</div>
            <div className="score-text">
              {score.correct} out of {score.total} correct
            </div>
          </div>
          <div className="performance-message">
            <h4>{getPerformanceMessage()}</h4>
            <p>Your learning journey continues!</p>
          </div>
        </div>

        <div className="results-actions">
          {/* Action button to switch to the detailed review screen. */}
          <button 
            className="review-btn"
            onClick={() => setCurrentView('review')}
          >
            Review Answers
          </button>

          <button 
            className="retry-btn"
            onClick={() => {
                // Re-initiate the start quiz session to restart the quiz.
                startQuizSession(selectedQuiz.id, selectedTopic.id)
            }}
          >
            Try Again
          </button>
          <button 
            className="topic-btn"
            onClick={() => {
              setCurrentView('quizzes') // Go back to the list of quizzes for the current topic.
              setSelectedQuiz(null)
              setQuizResults(null)
            }}
          >
            Back to Topic
          </button>
          <button 
            className="home-btn"
            onClick={exitQuizSession} // Go back to the main topic selection screen.
          >
            Back to Home
          </button>
        </div>
      </div>
    )
  }

  // ===========================================================================
  // COMPONENT: QUIZ REVIEW SCREEN (NEW - for post-quiz learning)
  // ===========================================================================
  const QuizReview = () => {
    const questions = selectedQuiz?.questions || []; // Get the full list of questions.

    if (!questions.length) {
        return <div>No questions available for review.</div>;
    }

    return (
        <div className="quiz-review">
            {/* Navigation back to results. */}
            <nav className="breadcrumb">
                <button onClick={() => exitQuizSession()} className="breadcrumb-link">Home</button>
                <span className="breadcrumb-separator">/</span>
                <button onClick={() => setCurrentView('results')} className="breadcrumb-link">Results</button>
                <span className="breadcrumb-separator">/</span>
                <span>Review</span>
            </nav>

            <h2>Review: {selectedQuiz.title}</h2>
            <p className="review-summary">Check your answers and learn from your mistakes. Correct answers are marked in green, your selection in blue (if correct) or red (if incorrect).</p>

            <div className="review-list">
                {/* Iterate over all questions and show their results. */}
                {questions.map((question, index) => {
                    const userAnswerId = userAnswers[index]; // User's answer ID for this question.
                    const isCorrect = userAnswerId === question.correctAnswerId; // Boolean check for correctness.
                    
                    // The review card highlights whether the user got it right or wrong.
                    return (
                        <div key={question.id} className={`review-question-card ${isCorrect ? 'correct' : 'incorrect'}`}>
                            <div className="review-question-header">
                                <span className="question-number">Question {index + 1}</span>
                                <span className="status-badge">{isCorrect ? '✅ Correct' : '❌ Incorrect'}</span>
                            </div>
                            <h4 className="question-text-review">{question.text}</h4>
                            
                            <div className="review-options">
                                {/* Map over options to visually mark correct/incorrect choices. */}
                                {question.options.map(option => {
                                    const isUserSelection = option.id === userAnswerId;
                                    const isCorrectAnswer = option.id === question.correctAnswerId;
                                    
                                    let optionClass = 'review-option-item';
                                    if (isCorrectAnswer) {
                                        optionClass += ' correct-answer'; // Green background for the correct answer.
                                    }
                                    if (isUserSelection && !isCorrectAnswer) {
                                        optionClass += ' incorrect-selection'; // Red background for wrong selection.
                                    }
                                    if (isUserSelection && isCorrectAnswer) {
                                        optionClass += ' correct-selection'; // Blue/Green mix for correct selection.
                                    }

                                    return (
                                        <div key={option.id} className={optionClass}>
                                            {option.text}
                                        </div>
                                    )
                                })}
                            </div>

                            {/* Placeholder for future detailed explanation/rationale. */}
                            {/* <div className="explanation">
                                <strong>Explanation:</strong> {question.explanation}
                            </div> */}
                        </div>
                    );
                })}
            </div>
            <button className="back-to-results-btn" onClick={() => setCurrentView('results')}>
                Back to Results
            </button>
        </div>
    );
  }


  // ===========================================================================
  // VIEW RENDERER (A single function to manage view switching)
  // ===========================================================================
  const renderView = () => {
    // Show a general loading screen during initial app data fetching.
    if (loading && !appData && currentView === 'topics') {
        return (
             <div className="loading-screen">
                 <div className="loading-spinner"></div>
                 <p>Connecting to Qzicl Server...</p>
             </div>
        );
    }
    
    // Switch statement to render the appropriate component based on currentView state.
    switch (currentView) {
      case 'topics':
        return <TopicSelection />
      case 'quizzes':
        return <QuizSelection />
      case 'get-ready':
        return <GetReady />
      case 'quiz':
        return <QuizSession />
      case 'results':
        return <Results />
      case 'review': 
        return <QuizReview /> // Return the new review component.
      default:
        return <TopicSelection /> // Default to the topic selection screen.
    }
  }

  // The main return block of the App component.
  return (
    <div className="app">
      <main className="app-main">
        {renderView()} {/* Execute the rendering logic */}
      </main>
    </div>
  )
}

export default App // Export the main component for use in index.js.