import React, { useState } from 'react';
import apiService from '../services/api';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // idle, loading, success, error
  const [message, setMessage] = useState('');

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Reset status
    setStatus('loading');
    setMessage('');

    // Validate email
    if (!email.trim()) {
      setStatus('error');
      setMessage('Please enter your email address');
      return;
    }

    if (!validateEmail(email)) {
      setStatus('error');
      setMessage('Please enter a valid email address');
      return;
    }

    try {
      const response = await apiService.subscribeNewsletter(email);
      setStatus('success');
      setMessage(response.message || 'Successfully subscribed to our newsletter!');
      setEmail(''); // Clear the form
    } catch (error) {
      setStatus('error');
      setMessage(error.message || 'Failed to subscribe. Please try again.');
    }
  };

  const getStatusIcon = () => {
    switch (status) {
      case 'loading':
        return (
          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
        );
      case 'success':
        return (
          <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        );
      case 'error':
        return (
          <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <section id="newsletter" className="section-padding bg-gradient-to-r from-primary-600 to-primary-700">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto text-center">
          <div className="animate-slide-up">
            <h2 className="heading-secondary text-white mb-6">
              Stay in Style
            </h2>
            <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto leading-relaxed">
              Be the first to know about our latest collections, exclusive offers, 
              and fashion insights. Join our community of style enthusiasts.
            </p>
          </div>
          
          <div className="animate-slide-up" style={{ animationDelay: '200ms' }}>
            <form onSubmit={handleSubmit} className="max-w-md mx-auto">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="w-full px-4 py-3 rounded-lg border border-transparent focus:border-primary-300 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 text-neutral-900 placeholder-neutral-500"
                    disabled={status === 'loading'}
                  />
                </div>
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="bg-white hover:bg-neutral-50 text-primary-600 font-medium py-3 px-6 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 min-w-[120px]"
                >
                  {status === 'loading' ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary-600"></div>
                      <span>Joining...</span>
                    </>
                  ) : (
                    <>
                      <span>Subscribe</span>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                      </svg>
                    </>
                  )}
                </button>
              </div>
              
              {/* Status message */}
              {message && (
                <div className={`mt-4 p-3 rounded-lg flex items-center gap-2 justify-center ${
                  status === 'success' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                }`}>
                  {getStatusIcon()}
                  <span className="text-sm font-medium">{message}</span>
                </div>
              )}
            </form>
            
            <p className="text-primary-200 text-sm mt-6">
              We respect your privacy. Unsubscribe at any time.
            </p>
          </div>
          
          {/* Social proof */}
          <div className="mt-12 animate-slide-up" style={{ animationDelay: '400ms' }}>
            <div className="flex items-center justify-center gap-8 text-primary-200">
              <div className="text-center">
                <div className="text-2xl font-bold text-white">5K+</div>
                <div className="text-sm">Subscribers</div>
              </div>
              <div className="w-px h-8 bg-primary-400"></div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">Weekly</div>
                <div className="text-sm">Updates</div>
              </div>
              <div className="w-px h-8 bg-primary-400"></div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">Exclusive</div>
                <div className="text-sm">Offers</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
