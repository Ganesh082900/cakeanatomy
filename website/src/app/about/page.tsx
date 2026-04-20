import Layout from '@/components/layout/Layout';
import { Card, Button } from '@/cui';

export default function AboutPage() {
  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-display font-bold text-neutral-900 mb-6">
            About CakeAnatomy
          </h1>
          <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
            Crafting delicious memories since 2020. We're passionate about creating the perfect cake for every celebration.
          </p>
        </div>

        {/* Story Section */}
        <div className="grid md:grid-cols-2 gap-12 mb-20">
          <div>
            <h2 className="text-3xl font-bold text-neutral-900 mb-4">Our Story</h2>
            <p className="text-neutral-600 mb-4">
              Founded in 2020, CakeAnatomy began as a small home bakery with a big dream: to bring joy to every celebration through perfectly crafted cakes. What started as a passion project has grown into a beloved bakery serving thousands of happy customers.
            </p>
            <p className="text-neutral-600 mb-4">
              Our founder, inspired by family recipes passed down through generations, combined traditional baking techniques with modern flavors to create something truly special. Each cake we make is a labor of love, crafted with the finest ingredients and attention to detail.
            </p>
            <p className="text-neutral-600">
              Today, we're proud to be the go-to bakery for birthdays, weddings, corporate events, and every sweet moment in between.
            </p>
          </div>
          <div className="bg-gradient-to-br from-primary-100 to-secondary-100 rounded-2xl h-96 flex items-center justify-center">
            <p className="text-6xl">🎂</p>
          </div>
        </div>

        {/* Values Section */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-neutral-900 mb-8 text-center">Our Values</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <Card.Body className="text-center">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">✨</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Quality First</h3>
                <p className="text-neutral-600">
                  We use only the finest ingredients, sourced locally whenever possible, to ensure every bite is perfect.
                </p>
              </Card.Body>
            </Card>

            <Card>
              <Card.Body className="text-center">
                <div className="w-16 h-16 bg-secondary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">💝</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Made with Love</h3>
                <p className="text-neutral-600">
                  Every cake is handcrafted with care and attention to detail, ensuring your celebration is extra special.
                </p>
              </Card.Body>
            </Card>

            <Card>
              <Card.Body className="text-center">
                <div className="w-16 h-16 bg-success-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">🌱</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Sustainability</h3>
                <p className="text-neutral-600">
                  We're committed to eco-friendly practices, from packaging to ingredient sourcing.
                </p>
              </Card.Body>
            </Card>
          </div>
        </div>

        {/* Team Preview */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-neutral-900 mb-6">Meet Our Team</h2>
          <p className="text-neutral-600 mb-8 max-w-2xl mx-auto">
            Our talented bakers and decorators are the heart of CakeAnatomy. Each brings unique skills and creativity to make your cake dreams come true.
          </p>
          <Button color="primary" size="lg">
            View Full Team
          </Button>
        </div>
      </div>
    </Layout>
  );
}
