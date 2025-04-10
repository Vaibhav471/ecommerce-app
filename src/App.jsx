import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { CartProvider } from './context/CartContext';
import { isAuthenticated } from './utils/auth';
import Header from './components/Header';
import Login from './pages/Login';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import './App.css';

// Protected route component
const ProtectedRoute = ({ children }) => {
  const [auth, setAuth] = useState(isAuthenticated());
  
  useEffect(() => {
    // Check authentication status when component mounts
    setAuth(isAuthenticated());
  }, []);
  
  if (!auth) {
    return <Navigate to="/login" replace />;
  }
  
  return (
    <>
      <Header />
      {children}
    </>
  );
};

function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <div className="app">
          <Routes>
            <Route path="/login" element={<Login />} />
            
            <Route 
              path="/" 
              element={
                <ProtectedRoute>
                  <Products />
                </ProtectedRoute>
              } 
            />
            
            <Route 
              path="/product/:id" 
              element={
                <ProtectedRoute>
                  <ProductDetail />
                </ProtectedRoute>
              } 
            />
            
            <Route 
              path="/cart" 
              element={
                <ProtectedRoute>
                  <Cart />
                </ProtectedRoute>
              } 
            />
            
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </CartProvider>
    </BrowserRouter>
  );
}

export default App;
