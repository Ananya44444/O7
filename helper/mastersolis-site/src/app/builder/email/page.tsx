'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

interface EmailTemplate {
  id: string;
  title: string;
  description: string;
  icon: string;
  subject: string;
  body: string;
  placeholders: string[];
}

const emailTemplates: EmailTemplate[] = [
  {
    id: 'job-application',
    title: 'Applying for a Job',
    description: 'Professional job application email template',
    icon: '💼',
    subject: 'Application for [Role] at [Company]',
    body: `Hi [Hiring Manager's Name],

I hope you're doing well. I came across the [Role] opening at [Company] and believe my skills in [Skill 1], [Skill 2], and [Skill 3] make me a strong fit for this position.

With [Years of Experience] years of experience in [Domain], I have successfully [Achievement/Project]. I'm particularly excited about [Specific Company/Role Detail] and how I can contribute to your team's success.

Attached is my resume for your review. I'd appreciate the opportunity to discuss how I can contribute to your team and would welcome the chance to interview for this position.

Best regards,
[Your Name]
[Your LinkedIn] | [Your Contact]`,
    placeholders: ['Hiring Manager\'s Name', 'Role', 'Company', 'Skill 1', 'Skill 2', 'Skill 3', 'Years of Experience', 'Domain', 'Achievement/Project', 'Specific Company/Role Detail', 'Your Name', 'Your LinkedIn', 'Your Contact']
  },
  {
    id: 'mentorship',
    title: 'Asking for Mentorship',
    description: 'Request guidance from industry professionals',
    icon: '🤝',
    subject: 'Request for Mentorship in [Field/Skill]',
    body: `Hello [Mentor's Name],

I hope this message finds you well. I've been following your work in [Field] and deeply admire your expertise, particularly your work on [Specific Project/Achievement].

I'm currently exploring [Your Area/Goal] and am at a stage where guidance from someone with your experience would be invaluable. I'm especially interested in learning about [Specific Topic/Skill] and how to [Specific Goal].

I understand you have a busy schedule, but I would be incredibly grateful for any mentorship or advice you could share. Even a brief conversation would mean a great deal to me and my career development.

Looking forward to learning from your experience.

Warm regards,
[Your Name]
[Your Contact] | [Your LinkedIn]`,
    placeholders: ['Mentor\'s Name', 'Field', 'Specific Project/Achievement', 'Your Area/Goal', 'Specific Topic/Skill', 'Specific Goal', 'Your Name', 'Your Contact', 'Your LinkedIn']
  },
  {
    id: 'referral',
    title: 'Asking for Referral',
    description: 'Request job referral from your network',
    icon: '🔗',
    subject: 'Request for Referral for [Role] at [Company]',
    body: `Hi [Name],

I hope you're doing well! I noticed you work at [Company] and have had great success there. I'm really interested in applying for the [Role] position that was recently posted.

With my background in [Domain/Skillset] and experience with [Relevant Experience], I believe I'd be a strong fit for this opportunity. I've attached my resume and would be happy to share more details about my qualifications.

I understand that referrals are valuable, and I wouldn't ask if I wasn't confident in my ability to contribute meaningfully to the team. Would you be comfortable referring me for this position, or could you point me toward the right person to connect with?

Thanks a lot for considering, and I'd be happy to return the favor anytime!

Best,
[Your Name]
[Your Contact] | [Your LinkedIn]`,
    placeholders: ['Name', 'Company', 'Role', 'Domain/Skillset', 'Relevant Experience', 'Your Name', 'Your Contact', 'Your LinkedIn']
  },
  {
    id: 'doubt-clarification',
    title: 'Doubt Clarification',
    description: 'Ask questions and seek help professionally',
    icon: '❓',
    subject: 'Clarification on [Topic/Question]',
    body: `Hi [Name],

I hope you're doing great. I wanted to reach out to ask a quick question regarding [Topic/Technology].

I'm currently working on [Context/Project] and have encountered [Specific Challenge/Question]. Based on your expertise in [Their Area of Expertise], I thought you might have some insights that could help me move forward.

Specifically, I'm wondering about [Detailed Question]. I've already tried [What You've Attempted] but am still facing [Specific Issue].

I understand you're busy, so I really appreciate any time you can spare to help. Thank you for considering my request!

Regards,
[Your Name]
[Your Contact]`,
    placeholders: ['Name', 'Topic/Technology', 'Context/Project', 'Specific Challenge/Question', 'Their Area of Expertise', 'Detailed Question', 'What You\'ve Attempted', 'Specific Issue', 'Your Name', 'Your Contact']
  }
];

