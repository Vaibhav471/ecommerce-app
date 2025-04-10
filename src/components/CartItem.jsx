import { useCart } from '../context/CartContext';
import './CartItem.css';

const CartItem = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCart();

  return (
    <div className="cart-item">
      <div className="cart-item-image">
        <img src={item.image} alt={item.title} />
      </div>
      
      <div className="cart-item-details">
        <h3>{item.title}</h3>
        <p className="cart-item-price">${item.price.toFixed(2)}</p>
      </div>
      
      <div className="cart-item-actions">
        <div className="quantity-controls">
          <button 
            onClick={() => updateQuantity(item.id, item.quantity - 1)}
            className="quantity-btn"
          >
            -
          </button>
          <span className="quantity">{item.quantity}</span>
          <button 
            onClick={() => updateQuantity(item.id, item.quantity + 1)}
            className="quantity-btn"
          >
            +
          </button>
        </div>
        
        <button 
          onClick={() => removeFromCart(item.id)}
          className="remove-btn"
        >
          Remove
        </button>
      </div>
      
      <div className="cart-item-total">
        ${(item.price * item.quantity).toFixed(2)}
      </div>
    </div>
  );
};

export default CartItem;