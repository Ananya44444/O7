'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

interface ResumeData {
  personalInfo: {
    name: string;
    email: string;
    phone: string;
    linkedin: string;
    github: string;
    location: string;
  };
  summary: string;
  experience: Array<{
    id: string;
    role: string;
    company: string;
    duration: string;
    description: string;
  }>;
  projects: Array<{
    id: string;
    title: string;
    description: string;
    tech: string;
    link: string;
  }>;
  education: Array<{
    id: string;
    degree: string;
    institution: string;
    year: string;
    gpa?: string;
  }>;
  skills: string[];
  achievements: string[];
}

interface ResumeTemplate {
  id: string;
  name: string;
  description: string;
  preview: string;
}

const resumeTemplates: ResumeTemplate[] = [
  {
    id: 'modern-clean',
    name: 'Modern Clean',
    description: 'Left sidebar with skills and contact, right side with experience and projects',
    preview: '🎨'
  },
  {
    id: 'corporate-formal',
    name: 'Corporate Formal',
    description: 'Traditional format with clear sections and professional styling',
    preview: '💼'
  },
  {
    id: 'minimal-creative',
    name: 'Minimal Creative',
    description: 'Two-column layout with stylish headings and accent colors',
    preview: '✨'
  }
];

const initialResumeData: ResumeData = {
  personalInfo: {
    name: '',
    email: '',
    phone: '',
    linkedin: '',
    github: '',
    location: ''
  },
  summary: '',
  experience: [],
  projects: [],
  education: [],
  skills: [],
  achievements: []
};

