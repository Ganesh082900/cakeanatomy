'use client';

import { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Card, Button, Input } from '@/cui';

export default function OrderOnlinePage() {
  const [cart, setCart] = useState<any[]>([]);
  const [step, setStep] = useState(1);

  const products = [
    { id: 1, name: 'Classic Chocolate Cake', price: 45, category: 'Classic' },
    { id: 2, name: 'Vanilla Bean Delight', price: 40, category: 'Classic' },
    { id: 3, name: 'Red Velvet Supreme', price: 50, category: 'Premium' },
    { id: 4, name: 'Lemon Blueberry', price: 48, category: 'Seasonal' },
  ];

  const addToCart = (product: any) => {
    setCart([...cart, { ...product, quantity: 1 }]);
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Hero */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-display font-bold text-neutral-900 mb-6">
            Order Online
          </h1>
          <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
            Browse our menu, customize your order, and get it delivered fresh to your door or ready for pickup.
          </p>
        </div>

        {/* Progress Steps */}
        <div className="max-w-3xl mx-auto mb-12">
          <div className="flex items-center justify-between">
            {[
              { num: 1, label: 'Select' },
              { num: 2, label: 'Details' },
              { num: 3, label: 'Checkout' },
            ].map((s, idx) => (
              <div key={idx} className="flex items-center flex-1">
                <div className="flex flex-col items-center flex-1">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center font-bold ${
                      step >= s.num
                        ? 'bg-primary-600 text-white'
                        : 'bg-neutral-200 text-neutral-500'
                    }`}
                  >
                    {s.num}
                  </div>
                  <span className="text-sm mt-2 font-medium">{s.label}</span>
                </div>
                {idx < 2 && (
                  <div
                    className={`h-1 flex-1 mx-2 ${
                      step > s.num ? 'bg-primary-600' : 'bg-neutral-200'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Step 1: Product Selection */}
        {step === 1 && (
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            {products.map((product) => (
              <Card key={product.id} hoverable>
                <Card.Body>
                  <div className="bg-gradient-to-br from-primary-100 to-secondary-100 h-48 rounded-lg mb-4 flex items-center justify-center">
                    <span className="text-6xl">🍰</span>
                  </div>
                  <h3 className="text-lg font-bold text-neutral-900 mb-2">{product.name}</h3>
                  <p className="text-2xl font-bold text-primary-600 mb-4">${product.price}</p>
                  <Button
                    color="primary"
                    fullWidth
                    onClick={() => addToCart(product)}
                  >
                    Add to Cart
                  </Button>
                </Card.Body>
              </Card>
            ))}
          </div>
        )}

        {/* Step 2: Order Details */}
        {step === 2 && (
          <Card className="max-w-2xl mx-auto">
            <Card.Header>
              <h2 className="text-2xl font-bold">Delivery Details</h2>
            </Card.Header>
            <Card.Body>
              <form className="space-y-4">
                <div className="flex gap-4 mb-6">
                  <button
                    type="button"
                    className="flex-1 py-3 px-6 rounded-lg border-2 border-primary-600 bg-primary-600 text-white font-semibold"
                  >
                    Delivery
                  </button>
                  <button
                    type="button"
                    className="flex-1 py-3 px-6 rounded-lg border-2 border-neutral-300 text-neutral-700 font-semibold hover:border-primary-600"
                  >
                    Pickup
                  </button>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <Input label="First Name" placeholder="John" fullWidth />
                  <Input label="Last Name" placeholder="Doe" fullWidth />
                </div>
                <Input label="Email" type="email" placeholder="john@example.com" fullWidth />
                <Input label="Phone" type="tel" placeholder="+1 (555) 000-0000" fullWidth />
                <Input label="Delivery Address" placeholder="123 Main St" fullWidth />
                <div className="grid md:grid-cols-3 gap-4">
                  <Input label="City" placeholder="New York" fullWidth />
                  <Input label="State" placeholder="NY" fullWidth />
                  <Input label="Zip Code" placeholder="10001" fullWidth />
                </div>
                <Input label="Delivery Date" type="date" fullWidth />
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Special Instructions
                  </label>
                  <textarea
                    className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    rows={3}
                    placeholder="Any special delivery instructions..."
                  />
                </div>
              </form>
            </Card.Body>
          </Card>
        )}

        {/* Step 3: Checkout */}
        {step === 3 && (
          <div className="max-w-2xl mx-auto">
            <Card className="mb-6">
              <Card.Header>
                <h2 className="text-2xl font-bold">Order Summary</h2>
              </Card.Header>
              <Card.Body>
                <div className="space-y-3 mb-4">
                  {cart.map((item, idx) => (
                    <div key={idx} className="flex justify-between py-2 border-b">
                      <span>{item.name}</span>
                      <span className="font-semibold">${item.price}</span>
                    </div>
                  ))}
                </div>
                <div className="space-y-2 text-sm mb-4">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>${cart.reduce((sum, item) => sum + item.price, 0)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Delivery Fee</span>
                    <span>$5</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax</span>
                    <span>${((cart.reduce((sum, item) => sum + item.price, 0) + 5) * 0.08).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-lg font-bold pt-2 border-t">
                    <span>Total</span>
                    <span>${((cart.reduce((sum, item) => sum + item.price, 0) + 5) * 1.08).toFixed(2)}</span>
                  </div>
                </div>
              </Card.Body>
            </Card>

            <Card>
              <Card.Header>
                <h2 className="text-2xl font-bold">Payment Information</h2>
              </Card.Header>
              <Card.Body>
                <form className="space-y-4">
                  <Input label="Card Number" placeholder="1234 5678 9012 3456" fullWidth />
                  <div className="grid grid-cols-2 gap-4">
                    <Input label="Expiry Date" placeholder="MM/YY" fullWidth />
                    <Input label="CVV" placeholder="123" fullWidth />
                  </div>
                  <Input label="Cardholder Name" placeholder="John Doe" fullWidth />
                </form>
              </Card.Body>
            </Card>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="max-w-2xl mx-auto mt-8 flex justify-between">
          {step > 1 && (
            <Button variant="outline" onClick={() => setStep(step - 1)}>
              Back
            </Button>
          )}
          <div className="flex-1" />
          {step < 3 ? (
            <Button color="primary" onClick={() => setStep(step + 1)}>
              Continue
            </Button>
          ) : (
            <Button color="primary" size="lg">
              Place Order
            </Button>
          )}
        </div>

        {/* Cart Summary (Sticky Sidebar - shown on larger screens) */}
        {cart.length > 0 && (
          <div className="fixed bottom-4 right-4 bg-white shadow-2xl rounded-lg p-4 max-w-sm hidden lg:block">
            <h3 className="font-bold mb-2">Cart ({cart.length})</h3>
            <p className="text-2xl font-bold text-primary-600">
              ${cart.reduce((sum, item) => sum + item.price, 0)}
            </p>
          </div>
        )}
      </div>
    </Layout>
  );
}
