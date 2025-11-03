import { useState, useEffect } from 'react'
import './App.css'

// =============================================================================
// USER PROFILE DATA
// =============================================================================
/**
 * User profile information that displays at the top of the application
 * Contains personal details, skills, and contact information
 */
const userProfile = {
  name: "Samuel Raymond Kwibe",
  title: "Computer Science Student",
  bio: [
    "I’m a Computer Science student at Southern New Hampshire University focused on Cloud Computing, AI/ML, and Web Development. I’m passionate about building things that work—from modern websites and cloud projects to real-world systems that help people.",
    "I currently work as an IT Front Desk Assistant, helping students and staff solve software, network, and security issues. The role has taught me to stay calm under pressure, communicate clearly, and think like a problem-solver.",
    "Before tech, I worked in manufacturing and machine operations, where I learned discipline, precision, and the value of teamwork. That background shaped my work ethic—I don’t stop until the job is done right.",
    "I’m also an author and creative thinker, writing about technology, culture, and truth. My goal is to become a skilled Cloud Architect and AI Engineer, keep learning every day, and use technology to make a real difference."
  ],
  image: "/profile-picture.jpg",
  location: "Manchester, NH • SNHU",
  email: "samuel.kwibe@snhu.edu",
  skills: ["JavaScript", "React", "Node.js", "CSS", "HTML", "Python", "AWS", "SQL"]
}


// =============================================================================
// QUIZ DATA STRUCTURE
// =============================================================================
/**
 * Main quiz data structure containing:
 * - App metadata (title, description, stats)
 * - Topics with icons and descriptions
 * - Quizzes organized by topic with questions and answers
 */
const quizData = {
  app: {
    title: "Qzicl",
    subtitle: "Learn • Grow • Achieve",
    description: "Master new topics with interactive quizzes designed to challenge and educate."
  },
  stats: {
    totalQuizzes: 15,
    totalQuestions: 200,
    activeLearners: "10K+"
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
          },
          {
            id: "3",
            text: "Factor the expression: x² + 5x + 6",
            options: [
              { id: "1", text: "(x + 2)(x + 3)" },
              { id: "2", text: "(x + 1)(x + 6)" },
              { id: "3", text: "(x + 2)(x + 4)" },
              { id: "4", text: "(x + 3)(x + 3)" }
            ],
            correctAnswerId: "1"
          },
          {
            id: "4",
            text: "What is the slope of the line y = -2x + 7?",
            options: [
              { id: "1", text: "-2" },
              { id: "2", text: "2" },
              { id: "3", text: "7" },
              { id: "4", text: "-7" }
            ],
            correctAnswerId: "1"
          },
          {
            id: "5",
            text: "Simplify: (3x²y)(4xy³)",
            options: [
              { id: "1", text: "12x²y³" },
              { id: "2", text: "12x³y⁴" },
              { id: "3", text: "7x³y⁴" },
              { id: "4", text: "12x²y⁴" }
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
          },
          {
            id: "3",
            text: "What type of angle is 45°?",
            options: [
              { id: "1", text: "Acute" },
              { id: "2", text: "Right" },
              { id: "3", text: "Obtuse" },
              { id: "4", text: "Straight" }
            ],
            correctAnswerId: "1"
          },
          {
            id: "4",
            text: "What is the area of a circle with radius 5 units?",
            options: [
              { id: "1", text: "10π" },
              { id: "2", text: "25π" },
              { id: "3", text: "50π" },
              { id: "4", text: "100π" }
            ],
            correctAnswerId: "2"
          },
          {
            id: "5",
            text: "In a right triangle, if two sides are 3 and 4 units, how long is the hypotenuse?",
            options: [
              { id: "1", text: "5 units" },
              { id: "2", text: "6 units" },
              { id: "3", text: "7 units" },
              { id: "4", text: "8 units" }
            ],
            correctAnswerId: "1"
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
          },
          {
            id: "3",
            text: "What is the capital of Brazil?",
            options: [
              { id: "1", text: "Rio de Janeiro" },
              { id: "2", text: "São Paulo" },
              { id: "3", text: "Brasília" },
              { id: "4", text: "Salvador" }
            ],
            correctAnswerId: "3"
          },
          {
            id: "4",
            text: "Which city is the capital of Egypt?",
            options: [
              { id: "1", text: "Alexandria" },
              { id: "2", text: "Giza" },
              { id: "3", text: "Cairo" },
              { id: "4", text: "Luxor" }
            ],
            correctAnswerId: "3"
          },
          {
            id: "5",
            text: "What is the capital of Canada?",
            options: [
              { id: "1", text: "Toronto" },
              { id: "2", text: "Vancouver" },
              { id: "3", text: "Ottawa" },
              { id: "4", text: "Montreal" }
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
          },
          {
            id: "2",
            text: "Which organelle is known as the 'powerhouse of the cell'?",
            options: [
              { id: "1", text: "Nucleus" },
              { id: "2", text: "Mitochondria" },
              { id: "3", text: "Ribosome" },
              { id: "4", text: "Golgi Apparatus" }
            ],
            correctAnswerId: "2"
          }
        ]
      }
    ]
  }
}

