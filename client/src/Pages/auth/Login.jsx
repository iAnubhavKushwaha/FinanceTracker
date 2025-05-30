import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import axios from "axios";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const { email, password } = form;
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await axios.post("https://financetracker-rmg9.onrender.com/api/auth/login", form);
      login(res.data);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2 bg-blue-50">
      {/* Left section */}
      <div className="flex items-center justify-center p-10 bg-blue-100">
        <div className="max-w-md text-center">
          <h1 className="text-4xl font-bold text-blue-800 mb-6">FinanceTracker 💰</h1>
          <p className="text-lg text-blue-700">
            Take control of your financial future. Track your income, manage expenses, and stay on top of your goals — all in one place.
          </p>
        </div>
      </div>

      {/* Right section (Login Form) */}
      <div className="flex items-center justify-center p-10 bg-white">
        <div className="w-full max-w-md">
          <h2 className="text-2xl font-bold text-blue-700 text-center mb-6">Login to Your Account</h2>

          {error && <p className="text-red-500 mb-4 text-center">{error}</p>}

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={email}
              onChange={handleChange}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={password}
              onChange={handleChange}
              required
            />
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition"
            >
              Log In
            </button>
          </form>

          <p className="mt-4 text-sm text-center text-gray-600">
            Don’t have an account?
            <Link
              to="/register"
              className="text-blue-600 hover:underline ml-1 font-medium"
            >
              Register here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
