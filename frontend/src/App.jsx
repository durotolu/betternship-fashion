import React from 'react';
import Hero from './components/Hero';
import ProductShowcase from './components/ProductShowcase';
import About from './components/About';
import Newsletter from './components/Newsletter';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-white">
      <Hero />
      <ProductShowcase />
      <About />
      <Newsletter />
      <Footer />
    </div>
  );
}

export default App;
