'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Layout from '@/components/layout/Layout';
import { Card } from '@/cui';

function PoliciesContent() {
  const searchParams = useSearchParams();
  const tabParam = searchParams.get('tab');
  const [activeTab, setActiveTab] = useState('terms');

  useEffect(() => {
    if (tabParam) {
      setActiveTab(tabParam);
    }
  }, [tabParam]);

  const tabs = [
    { id: 'terms', label: 'Terms & Conditions' },
    { id: 'delivery', label: 'Delivery & Shipping' },
    { id: 'refund', label: 'Refund & Cancellation' },
    { id: 'privacy', label: 'Privacy Policy' },
  ];

  return (
    <Layout>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Hero */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-display font-bold text-neutral-900 mb-6">
            Policies
          </h1>
          <p className="text-xl text-neutral-600">
            Important information about our services and your rights
          </p>
        </div>

        {/* Tabs */}
        <div className="mb-8">
          <div className="border-b border-neutral-200 overflow-x-auto">
            <nav className="flex space-x-1 min-w-max">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-6 py-3 font-medium text-sm whitespace-nowrap border-b-2 transition-colors ${
                    activeTab === tab.id
                      ? 'border-primary-600 text-primary-600'
                      : 'border-transparent text-neutral-600 hover:text-neutral-900 hover:border-neutral-300'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        <Card>
          <Card.Body className="prose prose-neutral max-w-none">
            {activeTab === 'terms' && (
              <div>
                <h2 className="text-2xl font-bold mb-4">Terms & Conditions</h2>
                <p className="text-neutral-600 mb-4">
                  <em>Last updated: April 20, 2026</em>
                </p>

                <h3 className="text-xl font-semibold mt-6 mb-3">1. Agreement to Terms</h3>
                <p className="text-neutral-700 mb-4">
                  By accessing and placing an order with CakeAnatomy, you confirm that you are in agreement with and bound by the terms and conditions contained in the Terms & Conditions outlined below. These terms apply to the entire website and any email or other type of communication between you and CakeAnatomy.
                </p>

                <h3 className="text-xl font-semibold mt-6 mb-3">2. Product Information</h3>
                <p className="text-neutral-700 mb-4">
                  All products are subject to availability. We reserve the right to discontinue any product at any time. Prices for our products are subject to change without notice. We cannot guarantee that the color, texture, or any other property of any products as displayed will be accurate due to different screen calibrations and individual preferences.
                </p>

                <h3 className="text-xl font-semibold mt-6 mb-3">3. Orders and Payment</h3>
                <p className="text-neutral-700 mb-4">
                  We reserve the right to refuse any order you place with us. We may, at our sole discretion, limit or cancel quantities purchased per person, per household, or per order. Payment must be received prior to the pickup or delivery of any order. We accept all major credit cards, debit cards, and cash payments.
                </p>

                <h3 className="text-xl font-semibold mt-6 mb-3">4. Custom Orders</h3>
                <p className="text-neutral-700 mb-4">
                  Custom cake orders require a 50% deposit at the time of booking. Final payment is due 48 hours before the scheduled delivery or pickup date. Changes to custom orders must be requested at least 5 business days before the delivery date.
                </p>

                <h3 className="text-xl font-semibold mt-6 mb-3">5. Liability</h3>
                <p className="text-neutral-700 mb-4">
                  While we take utmost care in preparing our products, CakeAnatomy shall not be liable for any damages arising from the consumption of our products. Customers with food allergies or dietary restrictions should inform us prior to ordering and are responsible for verifying ingredient information.
                </p>

                <h3 className="text-xl font-semibold mt-6 mb-3">6. Intellectual Property</h3>
                <p className="text-neutral-700 mb-4">
                  All content on this website, including but not limited to text, graphics, logos, images, and software, is the property of CakeAnatomy and protected by copyright and intellectual property laws. Unauthorized use is prohibited.
                </p>

                <h3 className="text-xl font-semibold mt-6 mb-3">7. Governing Law</h3>
                <p className="text-neutral-700 mb-4">
                  These Terms & Conditions are governed by the laws of the State of New York. Any disputes arising from these terms shall be subject to the exclusive jurisdiction of the courts in New York.
                </p>
              </div>
            )}

            {activeTab === 'delivery' && (
              <div>
                <h2 className="text-2xl font-bold mb-4">Delivery & Shipping Policy</h2>
                <p className="text-neutral-600 mb-4">
                  <em>Last updated: April 20, 2026</em>
                </p>

                <h3 className="text-xl font-semibold mt-6 mb-3">1. Delivery Areas</h3>
                <p className="text-neutral-700 mb-4">
                  We deliver to all five boroughs of New York City and select areas in New Jersey and Connecticut within a 25-mile radius of our bakery locations. Please check our delivery zone tool on the order page to confirm if your address is within our delivery area.
                </p>

                <h3 className="text-xl font-semibold mt-6 mb-3">2. Delivery Fees</h3>
                <ul className="list-disc pl-6 text-neutral-700 mb-4 space-y-2">
                  <li>Standard delivery (within 10 miles): $10</li>
                  <li>Extended delivery (10-25 miles): $20</li>
                  <li>White-glove delivery (tiered/delicate cakes): $35</li>
                  <li>Same-day delivery (subject to availability): Additional $15</li>
                  <li>Free delivery on orders over $200 (within 10 miles)</li>
                </ul>

                <h3 className="text-xl font-semibold mt-6 mb-3">3. Delivery Times</h3>
                <p className="text-neutral-700 mb-4">
                  We offer delivery windows between 9 AM - 8 PM, Tuesday through Sunday. Specific delivery times can be requested but are not guaranteed. We will provide a 2-hour delivery window on the day before delivery. Our driver will contact you 30 minutes before arrival.
                </p>

                <h3 className="text-xl font-semibold mt-6 mb-3">4. Pickup Options</h3>
                <p className="text-neutral-700 mb-4">
                  Free pickup is available at any of our four locations during business hours. Please bring your order confirmation and a valid ID when picking up. Custom orders require 24-hour advance notice for pickup scheduling.
                </p>

                <h3 className="text-xl font-semibold mt-6 mb-3">5. Shipping (Nationwide)</h3>
                <p className="text-neutral-700 mb-4">
                  Select products can be shipped nationwide via overnight express shipping. Shipping costs are calculated based on weight and destination. Orders must be placed at least 3 business days before the desired delivery date. We are not responsible for delays caused by shipping carriers.
                </p>

                <h3 className="text-xl font-semibold mt-6 mb-3">6. Delivery Instructions</h3>
                <p className="text-neutral-700 mb-4">
                  Please ensure someone is available to receive the order at the delivery address. For contactless delivery, please specify instructions during checkout. If no one is available and we cannot leave the order safely, a redelivery fee of $15 will apply.
                </p>

                <h3 className="text-xl font-semibold mt-6 mb-3">7. Weather and Force Majeure</h3>
                <p className="text-neutral-700 mb-4">
                  In case of severe weather or other unforeseen circumstances, deliveries may be delayed or rescheduled. We will contact you as soon as possible to arrange an alternative delivery time. No additional fees will be charged for weather-related delays.
                </p>
              </div>
            )}

            {activeTab === 'refund' && (
              <div>
                <h2 className="text-2xl font-bold mb-4">Refund & Cancellation Policy</h2>
                <p className="text-neutral-600 mb-4">
                  <em>Last updated: April 20, 2026</em>
                </p>

                <h3 className="text-xl font-semibold mt-6 mb-3">1. Cancellation Policy</h3>
                <p className="text-neutral-700 mb-4">
                  <strong>Ready-made cakes (standard products):</strong>
                </p>
                <ul className="list-disc pl-6 text-neutral-700 mb-4 space-y-2">
                  <li>Cancellations more than 24 hours before scheduled delivery/pickup: Full refund</li>
                  <li>Cancellations within 12-24 hours: 50% refund</li>
                  <li>Cancellations less than 12 hours: No refund (cake can be picked up)</li>
                </ul>

                <p className="text-neutral-700 mb-4">
                  <strong>Custom cakes:</strong>
                </p>
                <ul className="list-disc pl-6 text-neutral-700 mb-4 space-y-2">
                  <li>Cancellations 7+ days before delivery: Full refund minus 50% deposit</li>
                  <li>Cancellations 3-6 days before delivery: 50% refund</li>
                  <li>Cancellations less than 72 hours: No refund</li>
                </ul>

                <h3 className="text-xl font-semibold mt-6 mb-3">2. Refund Eligibility</h3>
                <p className="text-neutral-700 mb-4">
                  We stand behind the quality of our products. You may be eligible for a full or partial refund if:
                </p>
                <ul className="list-disc pl-6 text-neutral-700 mb-4 space-y-2">
                  <li>The cake was damaged during delivery (with photo evidence required within 2 hours of delivery)</li>
                  <li>The wrong product was delivered</li>
                  <li>The cake does not meet the specifications of your custom order</li>
                  <li>There is a quality issue with the product (freshness, taste, etc.)</li>
                </ul>

                <h3 className="text-xl font-semibold mt-6 mb-3">3. Refund Process</h3>
                <p className="text-neutral-700 mb-4">
                  To request a refund, please contact us within 24 hours of delivery or pickup with your order number and a detailed description (and photos if applicable) of the issue. Refunds will be processed to the original payment method within 5-7 business days after approval.
                </p>

                <h3 className="text-xl font-semibold mt-6 mb-3">4. Non-Refundable Items</h3>
                <ul className="list-disc pl-6 text-neutral-700 mb-4 space-y-2">
                  <li>Products consumed in full or partially (unless quality issue reported immediately)</li>
                  <li>Special orders placed for specific events that were fulfilled correctly</li>
                  <li>Flavor preferences or subjective taste concerns</li>
                  <li>Delivery fees (unless we failed to deliver)</li>
                </ul>

                <h3 className="text-xl font-semibold mt-6 mb-3">5. Modifications to Orders</h3>
                <p className="text-neutral-700 mb-4">
                  For custom orders, modifications can be made up to 5 business days before the delivery date at no additional charge (subject to availability). Changes requested within 5 days may incur additional fees depending on the nature of the modification.
                </p>

                <h3 className="text-xl font-semibold mt-6 mb-3">6. Store Credit</h3>
                <p className="text-neutral-700 mb-4">
                  In some cases, we may offer store credit as an alternative to a refund. Store credit never expires and can be used for any future purchase at CakeAnatomy.
                </p>

                <h3 className="text-xl font-semibold mt-6 mb-3">7. Contact for Issues</h3>
                <p className="text-neutral-700 mb-4">
                  For any concerns about your order, please contact us immediately at hello@cakeanatomy.com or call +1 (555) 123-4567. We are committed to resolving all issues promptly and fairly.
                </p>
              </div>
            )}

            {activeTab === 'privacy' && (
              <div>
                <h2 className="text-2xl font-bold mb-4">Privacy Policy</h2>
                <p className="text-neutral-600 mb-4">
                  <em>Last updated: April 20, 2026</em>
                </p>

                <h3 className="text-xl font-semibold mt-6 mb-3">1. Information We Collect</h3>
                <p className="text-neutral-700 mb-4">
                  We collect information that you provide directly to us, including:
                </p>
                <ul className="list-disc pl-6 text-neutral-700 mb-4 space-y-2">
                  <li>Name, email address, phone number, and delivery address</li>
                  <li>Payment information (processed securely through third-party providers)</li>
                  <li>Order history and preferences</li>
                  <li>Communications with our customer service team</li>
                  <li>Photos or design ideas you share for custom orders</li>
                </ul>

                <h3 className="text-xl font-semibold mt-6 mb-3">2. How We Use Your Information</h3>
                <p className="text-neutral-700 mb-4">
                  We use the information we collect to:
                </p>
                <ul className="list-disc pl-6 text-neutral-700 mb-4 space-y-2">
                  <li>Process and fulfill your orders</li>
                  <li>Communicate with you about your orders and our services</li>
                  <li>Send you marketing communications (with your consent)</li>
                  <li>Improve our products and services</li>
                  <li>Detect and prevent fraud or security issues</li>
                  <li>Comply with legal obligations</li>
                </ul>

                <h3 className="text-xl font-semibold mt-6 mb-3">3. Information Sharing</h3>
                <p className="text-neutral-700 mb-4">
                  We do not sell your personal information. We may share your information with:
                </p>
                <ul className="list-disc pl-6 text-neutral-700 mb-4 space-y-2">
                  <li>Delivery service providers (only delivery details necessary)</li>
                  <li>Payment processors for secure transaction processing</li>
                  <li>Service providers who help us operate our business</li>
                  <li>Law enforcement when required by law</li>
                </ul>

                <h3 className="text-xl font-semibold mt-6 mb-3">4. Cookies and Tracking</h3>
                <p className="text-neutral-700 mb-4">
                  We use cookies and similar tracking technologies to enhance your experience on our website, analyze site traffic, and understand user behavior. You can control cookie settings through your browser preferences.
                </p>

                <h3 className="text-xl font-semibold mt-6 mb-3">5. Data Security</h3>
                <p className="text-neutral-700 mb-4">
                  We implement appropriate technical and organizational measures to protect your personal information. However, no method of transmission over the Internet is 100% secure, and we cannot guarantee absolute security.
                </p>

                <h3 className="text-xl font-semibold mt-6 mb-3">6. Your Rights</h3>
                <p className="text-neutral-700 mb-4">
                  You have the right to:
                </p>
                <ul className="list-disc pl-6 text-neutral-700 mb-4 space-y-2">
                  <li>Access and update your personal information</li>
                  <li>Request deletion of your data</li>
                  <li>Opt out of marketing communications</li>
                  <li>Object to certain data processing activities</li>
                  <li>Request a copy of your data</li>
                </ul>

                <h3 className="text-xl font-semibold mt-6 mb-3">7. Children's Privacy</h3>
                <p className="text-neutral-700 mb-4">
                  Our services are not directed to children under 13. We do not knowingly collect personal information from children under 13. If we learn we have collected such information, we will delete it promptly.
                </p>

                <h3 className="text-xl font-semibold mt-6 mb-3">8. Changes to Privacy Policy</h3>
                <p className="text-neutral-700 mb-4">
                  We may update this Privacy Policy from time to time. We will notify you of any material changes by posting the new policy on this page and updating the "Last updated" date.
                </p>

                <h3 className="text-xl font-semibold mt-6 mb-3">9. Contact Us</h3>
                <p className="text-neutral-700 mb-4">
                  For any questions about this Privacy Policy or our data practices, please contact us at:
                </p>
                <p className="text-neutral-700">
                  Email: privacy@cakeanatomy.com<br />
                  Phone: +1 (555) 123-4567<br />
                  Address: 123 Baker Street, New York, NY 10001
                </p>
              </div>
            )}
          </Card.Body>
        </Card>
      </div>
    </Layout>
  );
}

export default function PoliciesPage() {
  return (
    <Suspense fallback={
      <Layout>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">Loading...</div>
        </div>
      </Layout>
    }>
      <PoliciesContent />
    </Suspense>
  );
}
