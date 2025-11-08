import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

const HeroSection: React.FC = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        {/* Floating Academic Elements */}
        <div className="absolute top-20 left-10 academy-float text-6xl opacity-20">📚</div>
        <div className="absolute top-40 right-20 academy-float text-5xl opacity-15" style={{animationDelay: '2s'}}>🎓</div>
        <div className="absolute bottom-32 left-20 academy-float text-4xl opacity-25" style={{animationDelay: '4s'}}>💡</div>
        <div className="absolute bottom-40 right-10 academy-float text-6xl opacity-20" style={{animationDelay: '1s'}}>🚀</div>
        <div className="absolute top-60 left-1/2 academy-float text-5xl opacity-15" style={{animationDelay: '3s'}}>⭐</div>
        
        {/* Gradient Orbs */}
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-linear-to-br from-blue-500/20 to-purple-600/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-linear-to-br from-purple-500/20 to-pink-600/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-linear-to-br from-cyan-500/10 to-blue-600/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center academy-slide-in">
          {/* Badge */}
          <div className="inline-flex items-center px-6 py-3 rounded-full academy-glass mb-8">
            <span className="text-sm font-medium text-academy-text-secondary mr-2">🎯</span>
            <span className="text-sm font-medium text-academy-text-secondary">Welcome to MasterSolis Academy</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl sm:text-6xl lg:text-8xl font-bold mb-8 leading-tight">
            <span className="block academy-text-gradient academy-glow">Master Your</span>
            <span className="block academy-text-gradient academy-glow">Future Today</span>
          </h1>
          
          {/* Subheading */}
          <p className="text-xl sm:text-2xl text-academy-text-secondary mb-12 max-w-4xl mx-auto leading-relaxed">
            🎓 <span className="font-semibold">Learn. Build. Succeed.</span> Join thousands of students mastering 
            cutting-edge skills with our comprehensive learning platform. From resume building to 
            career advancement - your academic journey starts here.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
            <Link href="/auth/register">
              <Button className="academy-btn-primary text-lg px-12 py-6 rounded-2xl font-bold shadow-2xl hover:scale-105 transition-all duration-300">
                🚀 Start Learning Now
              </Button>
            </Link>
            <Link href="/about">
              <Button className="academy-btn-secondary text-lg px-12 py-6 rounded-2xl font-bold hover:scale-105 transition-all duration-300">
                📖 Explore Courses
              </Button>
            </Link>
          </div>

          {/* Academy Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 max-w-4xl mx-auto">
            <div className="academy-glass-card p-6 rounded-3xl academy-card-hover">
              <div className="text-4xl mb-2">📚</div>
              <div className="text-3xl font-bold academy-text-gradient mb-2">500+</div>
              <div className="text-academy-text-secondary font-medium">Courses Available</div>
            </div>
            <div className="academy-glass-card p-6 rounded-3xl academy-card-hover">
              <div className="text-4xl mb-2">👨‍🎓</div>
              <div className="text-3xl font-bold academy-text-gradient mb-2">10K+</div>
              <div className="text-academy-text-secondary font-medium">Active Students</div>
            </div>
            <div className="academy-glass-card p-6 rounded-3xl academy-card-hover">
              <div className="text-4xl mb-2">🏆</div>
              <div className="text-3xl font-bold academy-text-gradient mb-2">95%</div>
              <div className="text-academy-text-secondary font-medium">Success Rate</div>
            </div>
            <div className="academy-glass-card p-6 rounded-3xl academy-card-hover">
              <div className="text-4xl mb-2">💼</div>
              <div className="text-3xl font-bold academy-text-gradient mb-2">2K+</div>
              <div className="text-academy-text-secondary font-medium">Career Placements</div>
            </div>
          </div>
        </div>
      </div>

      
    </section>
  );
};

export default HeroSection;