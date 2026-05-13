# FanVerse AI 🚀

![FanVerse AI Banner](https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?q=80&w=1200&auto=format&fit=crop)

**FanVerse AI** is an intelligent, real-time platform designed to revolutionize live sports engagement. By combining real-time match data with AI-driven strategic insights, FanVerse AI transforms how fans interact with their favorite games, including live events like **IPL (KKR vs RCB)**.

🔗 **[Live Production Deployment](https://fanverse-app-223349418431.us-central1.run.app)**

## 🌟 Key Features

*   **Live Arena Dashboard:** Real-time updates and live score tracking with a dynamic grid of active matches.
*   **AI Strategic Insights:** Deep, contextual AI analysis of live game momentum, win probability, and player strategies.
*   **Secure Authentication:** Integrated with Firebase Google Auth for seamless and secure user sign-in.
*   **A11y Compliant (Accessibility):** Fully keyboard navigable, ARIA-labeled, screen-reader ready, and high-contrast styling for inclusive design.
*   **Enterprise-Grade Security:** Hardened backend using Helmet, Express Rate Limiting, Cross-Site Scripting (XSS) sanitization, and HTTP Parameter Pollution protection.
*   **Live Leaderboards & Fan Chat:** Connect with millions of fans dynamically synced across the globe.

## 🛠 Tech Stack

*   **Frontend:** React, Vite, Tailwind CSS, Framer Motion, Lucide Icons, React Router v6.
*   **Backend:** Node.js, Express, TypeScript, Firebase Admin SDK.
*   **Authentication & Auth:** Firebase Google Sign-in.
*   **Deployment & Infrastructure:** Docker (Multi-stage build), Google Cloud Run.

## 🚀 Getting Started Locally

### Prerequisites
*   Node.js (v18+)
*   Docker (Optional, for containerized execution)
*   Firebase Project (For Authentication & Admin SDK)

### 1. Clone the repository
```bash
git clone https://github.com/SivaPanyam/APL-FanVersi_AI.git
cd "APL-FanVersi_AI"
```

### 2. Install Dependencies
You need to install dependencies for both the frontend and backend.
```bash
# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install
```

### 3. Environment Variables
Create a `.env` file in the `server/` directory:
```env
PORT=8787
CLIENT_ORIGIN=http://localhost:5173
NODE_ENV=development
FIREBASE_PROJECT_ID=your-project-id
```

### 4. Run the Application
Start the frontend and backend development servers concurrently:
```bash
# Start the Express server
cd server
npm run dev

# Start the Vite React client (in a new terminal)
cd client
npm run dev
```
Navigate to `http://localhost:5173` to view the application.

## 🐳 Docker Deployment

The entire application is bundled into a single production-ready Docker container.
```bash
docker build -t fanverse-ai .
docker run -p 8787:8787 fanverse-ai
```

## 🔒 Security Best Practices Implemented

*   **Content Security & Headers:** Adjusted `helmet` to isolate the app while permitting OAuth flows.
*   **Rate Limiting:** Global API rate limiting to prevent brute force and DDoS attacks.
*   **XSS & Payload Protection:** Strict payload size limits (64kb) and aggressive XSS sanitization across all Express routes.

---
*Built with ❤️ for the Hackathon.*
