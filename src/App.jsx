import { Routes, Route, Navigate, Link, useLocation } from "react-router-dom";
import "./App.css";
import UsersList from "./components/UsersList";
import Login from "./components/Login";
import Logout from "./components/Logout";
import Profile from "./components/Profile";
import RequireAuth from "./middleware/RequireAuth";
import { useUser } from "./contexts/UserProvider";

function App() {
  const location = useLocation();
  const { user } = useUser();

  return (
    <div>
      {/* Navigation Bar */}
      <nav style={{ 
        backgroundColor: 'white', 
        borderBottom: '1px solid #ddd',
        padding: '15px 0'
      }}>
        <div style={{ 
          maxWidth: '1200px', 
          margin: '0 auto', 
          padding: '0 20px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            <h1 style={{ 
              fontSize: '24px', 
              fontWeight: 'bold', 
              margin: '0 30px 0 0' 
            }}>
              Management System
            </h1>
            <Link
              to="/user"
              style={{
                padding: '8px 20px',
                borderRadius: '6px',
                fontWeight: 'bold',
                textDecoration: 'none',
                backgroundColor: location.pathname === "/user" ? '#4F46E5' : '#f0f0f0',
                color: location.pathname === "/user" ? 'white' : '#333',
              }}
            >
              Users
            </Link>
          </div>

          {/* Auth Links */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            {user.isLoggedIn ? (
              <>
                <Link
                  to="/profile"
                  style={{
                    padding: '8px 20px',
                    borderRadius: '6px',
                    fontWeight: 'bold',
                    textDecoration: 'none',
                    backgroundColor: location.pathname === "/profile" ? '#9333EA' : '#f0f0f0',
                    color: location.pathname === "/profile" ? 'white' : '#333',
                  }}
                >
                  Profile
                </Link>
                <Link
                  to="/logout"
                  style={{
                    padding: '8px 20px',
                    borderRadius: '6px',
                    fontWeight: 'bold',
                    textDecoration: 'none',
                    backgroundColor: '#DC2626',
                    color: 'white',
                  }}
                >
                  Logout
                </Link>
              </>
            ) : (
              <Link
                to="/login"
                style={{
                  padding: '8px 20px',
                  borderRadius: '6px',
                  fontWeight: 'bold',
                  textDecoration: 'none',
                  backgroundColor: '#4F46E5',
                  color: 'white',
                }}
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </nav>

      {/* Routes */}
      <Routes>
        <Route path="/" element={<Navigate to="/user" />}></Route>
        <Route path="/user" element={<UsersList />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route
          path="/profile"
          element={
            <RequireAuth>
              <Profile />
            </RequireAuth>
          }
        ></Route>
        <Route
          path="/logout"
          element={
            <RequireAuth>
              <Logout />
            </RequireAuth>
          }
        ></Route>
      </Routes>
    </div>
  );
}
export default App;