'use client';

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function AboutPage() {
  const [activeSection, setActiveSection] = useState('story');

  const timelineEvents = [
    {
      year: '2020',
      title: 'Academy Founded',
      description: 'MasterSolis Academy was established with a vision to revolutionize tech education through practical, industry-focused learning.',
      icon: '🚀'
    },
    {
      year: '2021',
      title: 'Industry Partnerships',
      description: 'Secured partnerships with leading tech companies for direct job placements and curriculum validation.',
      icon: '🤝'
    },
    {
      year: '2022',
      title: 'AI-Powered Learning',
      description: 'Launched personalized learning paths and AI-powered skill assessment for optimized student outcomes.',
      icon: '🤖'
    },
    {
      year: '2023',
      title: 'Global Reach',
      description: 'Expanded online programs globally and established international corporate training partnerships.',
      icon: '🌍'
    },
    {
      year: '2024',
      title: 'Excellence Recognition',
      description: 'Recognized as "Best Tech Education Platform" with 95% job placement rate among graduates.',
      icon: '🏆'
    },
    {
      year: '2025',
      title: 'Future Learning',
      description: 'Pioneering next-generation education with VR/AR learning experiences and blockchain certification.',
      icon: '🔮'
    }
  ];

  const teamMembers = [
    {
      name: 'Ananya',
      role: 'Chief Executive Officer',
      bio: 'Visionary leader with 15+ years in HR technology and career development.',
      image: '/team/ceo.jpg',
      linkedin: '#'
    },
    {
      name: 'Twarita',
      role: 'Chief Technology Officer',
      bio: 'Tech innovator specializing in AI and machine learning applications.',
      image: '/team/cto.jpg',
      linkedin: '#'
    },
    {
      name: 'Wamika',
      role: 'Head of Talent Acquisition',
      bio: 'Expert recruiter with deep understanding of modern hiring practices.',
      image: '/team/head-talent.jpg',
      linkedin: '#'
    },
    {
      name: 'Tanmay',
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
    <div className="min-h-screen academy-bg relative">
      <div className="academy-bg-pattern"></div>
      
      {/* Hero Section */}
      <section className="relative z-10 py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="flex justify-center mb-6">
            <div className="academy-gradient p-4 rounded-2xl shadow-xl">
              <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
              </svg>
            </div>
          </div>
          <h1 className="text-4xl font-bold academy-text-gradient mb-6">About MasterSolis Academy</h1>
          <p className="text-lg academy-text-muted mb-8 max-w-3xl mx-auto leading-relaxed">
            We're revolutionizing tech education and career transformation through innovative learning experiences. 
            Our mission is to bridge the gap between ambitious learners and cutting-edge technology careers.
          </p>
          <div className="flex justify-center space-x-4">
            <Button 
              variant="outline" 
              className="academy-btn-primary"
              onClick={() => setActiveSection('story')}
            >
              Our Journey
            </Button>
            <Button 
              variant="outline" 
              className="academy-btn-secondary"
              onClick={() => setActiveSection('team')}
            >
              Meet the Team
            </Button>
          </div>
        </div>
      </section>

      {/* Navigation Tabs */}
      <section className="relative z-10 academy-glass-card mx-4 mb-8 rounded-2xl">
        <div className="container mx-auto px-4">
          <div className="flex justify-center space-x-6 py-6 overflow-x-auto">
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
                className={`py-3 px-6 font-medium transition-all duration-300 rounded-lg whitespace-nowrap ${
                  activeSection === tab.id
                    ? 'academy-gradient text-white shadow-lg'
                    : 'academy-text-muted hover:text-white hover:bg-academy-primary/20'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Content Sections */}
      <section className="py-16 relative z-10">
        <div className="container mx-auto px-4">
          {activeSection === 'story' && (
            <div className="max-w-5xl mx-auto">
              <h2 className="text-3xl font-bold text-center academy-text-gradient mb-12">Our Story</h2>
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div className="academy-glass-card p-8 rounded-3xl">
                  <h3 className="text-2xl font-bold text-white mb-6">From Vision to Reality</h3>
                  <p className="academy-text-muted mb-6 leading-relaxed">
                    MasterSolis Academy began with a simple observation: traditional tech education was outdated. 
                    Too many talented individuals struggled to learn cutting-edge skills, while companies desperately 
                    needed qualified developers, data scientists, and digital marketers.
                  </p>
                  <p className="academy-text-muted mb-6 leading-relaxed">
                    Founded in 2020, we set out to create an academy that would leverage modern teaching methods to make 
                    tech education more practical, engaging, and career-focused for everyone involved.
                  </p>
                  <p className="academy-text-muted leading-relaxed">
                    Today, we've helped thousands of students transform their careers and enabled hundreds 
                    of companies to find exceptional talent through our innovative approach to tech education 
                    and career development.
                  </p>
                </div>
                <div className="academy-glass-card p-8 rounded-3xl">
                  <div className="text-center space-y-6">
                    <div>
                      <div className="text-3xl font-bold academy-gradient-text mb-2">15,000+</div>
                      <div className="academy-text-muted">Students Graduated</div>
                    </div>
                    
                    <div>
                      <div className="text-3xl font-bold academy-gradient-text mb-2">500+</div>
                      <div className="academy-text-muted">Hiring Partners</div>
                    </div>
                    
                    <div>
                      <div className="text-3xl font-bold academy-gradient-text mb-2">95%</div>
                      <div className="academy-text-muted">Job Placement Rate</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeSection === 'mission' && (
            <div className="max-w-5xl mx-auto text-center">
              <h2 className="text-3xl font-bold academy-text-gradient mb-12">Mission & Vision</h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="academy-glass-card p-8 rounded-3xl">
                  <div className="academy-gradient p-4 rounded-2xl w-fit mx-auto mb-6">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold mb-6 text-white">Our Mission</h3>
                  <p className="academy-text-muted leading-relaxed">
                    To empower individuals to master cutting-edge technology skills and achieve their career aspirations 
                    through world-class education, mentorship, and practical experience that creates meaningful 
                    connections in the tech industry.
                  </p>
                </div>
                <div className="academy-glass-card p-8 rounded-3xl">
                  <div className="academy-gradient p-4 rounded-2xl w-fit mx-auto mb-6">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold mb-6 text-white">Our Vision</h3>
                  <p className="academy-text-muted leading-relaxed">
                    To create a world where every learner can reach their full potential in technology careers 
                    through innovative education that makes advanced skill development accessible, engaging, 
                    and successful for all backgrounds.
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeSection === 'values' && (
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-center academy-text-gradient mb-12">Our Values</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {values.map((value, index) => (
                  <div key={index} className="academy-glass-card p-6 text-center hover:scale-105 transition-all duration-300 rounded-3xl">
                    <div className="text-4xl mb-4">{value.icon}</div>
                    <h3 className="text-xl font-bold mb-4 text-white">{value.title}</h3>
                    <p className="academy-text-muted leading-relaxed">{value.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeSection === 'timeline' && (
            <div className="max-w-5xl mx-auto">
              <h2 className="text-3xl font-bold text-center academy-text-gradient mb-12">Our Journey</h2>
              <div className="relative">
                <div className="absolute left-1/2 transform -translate-x-px h-full w-0.5 academy-gradient opacity-60"></div>
                {timelineEvents.map((event, index) => (
                  <div key={index} className={`relative flex ${index % 2 === 0 ? 'justify-start' : 'justify-end'} mb-8`}>
                    <div className={`w-5/12 ${index % 2 === 0 ? 'pr-8' : 'pl-8'}`}>
                      <div className="academy-glass-card p-6 rounded-3xl">
                        <div className="flex items-center mb-4">
                          <span className="text-2xl mr-3">{event.icon}</span>
                          <div className="text-xl font-bold academy-gradient-text">{event.year}</div>
                        </div>
                        <h3 className="text-lg font-bold mb-3 text-white">{event.title}</h3>
                        <p className="academy-text-muted leading-relaxed">{event.description}</p>
                      </div>
                    </div>
                    <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 academy-gradient rounded-full top-6 shadow-lg"></div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeSection === 'team' && (
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-center academy-text-gradient mb-12">Meet Our Team</h2>
              <p className="text-center academy-text-muted mb-12 max-w-3xl mx-auto leading-relaxed">
                Our diverse team of experts brings together decades of experience in technology, 
                education, and career development to deliver exceptional learning experiences for our students.
              </p>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {teamMembers.map((member, index) => (
                  <div key={index} className="academy-glass-card p-6 text-center hover:scale-105 transition-all duration-300 rounded-3xl">
                    <div className="w-20 h-20 academy-gradient rounded-full mx-auto mb-4 flex items-center justify-center shadow-xl">
                      <span className="text-xl font-bold text-white">
                        {member.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold mb-2 text-white">{member.name}</h3>
                    <p className="academy-gradient-text font-medium mb-3">{member.role}</p>
                    <p className="academy-text-muted text-sm leading-relaxed">{member.bio}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}