# CS 465 (Fall 2025) Lab 3: Qzicl Quiz Client

This repository contains the client-side implementation for Qzicl, a web-based educational quiz application, for the CS 465 course at SNHU.

Qzicl is a full-stack Single Page Application (SPA) that allows users to select a topic, take a multiple-choice quiz, and check their knowledge. It's designed for both entertainment and as a flashcard study system.

This lab (Lab 3) focuses only on building the complete, standalone browser-based client. All server interactions are simulated using Mock Service Worker (MSW).

## Lab 3 Requirements

This project is divided into two main parts:

### Part 1 (50%): Standalone Single Page App (SPA)

- Build the full user interface with all components as an SPA
- The app will initially read all quiz data directly from a local JSON file using the Node.js fs module

**Flow:**

- User sees a list of topics
- User selects a topic, then sees a list of quizzes for that topic
- User selects a quiz and sees a "get ready screen"
- User clicks "go" and answers multiple-choice questions one by one
- After the last question, the user's results are displayed

### Part 2 (50%): Server Simulation with MSW

- Replace the file-reading logic with a simulated server interaction using Mock Service Worker (MSW)
- The client will make requests to API routes, which MSW will intercept and respond to
- Implement a way to cancel an ongoing quiz by sending a request to the `api/exit` route

## Technology Stack

- **Frontend:** React (as a Single Page App)
- **Build Tool:** Vite
- **API Mocking:** Mock Service Worker (MSW)
- **HTTP Client:** Axios (suggested) or native Fetch API

## Simulated API Routes (MSW)

For Lab 3, MSW will be configured to handle the following application routes:

| Method | Route          | Description                                             |
| ------ | -------------- | ------------------------------------------------------- |
| POST   | `/hello`       | Initial handshake to get the list of topics             |
| GET    | `api/topics`   | Gets the list of available quizzes for a given topic ID |
| GET    | `api/quizes`   | Selects a quiz and returns a new session ID             |
| GET    | `api/go`       | Starts the quiz and gets the first question             |
| GET    | `api/continue` | Submits an answer and gets the next question or results |
| POST   | `api/exit`     | Cancels a quiz session in progress                      |
| ANY    | `api/*`        | A default route to catch any bad requests               |

## Future Work: Lab 4

The subsequent lab (Lab 4) will involve building the actual Node.js server. The client will then be updated to replace the MSW mocks with live HTTP requests to the real server.

## Getting Started

```bash
# Clone the repository
git clone [YOUR_REPO_URL]
cd [REPO_FOLDER]

# Install dependencies
npm install

# Start the development server (with Vite)
npm run dev

# Build for production
npm run build
```
