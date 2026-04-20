import Layout from '@/components/layout/Layout';
import { Card, Button } from '@/cui';

export default function ProductsPage() {
  const products = [
    {
      name: 'Classic Chocolate Cake',
      category: 'Bestseller',
      price: '$45',
      description: 'Rich chocolate layers with ganache',
      rating: 4.9,
    },
    {
      name: 'Vanilla Bean Delight',
      category: 'Classic',
      price: '$40',
      description: 'Madagascar vanilla with buttercream',
      rating: 4.8,
    },
    {
      name: 'Red Velvet Supreme',
      category: 'Premium',
      price: '$50',
      description: 'Classic red velvet with cream cheese frosting',
      rating: 5.0,
    },
    {
      name: 'Lemon Blueberry Cake',
      category: 'Seasonal',
      price: '$48',
      description: 'Fresh lemon with blueberry compote',
      rating: 4.7,
    },
    {
      name: 'Tiramisu Cake',
      category: 'Specialty',
      price: '$55',
      description: 'Coffee-soaked layers with mascarpone',
      rating: 4.9,
    },
    {
      name: 'Carrot Walnut Cake',
      category: 'Classic',
      price: '$42',
      description: 'Spiced carrot cake with cream cheese frosting',
      rating: 4.6,
    },
    {
      name: 'Black Forest Cake',
      category: 'Premium',
      price: '$52',
      description: 'Chocolate layers with cherry and cream',
      rating: 4.8,
    },
    {
      name: 'Strawberry Shortcake',
      category: 'Seasonal',
      price: '$46',
      description: 'Light sponge with fresh strawberries',
      rating: 4.7,
    },
  ];

  const categories = ['All', 'Bestseller', 'Classic', 'Premium', 'Seasonal', 'Specialty'];

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Hero */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-display font-bold text-neutral-900 mb-6">
            Our Products
          </h1>
          <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
            Browse our delicious selection of handcrafted cakes, made fresh daily with premium ingredients.
          </p>
        </div>

        {/* Filters */}
        <div className="mb-12">
          <div className="flex flex-wrap justify-center gap-3 mb-6">
            {categories.map((category, idx) => (
              <button
                key={idx}
                className={`px-6 py-2 rounded-full font-medium transition-colors ${
                  idx === 0
                    ? 'bg-primary-600 text-white'
                    : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
          
          <div className="flex justify-center gap-4">
            <select className="px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500">
              <option>Sort by: Featured</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
              <option>Rating</option>
              <option>Name</option>
            </select>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {products.map((product, idx) => (
            <Card key={idx} hoverable elevated>
              <Card.Body>
                <div className="relative">
                  <div className="bg-gradient-to-br from-primary-100 to-secondary-100 h-48 rounded-lg mb-4 flex items-center justify-center">
                    <span className="text-6xl">🍰</span>
                  </div>
                  <span className="absolute top-2 right-2 px-3 py-1 bg-white rounded-full text-xs font-semibold text-primary-600 shadow-md">
                    {product.category}
                  </span>
                </div>
                
                <h3 className="text-lg font-bold text-neutral-900 mb-2">{product.name}</h3>
                <p className="text-sm text-neutral-600 mb-3">{product.description}</p>
                
                <div className="flex items-center justify-between mb-4">
                  <span className="text-2xl font-bold text-primary-600">{product.price}</span>
                  <div className="flex items-center text-sm">
                    <svg className="w-4 h-4 text-warning-500 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span className="font-semibold">{product.rating}</span>
                  </div>
                </div>

                <Button color="primary" fullWidth>
                  Add to Cart
                </Button>
              </Card.Body>
            </Card>
          ))}
        </div>

        {/* CTA */}
        <Card className="bg-primary-600 text-white">
          <Card.Body className="text-center py-12">
            <h2 className="text-3xl font-bold mb-4">Can't Find What You're Looking For?</h2>
            <p className="text-lg mb-6 opacity-90">
              Create a custom cake designed exactly how you want it
            </p>
            <Button variant="outline" size="lg" className="bg-white text-primary-600 hover:bg-neutral-50">
              Design Custom Cake
            </Button>
          </Card.Body>
        </Card>
      </div>
    </Layout>
  );
}
