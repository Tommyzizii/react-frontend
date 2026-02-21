import { useUser } from "../contexts/UserProvider";
import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";

export default function Profile() {
  const { logout } = useUser();
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState({});
  const [hasImage, setHasImage] = useState(false);
  const fileInputRef = useRef(null);
  const API_URL = import.meta.env.VITE_API_URL;

  console.log(`URL => ${API_URL}`);

  async function onUpdateImage() {
    const file = fileInputRef.current?.files[0];
    if (!file) {
      alert("Please select a file.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch(`${API_URL}/api/user/profile/image`, {
        method: "POST",
        body: formData,
        credentials: "include",
      });

      if (response.ok) {
        alert("Image updated successfully.");
        fetchProfile();
      } else {
        alert("Failed to update image.");
      }
    } catch (err) {
      alert("Error uploading image." + err);
    }
  }

  async function fetchProfile() {
    const result = await fetch(`${API_URL}/api/user/profile`, {
      credentials: "include",
    });

    if (result.status == 401) {
      logout();
    } else {
      const data = await result.json();
      if (data.profileImage != null) {
        console.log("has image...");
        setHasImage(true);
      }
      console.log("data: ", data);
      setIsLoading(false);
      setData(data);
    }
  }

  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <div style={{ 
      padding: '40px', 
      maxWidth: '800px', 
      margin: '0 auto'
    }}>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        marginBottom: '30px'
      }}>
        <h1>My Profile</h1>
        <Link
          to="/logout"
          style={{
            padding: '10px 20px',
            backgroundColor: '#DC2626',
            color: 'white',
            textDecoration: 'none',
            borderRadius: '6px',
            fontWeight: 'bold'
          }}
        >
          Logout
        </Link>
      </div>

      {isLoading ? (
        <div style={{ 
          border: '1px solid #ddd', 
          padding: '60px', 
          borderRadius: '8px',
          textAlign: 'center',
          backgroundColor: '#f9f9f9'
        }}>
          <div style={{ fontSize: '18px', fontWeight: 'bold' }}>
            Loading...
          </div>
        </div>
      ) : (
        <div style={{ 
          border: '1px solid #ddd', 
          padding: '30px', 
          borderRadius: '8px',
          backgroundColor: 'white'
        }}>
          {/* Profile Image Section */}
          <div style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center',
            marginBottom: '30px'
          }}>
            {hasImage ? (
              <img
                src={`${API_URL}${data.profileImage}`}
                alt="Profile"
                style={{
                  width: '150px',
                  height: '150px',
                  borderRadius: '50%',
                  objectFit: 'cover',
                  border: '4px solid #4F46E5',
                  marginBottom: '20px'
                }}
              />
            ) : (
              <div style={{
                width: '150px',
                height: '150px',
                borderRadius: '50%',
                backgroundColor: '#4F46E5',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: '48px',
                fontWeight: 'bold',
                marginBottom: '20px'
              }}>
                {data.firstname?.[0]}
                {data.lastname?.[0]}
              </div>
            )}

            <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
              <input
                type="file"
                id="profileImage"
                name="profileImage"
                ref={fileInputRef}
                accept="image/*"
                style={{ fontSize: '14px' }}
              />
              <button
                onClick={onUpdateImage}
                style={{
                  padding: '8px 16px',
                  backgroundColor: '#4F46E5',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontWeight: 'bold'
                }}
              >
                Update Image
              </button>
            </div>
          </div>

          {/* Profile Information */}
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(2, 1fr)', 
            gap: '20px' 
          }}>
            <div>
              <label style={{ 
                display: 'block',
                fontSize: '12px',
                fontWeight: 'bold',
                color: '#666',
                marginBottom: '8px',
                textTransform: 'uppercase'
              }}>
                User ID
              </label>
              <p style={{ 
                fontSize: '16px',
                backgroundColor: '#f9f9f9',
                padding: '10px',
                borderRadius: '4px',
                margin: 0,
                fontFamily: 'monospace'
              }}>
                {data._id}
              </p>
            </div>

            <div>
              <label style={{ 
                display: 'block',
                fontSize: '12px',
                fontWeight: 'bold',
                color: '#666',
                marginBottom: '8px',
                textTransform: 'uppercase'
              }}>
                Email
              </label>
              <p style={{ 
                fontSize: '16px',
                backgroundColor: '#f9f9f9',
                padding: '10px',
                borderRadius: '4px',
                margin: 0
              }}>
                {data.email}
              </p>
            </div>

            <div>
              <label style={{ 
                display: 'block',
                fontSize: '12px',
                fontWeight: 'bold',
                color: '#666',
                marginBottom: '8px',
                textTransform: 'uppercase'
              }}>
                First Name
              </label>
              <p style={{ 
                fontSize: '16px',
                backgroundColor: '#f9f9f9',
                padding: '10px',
                borderRadius: '4px',
                margin: 0
              }}>
                {data.firstname}
              </p>
            </div>

            <div>
              <label style={{ 
                display: 'block',
                fontSize: '12px',
                fontWeight: 'bold',
                color: '#666',
                marginBottom: '8px',
                textTransform: 'uppercase'
              }}>
                Last Name
              </label>
              <p style={{ 
                fontSize: '16px',
                backgroundColor: '#f9f9f9',
                padding: '10px',
                borderRadius: '4px',
                margin: 0
              }}>
                {data.lastname}
              </p>
            </div>

            {data.username && (
              <div style={{ gridColumn: '1 / -1' }}>
                <label style={{ 
                  display: 'block',
                  fontSize: '12px',
                  fontWeight: 'bold',
                  color: '#666',
                  marginBottom: '8px',
                  textTransform: 'uppercase'
                }}>
                  Username
                </label>
                <p style={{ 
                  fontSize: '16px',
                  backgroundColor: '#f9f9f9',
                  padding: '10px',
                  borderRadius: '4px',
                  margin: 0
                }}>
                  {data.username}
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}