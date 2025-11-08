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
      title: 'E-Commerce Platform',
      description: 'Full-stack e-commerce application with payment integration and admin dashboard.',
      summary: 'Capstone project featuring React frontend, Node.js backend, Stripe payments, and inventory management.',
      technologies: ['React', 'Node.js', 'Express', 'MongoDB', 'Stripe API'],
      category: 'web-app',
      status: 'completed',
      startDate: '2024-07-15',
      endDate: '2024-09-20',
      clientName: 'Full-Stack Bootcamp Graduate',
      projectUrl: 'https://ecommerce-demo.academy.com',
      images: [],
      isPublic: true
    },
    {
      _id: '2',
      title: 'Data Analytics Dashboard',
      description: 'Interactive dashboard analyzing customer behavior and sales trends with ML predictions.',
      summary: 'Advanced analytics project using Python, Pandas, and machine learning for business insights.',
      technologies: ['Python', 'Pandas', 'Scikit-learn', 'Plotly', 'Streamlit'],
      category: 'data-science',
      status: 'completed',
      startDate: '2024-06-01',
      endDate: '2024-08-15',
      clientName: 'Data Science Program Graduate',
      images: [],
      isPublic: true
    },
    {
      _id: '3',
      title: 'Social Media Management App',
      description: 'Mobile application for scheduling and analyzing social media posts across platforms.',
      summary: 'Cross-platform mobile app with social media API integration and analytics features.',
      technologies: ['React Native', 'Firebase', 'Redux', 'Social APIs', 'Chart.js'],
      category: 'mobile-app',
      status: 'in-progress',
      startDate: '2024-09-01',
      clientName: 'Digital Marketing Student',
      images: [],
      isPublic: true
    },
    {
      _id: '4',
      title: 'Smart Home IoT System',
      description: 'IoT-based home automation system with web dashboard and mobile control.',
      summary: 'End-to-end IoT solution combining hardware sensors, cloud backend, and user interfaces.',
      technologies: ['Arduino', 'Raspberry Pi', 'AWS IoT', 'React', 'MQTT'],
      category: 'iot',
      status: 'completed',
      startDate: '2024-05-01',
      endDate: '2024-07-30',
      clientName: 'DevOps Program Graduate',
      images: [],
      isPublic: true
    },
    {
      _id: '5',
      title: 'Design System & Portfolio',
      description: 'Comprehensive design system with component library and personal portfolio website.',
      summary: 'Complete UI/UX project showcasing design thinking process and implementation skills.',
      technologies: ['Figma', 'React', 'Storybook', 'Styled Components', 'Framer Motion'],
      category: 'design',
      status: 'completed',
      startDate: '2024-08-01',
      endDate: '2024-10-15',
      clientName: 'UI/UX Design Graduate',
      images: [],
      isPublic: true
    },
    {
      _id: '6',
      title: 'Predictive Maintenance AI',
      description: 'Machine learning model predicting equipment failures using sensor data analysis.',
      summary: 'Industrial AI application combining time-series analysis and deep learning for maintenance optimization.',
      technologies: ['Python', 'TensorFlow', 'Keras', 'Time Series', 'Docker'],
      category: 'ai-ml',
      status: 'completed',
      startDate: '2024-09-01',
      endDate: '2024-11-20',
      clientName: 'AI/ML Specialization Student',
      images: [],
      isPublic: true
    }
  ];

  const categories = [
    { id: 'all', name: 'All Projects', icon: '🎯' },
    { id: 'web-app', name: 'Web Development', icon: '🌐' },
    { id: 'mobile-app', name: 'Mobile Apps', icon: '📱' },
    { id: 'data-science', name: 'Data Science', icon: '📊' },
    { id: 'design', name: 'UI/UX Design', icon: '�' },
    { id: 'ai-ml', name: 'AI & Machine Learning', icon: '🤖' },
    { id: 'iot', name: 'IoT & DevOps', icon: '⚡' }
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
      <div className="min-h-screen academy-bg flex items-center justify-center relative">
        <div className="academy-bg-pattern"></div>
        <div className="text-center relative z-10">
          <div className="academy-gradient w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
            <svg className="w-8 h-8 text-white animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </div>
          <p className="academy-text-muted">Loading student projects...</p>
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
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
          </div>
          <h1 className="text-4xl font-bold academy-text-gradient mb-6">Student Showcase</h1>
          <p className="text-lg academy-text-muted mb-8 max-w-3xl mx-auto leading-relaxed">
            Discover incredible projects built by our bootcamp graduates. These real-world applications 
            demonstrate the skills and creativity developed through our intensive programs.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-2xl mx-auto">
            <div className="text-center academy-glass p-4 rounded-xl border academy-border">
              <div className="text-2xl font-bold academy-text-gradient">200+</div>
              <div className="text-xs academy-text-muted">Projects Built</div>
            </div>
            <div className="text-center academy-glass p-4 rounded-xl border academy-border">
              <div className="text-2xl font-bold academy-text-gradient">150+</div>
              <div className="text-xs academy-text-muted">Graduates Employed</div>
            </div>
            <div className="text-center academy-glass p-4 rounded-xl border academy-border">
              <div className="text-2xl font-bold academy-text-gradient">12+</div>
              <div className="text-xs academy-text-muted">Technologies Mastered</div>
            </div>
            <div className="text-center academy-glass p-4 rounded-xl border academy-border">
              <div className="text-2xl font-bold academy-text-gradient">95%</div>
              <div className="text-xs academy-text-muted">Success Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Filter */}
      <section className="py-12 relative z-10">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold academy-text-gradient text-center mb-8">Filter by Program</h2>
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-medium transition-all text-sm ${
                  selectedCategory === category.id
                    ? 'academy-gradient text-white shadow-xl'
                    : 'academy-glass academy-text-muted hover:shadow-lg border academy-border'
                }`}
              >
                <span className="text-lg">{category.icon}</span>
                <span>{category.name}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-16 relative z-10">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <div key={project._id} className="academy-glass overflow-hidden hover:shadow-2xl transition-all duration-300 border academy-border rounded-xl">
                {/* Project Image Placeholder */}
                <div className="h-48 academy-gradient flex items-center justify-center relative">
                  <div className="absolute inset-0 bg-black/20"></div>
                  <span className="text-4xl relative z-10 text-white">
                    {categories.find(cat => cat.id === project.category)?.icon || '🎯'}
                  </span>
                </div>
                
                <div className="p-6">
                  {/* Status and Date */}
                  <div className="flex items-center justify-between mb-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      project.status === 'completed' ? 'bg-green-500/20 text-green-400' : 
                      project.status === 'in-progress' ? 'bg-blue-500/20 text-blue-400' :
                      'bg-yellow-500/20 text-yellow-400'
                    }`}>
                      {project.status.charAt(0).toUpperCase() + project.status.slice(1).replace('-', ' ')}
                    </span>
                    <span className="text-xs academy-text-muted">
                      {formatDate(project.startDate)}
                      {project.endDate && ` - ${formatDate(project.endDate)}`}
                    </span>
                  </div>

                  {/* Project Info */}
                  <h3 className="text-lg font-bold academy-text-primary mb-3">{project.title}</h3>
                  <p className="academy-text-muted mb-4 text-sm leading-relaxed line-clamp-3">{project.summary}</p>

                  {/* Creator */}
                  {project.clientName && (
                    <p className="text-sm academy-text-gradient mb-4 font-medium">Built by: {project.clientName}</p>
                  )}

                  {/* Technologies */}
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.slice(0, 3).map((tech, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 academy-glass text-xs academy-text-primary border academy-border rounded"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.technologies.length > 3 && (
                        <span className="px-2 py-1 academy-glass text-xs academy-text-muted border academy-border rounded">
                          +{project.technologies.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3">
                    <Button className="flex-1 academy-btn-primary text-xs" size="sm">
                      View Project
                    </Button>
                    {project.projectUrl && (
                      <Button variant="outline" className="academy-btn-secondary text-xs" size="sm">
                        Live Demo
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredProjects.length === 0 && (
            <div className="text-center py-12">
              <p className="academy-text-muted text-lg">No projects found in this category.</p>
            </div>
          )}
        </div>
      </section>

      
    </div>
  );
}