import React from 'react';

const About = () => {
  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16 animate-slide-up">
            <h2 className="heading-secondary mb-6">Our Story</h2>
            <div className="w-24 h-1 bg-neutral-600 mx-auto mb-8"></div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Text content */}
            <div className="space-y-6 animate-slide-up">
              <p className="text-body text-lg leading-relaxed">
                Founded with a passion for timeless elegance and contemporary design, 
                Betternship Fashion represents the perfect fusion of classic sophistication 
                and modern innovation. Our journey began with a simple belief: that fashion 
                should empower, inspire, and celebrate the unique beauty in every individual.
              </p>
              
              <p className="text-body text-lg leading-relaxed">
                Each piece in our collection is carefully curated and crafted with attention 
                to detail, using premium materials and sustainable practices. We believe in 
                creating not just clothing, but experiences that make you feel confident, 
                elegant, and authentically yourself.
              </p>
              
              <p className="text-body text-lg leading-relaxed">
                From our atelier to your wardrobe, every garment tells a story of 
                craftsmanship, creativity, and the pursuit of excellence. Join us on 
                this journey as we continue to redefine what it means to dress with 
                purpose and style.
              </p>
              
              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 pt-8 border-t border-neutral-200">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary-600 mb-2">5+</div>
                  <div className="text-sm text-neutral-600 uppercase tracking-wide">Years Experience</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary-600 mb-2">10K+</div>
                  <div className="text-sm text-neutral-600 uppercase tracking-wide">Happy Customers</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary-600 mb-2">100+</div>
                  <div className="text-sm text-neutral-600 uppercase tracking-wide">Unique Pieces</div>
                </div>
              </div>
            </div>
            
            {/* Image/Visual element */}
            <div className="relative animate-slide-up" style={{ animationDelay: '200ms' }}>
              <div className="aspect-[4/5] bg-gradient-to-br from-neutral-100 to-neutral-200 rounded-2xl overflow-hidden relative">
                {/* Placeholder for brand image */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-neutral-600">
                    <svg className="w-24 h-24 mx-auto mb-4 opacity-60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                    </svg>
                    <p className="text-lg font-medium opacity-80">Betternship Fashion</p>
                    <p className="text-sm opacity-60">Crafting Excellence</p>
                  </div>
                </div>
                
                {/* Decorative elements */}
                <div className="absolute top-6 right-6 w-16 h-16 bg-white bg-opacity-20 rounded-full"></div>
                <div className="absolute bottom-6 left-6 w-12 h-12 bg-white bg-opacity-30 rounded-full"></div>
              </div>
              
              {/* Floating elements */}
              <div className="absolute -top-4 -left-4 w-8 h-8 bg-neutral-400 rounded-full opacity-40 animate-pulse"></div>
              <div className="absolute -bottom-4 -right-4 w-6 h-6 bg-neutral-500 rounded-full opacity-50 animate-pulse delay-1000"></div>
            </div>
          </div>
          
          {/* Values section */}
          <div className="mt-20 animate-slide-up" style={{ animationDelay: '400ms' }}>
            <h3 className="text-2xl font-semibold text-center mb-12 text-neutral-900">Our Values</h3>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-neutral-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                  </svg>
                </div>
                <h4 className="font-semibold text-lg mb-2 text-neutral-900">Quality</h4>
                <p className="text-body text-sm">Premium materials and exceptional craftsmanship in every piece</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-neutral-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9" />
                  </svg>
                </div>
                <h4 className="font-semibold text-lg mb-2 text-neutral-900">Sustainability</h4>
                <p className="text-body text-sm">Committed to ethical practices and environmental responsibility</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-neutral-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <h4 className="font-semibold text-lg mb-2 text-neutral-900">Passion</h4>
                <p className="text-body text-sm">Driven by love for fashion and dedication to our customers</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
