import React, { useState, useEffect } from 'react';
import apiService from '../services/api';

const ProductCard = ({ product }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  };

  return (
    <div className="group bg-white rounded-xl shadow-lg overflow-hidden card-hover">
      <div className="relative aspect-[3/4] overflow-hidden bg-neutral-100">
        {!imageLoaded && !imageError && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
          </div>
        )}
        
        {imageError ? (
          <div className="absolute inset-0 flex items-center justify-center bg-neutral-200">
            <div className="text-center text-neutral-500">
              <svg className="w-12 h-12 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <p className="text-sm">Image unavailable</p>
            </div>
          </div>
        ) : (
          <img
            src={product.imageUrl}
            alt={product.name}
            className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            onLoad={() => setImageLoaded(true)}
            onError={() => setImageError(true)}
          />
        )}
        
        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
          <button className="bg-white text-neutral-900 px-6 py-2 rounded-full font-medium opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
            View Details
          </button>
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="font-semibold text-lg text-neutral-900 mb-2 group-hover:text-primary-600 transition-colors duration-200">
          {product.name}
        </h3>
        <p className="text-2xl font-bold text-primary-600">
          {formatPrice(product.price)}
        </p>
        {product.category && (
          <p className="text-sm text-neutral-500 mt-1 capitalize">
            {product.category}
          </p>
        )}
      </div>
    </div>
  );
};

const ProductShowcase = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await apiService.getProducts();
        setProducts(response.data || []);
      } catch (err) {
        setError(err.message);
        console.error('Failed to fetch products:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <section id="products" className="section-padding bg-neutral-50">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="heading-secondary mb-4">Our Collection</h2>
            <p className="text-body max-w-2xl mx-auto">
              Discover our carefully curated selection of premium fashion pieces
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden animate-pulse">
                <div className="aspect-[3/4] bg-neutral-200"></div>
                <div className="p-6">
                  <div className="h-6 bg-neutral-200 rounded mb-2"></div>
                  <div className="h-8 bg-neutral-200 rounded w-24"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="products" className="section-padding bg-neutral-50">
        <div className="container-custom">
          <div className="text-center">
            <h2 className="heading-secondary mb-4">Our Collection</h2>
            <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md mx-auto">
              <p className="text-red-600">Failed to load products: {error}</p>
              <button 
                onClick={() => window.location.reload()} 
                className="mt-4 btn-primary"
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="products" className="section-padding bg-neutral-50">
      <div className="container-custom">
        <div className="text-center mb-16 animate-slide-up">
          <h2 className="heading-secondary mb-4">Our Collection</h2>
          <p className="text-body max-w-2xl mx-auto">
            Discover our carefully curated selection of premium fashion pieces, 
            each designed to elevate your style and express your unique personality.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <div 
              key={product.id} 
              className="animate-slide-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
        
        {products.length === 0 && (
          <div className="text-center py-12">
            <p className="text-neutral-500">No products available at the moment.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductShowcase;
