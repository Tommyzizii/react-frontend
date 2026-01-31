import { useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";

export function ItemDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const itemNameRef = useRef();
  const itemCategoryRef = useRef();
  const itemPriceRef = useRef();

  async function loadItem() {
    const res = await fetch(`http://localhost:3000/api/item/${id}`);
    const data = await res.json();

    itemNameRef.current.value = data.itemName;
    itemCategoryRef.current.value = data.itemCategory;
    itemPriceRef.current.value = data.itemPrice;
  }

  async function onUpdate() {
    const body = {
      name: itemNameRef.current.value,
      category: itemCategoryRef.current.value,
      price: itemPriceRef.current.value,
    };

    const result = await fetch(`http://localhost:3000/api/item/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (result.ok) {
      alert("Item updated successfully! ✅");
      navigate("/", { replace: true });
    }
  }

  async function onDelete() {
    if (!window.confirm("Delete this item? ⚠️")) return;

    const result = await fetch(`http://localhost:3000/api/item/${id}`, {
      method: "DELETE",
    });

    if (result.ok) {
      alert("Item deleted successfully! 🗑️");
      navigate("/", { replace: true });
    }
  }

  useEffect(() => {
    loadItem();
  }, []);

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '40px 20px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <div style={{
        maxWidth: '600px',
        width: '100%',
        background: 'white',
        borderRadius: '16px',
        boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
        padding: '40px'
      }}>
        <h1 style={{
          textAlign: 'center',
          color: '#2d3748',
          fontSize: '2rem',
          marginBottom: '30px',
          fontWeight: '700'
        }}>
          ✏️ Edit Item
        </h1>

        <div style={{ marginBottom: '20px' }}>
          <label style={labelStyle}>Name</label>
          <input 
            ref={itemNameRef} 
            style={inputStyle}
            placeholder="Enter item name"
          />
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label style={labelStyle}>Category</label>
          <select ref={itemCategoryRef} style={selectStyle}>
            <option>Stationary</option>
            <option>Kitchenware</option>
            <option>Appliance</option>
          </select>
        </div>

        <div style={{ marginBottom: '30px' }}>
          <label style={labelStyle}>Price (THB)</label>
          <input 
            ref={itemPriceRef} 
            type="number"
            style={inputStyle}
            placeholder="0.00"
          />
        </div>

        <hr style={{
          border: 'none',
          borderTop: '1px solid #e2e8f0',
          margin: '30px 0'
        }} />

        <div style={{
          display: 'flex',
          gap: '12px',
          flexWrap: 'wrap'
        }}>
          <button onClick={onUpdate} style={{
            flex: '1',
            padding: '14px 24px',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: '700',
            fontSize: '1rem',
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
            transition: 'transform 0.2s'
          }}>
            💾 Update
          </button>

          <button onClick={onDelete} style={{
            flex: '1',
            padding: '14px 24px',
            background: '#f56565',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: '700',
            fontSize: '1rem',
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
            transition: 'transform 0.2s'
          }}>
            🗑️ Delete
          </button>

          <button onClick={() => navigate("/")} style={{
            flex: '1',
            padding: '14px 24px',
            background: 'white',
            color: '#667eea',
            border: '2px solid #667eea',
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: '700',
            fontSize: '1rem',
            transition: 'all 0.2s'
          }}>
            ← Back
          </button>
        </div>
      </div>
    </div>
  );
}

const labelStyle = {
  display: 'block',
  marginBottom: '8px',
  color: '#2d3748',
  fontWeight: '600',
  fontSize: '0.95rem'
};

const inputStyle = {
  width: '100%',
  padding: '12px 16px',
  border: '2px solid #e2e8f0',
  borderRadius: '8px',
  fontSize: '1rem',
  outline: 'none',
  transition: 'border 0.2s',
  boxSizing: 'border-box'
};

const selectStyle = {
  width: '100%',
  padding: '12px 16px',
  border: '2px solid #e2e8f0',
  borderRadius: '8px',
  fontSize: '1rem',
  outline: 'none',
  background: 'white',
  cursor: 'pointer',
  boxSizing: 'border-box'
};