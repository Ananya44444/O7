'use client';

import React, { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface Testimonial {
  _id: string;
  name: string;
  position: string;
  company: string;
  content: string;
  rating: number;
  image?: string;
}

const TestimonialCarousel: React.FC = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  // Mock data for now - will be replaced with API call
  useEffect(() => {
    const mockTestimonials: Testimonial[] = [
      {
        _id: '1',
        name: 'Ananya Sharma',
        position: 'Full-Stack Developer',
        company: 'Google',
        content: 'MasterSolis Academy completely transformed my career! The Full-Stack Development program gave me the skills I needed to land my dream job at Google. The mentorship and hands-on projects were incredible.',
        rating: 5
      },
      {
        _id: '2',
        name: 'Twarita Patel',
        position: 'Data Scientist',
        company: 'Microsoft',
        content: 'The Data Science & AI program exceeded my expectations. The curriculum is cutting-edge and the instructors are industry experts. I went from beginner to landing a role at Microsoft in just 8 months!',
        rating: 5
      },
      {
        _id: '3',
        name: 'Wamika Singh',
        position: 'Digital Marketing Manager',
        company: 'Amazon',
        content: 'As a career changer, I was nervous about learning digital marketing. But the academy made it so accessible and practical. The career services team helped me secure my role at Amazon. Forever grateful!',
        rating: 5
      },
      {
        _id: '4',
        name: 'Tanmay Kumar',
        position: 'Software Engineer',
        company: 'Netflix',
        content: 'The resume builder and career coaching were game-changers. I got 5x more interview calls and finally broke into tech. The academy doesn\'t just teach - they ensure you succeed.',
        rating: 5
      }
    ];

    setTimeout(() => {
      setTestimonials(mockTestimonials);
      setLoading(false);
    }, 500);
  }, []);

  // Auto-rotate testimonials
  useEffect(() => {
    if (testimonials.length === 0) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [testimonials]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <span
        key={index}
        className={`text-2xl transition-all duration-300 ${
          index < rating 
            ? 'text-academy-accent drop-shadow-sm' 
            : 'text-academy-dark-light/30'
        }`}
      >
        ★
      </span>
    ));
  };

  if (loading) {
    return (
      <section className="py-24 relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold academy-text-gradient mb-6">Student Success Stories</h2>
          </div>
          <div className="animate-pulse">
            <div className="academy-glass-card h-96 rounded-3xl"></div>
          </div>
        </div>
      </section>
    );
  }

  if (testimonials.length === 0) {
    return null;
  }

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section className="py-24 relative">
      <div className="academy-bg-pattern"></div>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold academy-text-gradient mb-6">Student Success Stories</h2>
          <p className="text-xl academy-text-muted max-w-3xl mx-auto">
            Real graduates, real transformations, real careers. See how MasterSolis Academy helped our students achieve their dreams in top tech companies.
          </p>
        </div>

        <div className="academy-glass-card p-8 lg:p-12 rounded-3xl">
          <div className="text-center">
            {/* Profile Image with Graduation Badge */}
            <div className="relative w-24 h-24 academy-gradient rounded-full flex items-center justify-center mx-auto mb-8 shadow-xl">
              <span className="text-3xl text-white font-bold">
                {currentTestimonial.name.charAt(0)}
              </span>
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-academy-accent rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                </svg>
              </div>
            </div>

            {/* Enhanced Stars */}
            <div className="flex justify-center mb-8 space-x-1">
              {renderStars(currentTestimonial.rating)}
            </div>

            {/* Quote with Enhanced Styling */}
            <blockquote className="text-xl lg:text-2xl academy-text-light italic mb-8 leading-relaxed relative">
              <span className="text-5xl text-academy-primary/30 absolute -top-4 -left-4">"</span>
              {currentTestimonial.content}
              <span className="text-5xl text-academy-primary/30 absolute -bottom-8 -right-4">"</span>
            </blockquote>

            {/* Author Info with Company Badge */}
            <div className="text-center">
              <div className="text-2xl font-bold text-white mb-2">
                {currentTestimonial.name}
              </div>
              <div className="flex items-center justify-center space-x-2 flex-wrap">
                <span className="academy-text-muted text-lg">{currentTestimonial.position}</span>
                <span className="text-academy-accent font-medium">at</span>
                <span className="academy-gradient-text font-bold text-lg">{currentTestimonial.company}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Carousel Indicators */}
        <div className="flex justify-center mt-12 space-x-3">
          {testimonials.map((_, index) => (
            <Button
              key={index}
              variant="ghost"
              size="icon"
              className={`w-4 h-4 rounded-full p-0 transition-all duration-300 hover:scale-110 ${
                index === currentIndex
                  ? 'bg-academy-primary shadow-lg shadow-academy-primary/50'
                  : 'bg-academy-dark-light/40 hover:bg-academy-primary/60'
              }`}
              onClick={() => goToSlide(index)}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialCarousel;