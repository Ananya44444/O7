'use client';

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function AboutPage() {
  const [activeSection, setActiveSection] = useState('story');

  const timelineEvents = [
    {
      year: '2020',
      title: 'Company Founded',
      description: 'MasterSolis was established with a vision to revolutionize career development and recruitment solutions.',
      icon: '🚀'
    },
    {
      year: '2021',
      title: 'First Major Client',
      description: 'Secured partnership with leading tech companies to provide comprehensive recruitment services.',
      icon: '🤝'
    },
    {
      year: '2022',
      title: 'AI Integration',
      description: 'Launched AI-powered resume optimization and job matching algorithms.',
      icon: '🤖'
    },
    {
      year: '2023',
      title: 'Global Expansion',
      description: 'Extended services to multiple countries and established international partnerships.',
      icon: '🌍'
    },
    {
      year: '2024',
      title: 'Innovation Awards',
      description: 'Recognized as "Best Career Development Platform" by industry leaders.',
      icon: '🏆'
    },
    {
      year: '2025',
      title: 'Future Vision',
      description: 'Continuing to shape the future of work with cutting-edge technology and personalized solutions.',
      icon: '🔮'
    }
  ];

  const teamMembers = [
    {
      name: 'Sarah Johnson',
      role: 'Chief Executive Officer',
      bio: 'Visionary leader with 15+ years in HR technology and career development.',
      image: '/team/ceo.jpg',
      linkedin: '#'
    },
    {
      name: 'Michael Chen',
      role: 'Chief Technology Officer',
      bio: 'Tech innovator specializing in AI and machine learning applications.',
      image: '/team/cto.jpg',
      linkedin: '#'
    },
    {
      name: 'Emily Rodriguez',
      role: 'Head of Talent Acquisition',
      bio: 'Expert recruiter with deep understanding of modern hiring practices.',
      image: '/team/head-talent.jpg',
      linkedin: '#'
    },
    {
      name: 'David Kim',
      role: 'Lead Product Designer',
      bio: 'UX/UI specialist focused on creating intuitive career development tools.',
      image: '/team/designer.jpg',
      linkedin: '#'
    }
  ];

  const values = [
    {
      title: 'Excellence',
      description: 'We strive for excellence in everything we do, from our technology to our customer service.',
      icon: '⭐'
    },
    {
      title: 'Innovation',
      description: 'We continuously innovate to stay ahead of industry trends and provide cutting-edge solutions.',
      icon: '💡'
    },
    {
      title: 'Integrity',
      description: 'We operate with transparency, honesty, and ethical business practices in all our interactions.',
      icon: '🛡️'
    },
    {
      title: 'Collaboration',
      description: 'We believe in the power of teamwork and building strong partnerships with our clients.',
      icon: '🤝'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-linear-to-r from-blue-600 to-purple-700 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">About MasterSolis</h1>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            We're revolutionizing the way people approach their careers and how companies find the best talent. 
            Our mission is to bridge the gap between ambitious professionals and forward-thinking organizations.
          </p>
          <div className="flex justify-center space-x-4">
            <Button 
              variant="outline" 
              className="bg-white text-blue-600 hover:bg-gray-100"
              onClick={() => setActiveSection('story')}
            >
              Our Story
            </Button>
            <Button 
              variant="outline" 
              className="bg-white text-blue-600 hover:bg-gray-100"
              onClick={() => setActiveSection('team')}
            >
              Meet the Team
            </Button>
          </div>
        </div>
      </section>

      {/* Navigation Tabs */}
      <section className="bg-white shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex justify-center space-x-8 py-4">
            {[
              { id: 'story', label: 'Our Story' },
              { id: 'mission', label: 'Mission & Vision' },
              { id: 'values', label: 'Our Values' },
              { id: 'timeline', label: 'Timeline' },
              { id: 'team', label: 'Our Team' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveSection(tab.id)}
                className={`py-2 px-4 font-medium transition-colors ${
                  activeSection === tab.id
                    ? 'text-blue-600 border-b-2 border-blue-600'
                    : 'text-gray-600 hover:text-blue-600'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Content Sections */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {activeSection === 'story' && (
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12">Our Story</h2>
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <h3 className="text-2xl font-semibold mb-6">From Vision to Reality</h3>
                  <p className="text-gray-600 mb-6">
                    MasterSolis began with a simple observation: the traditional job search and recruitment process 
                    was broken. Too many talented individuals struggled to find opportunities that matched their 
                    skills, while companies spent months searching for the right candidates.
                  </p>
                  <p className="text-gray-600 mb-6">
                    Founded in 2020, we set out to create a platform that would leverage technology to make 
                    career development more personalized, efficient, and successful for everyone involved.
                  </p>
                  <p className="text-gray-600">
                    Today, we've helped thousands of professionals advance their careers and enabled hundreds 
                    of companies to build exceptional teams through our innovative approach to talent acquisition 
                    and career development.
                  </p>
                </div>
                <div className="bg-linear-to-br from-blue-50 to-purple-50 p-8 rounded-lg">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-blue-600 mb-2">50,000+</div>
                    <div className="text-gray-600 mb-6">Careers Transformed</div>
                    
                    <div className="text-4xl font-bold text-purple-600 mb-2">1,200+</div>
                    <div className="text-gray-600 mb-6">Partner Companies</div>
                    
                    <div className="text-4xl font-bold text-green-600 mb-2">98%</div>
                    <div className="text-gray-600">Client Satisfaction</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeSection === 'mission' && (
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-12">Mission & Vision</h2>
              <div className="grid md:grid-cols-2 gap-12">
                <Card className="p-8">
                  <h3 className="text-2xl font-semibold mb-6 text-blue-600">Our Mission</h3>
                  <p className="text-gray-600 leading-relaxed">
                    To empower individuals to achieve their career aspirations while helping organizations 
                    build exceptional teams through innovative technology, personalized guidance, and 
                    data-driven insights that create meaningful connections in the professional world.
                  </p>
                </Card>
                <Card className="p-8">
                  <h3 className="text-2xl font-semibold mb-6 text-purple-600">Our Vision</h3>
                  <p className="text-gray-600 leading-relaxed">
                    To create a world where every professional can reach their full potential and every 
                    organization can access the talent they need to thrive, powered by intelligent 
                    technology that makes career growth and talent acquisition seamless and successful.
                  </p>
                </Card>
              </div>
            </div>
          )}

          {activeSection === 'values' && (
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12">Our Values</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {values.map((value, index) => (
                  <Card key={index} className="p-6 text-center hover:shadow-lg transition-shadow">
                    <div className="text-4xl mb-4">{value.icon}</div>
                    <h3 className="text-xl font-semibold mb-4">{value.title}</h3>
                    <p className="text-gray-600">{value.description}</p>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {activeSection === 'timeline' && (
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12">Our Journey</h2>
              <div className="relative">
                <div className="absolute left-1/2 transform -translate-x-px h-full w-0.5 bg-blue-200"></div>
                {timelineEvents.map((event, index) => (
                  <div key={index} className={`relative flex ${index % 2 === 0 ? 'justify-start' : 'justify-end'} mb-8`}>
                    <div className={`w-5/12 ${index % 2 === 0 ? 'pr-8' : 'pl-8'}`}>
                      <Card className="p-6">
                        <div className="flex items-center mb-3">
                          <span className="text-2xl mr-3">{event.icon}</span>
                          <div className="text-2xl font-bold text-blue-600">{event.year}</div>
                        </div>
                        <h3 className="text-xl font-semibold mb-3">{event.title}</h3>
                        <p className="text-gray-600">{event.description}</p>
                      </Card>
                    </div>
                    <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-blue-600 rounded-full top-6"></div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeSection === 'team' && (
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12">Meet Our Team</h2>
              <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
                Our diverse team of experts brings together decades of experience in technology, 
                recruitment, and career development to deliver exceptional results for our clients.
              </p>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {teamMembers.map((member, index) => (
                  <Card key={index} className="p-6 text-center hover:shadow-lg transition-shadow">
                    <div className="w-24 h-24 bg-linear-to-br from-blue-100 to-purple-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                      <span className="text-2xl font-bold text-blue-600">
                        {member.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{member.name}</h3>
                    <p className="text-blue-600 font-medium mb-3">{member.role}</p>
                    <p className="text-gray-600 text-sm mb-4">{member.bio}</p>
                    <Button variant="outline" size="sm">
                      Connect
                    </Button>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-linear-to-r from-blue-600 to-purple-700 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Transform Your Career?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of professionals who have already accelerated their careers with MasterSolis.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-white text-blue-600 hover:bg-gray-100">
              Get Started Today
            </Button>
            <Button variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
              Learn More
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}