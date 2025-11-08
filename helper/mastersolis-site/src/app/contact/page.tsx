'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    subject: '',
    message: '',
    preferredContact: 'email'
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 2000);
  };

  if (submitted) {
    return (
      <div className="min-h-screen academy-bg flex items-center justify-center relative">
        <div className="academy-bg-pattern"></div>
        <div className="max-w-md mx-auto academy-glass p-8 text-center border academy-border rounded-xl relative z-10">
          <div className="academy-gradient w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-xl font-bold academy-text-gradient mb-4">Message Sent Successfully!</h2>
          <p className="academy-text-muted mb-6 text-sm leading-relaxed">
            Thank you for your interest in our programs. Our admissions team will contact you within 24 hours.
          </p>
          <Button onClick={() => setSubmitted(false)} className="academy-btn-primary">
            Send Another Message
          </Button>
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
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
          </div>
          <h1 className="text-4xl font-bold academy-text-gradient mb-6">Get In Touch</h1>
          <p className="text-lg academy-text-muted mb-8 max-w-3xl mx-auto leading-relaxed">
            Ready to launch your tech career? Connect with our admissions team to learn about our 
            bootcamp programs and find the perfect path for your goals.
          </p>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-16 relative z-10">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="academy-glass p-6 text-center hover:shadow-2xl transition-all duration-300 border academy-border rounded-xl">
              <div className="academy-gradient w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold academy-text-primary mb-2">Phone</h3>
              <p className="academy-text-muted mb-2 text-sm">+91 9876543210</p>
              <p className="text-xs academy-text-muted opacity-75">Mon-Fri, 9AM-6PM IST</p>
            </div>

            <div className="academy-glass p-6 text-center hover:shadow-2xl transition-all duration-300 border academy-border rounded-xl">
              <div className="academy-gradient w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold academy-text-primary mb-2">Email</h3>
              <p className="academy-text-muted mb-2 text-sm">admissions@techacademy.com</p>
              <p className="text-xs academy-text-muted opacity-75">We reply within 24 hours</p>
            </div>

            <div className="academy-glass p-6 text-center hover:shadow-2xl transition-all duration-300 border academy-border rounded-xl">
              <div className="academy-gradient w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold academy-text-primary mb-2">Campus</h3>
              <p className="academy-text-muted mb-2 text-sm">Tech Innovation Hub<br/>Bangalore, Karnataka</p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="max-w-2xl mx-auto">
            <div className="academy-glass p-8 border academy-border rounded-xl">
              <h2 className="text-2xl font-bold academy-text-gradient text-center mb-8">Start Your Application</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2 academy-text-primary">First Name *</label>
                    <Input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      required
                      placeholder="Your first name"
                      className="academy-input"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2 academy-text-primary">Last Name *</label>
                    <Input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      required
                      placeholder="Your last name"
                      className="academy-input"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2 academy-text-primary">Email *</label>
                    <Input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      placeholder="your.email@example.com"
                      className="academy-input"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2 academy-text-primary">Phone</label>
                    <Input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="+91 9876543210"
                      className="academy-input"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 academy-text-primary">Background</label>
                  <Input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    placeholder="Current role or educational background (optional)"
                    className="academy-input"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 academy-text-primary">Program Interest *</label>
                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="academy-input w-full"
                  >
                    <option value="">Select a program</option>
                    <option value="full-stack">Full-Stack Development</option>
                    <option value="data-science">Data Science & AI</option>
                    <option value="digital-marketing">Digital Marketing</option>
                    <option value="ui-ux">UI/UX Design</option>
                    <option value="devops">DevOps & Cloud</option>
                    <option value="consultation">General Consultation</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 academy-text-primary">Message *</label>
                  <Textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={6}
                    placeholder="Tell us about your goals, experience level, and what you hope to achieve..."
                    className="academy-input"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 academy-text-primary">Preferred Contact Method</label>
                  <div className="flex gap-6">
                    <label className="flex items-center academy-text-muted">
                      <input
                        type="radio"
                        name="preferredContact"
                        value="email"
                        checked={formData.preferredContact === 'email'}
                        onChange={handleInputChange}
                        className="mr-2 accent-blue-500"
                      />
                      Email
                    </label>
                    <label className="flex items-center academy-text-muted">
                      <input
                        type="radio"
                        name="preferredContact"
                        value="phone"
                        checked={formData.preferredContact === 'phone'}
                        onChange={handleInputChange}
                        className="mr-2 accent-blue-500"
                      />
                      Phone
                    </label>
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full academy-btn-primary"
                >
                  {loading ? 'Submitting Application...' : 'Submit Application'}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 relative z-10">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold academy-text-gradient text-center mb-12">Frequently Asked Questions</h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {[
              {
                question: 'How quickly can I expect a response?',
                answer: 'Our admissions team typically responds within 24 hours. For urgent program inquiries, you can call us directly during business hours.'
              },
              {
                question: 'Do you offer program previews?',
                answer: 'Yes! We offer free info sessions and bootcamp previews to help you understand our curriculum and teaching approach before enrolling.'
              },
              {
                question: 'What are the program requirements?',
                answer: 'Requirements vary by program. Most require basic computer literacy and motivation to learn. Some advanced tracks may need prior experience.'
              },
              {
                question: 'Are your programs available online?',
                answer: 'Yes, we offer both in-person and fully remote options for all programs, with the same curriculum and instructor support.'
              },
              {
                question: 'What financing options do you offer?',
                answer: 'We provide payment plans, income share agreements (ISA), and partnerships with educational lenders to make our programs accessible.'
              },
              {
                question: 'Do you provide career support after graduation?',
                answer: 'Absolutely! We offer lifetime career support including job placement assistance, interview prep, and access to our alumni network.'
              }
            ].map((faq, index) => (
              <div key={index} className="academy-glass p-6 border academy-border rounded-xl">
                <h3 className="font-bold mb-3 academy-text-primary text-sm">{faq.question}</h3>
                <p className="academy-text-muted text-sm leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Admissions Hours */}
      <section className="py-16 relative z-10">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl font-bold academy-text-gradient mb-8">Admissions Office</h2>
            <div className="academy-glass p-6 border academy-border rounded-xl">
              <div className="grid grid-cols-2 gap-6 text-sm">
                <div>
                  <div className="font-bold mb-3 academy-text-primary">Office Hours</div>
                  <div className="space-y-2 academy-text-muted">
                    <div>Monday - Friday: 9:00 AM - 6:00 PM IST</div>
                    <div>Saturday: 10:00 AM - 2:00 PM IST</div>
                    <div>Sunday: Closed</div>
                  </div>
                </div>
                <div>
                  <div className="font-bold mb-3 academy-text-primary">Student Support</div>
                  <div className="space-y-2 academy-text-muted">
                    <div>24/7 Email Support</div>
                    <div>Same-day response for applications</div>
                    <div>Priority support for enrolled students</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}