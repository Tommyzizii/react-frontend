import { useState, useRef } from "react";

export default function User({ user, onDelete, onEdit }) {
  const { username, email, firstname, lastname, status } = user;
  const [isEdit, setIsEdit] = useState(false);
  const usernameEdit = useRef(null);
  const emailEdit = useRef(null);
  const firstnameEdit = useRef(null);
  const lastnameEdit = useRef(null);

  const deleteUser = async () => {
    if (
      window.confirm(
        `⚠️ Are you sure you want to delete ${firstname} ${lastname}?\n\nThis action cannot be undone.`
      )
    ) {
      await onDelete(user._id);
    }
  };

  const editUser = async () => {
    if (isEdit) {
      // Validation before saving
      if (
        !usernameEdit.current.value.trim() ||
        !emailEdit.current.value.trim() ||
        !firstnameEdit.current.value.trim() ||
        !lastnameEdit.current.value.trim()
      ) {
        alert("❌ All fields are required!");
        return;
      }

      // Save mode
      const tmpUser = {
        username: usernameEdit.current.value.trim(),
        email: emailEdit.current.value.trim(),
        firstname: firstnameEdit.current.value.trim(),
        lastname: lastnameEdit.current.value.trim(),
      };
      
      console.log("Saving user:", tmpUser);
      await onEdit(user._id, tmpUser);
    }
    setIsEdit(!isEdit);
  };

  const cancelEdit = () => {
    setIsEdit(false);
  };

  return (
    <div style={{ 
      border: '2px solid #E5E7EB', 
      padding: '20px', 
      borderRadius: '10px',
      backgroundColor: 'white',
      boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
      transition: 'all 0.2s',
      position: 'relative'
    }}
    onMouseOver={(e) => {
      e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.12)';
      e.currentTarget.style.borderColor = '#4F46E5';
      e.currentTarget.style.transform = 'translateY(-2px)';
    }}
    onMouseOut={(e) => {
      e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.08)';
      e.currentTarget.style.borderColor = '#E5E7EB';
      e.currentTarget.style.transform = 'translateY(0)';
    }}
    >
      {isEdit ? (
        <div style={{ marginBottom: '15px' }}>
          <div style={{ marginBottom: '12px' }}>
            <label style={{ 
              display: 'block', 
              marginBottom: '5px', 
              fontWeight: 'bold', 
              fontSize: '12px',
              color: '#4F46E5'
            }}>
              USERNAME
            </label>
            <input
              style={{ 
                width: '100%', 
                padding: '8px', 
                border: '2px solid #E5E7EB', 
                borderRadius: '6px',
                boxSizing: 'border-box',
                fontSize: '14px'
              }}
              placeholder="Enter username"
              type="text"
              ref={usernameEdit}
              defaultValue={username}
              onFocus={(e) => e.target.style.borderColor = '#4F46E5'}
              onBlur={(e) => e.target.style.borderColor = '#E5E7EB'}
            />
          </div>

          <div style={{ marginBottom: '12px' }}>
            <label style={{ 
              display: 'block', 
              marginBottom: '5px', 
              fontWeight: 'bold', 
              fontSize: '12px',
              color: '#4F46E5'
            }}>
              EMAIL
            </label>
            <input
              style={{ 
                width: '100%', 
                padding: '8px', 
                border: '2px solid #E5E7EB', 
                borderRadius: '6px',
                boxSizing: 'border-box',
                fontSize: '14px'
              }}
              placeholder="Enter email"
              type="email"
              ref={emailEdit}
              defaultValue={email}
              onFocus={(e) => e.target.style.borderColor = '#4F46E5'}
              onBlur={(e) => e.target.style.borderColor = '#E5E7EB'}
            />
          </div>

          <div style={{ marginBottom: '12px' }}>
            <label style={{ 
              display: 'block', 
              marginBottom: '5px', 
              fontWeight: 'bold', 
              fontSize: '12px',
              color: '#4F46E5'
            }}>
              FIRST NAME
            </label>
            <input
              style={{ 
                width: '100%', 
                padding: '8px', 
                border: '2px solid #E5E7EB', 
                borderRadius: '6px',
                boxSizing: 'border-box',
                fontSize: '14px'
              }}
              placeholder="Enter first name"
              type="text"
              ref={firstnameEdit}
              defaultValue={firstname}
              onFocus={(e) => e.target.style.borderColor = '#4F46E5'}
              onBlur={(e) => e.target.style.borderColor = '#E5E7EB'}
            />
          </div>

          <div style={{ marginBottom: '12px' }}>
            <label style={{ 
              display: 'block', 
              marginBottom: '5px', 
              fontWeight: 'bold', 
              fontSize: '12px',
              color: '#4F46E5'
            }}>
              LAST NAME
            </label>
            <input
              style={{ 
                width: '100%', 
                padding: '8px', 
                border: '2px solid #E5E7EB', 
                borderRadius: '6px',
                boxSizing: 'border-box',
                fontSize: '14px'
              }}
              placeholder="Enter last name"
              type="text"
              ref={lastnameEdit}
              defaultValue={lastname}
              onFocus={(e) => e.target.style.borderColor = '#4F46E5'}
              onBlur={(e) => e.target.style.borderColor = '#E5E7EB'}
            />
          </div>
        </div>
      ) : (
        <div style={{ marginBottom: '15px' }}>
          <p style={{ 
            fontSize: '11px', 
            color: '#9CA3AF', 
            margin: '0 0 8px 0',
            fontFamily: 'monospace',
            letterSpacing: '0.5px'
          }}>
            @{username}
          </p>
          <h3 style={{ 
            fontSize: '20px', 
            fontWeight: 'bold', 
            margin: '0 0 8px 0',
            color: '#1F2937',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap'
          }}>
            {firstname} {lastname}
          </h3>
          <p style={{ 
            color: '#6B7280', 
            margin: '0 0 12px 0',
            fontSize: '14px',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap'
          }}>
            📧 {email}
          </p>
          <div>
            <span style={{ 
              display: 'inline-block',
              padding: '5px 14px',
              backgroundColor: status === 'ACTIVE' ? '#D1FAE5' : '#FEE2E2',
              color: status === 'ACTIVE' ? '#065F46' : '#991B1B',
              borderRadius: '16px',
              fontSize: '11px',
              fontWeight: 'bold',
              letterSpacing: '0.5px'
            }}>
              {status === 'ACTIVE' ? '✓ ' : '✗ '}
              {status}
            </span>
          </div>
        </div>
      )}

      <div style={{ display: 'flex', gap: '8px' }}>
        {isEdit ? (
          <>
            <button
              style={{ 
                flex: 1,
                padding: '10px 16px',
                backgroundColor: '#10B981',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                fontWeight: 'bold',
                fontSize: '14px',
                transition: 'all 0.2s'
              }}
              onClick={editUser}
              onMouseOver={(e) => {
                e.target.style.backgroundColor = '#059669';
                e.target.style.transform = 'scale(1.02)';
              }}
              onMouseOut={(e) => {
                e.target.style.backgroundColor = '#10B981';
                e.target.style.transform = 'scale(1)';
              }}
            >
              💾 Save
            </button>
            <button
              style={{ 
                flex: 1,
                padding: '10px 16px',
                backgroundColor: '#6B7280',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                fontWeight: 'bold',
                fontSize: '14px',
                transition: 'all 0.2s'
              }}
              onClick={cancelEdit}
              onMouseOver={(e) => {
                e.target.style.backgroundColor = '#4B5563';
                e.target.style.transform = 'scale(1.02)';
              }}
              onMouseOut={(e) => {
                e.target.style.backgroundColor = '#6B7280';
                e.target.style.transform = 'scale(1)';
              }}
            >
              ✕ Cancel
            </button>
          </>
        ) : (
          <>
            <button
              style={{ 
                flex: 1,
                padding: '10px 16px',
                backgroundColor: '#4F46E5',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                fontWeight: 'bold',
                fontSize: '14px',
                transition: 'all 0.2s'
              }}
              onClick={editUser}
              onMouseOver={(e) => {
                e.target.style.backgroundColor = '#4338CA';
                e.target.style.transform = 'scale(1.02)';
              }}
              onMouseOut={(e) => {
                e.target.style.backgroundColor = '#4F46E5';
                e.target.style.transform = 'scale(1)';
              }}
            >
              ✏️ Edit
            </button>
            <button
              style={{ 
                flex: 1,
                padding: '10px 16px',
                backgroundColor: '#DC2626',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                fontWeight: 'bold',
                fontSize: '14px',
                transition: 'all 0.2s'
              }}
              onClick={deleteUser}
              onMouseOver={(e) => {
                e.target.style.backgroundColor = '#B91C1C';
                e.target.style.transform = 'scale(1.02)';
              }}
              onMouseOut={(e) => {
                e.target.style.backgroundColor = '#DC2626';
                e.target.style.transform = 'scale(1)';
              }}
            >
              🗑️ Delete
            </button>
          </>
        )}
      </div>
    </div>
  );
}