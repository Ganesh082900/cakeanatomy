import Layout from '@/components/layout/Layout';
import { Card, Button, Input, Select } from '@/cui';

export default function CustomisedCakePage() {
  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Hero */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-display font-bold text-neutral-900 mb-6">
            Create Your Dream Cake
          </h1>
          <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
            Design a custom cake tailored to your vision. Choose flavors, design, size, and special touches.
          </p>
        </div>

        {/* Process Steps */}
        <div className="grid md:grid-cols-4 gap-6 mb-16">
          {[
            { step: '1', title: 'Choose Details', icon: '📝' },
            { step: '2', title: 'Design Review', icon: '🎨' },
            { step: '3', title: 'Confirmation', icon: '✅' },
            { step: '4', title: 'Delivery', icon: '🚚' },
          ].map((item, idx) => (
            <div key={idx} className="text-center">
              <div className="w-16 h-16 bg-primary-600 text-white rounded-full flex items-center justify-center mx-auto mb-3 text-2xl font-bold">
                {item.step}
              </div>
              <div className="text-4xl mb-2">{item.icon}</div>
              <h3 className="font-semibold text-neutral-900">{item.title}</h3>
            </div>
          ))}
        </div>

        {/* Customization Form */}
        <Card className="max-w-4xl mx-auto mb-16">
          <Card.Header>
            <h2 className="text-2xl font-bold">Design Your Cake</h2>
          </Card.Header>
          <Card.Body>
            <form className="space-y-6">
              {/* Occasion */}
              <Select
                label="Occasion"
                placeholder="Select occasion"
                options={[
                  { value: 'birthday', label: 'Birthday' },
                  { value: 'wedding', label: 'Wedding' },
                  { value: 'anniversary', label: 'Anniversary' },
                  { value: 'corporate', label: 'Corporate Event' },
                  { value: 'other', label: 'Other' },
                ]}
                fullWidth
              />

              {/* Size & Servings */}
              <div className="grid md:grid-cols-2 gap-4">
                <Select
                  label="Cake Size"
                  placeholder="Select size"
                  options={[
                    { value: 'small', label: 'Small (6-8 servings)' },
                    { value: 'medium', label: 'Medium (12-15 servings)' },
                    { value: 'large', label: 'Large (20-25 servings)' },
                    { value: 'xlarge', label: 'Extra Large (30+ servings)' },
                  ]}
                  fullWidth
                />
                <Select
                  label="Number of Tiers"
                  placeholder="Select tiers"
                  options={[
                    { value: '1', label: '1 Tier' },
                    { value: '2', label: '2 Tiers' },
                    { value: '3', label: '3 Tiers' },
                    { value: '4+', label: '4+ Tiers' },
                  ]}
                  fullWidth
                />
              </div>

              {/* Flavors */}
              <div className="grid md:grid-cols-2 gap-4">
                <Select
                  label="Cake Flavor"
                  placeholder="Select flavor"
                  options={[
                    { value: 'vanilla', label: 'Vanilla' },
                    { value: 'chocolate', label: 'Chocolate' },
                    { value: 'red-velvet', label: 'Red Velvet' },
                    { value: 'lemon', label: 'Lemon' },
                    { value: 'custom', label: 'Custom Flavor' },
                  ]}
                  fullWidth
                />
                <Select
                  label="Frosting Type"
                  placeholder="Select frosting"
                  options={[
                    { value: 'buttercream', label: 'Buttercream' },
                    { value: 'cream-cheese', label: 'Cream Cheese' },
                    { value: 'fondant', label: 'Fondant' },
                    { value: 'whipped', label: 'Whipped Cream' },
                  ]}
                  fullWidth
                />
              </div>

              {/* Theme & Colors */}
              <div className="grid md:grid-cols-2 gap-4">
                <Input label="Theme" placeholder="e.g., Unicorn, Floral, Minimalist" fullWidth />
                <Input label="Color Scheme" placeholder="e.g., Pink & Gold, Rainbow" fullWidth />
              </div>

              {/* Special Requests */}
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Special Requests or Design Ideas
                </label>
                <textarea
                  className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  rows={4}
                  placeholder="Tell us about any specific design elements, dietary requirements, or special touches you'd like..."
                />
              </div>

              {/* Delivery Date */}
              <Input label="Preferred Delivery Date" type="date" fullWidth />

              {/* Contact Info */}
              <div className="border-t pt-6">
                <h3 className="text-lg font-semibold mb-4">Contact Information</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <Input label="Name" placeholder="Your name" fullWidth />
                  <Input label="Email" type="email" placeholder="your@email.com" fullWidth />
                  <Input label="Phone" type="tel" placeholder="+1 (555) 000-0000" fullWidth />
                  <Input label="Zip Code" placeholder="10001" fullWidth />
                </div>
              </div>

              {/* Submit */}
              <Button color="primary" size="lg" fullWidth>
                Submit Design Request
              </Button>
              <p className="text-sm text-neutral-500 text-center">
                We'll review your request and send you a quote within 24 hours
              </p>
            </form>
          </Card.Body>
        </Card>

        {/* Gallery */}
        <div>
          <h2 className="text-3xl font-bold text-neutral-900 mb-8 text-center">
            Custom Cake Inspiration
          </h2>
          <div className="grid md:grid-cols-4 gap-4">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((idx) => (
              <div
                key={idx}
                className="aspect-square bg-gradient-to-br from-primary-100 to-secondary-100 rounded-lg flex items-center justify-center hover:scale-105 transition-transform cursor-pointer"
              >
                <span className="text-5xl">🎂</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}
