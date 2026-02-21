import { useState, useEffect, useRef } from "react";
import User from "./User";

export default function UsersList() {
  const [user, setUser] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const API_URL = import.meta.env.VITE_API_URL;

  const username = useRef(null);
  const email = useRef(null);
  const password = useRef(null);
  const firstname = useRef(null);
  const lastname = useRef(null);

  const refreshUsersList = async () => {
    try {
      const updatedResult = await fetch(`${API_URL}/api/user`);
      if (!updatedResult.ok) {
        throw new Error(`HTTP error! status: ${updatedResult.status}`);
      }
      const updatedData = await updatedResult.json();
      setUser(updatedData);
    } catch (error) {
      console.error("Error fetching users:", error);
      alert("Error loading users: " + error.message);
    }
  };

  const resetUserInputs = () => {
    username.current.value = "";
    email.current.value = "";
    password.current.value = "";
    firstname.current.value = "";
    lastname.current.value = "";
  };

  const addUser = async () => {
    // Validation
    if (
      !username.current.value ||
      !email.current.value ||
      !password.current.value ||
      !firstname.current.value ||
      !lastname.current.value
    ) {
      return alert("All fields are required!");
    }

    const tmpUser = {
      username: username.current.value.trim(),
      email: email.current.value.trim(),
      password: password.current.value,
      firstname: firstname.current.value.trim(),
      lastname: lastname.current.value.trim(),
    };

    try {
      console.log("Adding user:", tmpUser);
      
      const result = await fetch(`${API_URL}/api/user`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(tmpUser),
      });

      const data = await result.json();
      console.log("Server response:", data);

      if (result.ok) {
        alert("✅ User added successfully!");
        resetUserInputs();
        await refreshUsersList();
      } else {
        alert("❌ " + (data.message || "Failed to add user"));
      }
    } catch (error) {
      console.error("Add user error:", error);
      alert("❌ Error adding user: " + error.message);
    }
  };

  async function deleteUser(user_id) {
    try {
      const result = await fetch(`${API_URL}/api/user/${user_id}`, {
        method: "DELETE",
      });

      if (!result.ok) {
        throw new Error(`HTTP error! status: ${result.status}`);
      }

      const data = await result.json();
      console.log("Delete response:", data);
      alert("✅ User deleted successfully!");
      await refreshUsersList();
    } catch (error) {
      console.error("Delete user error:", error);
      alert("❌ Error deleting user: " + error.message);
    }
  }

  async function editUser(user_id, tmpUser) {
    try {
      console.log("Editing user:", user_id, tmpUser);
      
      const result = await fetch(`${API_URL}/api/user/${user_id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(tmpUser),
      });

      const data = await result.json();
      console.log("Edit response:", data);

      if (result.ok) {
        alert("✅ User updated successfully!");
        await refreshUsersList();
      } else {
        alert("❌ " + (data.message || "Failed to update user"));
      }
    } catch (error) {
      console.error("Edit user error:", error);
      alert("❌ Error updating user: " + error.message);
    }
  }

  useEffect(() => {
    async function fetchData() {
      try {
        const result = await fetch(`${API_URL}/api/user`);
        if (!result.ok) {
          throw new Error(`HTTP error! status: ${result.status}`);
        }
        const data = await result.json();
        setUser(data);
        setIsLoading(false);
      } catch (error) {
        console.error("Fetch users error:", error);
        alert("Error loading users: " + error.message);
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);

  if (isLoading) {
    return (
      <div style={{ 
        padding: '60px', 
        textAlign: 'center',
        fontSize: '18px',
        fontWeight: 'bold'
      }}>
        Loading users...
      </div>
    );
  }

  return (
    <div style={{ padding: '20px', maxWidth: '1400px', margin: '0 auto' }}>
      {/* Add User Form */}
      <div style={{ 
        border: '2px solid #4F46E5', 
        padding: '25px', 
        marginBottom: '30px',
        borderRadius: '10px',
        backgroundColor: '#F8F9FF',
        boxShadow: '0 4px 6px rgba(79, 70, 229, 0.1)'
      }}>
        <h2 style={{ marginTop: 0, color: '#4F46E5', fontSize: '24px' }}>
          ➕ Create New User
        </h2>
        <p style={{ color: '#666', fontSize: '14px', marginBottom: '20px' }}>
          Fill in all the details to add a new member
        </p>
        
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
          gap: '15px', 
          marginBottom: '20px' 
        }}>
          <div>
            <label style={{ 
              display: 'block', 
              marginBottom: '5px', 
              fontWeight: 'bold',
              fontSize: '13px',
              color: '#333'
            }}>
              Username *
            </label>
            <input
              style={{ 
                width: '100%', 
                padding: '10px', 
                border: '2px solid #ddd', 
                borderRadius: '6px',
                boxSizing: 'border-box',
                fontSize: '14px',
                transition: 'border-color 0.2s'
              }}
              placeholder="Enter username"
              type="text"
              ref={username}
              onFocus={(e) => e.target.style.borderColor = '#4F46E5'}
              onBlur={(e) => e.target.style.borderColor = '#ddd'}
            />
          </div>

          <div>
            <label style={{ 
              display: 'block', 
              marginBottom: '5px', 
              fontWeight: 'bold',
              fontSize: '13px',
              color: '#333'
            }}>
              Email *
            </label>
            <input
              style={{ 
                width: '100%', 
                padding: '10px', 
                border: '2px solid #ddd', 
                borderRadius: '6px',
                boxSizing: 'border-box',
                fontSize: '14px'
              }}
              placeholder="Enter email"
              type="email"
              ref={email}
              onFocus={(e) => e.target.style.borderColor = '#4F46E5'}
              onBlur={(e) => e.target.style.borderColor = '#ddd'}
            />
          </div>

          <div>
            <label style={{ 
              display: 'block', 
              marginBottom: '5px', 
              fontWeight: 'bold',
              fontSize: '13px',
              color: '#333'
            }}>
              Password *
            </label>
            <input
              style={{ 
                width: '100%', 
                padding: '10px', 
                border: '2px solid #ddd', 
                borderRadius: '6px',
                boxSizing: 'border-box',
                fontSize: '14px'
              }}
              placeholder="Enter password"
              type="password"
              ref={password}
              onFocus={(e) => e.target.style.borderColor = '#4F46E5'}
              onBlur={(e) => e.target.style.borderColor = '#ddd'}
            />
          </div>

          <div>
            <label style={{ 
              display: 'block', 
              marginBottom: '5px', 
              fontWeight: 'bold',
              fontSize: '13px',
              color: '#333'
            }}>
              First Name *
            </label>
            <input
              style={{ 
                width: '100%', 
                padding: '10px', 
                border: '2px solid #ddd', 
                borderRadius: '6px',
                boxSizing: 'border-box',
                fontSize: '14px'
              }}
              placeholder="Enter first name"
              type="text"
              ref={firstname}
              onFocus={(e) => e.target.style.borderColor = '#4F46E5'}
              onBlur={(e) => e.target.style.borderColor = '#ddd'}
            />
          </div>

          <div>
            <label style={{ 
              display: 'block', 
              marginBottom: '5px', 
              fontWeight: 'bold',
              fontSize: '13px',
              color: '#333'
            }}>
              Last Name *
            </label>
            <input
              style={{ 
                width: '100%', 
                padding: '10px', 
                border: '2px solid #ddd', 
                borderRadius: '6px',
                boxSizing: 'border-box',
                fontSize: '14px'
              }}
              placeholder="Enter last name"
              type="text"
              ref={lastname}
              onFocus={(e) => e.target.style.borderColor = '#4F46E5'}
              onBlur={(e) => e.target.style.borderColor = '#ddd'}
            />
          </div>

          <div style={{ display: 'flex', alignItems: 'flex-end' }}>
            <button
              style={{ 
                width: '100%',
                padding: '12px 20px',
                backgroundColor: '#4F46E5',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                fontWeight: 'bold',
                fontSize: '15px',
                transition: 'all 0.2s',
                boxShadow: '0 2px 4px rgba(79, 70, 229, 0.3)'
              }}
              onClick={addUser}
              onMouseOver={(e) => {
                e.target.style.backgroundColor = '#4338CA';
                e.target.style.transform = 'translateY(-1px)';
                e.target.style.boxShadow = '0 4px 8px rgba(79, 70, 229, 0.4)';
              }}
              onMouseOut={(e) => {
                e.target.style.backgroundColor = '#4F46E5';
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 2px 4px rgba(79, 70, 229, 0.3)';
              }}
            >
              ➕ Add User
            </button>
          </div>
        </div>
      </div>

      {/* Users List */}
      <div>
        <h2 style={{ 
          fontSize: '26px', 
          marginBottom: '20px',
          color: '#333',
          display: 'flex',
          alignItems: 'center',
          gap: '10px'
        }}>
          👥 Users List
          <span style={{ 
            fontSize: '16px', 
            fontWeight: 'normal', 
            color: '#666',
            backgroundColor: '#E0E7FF',
            padding: '4px 12px',
            borderRadius: '12px'
          }}>
            {user.length} {user.length === 1 ? "user" : "users"}
          </span>
        </h2>
        
        {user.length === 0 ? (
          <div style={{ 
            border: '2px dashed #ddd', 
            padding: '60px', 
            textAlign: 'center',
            borderRadius: '10px',
            backgroundColor: '#F9FAFB'
          }}>
            <div style={{ fontSize: '48px', marginBottom: '10px' }}>📭</div>
            <h3 style={{ color: '#666', fontWeight: 'normal' }}>No users yet</h3>
            <p style={{ color: '#999', fontSize: '14px' }}>Add your first user to get started!</p>
          </div>
        ) : (
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', 
            gap: '20px' 
          }}>
            {user.map((u) => (
              <User
                key={u._id}
                user={u}
                onDelete={deleteUser}
                onEdit={editUser}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}