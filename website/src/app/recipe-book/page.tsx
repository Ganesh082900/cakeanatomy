import Layout from '@/components/layout/Layout';
import { Card, Button } from '@/cui';

export default function RecipeBookPage() {
  const recipes = [
    {
      title: 'Classic Vanilla Sponge',
      category: 'Basic Cakes',
      difficulty: 'Easy',
      time: '45 min',
      servings: '8-10',
    },
    {
      title: 'Chocolate Truffle Cake',
      category: 'Premium',
      difficulty: 'Medium',
      time: '90 min',
      servings: '12',
    },
    {
      title: 'Red Velvet Delight',
      category: 'Specialty',
      difficulty: 'Medium',
      time: '60 min',
      servings: '10-12',
    },
    {
      title: 'Lemon Raspberry Tart',
      category: 'Desserts',
      difficulty: 'Hard',
      time: '120 min',
      servings: '8',
    },
    {
      title: 'Tiramisu Dream',
      category: 'International',
      difficulty: 'Medium',
      time: '30 min + chill',
      servings: '8-10',
    },
    {
      title: 'Carrot Cake Supreme',
      category: 'Classic',
      difficulty: 'Easy',
      time: '55 min',
      servings: '10',
    },
  ];

  const categories = ['All Recipes', 'Basic Cakes', 'Premium', 'Specialty', 'Desserts', 'International', 'Classic'];

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Hero */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-display font-bold text-neutral-900 mb-6">
            Recipe Book
          </h1>
          <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
            Discover our collection of tried-and-tested recipes. From beginner-friendly basics to advanced techniques.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
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

        {/* Recipe Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {recipes.map((recipe, idx) => (
            <Card key={idx} hoverable elevated>
              <Card.Body>
                <div className="bg-gradient-to-br from-primary-100 to-secondary-100 h-48 rounded-lg mb-4 flex items-center justify-center">
                  <span className="text-6xl">🍰</span>
                </div>
                <span className="inline-block px-3 py-1 bg-secondary-100 text-secondary-700 rounded-full text-xs font-semibold mb-2">
                  {recipe.category}
                </span>
                <h3 className="text-xl font-bold text-neutral-900 mb-3">{recipe.title}</h3>
                
                <div className="grid grid-cols-3 gap-2 mb-4 text-sm text-neutral-600">
                  <div>
                    <div className="font-semibold text-neutral-900">⏱ Time</div>
                    <div>{recipe.time}</div>
                  </div>
                  <div>
                    <div className="font-semibold text-neutral-900">👥 Serves</div>
                    <div>{recipe.servings}</div>
                  </div>
                  <div>
                    <div className="font-semibold text-neutral-900">📊 Level</div>
                    <div>{recipe.difficulty}</div>
                  </div>
                </div>

                <Button color="primary" variant="outline" fullWidth>
                  View Recipe
                </Button>
              </Card.Body>
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        <Card className="bg-gradient-to-r from-primary-50 to-secondary-50">
          <Card.Body className="text-center py-12">
            <h2 className="text-3xl font-bold text-neutral-900 mb-4">
              Get Our Complete Recipe Collection
            </h2>
            <p className="text-neutral-600 mb-6 max-w-2xl mx-auto">
              Download our comprehensive e-book with 50+ professional recipes, complete with step-by-step instructions and pro tips.
            </p>
            <Button color="primary" size="lg">
              Download E-Book - $29.99
            </Button>
          </Card.Body>
        </Card>
      </div>
    </Layout>
  );
}
