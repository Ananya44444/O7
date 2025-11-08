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
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Email Template Builder</h1>
          <p className="text-gray-600">Choose a template and customize it for your needs</p>
        </div>

        {!selectedTemplate ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {emailTemplates.map((template) => (
              <Card 
                key={template.id} 
                className="cursor-pointer hover:shadow-lg transition-shadow border-2 hover:border-blue-500"
                onClick={() => handleTemplateSelect(template)}
              >
                <CardHeader className="text-center">
                  <div className="text-4xl mb-2">{template.icon}</div>
                  <CardTitle className="text-lg">{template.title}</CardTitle>
                  <CardDescription>{template.description}</CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <Button className="w-full">Select Template</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Form Section */}
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">
                  {selectedTemplate.icon} {selectedTemplate.title}
                </h2>
                <Button 
                  variant="outline" 
                  onClick={() => setSelectedTemplate(null)}
                >
                  ← Back to Templates
                </Button>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Fill in the Details</CardTitle>
                  <CardDescription>
                    Complete the form below to personalize your email
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {selectedTemplate.placeholders.map((placeholder) => (
                    <div key={placeholder}>
                      <label htmlFor={placeholder} className="block text-sm font-medium text-gray-700 mb-1">
                        {placeholder}
                      </label>
                      {placeholder.toLowerCase().includes('body') || placeholder.toLowerCase().includes('description') || placeholder.toLowerCase().includes('achievement') ? (
                        <Textarea
                          id={placeholder}
                          value={emailData[placeholder] || ''}
                          onChange={(e) => handleInputChange(placeholder, e.target.value)}
                          placeholder={`Enter ${placeholder.toLowerCase()}`}
                          rows={3}
                        />
                      ) : (
                        <Input
                          id={placeholder}
                          value={emailData[placeholder] || ''}
                          onChange={(e) => handleInputChange(placeholder, e.target.value)}
                          placeholder={`Enter ${placeholder.toLowerCase()}`}
                        />
                      )}
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Preview Section */}
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900">Email Preview</h2>
              
              <Card>
                <CardHeader>
                  <CardTitle>Subject Line</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-gray-50 p-4 rounded-lg border">
                    <p className="font-medium">{generatedEmail.subject}</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Email Body</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-gray-50 p-4 rounded-lg border">
                    <pre className="whitespace-pre-wrap font-sans text-sm leading-relaxed">
                      {generatedEmail.body}
                    </pre>
                  </div>
                </CardContent>
              </Card>

              <div className="flex space-x-4">
                <Button 
                  onClick={() => copyToClipboard(`Subject: ${generatedEmail.subject}\n\n${generatedEmail.body}`)}
                  className="flex-1"
                >
                  📋 Copy Email
                </Button>
                <Button 
                  variant="outline" 
                  onClick={downloadAsText}
                  className="flex-1"
                >
                  💾 Download
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