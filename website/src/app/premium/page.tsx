import Layout from '@/components/layout/Layout';
import { Card, Button } from '@/cui';

export default function PremiumPage() {
  const premiumCakes = [
    {
      name: 'Royal Wedding Tier',
      price: '$499',
      description: 'A magnificent 5-tier masterpiece perfect for grand celebrations',
      features: ['Custom design', '50+ servings', 'Premium flavors', 'Gold leaf decoration'],
    },
    {
      name: 'Luxury Chocolate Dream',
      price: '$299',
      description: 'Decadent Belgian chocolate cake with edible flowers',
      features: ['Belgian chocolate', 'Handmade decorations', '30 servings', 'Custom flavors'],
    },
    {
      name: 'Artisan Collection',
      price: '$399',
      description: 'Bespoke artistic cake designed by our master decorators',
      features: ['Unique design', 'Premium ingredients', '40 servings', '3D elements'],
    },
  ];

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Hero */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 bg-primary-100 text-primary-700 rounded-full text-sm font-semibold mb-4">
            PREMIUM COLLECTION
          </span>
          <h1 className="text-5xl md:text-6xl font-display font-bold text-neutral-900 mb-6">
            Luxury Cakes
          </h1>
          <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
            Indulge in our premium collection of exquisite cakes, crafted with the finest ingredients and unparalleled artistry.
          </p>
        </div>

        {/* Premium Features */}
        <div className="grid md:grid-cols-4 gap-6 mb-20">
          {[
            { icon: '👑', title: 'Royal Treatment', desc: 'VIP service' },
            { icon: '🎨', title: 'Custom Design', desc: 'Unique creations' },
            { icon: '⭐', title: 'Premium Ingredients', desc: 'Finest quality' },
            { icon: '🚚', title: 'White Glove Delivery', desc: 'Perfect arrival' },
          ].map((feature, idx) => (
            <div key={idx} className="text-center">
              <div className="text-4xl mb-2">{feature.icon}</div>
              <h3 className="font-semibold text-neutral-900 mb-1">{feature.title}</h3>
              <p className="text-sm text-neutral-600">{feature.desc}</p>
            </div>
          ))}
        </div>

        {/* Premium Cakes */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {premiumCakes.map((cake, idx) => (
            <Card key={idx} hoverable elevated>
              <Card.Body>
                <div className="bg-gradient-to-br from-primary-100 to-secondary-100 h-48 rounded-lg mb-4 flex items-center justify-center">
                  <span className="text-6xl">🎂</span>
                </div>
                <h3 className="text-2xl font-bold text-neutral-900 mb-2">{cake.name}</h3>
                <p className="text-3xl font-bold text-primary-600 mb-3">{cake.price}</p>
                <p className="text-neutral-600 mb-4">{cake.description}</p>
                <ul className="space-y-2 mb-6">
                  {cake.features.map((feature, fidx) => (
                    <li key={fidx} className="flex items-center text-sm text-neutral-600">
                      <svg className="w-4 h-4 text-success-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button color="primary" fullWidth>
                  Order Now
                </Button>
              </Card.Body>
            </Card>
          ))}
        </div>

        {/* CTA */}
        <Card className="bg-gradient-to-r from-primary-600 to-secondary-600 text-white">
          <Card.Body className="text-center py-12">
            <h2 className="text-3xl font-bold mb-4">Ready for Something Truly Special?</h2>
            <p className="text-lg mb-6 opacity-90">
              Schedule a consultation with our master bakers to create your dream cake
            </p>
            <Button variant="outline" size="lg" className="bg-white text-primary-600 hover:bg-neutral-50">
              Book Consultation
            </Button>
          </Card.Body>
        </Card>
      </div>
    </Layout>
  );
}