const ResumeBuilder: React.FC = () => {
  const [selectedTemplate, setSelectedTemplate] = useState<string>('');
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [resumeData, setResumeData] = useState<ResumeData>(initialResumeData);
  const [newSkill, setNewSkill] = useState('');

  const steps = [
    'Template Selection',
    'Personal Information',
    'Summary',
    'Experience',
    'Projects',
    'Education',
    'Skills & Achievements',
    'Preview & Download'
  ];

  const addExperience = () => {
    const newExp = {
      id: Date.now().toString(),
      role: '',
      company: '',
      duration: '',
      description: ''
    };
    setResumeData(prev => ({
      ...prev,
      experience: [...prev.experience, newExp]
    }));
  };

  const updateExperience = (id: string, field: string, value: string) => {
    setResumeData(prev => ({
      ...prev,
      experience: prev.experience.map(exp => 
        exp.id === id ? { ...exp, [field]: value } : exp
      )
    }));
  };

  const removeExperience = (id: string) => {
    setResumeData(prev => ({
      ...prev,
      experience: prev.experience.filter(exp => exp.id !== id)
    }));
  };

  const addProject = () => {
    const newProject = {
      id: Date.now().toString(),
      title: '',
      description: '',
      tech: '',
      link: ''
    };
    setResumeData(prev => ({
      ...prev,
      projects: [...prev.projects, newProject]
    }));
  };

  const updateProject = (id: string, field: string, value: string) => {
    setResumeData(prev => ({
      ...prev,
      projects: prev.projects.map(project => 
        project.id === id ? { ...project, [field]: value } : project
      )
    }));
  };

  const removeProject = (id: string) => {
    setResumeData(prev => ({
      ...prev,
      projects: prev.projects.filter(project => project.id !== id)
    }));
  };

  const addEducation = () => {
    const newEdu = {
      id: Date.now().toString(),
      degree: '',
      institution: '',
      year: '',
      gpa: ''
    };
    setResumeData(prev => ({
      ...prev,
      education: [...prev.education, newEdu]
    }));
  };

  const updateEducation = (id: string, field: string, value: string) => {
    setResumeData(prev => ({
      ...prev,
      education: prev.education.map(edu => 
        edu.id === id ? { ...edu, [field]: value } : edu
      )
    }));
  };

  const removeEducation = (id: string) => {
    setResumeData(prev => ({
      ...prev,
      education: prev.education.filter(edu => edu.id !== id)
    }));
  };

  const addSkill = () => {
    if (newSkill.trim() && !resumeData.skills.includes(newSkill.trim())) {
      setResumeData(prev => ({
        ...prev,
        skills: [...prev.skills, newSkill.trim()]
      }));
      setNewSkill('');
    }
  };

  const removeSkill = (skill: string) => {
    setResumeData(prev => ({
      ...prev,
      skills: prev.skills.filter(s => s !== skill)
    }));
  };

  const addAchievement = () => {
    setResumeData(prev => ({
      ...prev,
      achievements: [...prev.achievements, '']
    }));
  };

  const updateAchievement = (index: number, value: string) => {
    setResumeData(prev => ({
      ...prev,
      achievements: prev.achievements.map((ach, i) => i === index ? value : ach)
    }));
  };

  const removeAchievement = (index: number) => {
    setResumeData(prev => ({
      ...prev,
      achievements: prev.achievements.filter((_, i) => i !== index)
    }));
  };

  const generateSuggestedSkills = () => {
    const allText = [
      resumeData.summary,
      ...resumeData.experience.map(exp => exp.description),
      ...resumeData.projects.map(proj => `${proj.description} ${proj.tech}`)
    ].join(' ').toLowerCase();

    const commonSkills = [
      'JavaScript', 'Python', 'React', 'Node.js', 'SQL', 'Git', 'HTML', 'CSS',
      'TypeScript', 'MongoDB', 'Express', 'Next.js', 'AWS', 'Docker', 'Kubernetes',
      'Machine Learning', 'Data Analysis', 'Agile', 'Scrum', 'REST APIs'
    ];

    const suggestions = commonSkills.filter(skill => 
      allText.includes(skill.toLowerCase()) && !resumeData.skills.includes(skill)
    );

    return suggestions.slice(0, 8);
  };

  const downloadResume = () => {
    // Create a simple HTML version for now
    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>${resumeData.personalInfo.name} - Resume</title>
        <style>
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body { 
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; 
            margin: 40px; 
            line-height: 1.6; 
            color: #333;
            background: #f8f9fa;
          }
          .container { background: white; padding: 40px; border-radius: 8px; box-shadow: 0 4px 20px rgba(0,0,0,0.1); max-width: 800px; margin: 0 auto; }
          .header { 
            text-align: center; 
            border-bottom: 3px solid #2563eb; 
            padding-bottom: 25px; 
            margin-bottom: 35px;
            background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
            padding: 30px;
            border-radius: 8px;
            margin: -20px -20px 35px -20px;
          }
          .header h1 { color: #1e293b; font-size: 2.5em; margin-bottom: 15px; font-weight: 700; }
          .contact-info { 
            display: flex; 
            justify-content: center; 
            gap: 25px; 
            margin-top: 15px;
            flex-wrap: wrap;
            font-size: 1.1em;
          }
          .section { margin-bottom: 35px; }
          .section h2 { 
            color: #1e293b; 
            border-bottom: 2px solid #3b82f6; 
            padding-bottom: 8px; 
            margin-bottom: 20px;
            font-size: 1.5em;
            font-weight: 600;
          }
          .experience-item, .project-item, .education-item { 
            margin-bottom: 25px; 
            padding: 20px;
            background: #f8fafc;
            border-radius: 8px;
            border-left: 4px solid #3b82f6;
          }
          .experience-item h3, .project-item h3, .education-item h3 { 
            color: #1e293b; 
            font-size: 1.2em; 
            margin-bottom: 5px;
            font-weight: 600;
          }
          .experience-item .duration, .education-item .year { 
            color: #3b82f6; 
            font-weight: 500; 
            margin-bottom: 10px;
          }
          .skills { display: flex; flex-wrap: wrap; gap: 12px; }
          .skill-tag { 
            background: linear-gradient(135deg, #3b82f6, #1d4ed8); 
            color: white;
            padding: 8px 16px; 
            border-radius: 25px; 
            font-size: 0.9em;
            font-weight: 500;
            box-shadow: 0 2px 4px rgba(59, 130, 246, 0.3);
          }
          .project-tech { 
            background: #e0f2fe; 
            color: #0277bd; 
            padding: 4px 8px; 
            border-radius: 12px; 
            font-size: 0.85em;
            font-weight: 500;
            display: inline-block;
            margin-top: 8px;
          }
          .achievements ul { padding-left: 20px; }
          .achievements li { margin-bottom: 8px; color: #475569; }
          @media print {
            body { margin: 0; background: white; }
            .container { box-shadow: none; }
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>${resumeData.personalInfo.name}</h1>
            <div class="contact-info">
              <span>📧 ${resumeData.personalInfo.email}</span>
              <span>📱 ${resumeData.personalInfo.phone}</span>
              <span>📍 ${resumeData.personalInfo.location}</span>
            </div>
            <div class="contact-info">
              <span>🔗 ${resumeData.personalInfo.linkedin}</span>
              <span>💻 ${resumeData.personalInfo.github}</span>
            </div>
          </div>

        ${resumeData.summary ? `
        <div class="section">
          <h2>Summary</h2>
          <p>${resumeData.summary}</p>
        </div>
        ` : ''}

        ${resumeData.experience.length > 0 ? `
        <div class="section">
          <h2>Experience</h2>
          ${resumeData.experience.map(exp => `
            <div class="experience-item">
              <h3>${exp.role} at ${exp.company}</h3>
              <p><strong>${exp.duration}</strong></p>
              <p>${exp.description}</p>
            </div>
          `).join('')}
        </div>
        ` : ''}

        ${resumeData.projects.length > 0 ? `
        <div class="section">
          <h2>🚀 Projects</h2>
          ${resumeData.projects.map(proj => `
            <div class="project-item">
              <h3>${proj.title}</h3>
              <p>${proj.description}</p>
              ${proj.tech ? `<div class="project-tech">Technologies: ${proj.tech}</div>` : ''}
              ${proj.link ? `<p><strong>🔗 Link:</strong> <a href="${proj.link}" style="color: #3b82f6;">${proj.link}</a></p>` : ''}
            </div>
          `).join('')}
        </div>
        ` : ''}

        ${resumeData.education.length > 0 ? `
        <div class="section">
          <h2>Education</h2>
          ${resumeData.education.map(edu => `
            <div class="education-item">
              <h3>${edu.degree}</h3>
              <p>${edu.institution} - ${edu.year}</p>
              ${edu.gpa ? `<p>GPA: ${edu.gpa}</p>` : ''}
            </div>
          `).join('')}
        </div>
        ` : ''}

        ${resumeData.skills.length > 0 ? `
        <div class="section">
          <h2>🔧 Skills</h2>
          <div class="skills">
            ${resumeData.skills.map(skill => `<span class="skill-tag">${skill}</span>`).join('')}
          </div>
        </div>
        ` : ''}

        ${resumeData.achievements.filter(a => a.trim()).length > 0 ? `
        <div class="section achievements">
          <h2>🏆 Achievements</h2>
          <ul>
            ${resumeData.achievements.filter(a => a.trim()).map(ach => `<li>${ach}</li>`).join('')}
          </ul>
        </div>
        ` : ''}
        </div>
      </body>
      </html>
    `;

    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${resumeData.personalInfo.name.replace(/\s+/g, '_')}_Resume.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0: // Template Selection
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-4">Choose Your Resume Template</h2>
              <p className="text-gray-600">Select a template that best fits your style</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {resumeTemplates.map(template => (
                <Card 
                  key={template.id}
                  className={`cursor-pointer transition-all duration-300 transform hover:scale-105 ${
                    selectedTemplate === template.id 
                      ? 'ring-3 ring-blue-500 bg-blue-50 shadow-xl border-blue-200' 
                      : 'hover:shadow-xl hover:border-gray-300 bg-white'
                  }`}
                  onClick={() => setSelectedTemplate(template.id)}
                >
                  <CardHeader className="text-center p-8">
                    <div className="text-7xl mb-6 transform transition-transform hover:rotate-3">{template.preview}</div>
                    <CardTitle className="text-xl font-bold text-gray-800">{template.name}</CardTitle>
                    <CardDescription className="text-gray-600 mt-2 leading-relaxed">{template.description}</CardDescription>
                    {selectedTemplate === template.id && (
                      <div className="mt-4 flex items-center justify-center text-blue-600">
                        <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        Selected
                      </div>
                    )}
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>
        );

      case 1: // Personal Information
        return (
          <div className="space-y-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-3">Personal Information</h2>
              <p className="text-gray-600">Tell us about yourself to get started</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  <span className="flex items-center">
                    👤 Full Name *
                  </span>
                </label>
                <Input
                  value={resumeData.personalInfo.name}
                  onChange={(e) => setResumeData(prev => ({
                    ...prev,
                    personalInfo: { ...prev.personalInfo, name: e.target.value }
                  }))}
                  placeholder="John Doe"
                  className="h-12 text-base border-2 border-gray-200 focus:border-blue-500 transition-colors"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  <span className="flex items-center">
                    📧 Email *
                  </span>
                </label>
                <Input
                  type="email"
                  value={resumeData.personalInfo.email}
                  onChange={(e) => setResumeData(prev => ({
                    ...prev,
                    personalInfo: { ...prev.personalInfo, email: e.target.value }
                  }))}
                  placeholder="john@example.com"
                  className="h-12 text-base border-2 border-gray-200 focus:border-blue-500 transition-colors"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  <span className="flex items-center">
                    📱 Phone
                  </span>
                </label>
                <Input
                  value={resumeData.personalInfo.phone}
                  onChange={(e) => {
                    // Allow only numbers, spaces, hyphens, parentheses, and plus sign
                    const value = e.target.value.replace(/[^0-9\s\-\(\)\+]/g, '');
                    setResumeData(prev => ({
                      ...prev,
                      personalInfo: { ...prev.personalInfo, phone: value }
                    }));
                  }}
                  placeholder="+1 (555) 123-4567"
                  className="h-12 text-base border-2 border-gray-200 focus:border-blue-500 transition-colors"
                />
                <div className="text-xs text-gray-500 mt-1">
                  Only numbers, spaces, hyphens, parentheses, and + allowed
                </div>
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  <span className="flex items-center">
                    📍 Location
                  </span>
                </label>
                <Input
                  value={resumeData.personalInfo.location}
                  onChange={(e) => setResumeData(prev => ({
                    ...prev,
                    personalInfo: { ...prev.personalInfo, location: e.target.value }
                  }))}
                  placeholder="San Francisco, CA"
                  className="h-12 text-base border-2 border-gray-200 focus:border-blue-500 transition-colors"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  <span className="flex items-center">
                    🔗 LinkedIn
                  </span>
                </label>
                <Input
                  value={resumeData.personalInfo.linkedin}
                  onChange={(e) => setResumeData(prev => ({
                    ...prev,
                    personalInfo: { ...prev.personalInfo, linkedin: e.target.value }
                  }))}
                  placeholder="linkedin.com/in/johndoe"
                  className="h-12 text-base border-2 border-gray-200 focus:border-blue-500 transition-colors"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  <span className="flex items-center">
                    💻 GitHub
                  </span>
                </label>
                <Input
                  value={resumeData.personalInfo.github}
                  onChange={(e) => setResumeData(prev => ({
                    ...prev,
                    personalInfo: { ...prev.personalInfo, github: e.target.value }
                  }))}
                  placeholder="github.com/johndoe"
                  className="h-12 text-base border-2 border-gray-200 focus:border-blue-500 transition-colors"
                />
              </div>
            </div>
          </div>
        );

      case 2: // Summary
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Professional Summary</h2>
            <div>
              <label className="block text-sm font-medium mb-2">
                About Yourself (2-3 sentences highlighting your key strengths)
              </label>
              <Textarea
                rows={4}
                value={resumeData.summary}
                onChange={(e) => setResumeData(prev => ({ ...prev, summary: e.target.value }))}
                placeholder="Experienced software developer with 5+ years in full-stack development. Passionate about creating scalable solutions and leading cross-functional teams to deliver high-quality products."
              />
            </div>
          </div>
        );

      case 3: // Experience
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Work Experience</h2>
              <Button onClick={addExperience}>+ Add Experience</Button>
            </div>
            {resumeData.experience.map((exp, index) => (
              <Card key={exp.id}>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle>Experience {index + 1}</CardTitle>
                    <Button variant="destructive" size="sm" onClick={() => removeExperience(exp.id)}>
                      Remove
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Job Title</label>
                      <Input
                        value={exp.role}
                        onChange={(e) => updateExperience(exp.id, 'role', e.target.value)}
                        placeholder="Software Engineer"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Company</label>
                      <Input
                        value={exp.company}
                        onChange={(e) => updateExperience(exp.id, 'company', e.target.value)}
                        placeholder="Tech Corp"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Duration</label>
                    <Input
                      value={exp.duration}
                      onChange={(e) => updateExperience(exp.id, 'duration', e.target.value)}
                      placeholder="Jan 2020 - Present"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Description</label>
                    <Textarea
                      rows={3}
                      value={exp.description}
                      onChange={(e) => updateExperience(exp.id, 'description', e.target.value)}
                      placeholder="Describe your key responsibilities and achievements..."
                    />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        );

      case 4: // Projects
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Projects</h2>
              <Button onClick={addProject}>+ Add Project</Button>
            </div>
            {resumeData.projects.map((project, index) => (
              <Card key={project.id}>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle>Project {index + 1}</CardTitle>
                    <Button variant="destructive" size="sm" onClick={() => removeProject(project.id)}>
                      Remove
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Project Title</label>
                    <Input
                      value={project.title}
                      onChange={(e) => updateProject(project.id, 'title', e.target.value)}
                      placeholder="E-commerce Platform"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Description</label>
                    <Textarea
                      rows={3}
                      value={project.description}
                      onChange={(e) => updateProject(project.id, 'description', e.target.value)}
                      placeholder="Built a full-stack e-commerce platform with user authentication, payment processing, and admin dashboard..."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Technologies Used</label>
                    <Input
                      value={project.tech}
                      onChange={(e) => updateProject(project.id, 'tech', e.target.value)}
                      placeholder="React, Node.js, MongoDB, Stripe"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Project Link (optional)</label>
                    <Input
                      value={project.link}
                      onChange={(e) => updateProject(project.id, 'link', e.target.value)}
                      placeholder="https://github.com/username/project or live demo URL"
                    />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        );

      case 5: // Education
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Education</h2>
              <Button onClick={addEducation}>+ Add Education</Button>
            </div>
            {resumeData.education.map((edu, index) => (
              <Card key={edu.id}>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle>Education {index + 1}</CardTitle>
                    <Button variant="destructive" size="sm" onClick={() => removeEducation(edu.id)}>
                      Remove
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Degree</label>
                      <Input
                        value={edu.degree}
                        onChange={(e) => updateEducation(edu.id, 'degree', e.target.value)}
                        placeholder="Bachelor of Science in Computer Science"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Institution</label>
                      <Input
                        value={edu.institution}
                        onChange={(e) => updateEducation(edu.id, 'institution', e.target.value)}
                        placeholder="University of Technology"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Year</label>
                      <Input
                        value={edu.year}
                        onChange={(e) => updateEducation(edu.id, 'year', e.target.value)}
                        placeholder="2018-2022"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">GPA (optional)</label>
                      <Input
                        value={edu.gpa || ''}
                        onChange={(e) => updateEducation(edu.id, 'gpa', e.target.value)}
                        placeholder="3.8/4.0"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        );

      case 6: // Skills & Achievements
        return (
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold mb-4">Skills</h2>
              
              {/* Suggested Skills */}
              {generateSuggestedSkills().length > 0 && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-2">Suggested Skills (click to add)</h3>
                  <div className="flex flex-wrap gap-2">
                    {generateSuggestedSkills().map(skill => (
                      <button
                        key={skill}
                        onClick={() => setResumeData(prev => ({
                          ...prev,
                          skills: [...prev.skills, skill]
                        }))}
                        className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm hover:bg-blue-200 transition-colors"
                      >
                        + {skill}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex gap-2 mb-4">
                <Input
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  placeholder="Add a skill (e.g., React, Python)"
                  onKeyPress={(e) => e.key === 'Enter' && addSkill()}
                />
                <Button onClick={addSkill}>Add</Button>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {resumeData.skills.map(skill => (
                  <span
                    key={skill}
                    className="px-3 py-1 bg-gray-100 rounded-full text-sm flex items-center gap-2"
                  >
                    {skill}
                    <button
                      onClick={() => removeSkill(skill)}
                      className="text-red-500 hover:text-red-700"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">Achievements</h2>
                <Button onClick={addAchievement}>+ Add Achievement</Button>
              </div>
              <div className="space-y-2">
                {resumeData.achievements.map((achievement, index) => (
                  <div key={index} className="flex gap-2">
                    <Input
                      value={achievement}
                      onChange={(e) => updateAchievement(index, e.target.value)}
                      placeholder="Describe an achievement or award..."
                    />
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => removeAchievement(index)}
                    >
                      Remove
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 7: // Preview & Download
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Resume Preview</h2>
            <Card>
              <CardHeader>
                <CardTitle>Your Resume is Ready!</CardTitle>
                <CardDescription>
                  Review your resume below and download when you're satisfied
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="border-2 border-gray-200 rounded-xl p-8 bg-white shadow-lg">
                  {/* Resume Preview */}
                  <div className="text-center border-b-2 border-gray-200 pb-6 mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-3">{resumeData.personalInfo.name}</h1>
                    <div className="text-base text-gray-600 mb-2 space-x-2">
                      <span>📧 {resumeData.personalInfo.email}</span>
                      <span>•</span>
                      <span>📱 {resumeData.personalInfo.phone}</span>
                      <span>•</span>
                      <span>📍 {resumeData.personalInfo.location}</span>
                    </div>
                    <div className="text-base text-gray-600 space-x-2">
                      <span>🔗 {resumeData.personalInfo.linkedin}</span>
                      <span>•</span>
                      <span>💻 {resumeData.personalInfo.github}</span>
                    </div>
                  </div>
                  
                  {resumeData.summary && (
                    <div className="mb-8">
                      <h2 className="text-xl font-bold text-gray-900 border-b-2 border-blue-200 pb-2 mb-4">📝 Summary</h2>
                      <p className="text-base text-gray-700 leading-relaxed">{resumeData.summary}</p>
                    </div>
                  )}
                  
                  {resumeData.experience.length > 0 && (
                    <div className="mb-8">
                      <h2 className="text-xl font-bold text-gray-900 border-b-2 border-blue-200 pb-2 mb-4">💼 Experience</h2>
                      {resumeData.experience.map((exp, index) => (
                        <div key={index} className="mb-6 p-4 bg-gray-50 rounded-lg">
                          <div className="font-bold text-lg text-gray-900">{exp.role} at {exp.company}</div>
                          <div className="text-sm text-blue-600 font-medium mb-2">{exp.duration}</div>
                          <p className="text-base text-gray-700 leading-relaxed">{exp.description}</p>
                        </div>
                      ))}
                    </div>
                  )}
                  
                  {resumeData.skills.length > 0 && (
                    <div className="mb-6">
                      <h2 className="text-xl font-bold text-gray-900 border-b-2 border-blue-200 pb-2 mb-4">🔧 Skills</h2>
                      <div className="flex flex-wrap gap-2">
                        {resumeData.skills.map((skill, index) => (
                          <span key={index} className="px-3 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="mt-8 flex flex-col sm:flex-row gap-4">
                  <Button 
                    onClick={downloadResume} 
                    className="flex-1 py-4 text-lg font-medium bg-green-600 hover:bg-green-700 transition-colors"
                  >
                    <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    Download Resume (HTML)
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => setCurrentStep(0)} 
                    className="flex-1 py-4 text-lg font-medium border-2 hover:bg-gray-50 transition-colors"
                  >
                    <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    Start Over
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen academy-bg py-8 relative">
      <div className="academy-bg-pattern"></div>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="academy-gradient p-3 rounded-2xl shadow-xl">
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"/>
                    <path fillRule="evenodd" d="M4 5a2 2 0 012-2v1a1 1 0 102 0V3h3v1a1 1 0 102 0V3a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm2.5 7a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm2.45 4a2.5 2.5 0 10-4.9 0h4.9zM12 9a1 1 0 100 2h3a1 1 0 100-2h-3zm-1 4a1 1 0 011-1h2a1 1 0 110 2h-2a1 1 0 01-1-1z" clipRule="evenodd"/>
                  </svg>
                </div>
                <h1 className="text-5xl font-bold academy-text-gradient">Resume Builder</h1>
              </div>
              <p className="academy-text-muted text-xl">Build your professional resume with our academy-powered step-by-step builder</p>
            </div>
            <div className="academy-glass-card px-6 py-4 rounded-2xl">
              <div className="text-lg font-bold text-white">
                Step {currentStep + 1} of {steps.length}
              </div>
              <div className="text-sm academy-text-muted text-center mt-1">
                {Math.round(((currentStep + 1) / steps.length) * 100)}% Complete
              </div>
              <div className="w-32 h-2 bg-academy-dark-light/30 rounded-full mt-3">
                <div 
                  className="h-full academy-gradient rounded-full transition-all duration-500"
                  style={{ width: `${Math.round(((currentStep + 1) / steps.length) * 100)}%` }}
                />
              </div>
            </div>
          </div>
          
          {/* Academy Timeline */}
          <div className="hidden lg:flex items-center overflow-x-auto academy-glass-card p-4 rounded-2xl">
            {steps.map((step, index) => (
              <div key={index} className="flex items-center shrink-0">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${
                    index <= currentStep
                      ? 'academy-gradient text-white shadow-lg'
                      : 'bg-academy-dark-light/30 academy-text-muted'
                  }`}
                >
                  {index <= currentStep ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    index + 1
                  )}
                </div>
                <div className={`ml-3 text-sm ${index <= currentStep ? 'text-white font-medium' : 'academy-text-muted'} whitespace-nowrap`}>
                  {step}
                </div>
                {index < steps.length - 1 && (
                  <div className={`mx-6 h-1 w-12 xl:w-16 rounded-full transition-all duration-300 ${index < currentStep ? 'academy-gradient' : 'bg-academy-dark-light/30'}`} />
                )}
              </div>
            ))}
          </div>
          
          {/* Mobile Timeline */}
          <div className="lg:hidden academy-glass-card p-4 rounded-2xl">
            <div className="flex items-center justify-center space-x-2 mb-4">
              {steps.map((_, index) => (
                <div
                  key={index}
                  className={`w-4 h-4 rounded-full transition-all duration-300 ${
                    index <= currentStep ? 'academy-gradient' : 'bg-academy-dark-light/30'
                  }`}
                />
              ))}
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-white">
                {steps[currentStep]}
              </div>
            </div>
          </div>
        </div>

        {/* Step Content */}
        <Card className="academy-glass-card border-0 shadow-2xl">
          <CardContent className="p-8 md:p-12">
            {renderStepContent()}
          </CardContent>
        </Card>

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-12">
          <Button
            variant="outline"
            onClick={prevStep}
            disabled={currentStep === 0}
            className="academy-btn-secondary px-8 py-4 text-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Previous Step
          </Button>
          
          {currentStep < steps.length - 1 ? (
            <Button
              onClick={nextStep}
              disabled={currentStep === 0 && !selectedTemplate}
              className="academy-btn-primary px-8 py-4 text-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Continue Journey
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Button>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default ResumeBuilder;