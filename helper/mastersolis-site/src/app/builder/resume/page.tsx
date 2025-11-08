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
          body { font-family: Arial, sans-serif; margin: 40px; line-height: 1.6; }
          .header { text-align: center; border-bottom: 2px solid #333; padding-bottom: 20px; margin-bottom: 30px; }
          .section { margin-bottom: 25px; }
          .section h2 { color: #333; border-bottom: 1px solid #ccc; padding-bottom: 5px; }
          .contact-info { display: flex; justify-content: center; gap: 20px; margin-top: 10px; }
          .experience-item, .project-item, .education-item { margin-bottom: 15px; }
          .skills { display: flex; flex-wrap: wrap; gap: 10px; }
          .skill-tag { background: #f0f0f0; padding: 5px 10px; border-radius: 15px; font-size: 0.9em; }
        </style>
      </head>
      <body>
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
          <h2>Projects</h2>
          ${resumeData.projects.map(proj => `
            <div class="project-item">
              <h3>${proj.title}</h3>
              <p>${proj.description}</p>
              <p><strong>Tech:</strong> ${proj.tech}</p>
              ${proj.link ? `<p><strong>Link:</strong> ${proj.link}</p>` : ''}
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
          <h2>Skills</h2>
          <div class="skills">
            ${resumeData.skills.map(skill => `<span class="skill-tag">${skill}</span>`).join('')}
          </div>
        </div>
        ` : ''}

        ${resumeData.achievements.filter(a => a.trim()).length > 0 ? `
        <div class="section">
          <h2>Achievements</h2>
          <ul>
            ${resumeData.achievements.filter(a => a.trim()).map(ach => `<li>${ach}</li>`).join('')}
          </ul>
        </div>
        ` : ''}
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
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {resumeTemplates.map(template => (
                <Card 
                  key={template.id}
                  className={`cursor-pointer transition-all ${
                    selectedTemplate === template.id 
                      ? 'ring-2 ring-blue-500 bg-blue-50' 
                      : 'hover:shadow-lg'
                  }`}
                  onClick={() => setSelectedTemplate(template.id)}
                >
                  <CardHeader className="text-center">
                    <div className="text-6xl mb-4">{template.preview}</div>
                    <CardTitle>{template.name}</CardTitle>
                    <CardDescription>{template.description}</CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>
        );

      case 1: // Personal Information
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Personal Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2">Full Name *</label>
                <Input
                  value={resumeData.personalInfo.name}
                  onChange={(e) => setResumeData(prev => ({
                    ...prev,
                    personalInfo: { ...prev.personalInfo, name: e.target.value }
                  }))}
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Email *</label>
                <Input
                  type="email"
                  value={resumeData.personalInfo.email}
                  onChange={(e) => setResumeData(prev => ({
                    ...prev,
                    personalInfo: { ...prev.personalInfo, email: e.target.value }
                  }))}
                  placeholder="john@example.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Phone</label>
                <Input
                  value={resumeData.personalInfo.phone}
                  onChange={(e) => setResumeData(prev => ({
                    ...prev,
                    personalInfo: { ...prev.personalInfo, phone: e.target.value }
                  }))}
                  placeholder="+1 (555) 123-4567"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Location</label>
                <Input
                  value={resumeData.personalInfo.location}
                  onChange={(e) => setResumeData(prev => ({
                    ...prev,
                    personalInfo: { ...prev.personalInfo, location: e.target.value }
                  }))}
                  placeholder="San Francisco, CA"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">LinkedIn</label>
                <Input
                  value={resumeData.personalInfo.linkedin}
                  onChange={(e) => setResumeData(prev => ({
                    ...prev,
                    personalInfo: { ...prev.personalInfo, linkedin: e.target.value }
                  }))}
                  placeholder="linkedin.com/in/johndoe"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">GitHub</label>
                <Input
                  value={resumeData.personalInfo.github}
                  onChange={(e) => setResumeData(prev => ({
                    ...prev,
                    personalInfo: { ...prev.personalInfo, github: e.target.value }
                  }))}
                  placeholder="github.com/johndoe"
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
                <div className="border rounded-lg p-6 bg-white">
                  {/* Resume Preview */}
                  <div className="text-center border-b pb-4 mb-6">
                    <h1 className="text-2xl font-bold">{resumeData.personalInfo.name}</h1>
                    <div className="text-sm text-gray-600 mt-2">
                      {resumeData.personalInfo.email} • {resumeData.personalInfo.phone} • {resumeData.personalInfo.location}
                    </div>
                    <div className="text-sm text-gray-600">
                      {resumeData.personalInfo.linkedin} • {resumeData.personalInfo.github}
                    </div>
                  </div>
                  
                  {resumeData.summary && (
                    <div className="mb-6">
                      <h2 className="text-lg font-semibold border-b mb-2">Summary</h2>
                      <p className="text-sm">{resumeData.summary}</p>
                    </div>
                  )}
                  
                  {resumeData.experience.length > 0 && (
                    <div className="mb-6">
                      <h2 className="text-lg font-semibold border-b mb-2">Experience</h2>
                      {resumeData.experience.map((exp, index) => (
                        <div key={index} className="mb-3">
                          <div className="font-medium">{exp.role} at {exp.company}</div>
                          <div className="text-sm text-gray-600">{exp.duration}</div>
                          <p className="text-sm mt-1">{exp.description}</p>
                        </div>
                      ))}
                    </div>
                  )}
                  
                  {resumeData.skills.length > 0 && (
                    <div className="mb-4">
                      <h2 className="text-lg font-semibold border-b mb-2">Skills</h2>
                      <div className="flex flex-wrap gap-1">
                        {resumeData.skills.map((skill, index) => (
                          <span key={index} className="px-2 py-1 bg-gray-100 rounded text-xs">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="mt-6 flex gap-4">
                  <Button onClick={downloadResume} className="flex-1">
                    💾 Download Resume (HTML)
                  </Button>
                  <Button variant="outline" onClick={() => setCurrentStep(0)} className="flex-1">
                    🔄 Start Over
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
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-3xl font-bold text-gray-900">Resume Builder</h1>
            <div className="text-sm text-gray-600">
              Step {currentStep + 1} of {steps.length}
            </div>
          </div>
          
          {/* Desktop Timeline */}
          <div className="hidden lg:flex items-center overflow-x-auto">
            {steps.map((step, index) => (
              <div key={index} className="flex items-center shrink-0">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    index <= currentStep
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 text-gray-600'
                  }`}
                >
                  {index + 1}
                </div>
                <div className={`ml-2 text-sm ${index <= currentStep ? 'text-blue-600 font-medium' : 'text-gray-500'} whitespace-nowrap`}>
                  {step}
                </div>
                {index < steps.length - 1 && (
                  <div className={`mx-4 h-1 w-12 xl:w-16 ${index < currentStep ? 'bg-blue-600' : 'bg-gray-200'}`} />
                )}
              </div>
            ))}
          </div>
          
          {/* Mobile Timeline */}
          <div className="lg:hidden">
            <div className="flex items-center justify-center space-x-2 mb-4">
              {steps.map((_, index) => (
                <div
                  key={index}
                  className={`w-3 h-3 rounded-full ${
                    index <= currentStep ? 'bg-blue-600' : 'bg-gray-200'
                  }`}
                />
              ))}
            </div>
            <div className="text-center">
              <div className={`text-lg font-medium ${currentStep >= 0 ? 'text-blue-600' : 'text-gray-500'}`}>
                {steps[currentStep]}
              </div>
            </div>
          </div>
        </div>

        {/* Step Content */}
        <Card>
          <CardContent className="p-8">
            {renderStepContent()}
          </CardContent>
        </Card>

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-8">
          <Button
            variant="outline"
            onClick={prevStep}
            disabled={currentStep === 0}
          >
            ← Previous
          </Button>
          
          {currentStep < steps.length - 1 ? (
            <Button
              onClick={nextStep}
              disabled={currentStep === 0 && !selectedTemplate}
            >
              Next →
            </Button>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default ResumeBuilder;