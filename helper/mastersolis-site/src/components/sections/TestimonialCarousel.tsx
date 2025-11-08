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
        name: 'Ananya',
        position: 'Senior Developer',
        company: 'TechCorp',
        content: 'MasterSolis helped me land my dream job! The resume builder and career guidance were invaluable. The platform is intuitive and the results speak for themselves.',
        rating: 5
      },
      {
        _id: '2',
        name: 'Twarita',
        position: 'Product Manager',
        company: 'InnovateCo',
        content: 'The AI-powered resume optimization gave me the edge I needed. I got 3x more interview calls after using their platform. Highly recommended!',
        rating: 5
      },
      {
        _id: '3',
        name: 'Wamika',
        position: 'UX Designer',
        company: 'DesignStudio',
        content: 'Professional, efficient, and results-driven. MasterSolis transformed my job search experience and helped me transition into a better role.',
        rating: 5
      },
      {
        _id: '4',
        name: 'Tanmay',
        position: 'Data Scientist',
        company: 'DataTech',
        content: 'The technology solutions provided by MasterSolis are top-notch. Their team understands modern career challenges and provides real solutions.',
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
        className={`text-xl ${
          index < rating ? 'text-yellow-400' : 'text-gray-300'
        }`}
      >
        ★
      </span>
    ));
  };

  if (loading) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">What Our Clients Say</h2>
          </div>
          <div className="animate-pulse">
            <div className="bg-gray-200 h-64 rounded-lg"></div>
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
    <section className="py-16 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">What Our Clients Say</h2>
          <p className="text-lg text-gray-600">
            Don't just take our word for it - hear from our satisfied clients
          </p>
        </div>

        <Card className="bg-white shadow-xl">
          <CardContent className="p-8 lg:p-12">
            <div className="text-center">
              {/* Profile Image Placeholder */}
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl text-blue-600 font-bold">
                  {currentTestimonial.name.charAt(0)}
                </span>
              </div>

              {/* Stars */}
              <div className="flex justify-center mb-6">
                {renderStars(currentTestimonial.rating)}
              </div>

              {/* Testimonial Content */}
              <blockquote className="text-xl text-gray-700 italic mb-8 leading-relaxed">
                "{currentTestimonial.content}"
              </blockquote>

              {/* Author Info */}
              <div className="text-center">
                <div className="font-semibold text-gray-900 text-lg">
                  {currentTestimonial.name}
                </div>
                <div className="text-gray-600">
                  {currentTestimonial.position} at {currentTestimonial.company}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Carousel Indicators */}
        <div className="flex justify-center mt-8 space-x-2">
          {testimonials.map((_, index) => (
            <Button
              key={index}
              variant="ghost"
              size="icon"
              className={`w-3 h-3 rounded-full p-0 ${
                index === currentIndex
                  ? 'bg-blue-600'
                  : 'bg-gray-300 hover:bg-gray-400'
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