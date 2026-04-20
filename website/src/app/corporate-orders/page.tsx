import Layout from '@/components/layout/Layout';
import { Card, Button, Input } from '@/cui';

export default function CorporateOrdersPage() {
  const services = [
    {
      title: 'Office Celebrations',
      description: 'Birthdays, work anniversaries, team achievements',
      icon: '🎉',
      features: ['Bulk discounts', 'Flexible scheduling', 'Custom branding'],
    },
    {
      title: 'Corporate Events',
      description: 'Product launches, conferences, networking events',
      icon: '🏢',
      features: ['Large quantities', 'Themed designs', 'Multiple locations'],
    },
    {
      title: 'Client Gifts',
      description: 'Thank clients with premium branded cakes',
      icon: '🎁',
      features: ['Gift packaging', 'Corporate branding', 'Nationwide shipping'],
    },
  ];

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Hero */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-display font-bold text-neutral-900 mb-6">
            Corporate Orders
          </h1>
          <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
            Elevate your corporate events and celebrations with our premium cakes and desserts. Perfect for any business occasion.
          </p>
        </div>

        {/* Services */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {services.map((service, idx) => (
            <Card key={idx} hoverable elevated>
              <Card.Body className="text-center">
                <div className="text-6xl mb-4">{service.icon}</div>
                <h3 className="text-2xl font-bold text-neutral-900 mb-2">{service.title}</h3>
                <p className="text-neutral-600 mb-6">{service.description}</p>
                <ul className="text-left space-y-2">
                  {service.features.map((feature, fidx) => (
                    <li key={fidx} className="flex items-center text-sm text-neutral-700">
                      <svg className="w-4 h-4 text-success-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
              </Card.Body>
            </Card>
          ))}
        </div>

        {/* Benefits */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-neutral-900 mb-8 text-center">Why Choose Us for Corporate Orders</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: '📊', title: 'Volume Discounts', desc: 'Save on bulk orders' },
              { icon: '🎨', title: 'Custom Branding', desc: 'Add your logo & colors' },
              { icon: '📅', title: 'Flexible Scheduling', desc: 'Recurring orders available' },
              { icon: '🚚', title: 'Reliable Delivery', desc: 'On-time, every time' },
            ].map((benefit, idx) => (
              <div key={idx} className="text-center">
                <div className="text-5xl mb-3">{benefit.icon}</div>
                <h3 className="font-semibold text-neutral-900 mb-1">{benefit.title}</h3>
                <p className="text-sm text-neutral-600">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Request Quote Form */}
        <Card className="max-w-3xl mx-auto mb-16">
          <Card.Header>
            <h2 className="text-2xl font-bold">Request a Corporate Quote</h2>
          </Card.Header>
          <Card.Body>
            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <Input label="Company Name" placeholder="Acme Corp" fullWidth required />
                <Input label="Contact Person" placeholder="John Doe" fullWidth required />
              </div>
              
              <div className="grid md:grid-cols-2 gap-4">
                <Input label="Email" type="email" placeholder="john@acmecorp.com" fullWidth required />
                <Input label="Phone" type="tel" placeholder="+1 (555) 000-0000" fullWidth required />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Event Type
                  </label>
                  <select className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent">
                    <option>Office Celebration</option>
                    <option>Conference/Event</option>
                    <option>Client Gift</option>
                    <option>Recurring Order</option>
                    <option>Other</option>
                  </select>
                </div>
                <Input label="Expected Date" type="date" fullWidth required />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <Input label="Number of People" type="number" placeholder="50" fullWidth />
                <Input label="Budget Range" placeholder="$500 - $1000" fullWidth />
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Additional Details
                </label>
                <textarea
                  className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  rows={4}
                  placeholder="Tell us about your event, any branding requirements, dietary restrictions, etc."
                />
              </div>

              <Button color="primary" size="lg" fullWidth>
                Submit Quote Request
              </Button>
              <p className="text-sm text-neutral-500 text-center">
                We'll respond with a detailed quote within 1 business day
              </p>
            </form>
          </Card.Body>
        </Card>

        {/* Testimonials */}
        <div>
          <h2 className="text-3xl font-bold text-neutral-900 mb-8 text-center">Trusted by Leading Companies</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                company: 'Tech Innovations Inc.',
                quote: 'CakeAnatomy has been our go-to for all company celebrations. Always professional and delicious!',
                person: 'Sarah M., HR Director',
              },
              {
                company: 'Global Marketing Co.',
                quote: 'The custom branded cakes for our client events are always a hit. Exceptional quality and service.',
                person: 'Mike T., Events Manager',
              },
              {
                company: 'Startup Hub',
                quote: 'From small team celebrations to large conferences, they handle it all perfectly.',
                person: 'Lisa K., Office Manager',
              },
            ].map((testimonial, idx) => (
              <Card key={idx}>
                <Card.Body>
                  <div className="mb-4">
                    <svg className="w-8 h-8 text-primary-600" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  </div>
                  <p className="text-neutral-600 mb-4 italic">"{testimonial.quote}"</p>
                  <div>
                    <p className="font-semibold text-neutral-900">{testimonial.person}</p>
                    <p className="text-sm text-neutral-600">{testimonial.company}</p>
                  </div>
                </Card.Body>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}
