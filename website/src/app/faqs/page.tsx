'use client';

import { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Card } from '@/cui';

export default function FAQsPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: 'How far in advance should I order a custom cake?',
      answer: 'We recommend ordering custom cakes at least 2 weeks in advance, especially for weddings and large events. However, we can sometimes accommodate rush orders with a 3-5 day notice, depending on our current workload. Simple designs may be available with less notice.',
    },
    {
      question: 'Do you offer delivery?',
      answer: 'Yes! We offer delivery within a 25-mile radius of our bakery. Delivery fees vary based on distance and order size. We also offer pickup at our store if you prefer. For large or delicate cakes, we recommend our white-glove delivery service.',
    },
    {
      question: 'Can you accommodate dietary restrictions?',
      answer: 'Absolutely! We offer gluten-free, vegan, sugar-free, and nut-free options. Please inform us of any allergies or dietary requirements when placing your order, and we\'ll work with you to create a delicious cake that meets your needs.',
    },
    {
      question: 'What is your cancellation policy?',
      answer: 'Orders can be cancelled up to 48 hours before the scheduled pickup/delivery time for a full refund. Cancellations within 24-48 hours will receive a 50% refund. Unfortunately, we cannot offer refunds for cancellations made less than 24 hours before delivery.',
    },
    {
      question: 'How should I store my cake?',
      answer: 'Most of our cakes should be stored in the refrigerator and brought to room temperature 1-2 hours before serving for the best flavor and texture. Fondant cakes can be kept at room temperature. We\'ll provide specific storage instructions with your order.',
    },
    {
      question: 'Do you offer cake tastings?',
      answer: 'Yes! We offer tasting appointments for wedding and large event orders. Schedule a tasting session where you can sample up to 5 flavors and discuss your design ideas with our cake designers. Tastings are $50, which is credited toward your order.',
    },
    {
      question: 'What payment methods do you accept?',
      answer: 'We accept all major credit cards (Visa, MasterCard, American Express, Discover), debit cards, and cash. For custom and wedding cakes, we require a 50% deposit at the time of booking, with the remainder due 48 hours before delivery.',
    },
    {
      question: 'Can I see a preview of my custom cake before it\'s made?',
      answer: 'For complex custom orders, we provide digital sketches or inspiration boards based on your requirements. While we can\'t create an exact preview, our designers will work with you through the consultation process to ensure the final product matches your vision.',
    },
    {
      question: 'Do you offer classes or workshops?',
      answer: 'Yes! We offer both group workshops and private 1:1 classes covering various topics from basic cake decorating to advanced fondant techniques. Check our Classes page for current offerings and schedules.',
    },
    {
      question: 'What sizes do your cakes come in?',
      answer: 'We offer cakes in various sizes: Small (6", serves 8-10), Medium (8", serves 15-20), Large (10", serves 25-30), and Extra Large (12", serves 40-50). We also create multi-tiered cakes for larger events. Custom sizes are available upon request.',
    },
  ];

  const categories = [
    'All Questions',
    'Ordering',
    'Delivery',
    'Dietary',
    'Payments',
    'Custom Cakes',
  ];

  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Hero */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-display font-bold text-neutral-900 mb-6">
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-neutral-600">
            Find answers to common questions about our cakes, ordering process, and services.
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

        {/* FAQ Accordion */}
        <div className="space-y-4 mb-16">
          {faqs.map((faq, idx) => (
            <Card key={idx} className="overflow-hidden">
              <button
                onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                className="w-full text-left p-6 flex items-center justify-between hover:bg-neutral-50 transition-colors"
              >
                <span className="font-semibold text-neutral-900 pr-8">{faq.question}</span>
                <svg
                  className={`w-5 h-5 text-neutral-600 flex-shrink-0 transition-transform ${
                    openIndex === idx ? 'transform rotate-180' : ''
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {openIndex === idx && (
                <div className="px-6 pb-6">
                  <p className="text-neutral-600 leading-relaxed">{faq.answer}</p>
                </div>
              )}
            </Card>
          ))}
        </div>

        {/* Still Have Questions CTA */}
        <Card className="bg-gradient-to-r from-primary-600 to-secondary-600 text-white">
          <Card.Body className="text-center py-12">
            <h2 className="text-3xl font-bold mb-4">Still Have Questions?</h2>
            <p className="text-lg mb-6 opacity-90">
              Our team is here to help! Reach out and we'll get back to you within 24 hours.
            </p>
            <a
              href="/contact"
              className="inline-block px-8 py-3 bg-white text-primary-600 font-semibold rounded-lg hover:bg-neutral-50 transition-colors"
            >
              Contact Us
            </a>
          </Card.Body>
        </Card>
      </div>
    </Layout>
  );
}
