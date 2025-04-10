  import { useState, useEffect } from 'react';
  import { useParams, Link } from 'react-router-dom';
  import { getProductById } from '../services/api';
  import { useCart } from '../context/CartContext';
  import './ProductDetail.css';
  
  const ProductDetail = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [quantity, setQuantity] = useState(1);
    
    const { addToCart, showNotification, notificationMessage } = useCart();
  
    useEffect(() => {
      const fetchProduct = async () => {
        setLoading(true);
        setError('');
        
        try {
          const productData = await getProductById(parseInt(id));
          setProduct(productData);
        } catch (err) {
          console.error('Error fetching product:', err);
          setError('Failed to load product details. Please try again later.');
        } finally {
          setLoading(false);
        }
      };
  
      fetchProduct();
    }, [id]);
  
    const handleQuantityChange = (e) => {
      const value = parseInt(e.target.value);
      if (value > 0) {
        setQuantity(value);
      }
    };
  
    const handleAddToCart = () => {
      if (product) {
        addToCart(product, quantity);
        setQuantity(1);
      }
    };
  
    if (loading) {
      return <div className="loading">Loading product details...</div>;
    }
  
    if (error) {
      return <div className="error">{error}</div>;
    }
  
    if (!product) {
      return <div className="not-found">Product not found</div>;
    }
  
    return (
      <div className="product-detail-page">
        <Link to="/" className="back-link">
          &larr; Back to Products
        </Link>
        
        <div className="product-detail-container">
          <div className="product-detail-image">
            <img src={product.image} alt={product.title} />
          </div>
          
          <div className="product-detail-info">
            <h1>{product.title}</h1>
            
            <div className="product-category">
              {product.category}
            </div>
            
            <div className="product-price">
              ${product.price.toFixed(2)}
            </div>
            
            <div className="product-description">
              <h3>Description</h3>
              <p>{product.description}</p>
            </div>
            
            <div className="product-detail-actions">
              <div className="quantity-selector">
                <label htmlFor="quantity">Quantity:</label>
                <input
                  type="number"
                  id="quantity"
                  min="1"
                  value={quantity}
                  onChange={handleQuantityChange}
                />
              </div>
              
              <button 
                className="add-to-cart-btn" 
                onClick={handleAddToCart}
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
        
        {showNotification && (
          <div className="notification">
            <p>{notificationMessage}</p>
          </div>
        )}
      </div>
    );
  };
  
  export default ProductDetail;
  