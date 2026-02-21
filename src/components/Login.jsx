import { useRef, useState } from "react";
import { useUser } from "../contexts/UserProvider";
import { Navigate } from "react-router-dom";

export default function Login() {
  const [controlState, setControlState] = useState({
    isLoggingIn: false,
    isLoginError: false,
    isLoginOk: false,
  });
  const emailRef = useRef();
  const passRef = useRef();
  const { user, login } = useUser();
  
  async function onLogin() {
    setControlState((prev) => {
      return {
        ...prev,
        isLoggingIn: true,
      };
    });
    const email = emailRef.current.value;
    const pass = passRef.current.value;
    const result = await login(email, pass);
    setControlState((prev) => {
      return {
        isLoggingIn: false,
        isLoginError: !result,
        isLoginOk: result,
      };
    });
  }
  
  if (!user.isLoggedIn)
    return (
      <div style={{ 
        padding: '40px', 
        maxWidth: '400px', 
        margin: '50px auto',
        border: '1px solid #ddd',
        borderRadius: '8px',
        backgroundColor: '#f9f9f9'
      }}>
        <h2 style={{ marginTop: 0, textAlign: 'center' }}>Login</h2>
        
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
            Email
          </label>
          <input 
            type="text" 
            ref={emailRef}
            style={{ 
              width: '100%', 
              padding: '8px', 
              border: '1px solid #ccc', 
              borderRadius: '4px',
              boxSizing: 'border-box'
            }}
          />
        </div>
        
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
            Password
          </label>
          <input 
            type="password" 
            ref={passRef}
            style={{ 
              width: '100%', 
              padding: '8px', 
              border: '1px solid #ccc', 
              borderRadius: '4px',
              boxSizing: 'border-box'
            }}
          />
        </div>
        
        <button 
          onClick={onLogin} 
          disabled={controlState.isLoggingIn}
          style={{ 
            width: '100%',
            padding: '10px 20px',
            backgroundColor: controlState.isLoggingIn ? '#999' : '#4F46E5',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: controlState.isLoggingIn ? 'not-allowed' : 'pointer',
            fontWeight: 'bold',
            fontSize: '16px'
          }}
        >
          {controlState.isLoggingIn ? 'Logging in...' : 'Login'}
        </button>
        
        {controlState.isLoginError && (
          <div style={{ 
            marginTop: '15px', 
            padding: '10px', 
            backgroundColor: '#FEE2E2', 
            color: '#DC2626',
            borderRadius: '4px',
            textAlign: 'center'
          }}>
            Login incorrect
          </div>
        )}
        
        {user.isLoggedIn && (
          <div style={{ 
            marginTop: '15px', 
            padding: '10px', 
            backgroundColor: '#D1FAE5', 
            color: '#065F46',
            borderRadius: '4px',
            textAlign: 'center'
          }}>
            Login Success
          </div>
        )}
      </div>
    );
  else return <Navigate to="/profile" replace />;
}