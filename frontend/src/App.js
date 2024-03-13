// Main Components
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

// Context
import { AuthProvider } from './context/AuthContext';

// Assets Load
import './App.css';

// Main Pages
import Login from './pages/login/Login'
import Register from './pages/register/Register'
import Catalogue from './pages/catalogue/Catalogue'
import Item from './pages/catalogue/Item'

// Suplement Componenents


function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/catalogue" element={<Catalogue />} />
          <Route path="/property/:id" element={<Item />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
