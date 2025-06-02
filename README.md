# 💰 Personal Finance Tracker

A full-stack web application to manage your personal finances. Track income and expenses, gain insights through analytics, and make informed financial decisions — all in one place.

---

## ✨ Features

- 🔐 **User Authentication** with secure JWT tokens  
- 💸 **Transaction Management**: Add, edit, and delete income or expense entries  
- 📅 **Smart Filtering**: Filter transactions by date, type, or category  
- 📊 **Visual Dashboard** powered by Recharts  
  - Monthly income vs expense trends  
  - Category-wise spending insights  
- 🧠 **Efficient Backend Filtering** with MongoDB aggregation pipeline  
- 🛡️ **Protected API Routes** using Express middleware  
- ⚡ **Responsive UI** built with Tailwind CSS

---

## 🛠️ Tech Stack

### 🖥️ Frontend

- **React 19 + Vite** – Fast, modern SPA development
- **React Router DOM v7** – Route-based navigation
- **Tailwind CSS v4** – Utility-first styling
- **Recharts** – Clean data visualizations
- **Axios** – For communicating with the backend API

### 🌐 Backend

- **Node.js + Express.js (v5)** – REST API development
- **MongoDB + Mongoose (v8)** – NoSQL database
- **JWT** – Secure authentication tokens
- **bcryptjs** – Password hashing
- **dotenv** – Manage environment variables
- **CORS** – Cross-origin requests support
- **nodemon** – Live backend server reload during development

---

## 🚀 Getting Started

Follow these steps to run the project locally:

### 🔧 Backend Setup

```bash
# 1. Clone the repository
git clone https://github.com/iAnubhavKushwaha/FinanceTracker.git
cd FinanceTracker

# 2. Install backend dependencies
cd server
npm install

# 3. Create .env file inside the server directory
touch .env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret

# 4. Start backend server (development mode)
npm run dev

FrontEnd Setup

# 5. Open new terminal tab/window
cd client

# 6. Install frontend dependencies
npm install

# 7. Start frontend development server
npm run dev
