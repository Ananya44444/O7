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

  // Mock academy programs data
  const mockServices: Service[] = [
    {
      _id: '1',
      title: 'Full-Stack Development Bootcamp',
      description: 'Comprehensive 16-week program covering modern web development from frontend to backend.',
      content: 'Master React, Node.js, databases, and deploy production-ready applications.',
      category: 'development',
      price: 12999,
      duration: '16 weeks',
      features: ['React & Next.js', 'Node.js & Express', 'Database Design', 'Project Portfolio', 'Job Placement'],
      isActive: true,
      createdAt: '2024-01-01'
    },
    {
      _id: '2',
      title: 'Data Science & AI Program',
      description: 'Learn Python, machine learning, and AI to become a data science professional.',
      content: 'Hands-on projects with real datasets, machine learning algorithms, and AI applications.',
      category: 'data-science',
      price: 14999,
      duration: '20 weeks',
      features: ['Python & R', 'Machine Learning', 'Deep Learning', 'Data Visualization', 'Industry Projects'],
      isActive: true,
      createdAt: '2024-01-01'
    },
    {
      _id: '3',
      title: 'Digital Marketing Mastery',
      description: 'Complete digital marketing course covering SEO, social media, and paid advertising.',
      content: 'Learn to create effective marketing campaigns and grow businesses online.',
      category: 'marketing',
      price: 7999,
      duration: '12 weeks',
      features: ['SEO & SEM', 'Social Media Marketing', 'Analytics', 'Content Strategy', 'Campaign Management'],
      isActive: true,
      createdAt: '2024-01-01'
    },
    {
      _id: '4',
      title: 'UI/UX Design Professional',
      description: 'Master user experience design and create beautiful, functional digital products.',
      content: 'Design thinking, prototyping, user research, and portfolio development.',
      category: 'design',
      price: 9999,
      duration: '14 weeks',
      features: ['Design Systems', 'Figma/Sketch', 'User Research', 'Prototyping', 'Portfolio Building'],
      isActive: true,
      createdAt: '2024-01-01'
    },
    {
      _id: '5',
      title: 'DevOps & Cloud Engineering',
      description: 'Learn cloud platforms, containerization, and automation for modern DevOps practices.',
      content: 'AWS/Azure certification path with hands-on infrastructure management.',
      category: 'devops',
      price: 11999,
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
    { id: 'all', name: 'All Programs', icon: '🎯' },
    { id: 'development', name: 'Development', icon: '�' },
    { id: 'data', name: 'Data Science', icon: '�' },
    { id: 'marketing', name: 'Digital Marketing', icon: '📱' },
    { id: 'design', name: 'UI/UX Design', icon: '🎨' },
    { id: 'devops', name: 'DevOps', icon: '☁️' },
    { id: 'negotiation', name: 'Leadership', icon: '�' }
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
    <div className="min-h-screen academy-bg relative">
      <div className="academy-bg-pattern"></div>
      
      {/* Hero Section */}
      <section className="relative z-10 py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="flex justify-center mb-6">
            <div className="academy-gradient p-4 rounded-2xl shadow-xl">
              <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
          </div>
          <h1 className="text-4xl font-bold academy-text-gradient mb-6">Academy Programs</h1>
          <p className="text-lg academy-text-muted mb-8 max-w-3xl mx-auto leading-relaxed">
            Transform your career with our comprehensive tech education programs designed to provide 
            hands-on experience and direct pathways to high-paying technology careers.
          </p>
          <Button className="academy-btn-primary px-8 py-3">
            Start Your Journey
          </Button>
        </div>
      </section>

      {/* Program Categories */}
      <section className="py-12 relative z-10">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold academy-text-gradient text-center mb-8">Program Categories</h2>
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-medium transition-all ${
                  selectedCategory === category.id
                    ? 'academy-gradient text-white shadow-xl'
                    : 'academy-glass academy-text-muted hover:shadow-lg border academy-border'
                }`}
              >
                <span className="text-lg">{category.icon}</span>
                <span className="text-sm">{category.name}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Programs Grid */}
      <section className="py-16 relative z-10">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredServices.map((service) => (
              <div key={service._id} className="academy-glass p-6 hover:shadow-2xl transition-all duration-300 border academy-border rounded-xl">
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-lg font-bold academy-text-primary">{service.title}</h3>
                    <span className="text-xl font-bold academy-text-gradient">${service.price}</span>
                  </div>
                  <p className="academy-text-muted text-sm mb-4 leading-relaxed">{service.description}</p>
                  
                  <div className="flex items-center text-sm academy-text-muted mb-4 space-x-3">
                    <span className="flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {service.duration}
                    </span>
                    <span className="px-3 py-1 academy-glass text-xs rounded-full academy-text-primary border academy-border">
                      {categories.find(cat => cat.id === service.category)?.name || service.category}
                    </span>
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="font-semibold mb-3 academy-text-primary text-sm">Program Includes:</h4>
                  <ul className="space-y-2">
                    {service.features.map((feature, index) => (
                      <li key={index} className="flex items-start text-sm">
                        <span className="text-green-400 mr-2 mt-0.5">✓</span>
                        <span className="academy-text-muted">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex flex-col space-y-3">
                  <Button className="w-full academy-btn-primary text-sm">
                    Enroll Now
                  </Button>
                  <Button variant="outline" className="w-full academy-btn-secondary text-sm">
                    View Curriculum
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {filteredServices.length === 0 && (
            <div className="text-center py-12">
              <p className="academy-text-muted text-lg">No programs found in this category.</p>
            </div>
          )}
        </div>
      </section>

      {/* Learning Path Section */}
      <section className="py-16 relative z-10">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold academy-text-gradient text-center mb-12">Your Learning Journey</h2>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                step: 1,
                title: 'Application',
                description: 'Apply to your chosen program and complete our skills assessment.',
                icon: (
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                )
              },
              {
                step: 2,
                title: 'Foundation',
                description: 'Build core skills through hands-on projects and mentorship.',
                icon: (
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                )
              },
              {
                step: 3,
                title: 'Portfolio',
                description: 'Create real-world projects that showcase your new abilities.',
                icon: (
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                )
              },
              {
                step: 4,
                title: 'Career',
                description: 'Graduate job-ready with career support and industry connections.',
                icon: (
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                )
              }
            ].map((item, index) => (
              <div key={index} className="academy-glass p-6 text-center border academy-border rounded-xl">
                <div className="academy-gradient w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                  {item.icon}
                </div>
                <div className="text-lg font-bold academy-text-gradient mb-2">Step {item.step}</div>
                <h3 className="text-lg font-bold mb-3 academy-text-primary">{item.title}</h3>
                <p className="academy-text-muted text-sm leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 relative z-10">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold academy-text-gradient text-center mb-12">Frequently Asked Questions</h2>
          <div className="max-w-3xl mx-auto space-y-6">
            {[
              {
                question: 'How long are the bootcamp programs?',
                answer: 'Our programs range from 12-20 weeks depending on the track. Full-Stack Development is 16 weeks, Data Science is 18 weeks, and UI/UX Design is 14 weeks.'
              },
              {
                question: 'Do you offer job placement assistance?',
                answer: 'Yes! We provide comprehensive career support including resume review, interview prep, and direct connections to our hiring partner network.'
              },
              {
                question: 'What are the prerequisites for enrollment?',
                answer: 'Most programs require basic computer literacy and problem-solving skills. Some advanced programs may require foundational knowledge in programming or design.'
              },
              {
                question: 'Are there financing options available?',
                answer: 'Yes, we offer flexible payment plans, income share agreements (ISA), and partnerships with educational lending providers to make our programs accessible.'
              }
            ].map((faq, index) => (
              <div key={index} className="academy-glass p-6 border academy-border rounded-xl">
                <h3 className="text-lg font-bold mb-3 academy-text-primary">{faq.question}</h3>
                <p className="academy-text-muted leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

     
    </div>
  );
}