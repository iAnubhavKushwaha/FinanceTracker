import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-semibold text-blue-700 text-center mb-6">
          Your Profile
        </h2>

        <div className="space-y-4">
          <div>
            <p className="text-sm text-gray-600">Username</p>
            <p className="text-lg font-medium text-gray-900">
              {user?.username || "N/A"}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-600">Email</p>
            <p className="text-lg font-medium text-gray-900">
              {user?.email || "N/A"}
            </p>
          </div>
        </div>

        <div className="mt-8 text-center">
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-md transition"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
