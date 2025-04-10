import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  
  return (
    <div className="product-card">
      <div className="product-image">
        <img src={product.image} alt={product.title} />
      </div>
      <div className="product-info">
        <h3 className="product-title">{
          product.title.length > 25 
            ? `${product.title.substring(0, 25)}...` 
            : product.title
        }</h3>
        <p className="product-price">${product.price.toFixed(2)}</p>
        <div className="product-actions">
          <Link to={`/product/${product.id}`} className="view-details-btn">
            View Details
          </Link>
          <button 
            className="add-to-cart-btn"
            onClick={() => addToCart(product)}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
