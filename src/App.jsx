import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Items } from './components/Items';
import { ItemDetail } from './components/ItemDetail';

function App() {
  return (
    <Router>
      <div style={{ padding: '0', margin: '0' }}>
        <Routes>
          <Route path="/" element={<Items />} />
          <Route path="/items/:id" element={<ItemDetail />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;