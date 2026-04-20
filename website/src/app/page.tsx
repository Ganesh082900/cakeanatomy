'use client';

import { useState } from 'react';
import Link from 'next/link';
import Layout from '@/components/layout/Layout';
import { Button, Card } from '@/cui';

export default function Home() {
  const [activeFeature, setActiveFeature] = useState(0);

  const features = [
    { title: 'Custom Designs', description: 'Bring your dream cake to life', icon: '🎨' },
    { title: 'Premium Ingredients', description: 'Only the finest quality', icon: '⭐' },
    { title: 'Fast Delivery', description: 'Fresh to your door', icon: '🚚' },
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-50 via-white to-secondary-50 px-4 sm:px-6 lg:px-8 py-20 md:py-32">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-bold text-neutral-900 mb-6">
                Sweetness
                <span className="block text-primary-600">Delivered</span>
              </h1>
              <p className="text-xl text-neutral-600 mb-8">
                Handcrafted cakes made with love, passion, and the finest ingredients. 
                Perfect for every celebration, big or small.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/order-online">
                  <Button color="primary" size="xl">
                    Order Now
                  </Button>
                </Link>
                <Link href="/products">
                  <Button variant="outline" size="xl">
                    Browse Cakes
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-primary-200 to-secondary-200 rounded-3xl h-96 flex items-center justify-center shadow-2xl">
                <span className="text-9xl">🎂</span>
              </div>
              <div className="absolute -bottom-4 -right-4 bg-white rounded-2xl shadow-xl p-4">
                <div className="flex items-center space-x-2">
                  <span className="text-3xl">⭐</span>
                  <div>
                    <div className="font-bold text-neutral-900">4.9/5</div>
                    <div className="text-xs text-neutral-600">10k+ Reviews</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="px-4 sm:px-6 lg:px-8 py-20 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-neutral-900 mb-4">Why Choose CakeAnatomy?</h2>
            <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
              We're passionate about creating the perfect cake for your special moments
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, idx) => (
              <Card 
                key={idx} 
                hoverable 
                elevated
                className={`cursor-pointer transition-all ${activeFeature === idx ? 'ring-2 ring-primary-600' : ''}`}
                onClick={() => setActiveFeature(idx)}
              >
                <Card.Body className="text-center">
                  <div className="text-6xl mb-4">{feature.icon}</div>
                  <h3 className="text-2xl font-bold text-neutral-900 mb-2">{feature.title}</h3>
                  <p className="text-neutral-600">{feature.description}</p>
                </Card.Body>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Products */}
      <section className="px-4 sm:px-6 lg:px-8 py-20 bg-neutral-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-neutral-900 mb-4">Bestsellers</h2>
            <p className="text-xl text-neutral-600">Our customers' favorite cakes</p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {['Chocolate Dream', 'Vanilla Heaven', 'Red Velvet', 'Lemon Bliss'].map((name, idx) => (
              <Card key={idx} hoverable elevated>
                <Card.Body>
                  <div className="bg-gradient-to-br from-primary-100 to-secondary-100 h-48 rounded-lg mb-4 flex items-center justify-center">
                    <span className="text-6xl">🍰</span>
                  </div>
                  <h3 className="font-bold text-neutral-900 mb-2">{name}</h3>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-2xl font-bold text-primary-600">$45</span>
                    <div className="flex items-center text-sm text-warning-600">
                      <span>⭐ 4.9</span>
                    </div>
                  </div>
                  <Button color="primary" size="sm" fullWidth>
                    Add to Cart
                  </Button>
                </Card.Body>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/products">
              <Button variant="outline" size="lg">
                View All Products
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Custom Cake CTA */}
      <section className="px-4 sm:px-6 lg:px-8 py-20 bg-gradient-to-r from-primary-600 to-secondary-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Design Your Dream Cake
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Work with our expert bakers to create a custom cake that's uniquely yours. 
            Perfect for weddings, birthdays, and special celebrations.
          </p>
          <Link href="/customised-cake">
            <Button variant="outline" size="xl" className="bg-white text-primary-600 hover:bg-neutral-50">
              Start Designing
            </Button>
          </Link>
        </div>
      </section>

      {/* Testimonials */}
      <section className="px-4 sm:px-6 lg:px-8 py-20 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-neutral-900 mb-16 text-center">
            What Our Customers Say
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: 'Sarah Johnson', text: 'The most delicious cake I\'ve ever had! Perfect for our wedding.', rating: 5 },
              { name: 'Michael Chen', text: 'Amazing custom design and incredible taste. Highly recommend!', rating: 5 },
              { name: 'Emily Rodriguez', text: 'Fast delivery and the cake looked exactly like the design. Love it!', rating: 5 },
            ].map((testimonial, idx) => (
              <Card key={idx}>
                <Card.Body>
                  <div className="flex mb-3">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <svg key={i} className="w-5 h-5 text-warning-500" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-neutral-700 mb-4 italic">"{testimonial.text}"</p>
                  <p className="font-semibold text-neutral-900">{testimonial.name}</p>
                </Card.Body>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="px-4 sm:px-6 lg:px-8 py-20 bg-neutral-50">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-neutral-900 mb-4">Stay Sweet with Us</h2>
          <p className="text-neutral-600 mb-8">
            Subscribe to get special offers, free giveaways, and new flavor announcements
          </p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
            <Button color="primary" size="lg">
              Subscribe
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
}
