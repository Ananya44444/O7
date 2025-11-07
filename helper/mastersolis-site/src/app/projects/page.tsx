'use client';

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface Project {
  _id: string;
  title: string;
  description: string;
  summary: string;
  technologies: string[];
  category: string;
  status: string;
  startDate: string;
  endDate?: string;
  clientName?: string;
  projectUrl?: string;
  githubUrl?: string;
  images: string[];
  isPublic: boolean;
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');

  const mockProjects: Project[] = [
    {
      _id: '1',
      title: 'AI-Powered Resume Builder',
      description: 'Intelligent resume creation platform with ATS optimization and real-time feedback.',
      summary: 'A comprehensive resume building platform that uses AI to optimize content for ATS systems.',
      technologies: ['Next.js', 'TypeScript', 'OpenAI API', 'TailwindCSS', 'MongoDB'],
      category: 'web-app',
      status: 'completed',
      startDate: '2024-01-15',
      endDate: '2024-03-20',
      clientName: 'MasterSolis Internal',
      projectUrl: 'https://resume.mastersolis.com',
      images: [],
      isPublic: true
    },
    {
      _id: '2',
      title: 'Corporate Talent Dashboard',
      description: 'Enterprise-grade recruitment management system with advanced analytics.',
      summary: 'Complete recruitment workflow management with candidate tracking and analytics.',
      technologies: ['React', 'Node.js', 'PostgreSQL', 'Docker', 'AWS'],
      category: 'enterprise',
      status: 'completed',
      startDate: '2023-08-01',
      endDate: '2023-12-15',
      clientName: 'TechCorp Global',
      images: [],
      isPublic: true
    },
    {
      _id: '3',
      title: 'Career Guidance Mobile App',
      description: 'Mobile application for career counseling and job matching on-the-go.',
      summary: 'Native mobile app connecting job seekers with career counselors and opportunities.',
      technologies: ['React Native', 'Firebase', 'Redux', 'Expo', 'Socket.io'],
      category: 'mobile-app',
      status: 'in-progress',
      startDate: '2024-09-01',
      clientName: 'CareerPath Inc',
      images: [],
      isPublic: true
    },
    {
      _id: '4',
      title: 'Blockchain Certification Platform',
      description: 'Decentralized platform for verifiable professional certifications and achievements.',
      summary: 'Blockchain-based system for issuing and verifying professional credentials.',
      technologies: ['Ethereum', 'Solidity', 'Web3.js', 'IPFS', 'React'],
      category: 'blockchain',
      status: 'completed',
      startDate: '2023-11-01',
      endDate: '2024-02-28',
      clientName: 'CertifyChain',
      images: [],
      isPublic: true
    },
    {
      _id: '5',
      title: 'Interview Preparation Platform',
      description: 'Interactive platform for mock interviews with AI feedback and coaching.',
      summary: 'Comprehensive interview preparation with AI-powered feedback and improvement suggestions.',
      technologies: ['Vue.js', 'Python', 'FastAPI', 'WebRTC', 'TensorFlow'],
      category: 'web-app',
      status: 'completed',
      startDate: '2024-04-01',
      endDate: '2024-07-15',
      clientName: 'InterviewAce',
      images: [],
      isPublic: true
    },
    {
      _id: '6',
      title: 'HR Analytics Dashboard',
      description: 'Advanced analytics platform for HR teams to optimize recruitment strategies.',
      summary: 'Data-driven insights platform for improving hiring efficiency and candidate experience.',
      technologies: ['Angular', 'Python', 'Django', 'D3.js', 'Redis'],
      category: 'analytics',
      status: 'in-progress',
      startDate: '2024-10-01',
      clientName: 'HR Insights Co',
      images: [],
      isPublic: true
    }
  ];

  const categories = [
    { id: 'all', name: 'All Projects', icon: '🎯' },
    { id: 'web-app', name: 'Web Applications', icon: '🌐' },
    { id: 'mobile-app', name: 'Mobile Apps', icon: '📱' },
    { id: 'enterprise', name: 'Enterprise Solutions', icon: '🏢' },
    { id: 'blockchain', name: 'Blockchain', icon: '⛓️' },
    { id: 'analytics', name: 'Analytics & BI', icon: '📊' }
  ];

  const statusColors = {
    'completed': 'bg-green-100 text-green-600',
    'in-progress': 'bg-blue-100 text-blue-600',
    'planning': 'bg-yellow-100 text-yellow-600',
    'on-hold': 'bg-gray-100 text-gray-600'
  };

  useEffect(() => {
    setTimeout(() => {
      setProjects(mockProjects);
      setLoading(false);
    }, 1000);
  }, []);

  const filteredProjects = selectedCategory === 'all' 
    ? projects 
    : projects.filter(project => project.category === selectedCategory);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading projects...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-linear-to-r from-blue-600 to-purple-700 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">Our Projects</h1>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Explore our portfolio of successful projects spanning web applications, mobile apps, 
            enterprise solutions, and cutting-edge technology implementations.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold">50+</div>
              <div className="text-sm opacity-90">Projects Completed</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold">25+</div>
              <div className="text-sm opacity-90">Happy Clients</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold">15+</div>
              <div className="text-sm opacity-90">Technologies</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold">5+</div>
              <div className="text-sm opacity-90">Years Experience</div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Filter */}
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

      {/* Projects Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <Card key={project._id} className="overflow-hidden hover:shadow-xl transition-shadow">
                {/* Project Image Placeholder */}
                <div className="h-48 bg-linear-to-br from-blue-100 to-purple-100 flex items-center justify-center">
                  <span className="text-4xl">
                    {categories.find(cat => cat.id === project.category)?.icon || '🎯'}
                  </span>
                </div>
                
                <div className="p-6">
                  {/* Status and Date */}
                  <div className="flex items-center justify-between mb-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      statusColors[project.status as keyof typeof statusColors]
                    }`}>
                      {project.status.charAt(0).toUpperCase() + project.status.slice(1).replace('-', ' ')}
                    </span>
                    <span className="text-sm text-gray-500">
                      {formatDate(project.startDate)}
                      {project.endDate && ` - ${formatDate(project.endDate)}`}
                    </span>
                  </div>

                  {/* Project Info */}
                  <h3 className="text-xl font-semibold mb-3">{project.title}</h3>
                  <p className="text-gray-600 mb-4 text-sm line-clamp-3">{project.summary}</p>

                  {/* Client */}
                  {project.clientName && (
                    <p className="text-sm text-blue-600 mb-4">Client: {project.clientName}</p>
                  )}

                  {/* Technologies */}
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.slice(0, 3).map((tech, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.technologies.length > 3 && (
                        <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                          +{project.technologies.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3">
                    <Button className="flex-1" size="sm">
                      View Details
                    </Button>
                    {project.projectUrl && (
                      <Button variant="outline" size="sm">
                        Live Demo
                      </Button>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {filteredProjects.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No projects found in this category.</p>
            </div>
          )}
        </div>
      </section>

      {/* Technologies Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Technologies We Use</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8">
            {[
              { name: 'React', icon: '⚛️' },
              { name: 'Next.js', icon: '🔄' },
              { name: 'Node.js', icon: '💚' },
              { name: 'TypeScript', icon: '📘' },
              { name: 'Python', icon: '🐍' },
              { name: 'MongoDB', icon: '🍃' },
              { name: 'PostgreSQL', icon: '🐘' },
              { name: 'AWS', icon: '☁️' },
              { name: 'Docker', icon: '🐳' },
              { name: 'Blockchain', icon: '⛓️' },
              { name: 'AI/ML', icon: '🤖' },
              { name: 'Mobile', icon: '📱' }
            ].map((tech, index) => (
              <Card key={index} className="p-4 text-center hover:shadow-md transition-shadow">
                <div className="text-2xl mb-2">{tech.icon}</div>
                <div className="text-sm font-medium">{tech.name}</div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-linear-to-r from-blue-600 to-purple-700 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Have a Project in Mind?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Let's discuss how we can bring your ideas to life with our expertise and proven track record.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-white text-blue-600 hover:bg-gray-100">
              Start Your Project
            </Button>
            <Button variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
              View Case Studies
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}