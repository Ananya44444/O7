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
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading job opportunities...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-linear-to-r from-blue-600 to-purple-700 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">Join Our Team</h1>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Be part of a mission-driven team that's transforming how people approach their careers. 
            We're looking for passionate individuals who want to make a real impact.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold">{jobs.filter(j => j.isActive).length}</div>
              <div className="text-sm opacity-90">Open Positions</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold">50+</div>
              <div className="text-sm opacity-90">Team Members</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold">5+</div>
              <div className="text-sm opacity-90">Departments</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold">95%</div>
              <div className="text-sm opacity-90">Employee Satisfaction</div>
            </div>
          </div>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row gap-4 mb-8">
              <Input
                type="text"
                placeholder="Search jobs by title, department, or location..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-1"
              />
              <select
                value={selectedDepartment}
                onChange={(e) => setSelectedDepartment(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {departments.map(dept => (
                  <option key={dept.id} value={dept.id}>{dept.name}</option>
                ))}
              </select>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
      <section className="py-16">
        <div className="container mx-auto px-4">
          {filteredJobs.length > 0 ? (
            <div className="space-y-6 max-w-4xl mx-auto">
              {filteredJobs.map((job) => (
                <Card key={job._id} className="p-6 hover:shadow-lg transition-shadow">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <h3 className="text-xl font-semibold">{job.title}</h3>
                        <span className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm font-medium">
                          {job.type.charAt(0).toUpperCase() + job.type.slice(1).replace('-', ' ')}
                        </span>
                      </div>
                      
                      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-4">
                        <span className="flex items-center gap-1">
                          <span>🏢</span>
                          {job.department}
                        </span>
                        <span className="flex items-center gap-1">
                          <span>📍</span>
                          {job.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <span>💼</span>
                          {job.experience}
                        </span>
                        <span className="flex items-center gap-1">
                          <span>💰</span>
                          {formatSalary(job)}
                        </span>
                      </div>
                      
                      <p className="text-gray-600 mb-4">{job.description}</p>
                      
                      <div className="flex items-center text-sm text-gray-500">
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
                      <Button className="w-full lg:w-auto">
                        Apply Now
                      </Button>
                    </div>
                  </div>
                  
                  {/* Job Details Preview */}
                  <div className="mt-6 grid md:grid-cols-3 gap-4 pt-6 border-t border-gray-100">
                    <div>
                      <h4 className="font-medium text-sm mb-2">Key Requirements</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        {job.requirements.slice(0, 2).map((req, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <span className="text-green-500 mt-0.5">✓</span>
                            <span>{req}</span>
                          </li>
                        ))}
                        {job.requirements.length > 2 && (
                          <li className="text-blue-600 font-medium">
                            +{job.requirements.length - 2} more requirements
                          </li>
                        )}
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-sm mb-2">Key Responsibilities</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        {job.responsibilities.slice(0, 2).map((resp, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <span className="text-blue-500 mt-0.5">•</span>
                            <span>{resp}</span>
                          </li>
                        ))}
                        {job.responsibilities.length > 2 && (
                          <li className="text-blue-600 font-medium">
                            +{job.responsibilities.length - 2} more responsibilities
                          </li>
                        )}
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-sm mb-2">Benefits</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        {job.benefits.slice(0, 2).map((benefit, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <span className="text-purple-500 mt-0.5">★</span>
                            <span>{benefit}</span>
                          </li>
                        ))}
                        {job.benefits.length > 2 && (
                          <li className="text-blue-600 font-medium">
                            +{job.benefits.length - 2} more benefits
                          </li>
                        )}
                      </ul>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg mb-4">No jobs found matching your criteria.</p>
              <Button 
                onClick={() => {
                  setSearchTerm('');
                  setSelectedDepartment('all');
                  setSelectedType('all');
                }}
                variant="outline"
              >
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Company Culture */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Work With Us</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: 'Mission-Driven Culture',
                description: 'Make a real impact on people\'s careers and lives while working on meaningful projects.',
                icon: '🎯'
              },
              {
                title: 'Growth & Learning',
                description: 'Continuous learning opportunities with conferences, courses, and mentorship programs.',
                icon: '📚'
              },
              {
                title: 'Work-Life Balance',
                description: 'Flexible schedules, remote work options, and unlimited PTO to maintain your well-being.',
                icon: '⚖️'
              },
              {
                title: 'Inclusive Environment',
                description: 'Diverse and inclusive workplace where everyone\'s voice is heard and valued.',
                icon: '🤝'
              },
              {
                title: 'Innovation Focus',
                description: 'Work with cutting-edge technologies and contribute to innovative solutions.',
                icon: '🚀'
              },
              {
                title: 'Competitive Benefits',
                description: 'Comprehensive health benefits, equity packages, and performance-based bonuses.',
                icon: '💎'
              }
            ].map((benefit, index) => (
              <Card key={index} className="p-6 text-center hover:shadow-lg transition-shadow">
                <div className="text-4xl mb-4">{benefit.icon}</div>
                <h3 className="text-xl font-semibold mb-3">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-linear-to-r from-blue-600 to-purple-700 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Don't See the Perfect Role?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            We're always looking for exceptional talent. Send us your resume and let us know how you'd like to contribute to our mission.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-white text-blue-600 hover:bg-gray-100">
              Submit General Application
            </Button>
            <Button variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
              Learn About Our Culture
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}