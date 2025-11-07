'use client';

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface Service {
  _id: string;
  title: string;
  description: string;
  content: string;
  category: string;
  price: number;
  duration: string;
  features: string[];
  isActive: boolean;
  createdAt: string;
}

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Mock services data (replace with API call later)
  const mockServices: Service[] = [
    {
      _id: '1',
      title: 'Career Consultation',
      description: 'One-on-one career guidance and strategic planning sessions with industry experts.',
      content: 'Comprehensive career assessment, goal setting, and personalized action plan development.',
      category: 'consulting',
      price: 150,
      duration: '2 hours',
      features: ['Personalized Career Assessment', 'Industry Insights', 'Goal Setting', 'Action Plan'],
      isActive: true,
      createdAt: '2024-01-01'
    },
    {
      _id: '2',
      title: 'Resume Optimization',
      description: 'Professional resume writing and optimization for ATS systems and recruiters.',
      content: 'Expert resume review, keyword optimization, and format enhancement for maximum impact.',
      category: 'resume',
      price: 99,
      duration: '3-5 days',
      features: ['ATS Optimization', 'Keyword Enhancement', 'Professional Formatting', 'Cover Letter'],
      isActive: true,
      createdAt: '2024-01-01'
    },
    {
      _id: '3',
      title: 'Interview Coaching',
      description: 'Comprehensive interview preparation and practice sessions with feedback.',
      content: 'Mock interviews, behavioral question practice, and confidence building techniques.',
      category: 'coaching',
      price: 120,
      duration: '1.5 hours',
      features: ['Mock Interviews', 'Behavioral Questions', 'Confidence Building', 'Follow-up Support'],
      isActive: true,
      createdAt: '2024-01-01'
    },
    {
      _id: '4',
      title: 'LinkedIn Profile Optimization',
      description: 'Professional LinkedIn profile enhancement to increase visibility and connections.',
      content: 'Profile optimization, content strategy, and networking guidance for LinkedIn success.',
      category: 'social',
      price: 75,
      duration: '2-3 days',
      features: ['Profile Optimization', 'Headline Writing', 'Content Strategy', 'Network Building'],
      isActive: true,
      createdAt: '2024-01-01'
    },
    {
      _id: '5',
      title: 'Job Search Strategy',
      description: 'Comprehensive job search planning and execution strategy development.',
      content: 'Target company research, application strategy, and networking plan development.',
      category: 'strategy',
      price: 200,
      duration: '1 week',
      features: ['Market Analysis', 'Target Companies', 'Application Strategy', 'Networking Plan'],
      isActive: true,
      createdAt: '2024-01-01'
    },
    {
      _id: '6',
      title: 'Salary Negotiation',
      description: 'Expert guidance on salary negotiation tactics and compensation optimization.',
      content: 'Market research, negotiation strategies, and communication techniques for better offers.',
      category: 'negotiation',
      price: 180,
      duration: '1 hour',
      features: ['Market Research', 'Negotiation Tactics', 'Communication Scripts', 'Follow-up Support'],
      isActive: true,
      createdAt: '2024-01-01'
    }
  ];

  const categories = [
    { id: 'all', name: 'All Services', icon: '🎯' },
    { id: 'consulting', name: 'Career Consulting', icon: '💼' },
    { id: 'resume', name: 'Resume Services', icon: '📄' },
    { id: 'coaching', name: 'Interview Coaching', icon: '🎤' },
    { id: 'social', name: 'Social Media', icon: '🔗' },
    { id: 'strategy', name: 'Job Strategy', icon: '📈' },
    { id: 'negotiation', name: 'Negotiation', icon: '💰' }
  ];

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setServices(mockServices);
      setLoading(false);
    }, 1000);
  }, []);

  const filteredServices = selectedCategory === 'all' 
    ? services 
    : services.filter(service => service.category === selectedCategory);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading services...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-linear-to-r from-blue-600 to-purple-700 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">Our Services</h1>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Comprehensive career development services designed to accelerate your professional growth 
            and help you achieve your career goals with confidence.
          </p>
          <Button className="bg-white text-blue-600 hover:bg-gray-100">
            Schedule Free Consultation
          </Button>
        </div>
      </section>

      {/* Service Categories */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center space-x-2 px-6 py-3 rounded-full font-medium transition-all ${
                  selectedCategory === category.id
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <span>{category.icon}</span>
                <span>{category.name}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredServices.map((service) => (
              <Card key={service._id} className="p-6 hover:shadow-xl transition-shadow">
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl font-semibold">{service.title}</h3>
                    <span className="text-2xl font-bold text-blue-600">${service.price}</span>
                  </div>
                  <p className="text-gray-600 text-sm mb-4">{service.description}</p>
                  
                  <div className="flex items-center text-sm text-gray-500 mb-4">
                    <span className="mr-4">⏱️ {service.duration}</span>
                    <span className="px-2 py-1 bg-blue-100 text-blue-600 rounded-full text-xs">
                      {categories.find(cat => cat.id === service.category)?.name || service.category}
                    </span>
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="font-medium mb-3">What's Included:</h4>
                  <ul className="space-y-2">
                    {service.features.map((feature, index) => (
                      <li key={index} className="flex items-center text-sm">
                        <span className="text-green-500 mr-2">✓</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex flex-col space-y-3">
                  <Button className="w-full">
                    Get Started
                  </Button>
                  <Button variant="outline" className="w-full">
                    Learn More
                  </Button>
                </div>
              </Card>
            ))}
          </div>

          {filteredServices.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No services found in this category.</p>
            </div>
          )}
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                step: 1,
                title: 'Consultation',
                description: 'Schedule a free consultation to discuss your career goals and challenges.',
                icon: '📞'
              },
              {
                step: 2,
                title: 'Assessment',
                description: 'We analyze your current situation and identify areas for improvement.',
                icon: '📋'
              },
              {
                step: 3,
                title: 'Strategy',
                description: 'Develop a customized action plan tailored to your specific needs.',
                icon: '🎯'
              },
              {
                step: 4,
                title: 'Implementation',
                description: 'Execute the plan with our guidance and ongoing support.',
                icon: '🚀'
              }
            ].map((item, index) => (
              <Card key={index} className="p-6 text-center">
                <div className="text-4xl mb-4">{item.icon}</div>
                <div className="text-lg font-semibold text-blue-600 mb-2">Step {item.step}</div>
                <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
          <div className="max-w-3xl mx-auto space-y-6">
            {[
              {
                question: 'How long does the process typically take?',
                answer: 'The timeline varies depending on the service. Most consultations are completed within 1-2 weeks, while comprehensive career overhauls may take 4-6 weeks.'
              },
              {
                question: 'Do you offer money-back guarantees?',
                answer: 'Yes, we offer a 30-day satisfaction guarantee. If you\'re not completely satisfied with our service, we\'ll refund your investment.'
              },
              {
                question: 'Can I combine multiple services?',
                answer: 'Absolutely! We often recommend service packages for comprehensive career transformation. Contact us for custom pricing on combined services.'
              },
              {
                question: 'Do you work with all industries?',
                answer: 'Yes, our team has experience across all major industries including tech, healthcare, finance, marketing, and more.'
              }
            ].map((faq, index) => (
              <Card key={index} className="p-6">
                <h3 className="text-lg font-semibold mb-3">{faq.question}</h3>
                <p className="text-gray-600">{faq.answer}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-linear-to-r from-blue-600 to-purple-700 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Accelerate Your Career?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of professionals who have transformed their careers with our expert guidance.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-white text-blue-600 hover:bg-gray-100">
              Schedule Free Consultation
            </Button>
            <Button variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
              View Success Stories
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}