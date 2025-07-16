
const Hero = () => {
  const scrollToProducts = () => {
    const productsSection = document.getElementById('products');
    if (productsSection) {
      productsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-neutral-50 to-neutral-100 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-40">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23bdc1c6' fill-opacity='0.03'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
      </div>
      
      <div className="container-custom relative z-10">
        <div className="text-center max-w-4xl mx-auto animate-fade-in">
          {/* Brand name */}
          <h1 className="heading-primary mb-6">
            <span className="block">Betternship</span>
            <span className="block text-primary-700">Fashion</span>
          </h1>
          
          {/* Tagline */}
          <p className="text-xl md:text-2xl text-neutral-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            Discover timeless elegance and contemporary style. 
            Where fashion meets sophistication in every piece.
          </p>
          
          {/* CTA Button */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button 
              onClick={scrollToProducts}
              className="btn-primary text-lg px-8 py-4 animate-bounce-gentle cursor-pointer"
            >
              Explore Collection
            </button>
            <button 
              onClick={() => {
                const newsletterSection = document.getElementById('newsletter');
                if (newsletterSection) {
                  newsletterSection.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="btn-secondary text-lg px-8 py-4 cursor-pointer"
            >
              Join Newsletter
            </button>
          </div>
          
          {/* Scroll indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <div className="w-6 h-10 border-2 border-neutral-400 rounded-full flex justify-center">
              <div className="w-1 h-3 bg-neutral-400 rounded-full mt-2 animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-neutral-200 rounded-full opacity-30 animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-16 h-16 bg-neutral-300 rounded-full opacity-20 animate-pulse delay-1000"></div>
      <div className="absolute top-1/2 right-20 w-12 h-12 bg-neutral-400 rounded-full opacity-15 animate-pulse delay-500"></div>
    </section>
  );
};

export default Hero;