const EmailBuilder: React.FC = () => {
  const [selectedTemplate, setSelectedTemplate] = useState<EmailTemplate | null>(null);
  const [emailData, setEmailData] = useState<{ [key: string]: string }>({});
  const [generatedEmail, setGeneratedEmail] = useState({ subject: '', body: '' });

  const handleTemplateSelect = (template: EmailTemplate) => {
    setSelectedTemplate(template);
    setGeneratedEmail({ subject: template.subject, body: template.body });
    
    // Initialize placeholder data
    const initialData: { [key: string]: string } = {};
    template.placeholders.forEach(placeholder => {
      initialData[placeholder] = '';
    });
    setEmailData(initialData);
  };

  const handleInputChange = (placeholder: string, value: string) => {
    setEmailData(prev => ({ ...prev, [placeholder]: value }));
    
    // Update generated email in real-time
    if (selectedTemplate) {
      let updatedSubject = selectedTemplate.subject;
      let updatedBody = selectedTemplate.body;
      
      Object.entries({ ...emailData, [placeholder]: value }).forEach(([key, val]) => {
        const regex = new RegExp(`\\[${key}\\]`, 'g');
        updatedSubject = updatedSubject.replace(regex, val || `[${key}]`);
        updatedBody = updatedBody.replace(regex, val || `[${key}]`);
      });
      
      setGeneratedEmail({ subject: updatedSubject, body: updatedBody });
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert('Copied to clipboard!');
  };

  const downloadAsText = () => {
    const content = `Subject: ${generatedEmail.subject}\n\n${generatedEmail.body}`;
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `email-${selectedTemplate?.id}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen academy-bg py-8 relative">
      <div className="academy-bg-pattern"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <div className="academy-gradient p-4 rounded-2xl shadow-xl">
              <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
              </svg>
            </div>
          </div>
          <h1 className="text-5xl font-bold academy-text-gradient mb-4">Email Builder Academy</h1>
          <p className="academy-text-muted text-xl max-w-3xl mx-auto">Master professional communication with our academy-powered email templates and customization tools</p>
        </div>

        {!selectedTemplate ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {emailTemplates.map((template) => (
              <div 
                key={template.id} 
                className="academy-glass-card cursor-pointer hover:scale-105 transition-all duration-300 p-6 rounded-3xl group"
                onClick={() => handleTemplateSelect(template)}
              >
                <div className="text-center">
                  <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">{template.icon}</div>
                  <h3 className="text-xl font-bold text-white mb-3">{template.title}</h3>
                  <p className="academy-text-muted leading-relaxed mb-6">{template.description}</p>
                  <Button className="academy-btn-primary w-full py-3">
                    <span>Choose Template</span>
                    <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Form Section */}
            <div className="space-y-8">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <span className="text-3xl">{selectedTemplate.icon}</span>
                  <h2 className="text-3xl font-bold academy-text-gradient">
                    {selectedTemplate.title}
                  </h2>
                </div>
                <Button 
                  variant="outline" 
                  onClick={() => setSelectedTemplate(null)}
                  className="academy-btn-secondary"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  Back to Templates
                </Button>
              </div>

              <div className="academy-glass-card p-8 rounded-3xl">
                <div className="mb-6">
                  <h3 className="text-xl font-bold text-white mb-2">Customize Your Email</h3>
                  <p className="academy-text-muted">
                    Fill in the details below to personalize your professional email
                  </p>
                </div>
                <div className="space-y-6">
                  {selectedTemplate.placeholders.map((placeholder) => (
                    <div key={placeholder}>
                      <label htmlFor={placeholder} className="block text-sm font-medium text-white mb-3">
                        {placeholder}
                      </label>
                      {placeholder.toLowerCase().includes('body') || placeholder.toLowerCase().includes('description') || placeholder.toLowerCase().includes('achievement') ? (
                        <Textarea
                          id={placeholder}
                          value={emailData[placeholder] || ''}
                          onChange={(e) => handleInputChange(placeholder, e.target.value)}
                          placeholder={`Enter ${placeholder.toLowerCase()}`}
                          rows={4}
                          className="academy-input min-h-[120px] resize-none"
                        />
                      ) : (
                        <Input
                          id={placeholder}
                          value={emailData[placeholder] || ''}
                          onChange={(e) => handleInputChange(placeholder, e.target.value)}
                          placeholder={`Enter ${placeholder.toLowerCase()}`}
                          className="academy-input h-12"
                        />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Preview Section */}
            <div className="space-y-8">
              <h2 className="text-3xl font-bold academy-text-gradient">Email Preview</h2>
              
              <div className="academy-glass-card p-6 rounded-3xl">
                <h3 className="text-lg font-bold text-white mb-4">Subject Line</h3>
                <div className="bg-academy-bg-tertiary/50 p-4 rounded-xl border border-academy-primary/20">
                  <p className="font-medium text-white">{generatedEmail.subject}</p>
                </div>
              </div>

              <div className="academy-glass-card p-6 rounded-3xl">
                <h3 className="text-lg font-bold text-white mb-4">Email Body</h3>
                <div className="bg-academy-bg-tertiary/50 p-6 rounded-xl border border-academy-primary/20">
                  <pre className="whitespace-pre-wrap font-sans text-sm leading-relaxed academy-text-light">
                    {generatedEmail.body}
                  </pre>
                </div>
              </div>

              <div className="flex space-x-4">
                <Button 
                  onClick={() => copyToClipboard(`Subject: ${generatedEmail.subject}\n\n${generatedEmail.body}`)}
                  className="academy-btn-primary flex-1 py-3"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                  </svg>
                  Copy Email
                </Button>
                <Button 
                  variant="outline" 
                  onClick={downloadAsText}
                  className="academy-btn-secondary flex-1 py-3"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Download
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmailBuilder;