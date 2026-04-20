import Layout from '@/components/layout/Layout';
import { Card, Button, Input } from '@/cui';

export default function ContactPage() {
  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Hero */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-display font-bold text-neutral-900 mb-6">
            Get in Touch
          </h1>
          <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
            Have a question or special request? We'd love to hear from you. Our team is here to help!
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Contact Form */}
          <Card>
            <Card.Header>
              <h2 className="text-2xl font-bold">Send Us a Message</h2>
            </Card.Header>
            <Card.Body>
              <form className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <Input label="First Name" placeholder="John" fullWidth required />
                  <Input label="Last Name" placeholder="Doe" fullWidth required />
                </div>
                <Input label="Email" type="email" placeholder="john@example.com" fullWidth required />
                <Input label="Phone" type="tel" placeholder="+1 (555) 000-0000" fullWidth />
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Subject
                  </label>
                  <select className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent">
                    <option>General Inquiry</option>
                    <option>Order Question</option>
                    <option>Custom Cake Request</option>
                    <option>Corporate Orders</option>
                    <option>Feedback</option>
                    <option>Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Message
                  </label>
                  <textarea
                    className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    rows={5}
                    placeholder="How can we help you?"
                    required
                  />
                </div>
                <Button color="primary" size="lg" fullWidth>
                  Send Message
                </Button>
              </form>
            </Card.Body>
          </Card>

          {/* Contact Information */}
          <div className="space-y-6">
            <Card>
              <Card.Body>
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-neutral-900 mb-1">Phone</h3>
                    <p className="text-neutral-600">+1 (555) 123-4567</p>
                    <p className="text-sm text-neutral-500 mt-1">Mon-Sat: 8am - 8pm</p>
                  </div>
                </div>
              </Card.Body>
            </Card>

            <Card>
              <Card.Body>
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-secondary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-secondary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-neutral-900 mb-1">Email</h3>
                    <p className="text-neutral-600">hello@cakeanatomy.com</p>
                    <p className="text-sm text-neutral-500 mt-1">We'll respond within 24 hours</p>
                  </div>
                </div>
              </Card.Body>
            </Card>

            <Card>
              <Card.Body>
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-success-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-success-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-neutral-900 mb-1">Visit Us</h3>
                    <p className="text-neutral-600">123 Baker Street</p>
                    <p className="text-neutral-600">New York, NY 10001</p>
                    <p className="text-sm text-neutral-500 mt-1">See all locations</p>
                  </div>
                </div>
              </Card.Body>
            </Card>

            <Card className="bg-gradient-to-br from-primary-50 to-secondary-50">
              <Card.Body>
                <h3 className="font-semibold text-neutral-900 mb-2">Business Hours</h3>
                <div className="space-y-1 text-sm text-neutral-700">
                  <div className="flex justify-between">
                    <span>Monday - Friday</span>
                    <span className="font-medium">8:00 AM - 8:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Saturday</span>
                    <span className="font-medium">9:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sunday</span>
                    <span className="font-medium">10:00 AM - 5:00 PM</span>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </div>
        </div>

        {/* Map Placeholder */}
        <Card>
          <Card.Body className="p-0">
            <div className="bg-neutral-200 h-96 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <svg className="w-16 h-16 text-neutral-400 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                </svg>
                <p className="text-neutral-500">Interactive Map</p>
              </div>
            </div>
          </Card.Body>
        </Card>
      </div>
    </Layout>
  );
}
