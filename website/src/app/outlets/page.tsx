import Layout from '@/components/layout/Layout';
import { Card, Button } from '@/cui';

export default function OutletsPage() {
  const outlets = [
    {
      name: 'Downtown Manhattan',
      address: '123 Baker Street, New York, NY 10001',
      phone: '+1 (555) 123-4567',
      hours: {
        weekday: '8:00 AM - 8:00 PM',
        saturday: '9:00 AM - 6:00 PM',
        sunday: '10:00 AM - 5:00 PM',
      },
      features: ['Dine-in', 'Takeout', 'Custom Orders', 'Classes'],
    },
    {
      name: 'Brooklyn Heights',
      address: '456 Sweet Avenue, Brooklyn, NY 11201',
      phone: '+1 (555) 234-5678',
      hours: {
        weekday: '8:00 AM - 8:00 PM',
        saturday: '9:00 AM - 6:00 PM',
        sunday: '10:00 AM - 5:00 PM',
      },
      features: ['Dine-in', 'Takeout', 'Custom Orders'],
    },
    {
      name: 'Upper East Side',
      address: '789 Dessert Lane, New York, NY 10021',
      phone: '+1 (555) 345-6789',
      hours: {
        weekday: '7:00 AM - 9:00 PM',
        saturday: '8:00 AM - 9:00 PM',
        sunday: '9:00 AM - 7:00 PM',
      },
      features: ['Dine-in', 'Takeout', 'Premium Collection'],
    },
    {
      name: 'Queens Plaza',
      address: '321 Confection Road, Queens, NY 11101',
      phone: '+1 (555) 456-7890',
      hours: {
        weekday: '8:00 AM - 7:00 PM',
        saturday: '9:00 AM - 7:00 PM',
        sunday: 'Closed',
      },
      features: ['Takeout', 'Custom Orders', 'Wholesale'],
    },
  ];

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Hero */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-display font-bold text-neutral-900 mb-6">
            Our Outlets
          </h1>
          <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
            Visit any of our locations to experience our delicious cakes in person. All stores offer fresh daily bakes and custom orders.
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-16">
          {[
            { number: '4', label: 'Locations' },
            { number: '50+', label: 'Daily Varieties' },
            { number: '15+', label: 'Years Serving' },
            { number: '10k+', label: 'Happy Customers' },
          ].map((stat, idx) => (
            <div key={idx} className="text-center">
              <div className="text-4xl font-bold text-primary-600 mb-2">{stat.number}</div>
              <div className="text-neutral-600">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Outlets Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {outlets.map((outlet, idx) => (
            <Card key={idx} hoverable elevated>
              <Card.Header>
                <h3 className="text-2xl font-bold">{outlet.name}</h3>
              </Card.Header>
              <Card.Body>
                {/* Address */}
                <div className="flex items-start space-x-3 mb-4">
                  <svg className="w-5 h-5 text-primary-600 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <p className="text-neutral-700">{outlet.address}</p>
                </div>

                {/* Phone */}
                <div className="flex items-start space-x-3 mb-4">
                  <svg className="w-5 h-5 text-primary-600 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <p className="text-neutral-700">{outlet.phone}</p>
                </div>

                {/* Hours */}
                <div className="mb-4">
                  <div className="flex items-center space-x-3 mb-2">
                    <svg className="w-5 h-5 text-primary-600 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p className="font-semibold text-neutral-900">Hours:</p>
                  </div>
                  <div className="ml-8 text-sm text-neutral-600 space-y-1">
                    <div className="flex justify-between">
                      <span>Mon - Fri</span>
                      <span className="font-medium">{outlet.hours.weekday}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Saturday</span>
                      <span className="font-medium">{outlet.hours.saturday}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Sunday</span>
                      <span className="font-medium">{outlet.hours.sunday}</span>
                    </div>
                  </div>
                </div>

                {/* Features */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {outlet.features.map((feature, fidx) => (
                    <span
                      key={fidx}
                      className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm font-medium"
                    >
                      {feature}
                    </span>
                  ))}
                </div>

                {/* Actions */}
                <div className="grid grid-cols-2 gap-3">
                  <Button variant="outline" size="sm" fullWidth>
                    Get Directions
                  </Button>
                  <Button color="primary" size="sm" fullWidth>
                    Call Now
                  </Button>
                </div>
              </Card.Body>
            </Card>
          ))}
        </div>

        {/* Map Placeholder */}
        <Card className="mb-16">
          <Card.Body className="p-0">
            <div className="bg-neutral-200 h-96 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <svg className="w-16 h-16 text-neutral-400 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                </svg>
                <p className="text-neutral-500">Interactive Map with All Locations</p>
              </div>
            </div>
          </Card.Body>
        </Card>

        {/* Coming Soon */}
        <Card className="bg-gradient-to-r from-primary-50 to-secondary-50">
          <Card.Body className="text-center py-12">
            <h2 className="text-3xl font-bold text-neutral-900 mb-4">
              More Locations Coming Soon!
            </h2>
            <p className="text-neutral-600 mb-6 max-w-2xl mx-auto">
              We're expanding! New outlets planned for New Jersey and Connecticut in 2026. Sign up to get notified when we open near you.
            </p>
            <Button color="primary" size="lg">
              Get Notified
            </Button>
          </Card.Body>
        </Card>
      </div>
    </Layout>
  );
}
