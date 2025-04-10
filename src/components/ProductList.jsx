import ProductCard from './ProductCard';
import './ProductList.css';

const ProductList = ({ products, loading, error }) => {
  if (loading) {
    return <div className="loading">Loading products...</div>;
  }

  if (error) {
    return <div className="error">Error loading products: {error}</div>;
  }

  if (!products || products.length === 0) {
    return <div className="no-products">No products found</div>;
  }

  return (
    <div className="product-grid">
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductList;
