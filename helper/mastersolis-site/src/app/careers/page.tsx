'use client';

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface Job {
  _id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  experience: string;
  salary: {
    min: number;
    max: number;
    currency: string;
  };
  description: string;
  requirements: string[];
  responsibilities: string[];
  benefits: string[];
  postedAt: string;
  deadline?: string;
  isActive: boolean;
}

export default function CareersPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [selectedType, setSelectedType] = useState('all');

  const mockJobs: Job[] = [
    {
      _id: '1',
      title: 'Senior Full Stack Developer',
      department: 'Engineering',
      location: 'New York, NY / Remote',
      type: 'full-time',
      experience: '5+ years',
      salary: { min: 120000, max: 160000, currency: 'USD' },
      description: 'We are looking for a skilled Full Stack Developer to join our growing engineering team.',
      requirements: [
        'Bachelor\'s degree in Computer Science or related field',
        '5+ years of experience with React, Node.js, and TypeScript',
        'Experience with cloud platforms (AWS, GCP, or Azure)',
        'Strong understanding of RESTful APIs and microservices',
        'Experience with database design and optimization'
      ],
      responsibilities: [
        'Develop and maintain scalable web applications',
        'Collaborate with cross-functional teams to define and implement new features',
        'Write clean, maintainable, and well-documented code',
        'Participate in code reviews and technical discussions',
        'Mentor junior developers and contribute to team growth'
      ],
      benefits: [
        'Competitive salary and equity package',
        'Comprehensive health, dental, and vision insurance',
        'Unlimited PTO and flexible working hours',
        'Remote work options',
        '$2,000 annual learning and development budget'
      ],
      postedAt: '2024-11-01',
      deadline: '2024-12-01',
      isActive: true
    },
    {
      _id: '2',
      title: 'Senior Career Consultant',
      department: 'Consulting',
      location: 'New York, NY',
      type: 'full-time',
      experience: '7+ years',
      salary: { min: 90000, max: 120000, currency: 'USD' },
      description: 'Join our consulting team to help professionals navigate their career journeys.',
      requirements: [
        'Master\'s degree in Psychology, HR, or Business',
        '7+ years of career counseling or HR experience',
        'Professional coaching certification preferred',
        'Excellent communication and interpersonal skills',
        'Experience with assessment tools and career frameworks'
      ],
      responsibilities: [
        'Conduct one-on-one career counseling sessions',
        'Develop personalized career development plans',
        'Facilitate workshops and group coaching sessions',
        'Stay updated on industry trends and job market insights',
        'Collaborate with the product team to improve our services'
      ],
      benefits: [
        'Competitive salary with performance bonuses',
        'Health and wellness benefits package',
        'Professional development opportunities',
        'Flexible schedule with some remote work',
        'Conference and training budget'
      ],
      postedAt: '2024-10-28',
      deadline: '2024-11-30',
      isActive: true
    },
    {
      _id: '3',
      title: 'Product Designer (UI/UX)',
      department: 'Design',
      location: 'Remote',
      type: 'full-time',
      experience: '4+ years',
      salary: { min: 85000, max: 115000, currency: 'USD' },
      description: 'Create intuitive and engaging user experiences for our career development platform.',
      requirements: [
        'Bachelor\'s degree in Design or related field',
        '4+ years of product design experience',
        'Proficiency in Figma, Sketch, and prototyping tools',
        'Strong portfolio showcasing UX/UI design skills',
        'Experience with user research and usability testing'
      ],
      responsibilities: [
        'Design user-centered interfaces for web and mobile applications',
        'Conduct user research and usability studies',
        'Create wireframes, prototypes, and high-fidelity designs',
        'Collaborate with developers to ensure design implementation',
        'Maintain and evolve our design system'
      ],
      benefits: [
        'Fully remote position',
        'Competitive salary and benefits',
        'Design tool subscriptions covered',
        'Home office setup budget',
        'Flexible working hours'
      ],
      postedAt: '2024-10-25',
      deadline: '2024-11-25',
      isActive: true
    },
    {
      _id: '4',
      title: 'Marketing Manager',
      department: 'Marketing',
      location: 'New York, NY / Remote',
      type: 'full-time',
      experience: '5+ years',
      salary: { min: 75000, max: 95000, currency: 'USD' },
      description: 'Lead our marketing efforts to grow brand awareness and user acquisition.',
      requirements: [
        'Bachelor\'s degree in Marketing or related field',
        '5+ years of digital marketing experience',
        'Experience with marketing automation and analytics tools',
        'Strong content creation and copywriting skills',
        'Knowledge of SEO, SEM, and social media marketing'
      ],
      responsibilities: [
        'Develop and execute comprehensive marketing strategies',
        'Manage digital marketing campaigns across multiple channels',
        'Create engaging content for various marketing materials',
        'Analyze campaign performance and optimize for better results',
        'Collaborate with sales team to generate qualified leads'
      ],
      benefits: [
        'Competitive salary with performance incentives',
        'Health and dental insurance',
        'Marketing conference attendance budget',
        'Flexible work arrangements',
        'Career growth opportunities'
      ],
      postedAt: '2024-10-20',
      deadline: '2024-11-20',
      isActive: true
    },
    {
      _id: '5',
      title: 'Data Scientist',
      department: 'Engineering',
      location: 'Remote',
      type: 'full-time',
      experience: '3+ years',
      salary: { min: 100000, max: 130000, currency: 'USD' },
      description: 'Use data to improve our career matching algorithms and user experience.',
      requirements: [
        'PhD or Master\'s in Data Science, Statistics, or related field',
        '3+ years of experience in data science or machine learning',
        'Proficiency in Python, R, and SQL',
        'Experience with machine learning frameworks (TensorFlow, PyTorch)',
        'Strong statistical analysis and modeling skills'
      ],
      responsibilities: [
        'Develop and improve recommendation algorithms',
        'Analyze user behavior and engagement patterns',
        'Build predictive models for career outcomes',
        'Collaborate with engineering team on data infrastructure',
        'Present insights to stakeholders and leadership'
      ],
      benefits: [
        'Competitive salary and equity',
        'Remote-first culture',
        'Top-tier hardware and software',
        'Conference and learning budget',
        'Flexible PTO policy'
      ],
      postedAt: '2024-10-15',
      deadline: '2024-11-15',
      isActive: true
    }
  ];

  const departments = [
    { id: 'all', name: 'All Departments' },
    { id: 'Engineering', name: 'Engineering' },
    { id: 'Consulting', name: 'Consulting' },
    { id: 'Design', name: 'Design' },
    { id: 'Marketing', name: 'Marketing' },
    { id: 'Sales', name: 'Sales' },
    { id: 'Operations', name: 'Operations' }
  ];

  const jobTypes = [
    { id: 'all', name: 'All Types' },
    { id: 'full-time', name: 'Full Time' },
    { id: 'part-time', name: 'Part Time' },
    { id: 'contract', name: 'Contract' },
    { id: 'internship', name: 'Internship' }
  ];

  useEffect(() => {
    setTimeout(() => {
      setJobs(mockJobs);
      setLoading(false);
    }, 1000);
  }, []);

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = selectedDepartment === 'all' || job.department === selectedDepartment;
    const matchesType = selectedType === 'all' || job.type === selectedType;
    
    return matchesSearch && matchesDepartment && matchesType && job.isActive;
  });

  const formatSalary = (job: Job) => {
    return `$${job.salary.min.toLocaleString()} - $${job.salary.max.toLocaleString()}`;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
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
          <p className="academy-text-muted">Loading academy opportunities...</p>
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
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2V8a2 2 0 012-2V6" />
              </svg>
            </div>
          </div>
          <h1 className="text-4xl font-bold academy-text-gradient mb-6">Shape the Future of Tech Education</h1>
          <p className="text-lg academy-text-muted mb-8 max-w-3xl mx-auto leading-relaxed">
            Join our mission to transform lives through technology education. We're building the academy 
            that will prepare the next generation of tech professionals.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-2xl mx-auto">
            <div className="text-center academy-glass p-4 rounded-xl border academy-border">
              <div className="text-2xl font-bold academy-text-gradient">{jobs.filter(j => j.isActive).length}</div>
              <div className="text-xs academy-text-muted">Open Positions</div>
            </div>
            <div className="text-center academy-glass p-4 rounded-xl border academy-border">
              <div className="text-2xl font-bold academy-text-gradient">25+</div>
              <div className="text-xs academy-text-muted">Faculty & Staff</div>
            </div>
            <div className="text-center academy-glass p-4 rounded-xl border academy-border">
              <div className="text-2xl font-bold academy-text-gradient">6+</div>
              <div className="text-xs academy-text-muted">Departments</div>
            </div>
            <div className="text-center academy-glass p-4 rounded-xl border academy-border">
              <div className="text-2xl font-bold academy-text-gradient">98%</div>
              <div className="text-xs academy-text-muted">Team Satisfaction</div>
            </div>
          </div>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="py-12 relative z-10">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold academy-text-gradient text-center mb-8">Find Your Role</h2>
            <div className="flex flex-col md:flex-row gap-4 mb-8">
              <Input
                type="text"
                placeholder="Search positions by title, department, or location..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-1 academy-input"
              />
              <select
                value={selectedDepartment}
                onChange={(e) => setSelectedDepartment(e.target.value)}
                className="academy-input"
              >
                {departments.map(dept => (
                  <option key={dept.id} value={dept.id}>{dept.name}</option>
                ))}
              </select>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="academy-input"
              >
                {jobTypes.map(type => (
                  <option key={type.id} value={type.id}>{type.name}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Job Listings */}
      <section className="py-16 relative z-10">
        <div className="container mx-auto px-4">
          {filteredJobs.length > 0 ? (
            <div className="space-y-6 max-w-4xl mx-auto">
              {filteredJobs.map((job) => (
                <div key={job._id} className="academy-glass p-6 hover:shadow-2xl transition-all duration-300 border academy-border rounded-xl">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <h3 className="text-lg font-bold academy-text-primary">{job.title}</h3>
                        <span className="px-3 py-1 academy-gradient text-white rounded-full text-xs font-medium shadow-lg">
                          {job.type.charAt(0).toUpperCase() + job.type.slice(1).replace('-', ' ')}
                        </span>
                      </div>
                      
                      <div className="flex flex-wrap items-center gap-4 text-sm academy-text-muted mb-4">
                        <span className="flex items-center gap-1">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                          </svg>
                          {job.department}
                        </span>
                        <span className="flex items-center gap-1">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          {job.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2V8a2 2 0 012-2V6" />
                          </svg>
                          {job.experience}
                        </span>
                        <span className="flex items-center gap-1 academy-text-gradient font-medium">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                          </svg>
                          {formatSalary(job)}
                        </span>
                      </div>
                      
                      <p className="academy-text-muted mb-4 text-sm leading-relaxed">{job.description}</p>
                      
                      <div className="flex items-center text-sm academy-text-muted opacity-75">
                        <span>Posted on {formatDate(job.postedAt)}</span>
                        {job.deadline && (
                          <>
                            <span className="mx-2">•</span>
                            <span>Apply by {formatDate(job.deadline)}</span>
                          </>
                        )}
                      </div>
                    </div>
                    
                    <div className="mt-4 lg:mt-0 lg:ml-6">
                      <Button className="w-full lg:w-auto academy-btn-primary text-sm">
                        Apply Now
                      </Button>
                    </div>
                  </div>
                  
                  {/* Job Details Preview */}
                  <div className="mt-6 grid md:grid-cols-3 gap-4 pt-6 border-t academy-border">
                    <div>
                      <h4 className="font-medium text-sm mb-2 academy-text-primary">Key Requirements</h4>
                      <ul className="text-sm academy-text-muted space-y-1">
                        {job.requirements.slice(0, 2).map((req, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <span className="text-green-400 mt-0.5">✓</span>
                            <span>{req}</span>
                          </li>
                        ))}
                        {job.requirements.length > 2 && (
                          <li className="academy-text-gradient font-medium">
                            +{job.requirements.length - 2} more requirements
                          </li>
                        )}
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-sm mb-2 academy-text-primary">Key Responsibilities</h4>
                      <ul className="text-sm academy-text-muted space-y-1">
                        {job.responsibilities.slice(0, 2).map((resp, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <span className="text-blue-400 mt-0.5">•</span>
                            <span>{resp}</span>
                          </li>
                        ))}
                        {job.responsibilities.length > 2 && (
                          <li className="academy-text-gradient font-medium">
                            +{job.responsibilities.length - 2} more responsibilities
                          </li>
                        )}
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-sm mb-2 academy-text-primary">Benefits</h4>
                      <ul className="text-sm academy-text-muted space-y-1">
                        {job.benefits.slice(0, 2).map((benefit, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <span className="text-purple-400 mt-0.5">★</span>
                            <span>{benefit}</span>
                          </li>
                        ))}
                        {job.benefits.length > 2 && (
                          <li className="academy-text-gradient font-medium">
                            +{job.benefits.length - 2} more benefits
                          </li>
                        )}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="academy-text-muted text-lg mb-4">No positions found matching your criteria.</p>
              <Button 
                onClick={() => {
                  setSearchTerm('');
                  setSelectedDepartment('all');
                  setSelectedType('all');
                }}
                variant="outline"
                className="academy-btn-secondary"
              >
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Academy Culture */}
      <section className="py-16 relative z-10">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold academy-text-gradient text-center mb-12">Why Join Our Academy</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: 'Educational Impact',
                description: 'Transform lives through technology education and help students launch successful careers.',
                icon: (
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                )
              },
              {
                title: 'Continuous Innovation',
                description: 'Work with cutting-edge curriculum design and the latest educational technologies.',
                icon: (
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                )
              },
              {
                title: 'Flexible Environment',
                description: 'Remote work options, flexible schedules, and a culture that values work-life balance.',
                icon: (
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                )
              },
              {
                title: 'Collaborative Team',
                description: 'Join a diverse community of educators, developers, and innovators passionate about tech.',
                icon: (
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                )
              },
              {
                title: 'Professional Growth',
                description: 'Access to training, conferences, certifications, and mentorship opportunities.',
                icon: (
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                )
              },
              {
                title: 'Competitive Package',
                description: 'Excellent compensation, comprehensive benefits, and performance-based incentives.',
                icon: (
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                  </svg>
                )
              }
            ].map((benefit, index) => (
              <div key={index} className="academy-glass p-6 text-center hover:shadow-2xl transition-all duration-300 border academy-border rounded-xl">
                <div className="academy-gradient w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                  {benefit.icon}
                </div>
                <h3 className="text-lg font-bold academy-text-primary mb-3">{benefit.title}</h3>
                <p className="academy-text-muted text-sm leading-relaxed">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      
    </div>
  );
}