// =============================================================================
// PROFILE COMPONENT
// =============================================================================
/**
 * Displays user profile information at the top of the application
 * Shows profile picture, name, title, bio, contact details, and skills
 */
const ProfileSection = () => (
  <div className="profile-section">
    <div className="profile-container">
      <div className="profile-image">
        <div className="image-placeholder">
          {userProfile.image ? (
            <img src={userProfile.image} alt={userProfile.name} />
          ) : (
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
            {userProfile.skills.map((skill, index) => (
              <span key={index} className="skill-tag">{skill}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>
)

// =============================================================================
// MAIN APP COMPONENT
// =============================================================================
function App() {
  // ===========================================================================
  // STATE MANAGEMENT
  // ===========================================================================
  /**
   * Manages the current view of the application:
   * - 'topics': Topic selection screen
   * - 'quizzes': Quiz selection screen
   * - 'get-ready': Quiz introduction screen
   * - 'quiz': Active quiz session
   * - 'results': Quiz results screen
   */
  const [currentView, setCurrentView] = useState('topics')
  
  /**
   * Stores the currently selected topic object
   */
  const [selectedTopic, setSelectedTopic] = useState(null)
  
  /**
   * Stores the currently selected quiz object
   */
  const [selectedQuiz, setSelectedQuiz] = useState(null)
  
  /**
   * Tracks the current question index during quiz session
   */
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  
  /**
   * Array storing user's answers for each question
   */
  const [userAnswers, setUserAnswers] = useState([])
  
  // Removed unused sessionId state variable

  // ===========================================================================
  // UTILITY FUNCTIONS
  // ===========================================================================
  /**
   * Generates a unique session ID for quiz tracking
   * @returns {string} Unique session identifier
   */
  const generateSessionId = () => {
    return 'session-' + Math.random().toString(36).substr(2, 9)
  }

  // ===========================================================================
  // COMPONENT: TOPIC SELECTION SCREEN
  // ===========================================================================
  /**
   * Main landing page displaying:
   * - User profile section
   * - Hero section with app statistics
   * - Features overview
   * - Interactive topic cards
   * - Call-to-action section
   */
  const TopicSelection = () => (
    <div className="topic-selection">
      {/* Profile Section - Shows user information */}
      <ProfileSection />

      {/* Hero Section - Main app introduction with statistics */}
      <div className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">
            Welcome to <span className="brand-accent">{quizData.app.title}</span>
          </h1>
          <p className="hero-subtitle">{quizData.app.subtitle}</p>
          <p className="hero-description">{quizData.app.description}</p>
          
          {/* Statistics Display - Shows app usage metrics */}
          <div className="hero-stats">
            <div className="stat-item">
              <div className="stat-number">{quizData.stats.totalQuizzes}+</div>
              <div className="stat-label">Interactive Quizzes</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">{quizData.stats.totalQuestions}+</div>
              <div className="stat-label">Learning Questions</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">{quizData.stats.activeLearners}</div>
              <div className="stat-label">Active Learners</div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section - Highlights app benefits */}
      <div className="features-section">
        <h2>Why Learn With Qzicl?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">🎯</div>
            <h3>Targeted Learning</h3>
            <p>Focus on specific topics that match your learning goals and interests</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">⚡</div>
            <h3>Quick Sessions</h3>
            <p>Complete knowledge-packed quizzes in minutes, perfect for busy schedules</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📈</div>
            <h3>Track Progress</h3>
            <p>Monitor your improvement with detailed results and personalized insights</p>
          </div>
        </div>
      </div>

      {/* Topics Section - Interactive topic selection grid */}
      <div className="section-header">
        <h2>Explore Learning Topics</h2>
        <p>Choose from {quizData.topics.length} diverse categories to start your learning journey</p>
      </div>

      <div className="topics-grid">
        {quizData.topics.map(topic => (
          <div 
            key={topic.id} 
            className="topic-card"
            style={{ '--topic-color': topic.color }}
            onClick={() => {
              // Navigate to quizzes view when topic is selected
              setSelectedTopic(topic)
              setCurrentView('quizzes')
            }}
          >
            <div className="topic-icon">{topic.icon}</div>
            <div className="topic-content">
              <h3>{topic.title}</h3>
              <p>{topic.description}</p>
              <div className="topic-meta">
                <span>
                  {quizData.quizzes[topic.id]?.length || 0} quizzes available
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

      {/* Call-to-Action Section - Encourages user engagement */}
      <div className="cta-section">
        <h3>Ready to Start Learning?</h3>
        <p>Join thousands of learners improving their knowledge every day</p>
        <button className="cta-button" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          Explore All Topics
        </button>
      </div>
    </div>
  )

  // ===========================================================================
  // COMPONENT: QUIZ SELECTION SCREEN
  // ===========================================================================
  /**
   * Displays available quizzes for the selected topic
   * Shows quiz details, difficulty levels, and estimated completion times
   */
  const QuizSelection = () => {
    // Filter quizzes for the currently selected topic
    const topicQuizzes = quizData.quizzes[selectedTopic.id] || []

    return (
      <div className="quiz-selection">
        {/* Breadcrumb Navigation - Shows current location in app hierarchy */}
        <nav className="breadcrumb">
          <button 
            onClick={() => setCurrentView('topics')}
            className="breadcrumb-link"
          >
            Home
          </button>
          <span className="breadcrumb-separator">/</span>
          <span>{selectedTopic.title}</span>
        </nav>

        {/* Topic Header - Shows selected topic information */}
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

        {/* Quizzes List - Displays available quizzes with details */}
        <div className="quizzes-list">
          {topicQuizzes.map(quiz => (
            <div key={quiz.id} className="quiz-item">
              <div className="quiz-info">
                <div className="quiz-header">
                  <h3>{quiz.title}</h3>
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
                  // Initialize quiz session and navigate to preparation screen
                  setSelectedQuiz(quiz)
                  // Removed undefined setSessionId call
                  setCurrentView('get-ready')
                }}
              >
                Get Ready
              </button>
            </div>
          ))}
        </div>

        {/* Empty State - Shows when no quizzes are available */}
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
  // COMPONENT: GET READY SCREEN
  // ===========================================================================
  /**
   * Quiz introduction screen showing:
   * - Quiz overview and instructions
   * - Difficulty level and time estimate
   * - Navigation options to start or go back
   */
  const GetReady = () => (
    <div className="get-ready">
      {/* Breadcrumb Navigation */}
      <nav className="breadcrumb">
        <button onClick={() => setCurrentView('topics')} className="breadcrumb-link">
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
        {/* Quiz Header - Basic quiz information */}
        <div className="quiz-header-card">
          <h2>Get Ready</h2>
          <h3>{selectedQuiz.title}</h3>
          <div className="quiz-meta-header">
            <span className="difficulty-tag">{selectedQuiz.difficulty}</span>
            <span className="time-estimate">{selectedQuiz.timeEstimate}</span>
            <span className="question-count">{selectedQuiz.estimatedQuestions} questions</span>
          </div>
        </div>

        {/* Quiz Introduction - Description and instructions */}
        <div className="quiz-intro-card">
          <p>{selectedQuiz.intro}</p>
          <div className="instructions-card">
            <h4>How it works:</h4>
            <ul>
              <li>Read each question carefully</li>
              <li>Select the best answer from multiple choices</li>
              <li>You can exit the quiz at any time</li>
              <li>See your results and explanations at the end</li>
            </ul>
          </div>
        </div>

        {/* Action Buttons - Start quiz or go back */}
        <div className="action-buttons">
          <button 
            className="start-quiz-btn"
            onClick={() => {
              // Reset quiz state and begin quiz session
              setCurrentQuestionIndex(0)
              setUserAnswers([])
              setCurrentView('quiz')
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
  // COMPONENT: QUIZ SESSION SCREEN
  // ===========================================================================
  /**
   * Active quiz session component handling:
   * - Question display and answer selection
   * - Progress tracking
   * - Navigation between questions
   * - Quiz exit functionality
   */
  const QuizSession = () => {
    // Get current question data
    const currentQuestion = selectedQuiz.questions[currentQuestionIndex]
    const isLastQuestion = currentQuestionIndex === selectedQuiz.questions.length - 1
    const hasSelectedAnswer = userAnswers[currentQuestionIndex] !== undefined

    /**
     * Handles user answer selection
     * @param {string} answerId - ID of the selected answer
     */
    const handleAnswerSelect = (answerId) => {
      const newAnswers = [...userAnswers]
      newAnswers[currentQuestionIndex] = answerId
      setUserAnswers(newAnswers)
    }

    /**
     * Advances to next question or completes quiz
     */
    const handleNext = () => {
      if (isLastQuestion) {
        setCurrentView('results')
      } else {
        setCurrentQuestionIndex(currentQuestionIndex + 1)
      }
    }

    /**
     * Handles quiz exit with confirmation
     */
    const handleExit = () => {
      if (window.confirm("Exit the current quiz? Your progress will be lost.")) {
        setCurrentView('topics')
        setSelectedQuiz(null)
        setSessionId(null)
      }
    }

    return (
      <div className="quiz-session">
        {/* Quiz Header - Progress and exit controls */}
        <div className="quiz-header">
          <div className="progress-info">
            <span className="progress-text">
              Question {currentQuestionIndex + 1} of {selectedQuiz.questions.length}
            </span>
            <div className="progress-bar">
              <div 
                className="progress-fill"
                style={{
                  width: `${((currentQuestionIndex + 1) / selectedQuiz.questions.length) * 100}%`
                }}
              ></div>
            </div>
          </div>
          <button onClick={handleExit} className="exit-quiz-btn">
            Exit Quiz
          </button>
        </div>

        {/* Question Card - Displays current question and options */}
        <div className="question-card">
          <h3 className="question-text">{currentQuestion.text}</h3>
          <div className="options-list">
            {currentQuestion.options.map(option => (
              <label key={option.id} className="option-item">
                <input
                  type="radio"
                  name="answer"
                  value={option.id}
                  checked={userAnswers[currentQuestionIndex] === option.id}
                  onChange={() => handleAnswerSelect(option.id)}
                />
                <span className="option-text">{option.text}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Quiz Footer - Next question navigation */}
        <div className="quiz-footer">
          <button 
            className="next-btn"
            onClick={handleNext}
            disabled={!hasSelectedAnswer}
          >
            {isLastQuestion ? 'See Results' : 'Next Question'}
          </button>
        </div>
      </div>
    )
  }

  // ===========================================================================
  // COMPONENT: RESULTS SCREEN
  // ===========================================================================
  /**
   * Displays quiz results including:
   * - Score percentage and correct answers count
   * - Performance feedback message
   * - Navigation options for retry or topic selection
   */
  const Results = () => {
    /**
     * Calculates quiz score and performance metrics
     * @returns {Object} Score data including correct answers and percentage
     */
    const calculateScore = () => {
      let correct = 0
      selectedQuiz.questions.forEach((question, index) => {
        if (userAnswers[index] === question.correctAnswerId) {
          correct++
        }
      })
      return {
        correct,
        total: selectedQuiz.questions.length,
        percentage: Math.round((correct / selectedQuiz.questions.length) * 100)
      }
    }

    const score = calculateScore()

    /**
     * Generates performance feedback based on score percentage
     * @returns {string} Encouraging performance message
     */
    const getPerformanceMessage = () => {
      if (score.percentage >= 90) return "Outstanding! 🎉"
      if (score.percentage >= 70) return "Great job! 👍"
      if (score.percentage >= 50) return "Good effort! 💪"
      return "Keep practicing! 📚"
    }

    return (
      <div className="results">
        {/* Results Header */}
        <div className="results-header">
          <h2>Quiz Complete!</h2>
          <h3>{selectedQuiz.title}</h3>
        </div>

        {/* Score Display - Visual and numerical results */}
        <div className="score-display">
          <div className="score-circle">
            <div className="score-percentage">{score.percentage}%</div>
            <div className="score-text">
              {score.correct} out of {score.total} correct
            </div>
          </div>
          <div className="performance-message">
            <h4>{getPerformanceMessage()}</h4>
            <p>Want to try again or explore another quiz?</p>
          </div>
        </div>

        {/* Results Actions - Navigation options */}
        <div className="results-actions">
          <button 
            className="retry-btn"
            onClick={() => {
              // Restart the same quiz
              setCurrentQuestionIndex(0)
              setUserAnswers([])
              setCurrentView('quiz')
            }}
          >
            Try Again
          </button>
          <button 
            className="topic-btn"
            onClick={() => {
              // Return to quiz selection for current topic
              setCurrentView('quizzes')
              setSelectedQuiz(null)
            }}
          >
            Back to Topic
          </button>
          <button 
            className="home-btn"
            onClick={() => {
              // Return to main topic selection
              setCurrentView('topics')
              setSelectedTopic(null)
              setSelectedQuiz(null)
            }}
          >
            Back to Home
          </button>
        </div>
      </div>
    )
  }

  // ===========================================================================
  // VIEW RENDERER
  // ===========================================================================
  /**
   * Determines which component to render based on current view state
   * @returns {JSX.Element} The appropriate view component
   */
  const renderView = () => {
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
      default:
        return <TopicSelection />
    }
  }

  // ===========================================================================
  // MAIN APP RENDER
  // ===========================================================================
  return (
    <div className="app">
      <main className="app-main">
        {renderView()}
      </main>
    </div>
  )
}

export default App