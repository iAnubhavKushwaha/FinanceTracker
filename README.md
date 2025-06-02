# 💰 Personal Finance Tracker

A full-stack web application to manage your personal finances. Track income and expenses, gain insights through analytics, and make informed financial decisions — all in one place.

---

## ✨ Features

- 🔐 User Authentication with secure JWT tokens
- 💸 Add, edit, and delete income or expense transactions
- 📅 Filter transactions by date, type, or category
- 📊 Visual Dashboard powered by Recharts
  - Monthly income vs expense charts
  - Category-wise spending insights
- 🧠 Smart filtering using MongoDB aggregation pipeline
- 🛡️ Protected API routes with Express middleware
- ⚡ Modern UI with responsive Tailwind CSS

---

## 🛠️ Tech Stack

### Frontend

- React 19 + Vite
- React Router DOM v7
- Tailwind CSS v4
- Recharts (for data visualization)
- Axios (for API calls)

### Backend

- Node.js + Express.js (v5)
- MongoDB + Mongoose (v8)
- JWT for authentication
- bcryptjs for password hashing
- dotenv for environment variables
- CORS for cross-origin requests
- nodemon for development

### Getting Started


# 1. Clone the repository
git clone https://github.com/iAnubhavKushwaha/FinanceTracker.git

# 2. Install backend dependencies
cd server
npm install

# 3. Create .env file inside server directory (fill it with your values)
touch .env
# Then open .env and add:
# PORT=5000
# MONGO_URI=your_mongodb_connection_string
# JWT_SECRET=your_jwt_secret

# 4. Start backend server in development mode
npm run dev

# 5. Open new terminal tab/window for frontend setup
cd client
npm install

# 6. Start the frontend development server
npm run dev

