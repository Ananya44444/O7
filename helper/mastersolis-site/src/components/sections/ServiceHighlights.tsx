'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface Service {
  _id: string;
  title: string;
  slug: string;
  description: string;
  icon: string;
  features: string[];
}

const ServiceHighlights: React.FC = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  // Mock data for now - will be replaced with API call
  useEffect(() => {
    const mockServices: Service[] = [
      {
        _id: '1',
        title: 'Web Development',
        slug: 'web-development',
        description: 'Custom web applications built with cutting-edge technologies for maximum performance and user experience.',
        icon: '🌐',
        features: ['React & Next.js', 'TypeScript', 'Responsive Design', 'Performance Optimization']
      },
      {
        _id: '2',
        title: 'Mobile App Development',
        slug: 'mobile-app-development',
        description: 'Native and cross-platform mobile applications that engage users and drive business growth.',
        icon: '📱',
        features: ['iOS & Android', 'React Native', 'Flutter', 'API Integration']
      },
      {
        _id: '3',
        title: 'AI & Machine Learning',
        slug: 'ai-machine-learning',
        description: 'Intelligent solutions powered by artificial intelligence to automate and optimize your business processes.',
        icon: '🤖',
        features: ['Natural Language Processing', 'Computer Vision', 'Predictive Analytics', 'Automation']
      },
      {
        _id: '4',
        title: 'Cloud Solutions',
        slug: 'cloud-solutions',
        description: 'Scalable cloud infrastructure and services to support your growing business needs.',
        icon: '☁️',
        features: ['AWS & Azure', 'Microservices', 'DevOps', 'Scalability']
      }
    ];

    // Simulate API call
    setTimeout(() => {
      setServices(mockServices);
      setLoading(false);
    }, 500);
  }, []);

  if (loading) {
    return (
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Services</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, index) => (
              <div key={index} className="animate-pulse">
                <div className="bg-gray-200 h-64 rounded-lg"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Services</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We provide comprehensive technology solutions to help businesses thrive in the digital age.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {services.map((service) => (
            <Card key={service._id} className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader className="text-center">
                <div className="text-4xl mb-4">{service.icon}</div>
                <CardTitle className="text-xl">{service.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center mb-4">
                  {service.description}
                </CardDescription>
                <ul className="text-sm text-gray-600 space-y-1 mb-4">
                  {service.features.slice(0, 3).map((feature, index) => (
                    <li key={index} className="flex items-center">
                      <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                      {feature}
                    </li>
                  ))}
                </ul>
                <div className="text-center">
                  <Link href="/services">
                    <Button variant="outline" size="sm" className="w-full">
                      Learn More
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Link href="/services">
            <Button size="lg">
              View All Services
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ServiceHighlights;