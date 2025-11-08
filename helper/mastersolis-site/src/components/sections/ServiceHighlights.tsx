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
        title: 'Full-Stack Development',
        slug: 'fullstack-development',
        description: 'Master modern web development from frontend to backend with hands-on projects and industry mentorship.',
        icon: '💻',
        features: ['React & Next.js Mastery', 'Node.js & Databases', 'Real-World Projects', 'Industry Mentorship']
      },
      {
        _id: '2',
        title: 'Data Science & AI',
        slug: 'data-science-ai',
        description: 'Learn machine learning, data analysis, and artificial intelligence with practical applications and certifications.',
        icon: '🤖',
        features: ['Python & R Programming', 'Machine Learning', 'Data Visualization', 'AI Applications']
      },
      {
        _id: '3',
        title: 'Digital Marketing',
        slug: 'digital-marketing',
        description: 'Build expertise in modern marketing strategies, social media, SEO, and content creation for digital success.',
        icon: '📈',
        features: ['SEO & Analytics', 'Social Media Strategy', 'Content Marketing', 'Campaign Management']
      },
      {
        _id: '4',
        title: 'Career Services',
        slug: 'career-services',
        description: 'Professional development programs including resume building, interview prep, and job placement assistance.',
        icon: '🎯',
        features: ['Resume Builder', 'Interview Coaching', 'Job Placement', 'Career Counseling']
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
      <section className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold academy-text-gradient mb-6">Our Academy Programs</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[...Array(4)].map((_, index) => (
              <div key={index} className="animate-pulse">
                <div className="academy-glass-card h-80 rounded-3xl"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-24 relative">
      {/* Background Pattern */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 text-6xl opacity-5 academy-float">📖</div>
        <div className="absolute top-40 right-20 text-5xl opacity-5 academy-float" style={{animationDelay: '2s'}}>💻</div>
        <div className="absolute bottom-32 left-20 text-4xl opacity-5 academy-float" style={{animationDelay: '4s'}}>🎨</div>
        <div className="absolute bottom-40 right-10 text-6xl opacity-5 academy-float" style={{animationDelay: '1s'}}>⚡</div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 academy-slide-in">
          <div className="inline-flex items-center px-6 py-3 rounded-full academy-glass mb-6">
            <span className="text-sm font-medium text-academy-text-secondary">🎯 Premium Learning Tracks</span>
          </div>
          <h2 className="text-5xl lg:text-6xl font-bold academy-text-gradient mb-6 academy-glow">
            Master the Future
          </h2>
          <p className="text-xl text-academy-text-secondary max-w-3xl mx-auto leading-relaxed">
            Comprehensive learning programs designed by industry experts to accelerate your career growth 
            in the most in-demand fields of technology.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {services.map((service, index) => (
            <div key={service._id} className="academy-slide-in" style={{animationDelay: `${index * 0.2}s`}}>
              <div className="academy-glass-card p-8 rounded-3xl academy-card-hover group cursor-pointer h-full">
                {/* Icon with Gradient Background */}
                <div className="relative mb-6">
                  <div className="w-20 h-20 academy-btn-primary rounded-2xl flex items-center justify-center text-3xl mb-4 group-hover:scale-110 transition-transform duration-300">
                    {service.icon}
                  </div>
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-linear-to-r from-yellow-400 to-orange-500 rounded-full animate-pulse"></div>
                </div>
                
                {/* Content */}
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold text-academy-text-primary group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-linear-to-r group-hover:from-blue-400 group-hover:to-purple-500 transition-all duration-300">
                    {service.title}
                  </h3>
                  
                  <p className="text-academy-text-secondary leading-relaxed">
                    {service.description}
                  </p>
                  
                  {/* Features */}
                  <ul className="space-y-3">
                    {service.features.slice(0, 3).map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-sm text-academy-text-secondary">
                        <div className="w-2 h-2 bg-linear-to-r from-blue-400 to-purple-500 rounded-full mr-3"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  
                  {/* CTA Button */}
                  <div className="pt-4">
                    <Link href="/services" className="block">
                      <Button className="w-full academy-btn-secondary group-hover:academy-btn-primary transition-all duration-300 rounded-2xl py-3 font-medium">
                        Explore Program
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center academy-slide-in">
          <div className="academy-glass-card p-8 rounded-3xl max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold academy-text-gradient mb-4">
              Ready to Start Your Journey?
            </h3>
            <p className="text-academy-text-secondary mb-6">
              Join thousands of students already mastering the skills that matter in today's digital world.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/services">
                <Button className="academy-btn-primary text-lg px-8 py-4 rounded-2xl font-bold shadow-lg hover:scale-105 transition-all duration-300">
                  🚀 View All Programs
                </Button>
              </Link>
              <Link href="/contact">
                <Button className="academy-btn-secondary text-lg px-8 py-4 rounded-2xl font-bold hover:scale-105 transition-all duration-300">
                  💬 Get Consultation
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceHighlights;