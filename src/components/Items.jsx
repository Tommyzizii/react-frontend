import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

const ITEMS_PER_PAGE = 10;

export function Items() {
  const [items, setItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const itemNameRef = useRef();
  const itemCategoryRef = useRef();
  const itemPriceRef = useRef();

  async function loadItems() {
    try {
      const response = await fetch("http://localhost:3000/api/item");
      const data = await response.json();
      setItems(data);
    } catch (err) {
      console.error(err);
      alert("Loading items failed");
    }
  }

  async function onItemSave() {
    const body = {
      name: itemNameRef.current.value,
      category: itemCategoryRef.current.value,
      price: itemPriceRef.current.value,
    };

    await fetch("http://localhost:3000/api/item", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    itemNameRef.current.value = "";
    itemCategoryRef.current.value = "Stationary";
    itemPriceRef.current.value = "";

    loadItems();
  }

  async function onDeleteItem(id, name) {
    if (!window.confirm(`Are you sure you want to delete "${name}"?`)) return;

    const result = await fetch(`http://localhost:3000/api/item/${id}`, {
      method: "DELETE",
    });

    if (result.ok) {
      // Optimistic update
      setItems(prev => prev.filter(item => item._id !== id));

      // Page safety
      const newTotalPages = Math.ceil((items.length - 1) / ITEMS_PER_PAGE);
      if (currentPage > newTotalPages) {
        setCurrentPage(Math.max(newTotalPages, 1));
      }
    }
  }

  useEffect(() => {
    loadItems();
  }, []);

  const totalPages = Math.ceil(items.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentItems = items.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  return (
    <div style={{
      minHeight: '100vh',
      height: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '0',
      margin: '0',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'auto'
    }}>
      <div style={{
        width: '90%',
        maxWidth: '1200px',
        background: 'white',
        borderRadius: '16px',
        boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
        padding: '40px',
        margin: '20px'
      }}>
        <h1 style={{
          textAlign: 'center',
          color: '#2d3748',
          fontSize: '2.5rem',
          marginBottom: '10px',
          fontWeight: '700'
        }}>
          📦 Item Management
        </h1>
        
        <p style={{
          textAlign: 'center',
          color: '#718096',
          fontSize: '1.1rem',
          marginBottom: '30px'
        }}>
          Total Items: <strong>{items.length}</strong> | Page <strong>{currentPage}</strong> of <strong>{totalPages}</strong>
        </p>

        <div style={{ overflowX: 'auto' }}>
          <table style={{
            width: '100%',
            borderCollapse: 'collapse',
            background: 'white'
          }}>
            <thead>
              <tr style={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white'
              }}>
                <th style={headerStyle}>ID</th>
                <th style={headerStyle}>Name</th>
                <th style={headerStyle}>Category</th>
                <th style={headerStyle}>Price</th>
                <th style={headerStyle}>Actions</th>
              </tr>
            </thead>

            <tbody>
              {currentItems.map((item, index) => (
                <tr key={item._id} style={{
                  background: index % 2 === 0 ? '#f7fafc' : 'white',
                  transition: 'all 0.2s'
                }}>
                  <td style={cellStyle}>{item._id}</td>
                  <td style={cellStyle}><strong>{item.itemName}</strong></td>
                  <td style={cellStyle}>
                    <span style={{
                      padding: '4px 12px',
                      borderRadius: '12px',
                      background: getCategoryColor(item.itemCategory),
                      color: 'white',
                      fontSize: '0.85rem',
                      fontWeight: '600'
                    }}>
                      {item.itemCategory}
                    </span>
                  </td>
                  <td style={cellStyle}>
                    <span style={{ fontWeight: '600', color: '#667eea' }}>
                      ฿{item.itemPrice}
                    </span>
                  </td>
                  <td style={cellStyle}>
                    <Link to={`/items/${item._id}`} style={{
                      color: '#667eea',
                      textDecoration: 'none',
                      fontWeight: '600',
                      marginRight: '12px'
                    }}>
                      ✏️ Edit
                    </Link>
                    <button onClick={() => onDeleteItem(item._id, item.itemName)} style={{
                      background: '#f56565',
                      color: 'white',
                      border: 'none',
                      padding: '6px 12px',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      fontWeight: '600',
                      fontSize: '0.9rem'
                    }}>
                      🗑️ Delete
                    </button>
                  </td>
                </tr>
              ))}

              <tr style={{ background: '#edf2f7' }}>
                <td style={cellStyle}>➕</td>
                <td style={cellStyle}>
                  <input ref={itemNameRef} placeholder="Item name" style={inputStyle} />
                </td>
                <td style={cellStyle}>
                  <select ref={itemCategoryRef} style={selectStyle}>
                    <option>Stationary</option>
                    <option>Kitchenware</option>
                    <option>Appliance</option>
                  </select>
                </td>
                <td style={cellStyle}>
                  <input ref={itemPriceRef} placeholder="0.00" type="number" style={inputStyle} />
                </td>
                <td style={cellStyle}>
                  <button onClick={onItemSave} style={{
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    color: 'white',
                    border: 'none',
                    padding: '10px 20px',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontWeight: '600',
                    fontSize: '1rem',
                    boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                  }}>
                    ➕ Add Item
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div style={{
          marginTop: '30px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '8px',
          flexWrap: 'wrap'
        }}>
          <button 
            disabled={currentPage === 1} 
            onClick={() => setCurrentPage(p => p - 1)}
            style={paginationButtonStyle(currentPage === 1)}
          >
            ← Previous
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
            <button
              key={p}
              onClick={() => setCurrentPage(p)}
              style={{
                ...paginationButtonStyle(false),
                background: p === currentPage ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : 'white',
                color: p === currentPage ? 'white' : '#667eea',
                fontWeight: p === currentPage ? 'bold' : 'normal',
                border: p === currentPage ? 'none' : '2px solid #667eea'
              }}
            >
              {p}
            </button>
          ))}

          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(p => p + 1)}
            style={paginationButtonStyle(currentPage === totalPages)}
          >
            Next →
          </button>
        </div>
      </div>
    </div>
  );
}

// Styles
const headerStyle = {
  padding: '16px',
  textAlign: 'left',
  fontWeight: '700',
  fontSize: '1rem',
  letterSpacing: '0.5px'
};

const cellStyle = {
  padding: '16px',
  borderBottom: '1px solid #e2e8f0',
  color: '#2d3748'
};

const inputStyle = {
  width: '100%',
  padding: '8px 12px',
  border: '2px solid #e2e8f0',
  borderRadius: '6px',
  fontSize: '1rem',
  outline: 'none',
  transition: 'border 0.2s'
};

const selectStyle = {
  width: '100%',
  padding: '8px 12px',
  border: '2px solid #e2e8f0',
  borderRadius: '6px',
  fontSize: '1rem',
  outline: 'none',
  background: 'white',
  cursor: 'pointer'
};

const paginationButtonStyle = (disabled) => ({
  padding: '10px 16px',
  border: '2px solid #667eea',
  borderRadius: '8px',
  background: 'white',
  color: '#667eea',
  cursor: disabled ? 'not-allowed' : 'pointer',
  fontWeight: '600',
  fontSize: '0.95rem',
  opacity: disabled ? 0.5 : 1,
  transition: 'all 0.2s'
});

function getCategoryColor(category) {
  const colors = {
    'Stationary': '#667eea',
    'Kitchenware': '#f6ad55',
    'Appliance': '#48bb78'
  };
  return colors[category] || '#718096';
}