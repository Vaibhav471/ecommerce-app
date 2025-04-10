import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { removeToken } from '../utils/auth';
import { useState } from 'react';
import './Header.css';

const Header = () => {
  const { getTotalItems } = useCart();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    removeToken();
    navigate('/login');
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="logo">ShopEasy</Link>
        
        <div className="mobile-menu-icon" onClick={toggleMenu}>
          <span></span>
          <span></span>
          <span></span>
        </div>
        
        <nav className={`nav-links ${menuOpen ? 'open' : ''}`}>
          <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
          <Link to="/cart" onClick={() => setMenuOpen(false)}>
            Cart <span className="cart-count">{getTotalItems()}</span>
          </Link>
          <button onClick={handleLogout} className="logout-btn">Logout</button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
