import { useEffect, useState } from "react";
import { useUser } from "../contexts/UserProvider";
import { Navigate } from "react-router-dom";

export default function Logout() {
  const [isLoading, setIsLoading] = useState(true);
  const { logout } = useUser();
  
  async function onLogout() {
    await logout();
    setIsLoading(false);
  }
  
  useEffect(() => {
    onLogout();
  }, []);
  
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-2xl p-12 text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-indigo-600 mx-auto mb-4"></div>
          <h3 className="text-xl font-semibold text-gray-700">Logging out...</h3>
        </div>
      </div>
    );
  } else {
    return <Navigate to="/login" replace />; // ✅ FIXED: Changed to string path
  }
}