import { useState } from 'react';
import { Link } from 'react-router-dom';
import CartItem from '../components/CartItem';
import { useCart } from '../context/CartContext';
import './Cart.css';

const Cart = () => {
  const { 
    cartItems, 
    getTotalPrice, 
    clearCart, 
    showCheckoutNotification, 
    showNotification, 
    notificationMessage 
  } = useCart();
  
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const handleCheckout = () => {
    setIsCheckingOut(true);
    
    // Simulate checkout process
    setTimeout(() => {
      showCheckoutNotification();
      setIsCheckingOut(false);
    }, 1000);
  };

  return (
    <div className="cart-page">
      <h1>Your Shopping Cart</h1>
      
      {cartItems.length === 0 ? (
        <div className="empty-cart">
          <p>Your cart is empty</p>
          <Link to="/" className="continue-shopping-btn">
            Continue Shopping
          </Link>
        </div>
      ) : (
        <>
          <div className="cart-items-container">
            <div className="cart-header">
              <div className="cart-header-product">Product</div>
              <div className="cart-header-quantity">Quantity</div>
              <div className="cart-header-total">Total</div>
            </div>
            
            {cartItems.map(item => (
              <CartItem key={item.id} item={item} />
            ))}
          </div>
          
          <div className="cart-summary">
            <div className="cart-total">
              <span>Total:</span>
              <span>${getTotalPrice()}</span>
            </div>
            
            <div className="cart-actions">
              <Link to="/" className="continue-shopping-btn">
                Continue Shopping
              </Link>
              
              <button 
                className="checkout-btn"
                onClick={handleCheckout}
                disabled={isCheckingOut}
              >
                {isCheckingOut ? 'Processing...' : 'Checkout'}
              </button>
            </div>
          </div>
        </>
      )}
      
      {showNotification && (
        <div className="notification">
          <p>{notificationMessage}</p>
        </div>
      )}
    </div>
  );
};

export default Cart;
