import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/temp";
import Login from "./Pages/auth/Login";
import Register from "./Pages/auth/Register";
import Dashboard from "./Pages/Dashboard";
import PrivateRoute from "./components/PrivateRoute";
import Header from "./components/Header";
import IncomePage from "./Pages/IncomePage";
import ExpensePage from "./Pages/ExpensePage";
import Profile from "./Pages/Profile";

const App = () => {
  return (
    <div className="w-full min-h-screen overflow-x-hidden">
      <div className="px-4">
        <AuthProvider>
          <Router>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Login />} /> // ✅ Set as new root
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              {/* Protected Routes */}
              <Route
                path="/dashboard"
                element={
                  <PrivateRoute>
                    <>
                      <Header />
                      <Dashboard />
                    </>
                  </PrivateRoute>
                }
              />
              <Route
                path="/income"
                element={
                  <PrivateRoute>
                    <>
                      <Header />
                      <IncomePage />
                    </>
                  </PrivateRoute>
                }
              />
              <Route
                path="/expenses"
                element={
                  <PrivateRoute>
                    <>
                      <Header />
                      <ExpensePage />
                    </>
                  </PrivateRoute>
                }
              />
              <Route
                path="/profile"
                element={
                  <PrivateRoute>
                    <>
                      <Header />
                      <Profile />
                    </>
                  </PrivateRoute>
                }
              />
            </Routes>
          </Router>
        </AuthProvider>
      </div>
    </div>
  );
};

export default App;
