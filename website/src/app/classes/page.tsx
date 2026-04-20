import Layout from '@/components/layout/Layout';
import { Card, Button, Input } from '@/cui';

export default function ClassesPage() {
  const classes = [
    {
      title: 'Beginner Baking Basics',
      duration: '2 hours',
      level: 'Beginner',
      price: '$99',
      topics: ['Basic cake techniques', 'Simple frosting', 'Decorating tips', 'Recipe fundamentals'],
    },
    {
      title: 'Advanced Decoration',
      duration: '3 hours',
      level: 'Advanced',
      price: '$149',
      topics: ['Fondant work', 'Sugar flowers', '3D decorations', 'Professional techniques'],
    },
    {
      title: 'Custom Cake Design',
      duration: '4 hours',
      level: 'Intermediate',
      price: '$199',
      topics: ['Design principles', 'Color theory', 'Themed cakes', 'Client consultations'],
    },
  ];

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Hero */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-display font-bold text-neutral-900 mb-6">
            1:1 Baking Classes
          </h1>
          <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
            Learn from expert bakers in personalized one-on-one sessions tailored to your skill level and goals.
          </p>
        </div>

        {/* Benefits */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          <Card>
            <Card.Body className="text-center">
              <div className="text-5xl mb-4">👨‍🍳</div>
              <h3 className="text-xl font-semibold mb-2">Expert Instructors</h3>
              <p className="text-neutral-600">
                Learn from certified pastry chefs with years of professional experience
              </p>
            </Card.Body>
          </Card>

          <Card>
            <Card.Body className="text-center">
              <div className="text-5xl mb-4">🎯</div>
              <h3 className="text-xl font-semibold mb-2">Personalized Learning</h3>
              <p className="text-neutral-600">
                Curriculum adapted to your pace, interests, and skill level
              </p>
            </Card.Body>
          </Card>

          <Card>
            <Card.Body className="text-center">
              <div className="text-5xl mb-4">🏆</div>
              <h3 className="text-xl font-semibold mb-2">Hands-On Practice</h3>
              <p className="text-neutral-600">
                Create actual cakes during class and take them home to enjoy
              </p>
            </Card.Body>
          </Card>
        </div>

        {/* Class Offerings */}
        <h2 className="text-3xl font-bold text-neutral-900 mb-8 text-center">Available Classes</h2>
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {classes.map((classItem, idx) => (
            <Card key={idx} hoverable>
              <Card.Header>
                <h3 className="text-xl font-bold">{classItem.title}</h3>
              </Card.Header>
              <Card.Body>
                <div className="flex justify-between mb-4">
                  <span className="text-sm text-neutral-600">⏱ {classItem.duration}</span>
                  <span className="text-sm px-3 py-1 bg-primary-100 text-primary-700 rounded-full">
                    {classItem.level}
                  </span>
                </div>
                <p className="text-2xl font-bold text-primary-600 mb-4">{classItem.price}</p>
                <ul className="space-y-2 mb-6">
                  {classItem.topics.map((topic, tidx) => (
                    <li key={tidx} className="flex items-start text-sm text-neutral-600">
                      <svg className="w-4 h-4 text-success-500 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      {topic}
                    </li>
                  ))}
                </ul>
              </Card.Body>
              <Card.Footer>
                <Button color="primary" fullWidth>
                  Book Class
                </Button>
              </Card.Footer>
            </Card>
          ))}
        </div>

        {/* Booking Form */}
        <Card className="max-w-2xl mx-auto">
          <Card.Header>
            <h2 className="text-2xl font-bold">Request a Custom Class</h2>
          </Card.Header>
          <Card.Body>
            <form className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <Input label="First Name" placeholder="John" fullWidth />
                <Input label="Last Name" placeholder="Doe" fullWidth />
              </div>
              <Input label="Email" type="email" placeholder="john@example.com" fullWidth />
              <Input label="Phone" type="tel" placeholder="+1 (555) 000-0000" fullWidth />
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  What would you like to learn?
                </label>
                <textarea
                  className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  rows={4}
                  placeholder="Tell us about your baking goals and interests..."
                />
              </div>
              <Button color="primary" size="lg" fullWidth>
                Submit Request
              </Button>
            </form>
          </Card.Body>
        </Card>
      </div>
    </Layout>
  );
}
