# 🧠 QZICL Lab 3 – Interactive Quiz Application

### A modern, accessible quiz platform for learners and instructors.

---

## 📘 Overview

**QZICL Lab 3** is a modern web-based quiz application built with **React** and designed to showcase advanced client-side development, user experience design, and accessibility principles. It provides a smooth, engaging interface for users to explore topics, take quizzes, and review results — all while ensuring accessibility and responsiveness across devices.

The app is designed as part of a **Client-Side Development Lab Project** and demonstrates best practices in **component-based architecture**, **semantic HTML**, and **UX/UI design consistency**.

---

## ✨ Key Features

- 🖥️ **Responsive Design:** Adapts to all devices with intuitive layouts.
- 🎨 **Modern UI Theme:** Cosmic-inspired visuals with dynamic gradients and soft glass effects.
- 🧭 **Simple Navigation:** Guided flow from Home → Quiz → Results.
- 🧑‍💻 **Keyboard & Screen Reader Friendly:** WCAG 2.1 compliant design.
- 🧩 **Reusable Components:** Modular React structure for maintainability.
- 🧠 **Instant Feedback:** Animated transitions and progress visualization.
- 🧪 **Built-in Sanity Tests:** Ensures functional integrity during development.
- ⚡ **Fast Performance:** Powered by Vite for near-instant build and reload times.

---

## 📁 Project Structure

```
src/
├── App.jsx                  # Main app logic and routing between screens
├── index.css                # Global CSS and design tokens
├── api/
│   └── client.js            # API abstraction layer for topics and quizzes
└── components/
    ├── Header.jsx
    ├── Footer.jsx
    ├── TopicList.jsx
    ├── QuizList.jsx
    ├── GetReady.jsx
    ├── QuizRunner.jsx
    ├── QuestionCard.jsx
    ├── OptionButton.jsx
    ├── ProgressBar.jsx
    ├── Results.jsx
    └── ModalConfirmExit.jsx
```

---

## 🧠 User Flow

| Step | Screen                | Description                              |
| ---- | --------------------- | ---------------------------------------- |
| 1    | **Topics**            | Browse available subjects and select one |
| 2    | **Quizzes**           | Choose from multiple quizzes per topic   |
| 3    | **Get Ready**         | Preview quiz info, difficulty, and tips  |
| 4    | **Quiz Runner**       | Answer questions interactively           |
| 5    | **Results**           | View score summary and retry options     |
| 6    | **Review (optional)** | Check correct and incorrect answers      |

---

## 🎨 Design System

### Theme

- **Mode:** Dark-first with neon accent gradients.
- **Colors:**
  - Background: `#0B0F1A`
  - Surface: `#111827`
  - Primary: `#7C3AED → #22D3EE`
  - Success: `#10B981`
  - Danger: `#EF4444`
  - Accent: `#F59E0B`

### Typography

- **Headings:** Inter / 22–26px / Bold
- **Body Text:** System UI / 16px
- **Captions:** Muted Gray (#9CA3AF)

### Components

- Rounded corners (12–16px radius)
- Subtle drop shadows and glass effects
- Hover lift animations for interactivity
- Accessible focus outlines for all buttons and links

---

## 🧰 Tech Stack

- ⚛️ **React 18+**
- ⚡ **Vite**
- 🧠 **Mock Service Worker (MSW)** (optional API simulation)
- 🎨 **Vanilla CSS Variables**
- 🧪 **Node.js v18+**

---

## 🚀 Getting Started

### Prerequisites

- Node.js version 18 or higher
- npm or yarn package manager

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/qzicl-lab3.git

# Move into the project directory
cd qzicl-lab3

# Install dependencies
npm install

# Run the development server
npm run dev
```

Visit [http://localhost:5173](http://localhost:5173) in your browser.

---

## 🧪 Testing

Sanity checks automatically run on startup to verify:

- Correct option labeling (A–D)
- Progress calculation accuracy
- Question-to-answer mapping integrity

You can extend tests with **Vitest** or **Jest** to cover UI states and logic functions.

---

## ♿ Accessibility (A11Y)

- Fully **tab-navigable interface**
- **ARIA labels** for all controls and modals
- High contrast ratios (WCAG AA compliant)
- **Reduced motion** support for motion-sensitive users
- Semantic HTML structure for assistive technologies

---

## 📱 Responsive Design

| Device      | Layout      | Key UI Features                     |
| ----------- | ----------- | ----------------------------------- |
| **Mobile**  | 1-column    | Full-width cards and sticky header  |
| **Tablet**  | 2-columns   | Larger tap targets and side spacing |
| **Desktop** | 3–4 columns | Keyboard shortcuts, hero banners    |

---

## 🧱 Future Enhancements

- 💾 **Save Progress:** Resume unfinished quizzes later.
- 🏆 **Leaderboard:** Friendly competition between users.
- 🔊 **Audio Feedback:** Add subtle sound cues for correct/incorrect answers.
- 🧩 **Question Randomizer:** Shuffle questions for replay value.

---

## 👨‍💻 Author

**Samuel Raymond Kwibe**  
🎓 Computer Science Student at Southern New Hampshire University (SNHU)  
☁️ Focus: Cloud Architecture, AI/ML, and Web Development  
📧 Email: samuelkwibe@example.com  
🌐 Portfolio: [samuelkwibe.dev](https://samuelkwibe.dev)

---

## 🪪 License

Licensed under the **MIT License** — free to use, modify, and share with attribution.

© 2025 Samuel Raymond Kwibe. All rights reserved.
