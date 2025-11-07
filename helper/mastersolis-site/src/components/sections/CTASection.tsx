import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

const CTASection: React.FC = () => {
  return (
    <section className="py-20 bg-blue-600">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
          Ready to Advance Your Career?
        </h2>
        
        <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
          Join thousands of professionals who have transformed their careers 
          with our innovative platform. Start your journey today.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link href="/careers">
            <Button 
              size="lg" 
              variant="secondary"
              className="text-lg px-8 py-3 bg-white text-blue-600 hover:bg-gray-100"
            >
              Browse Jobs
            </Button>
          </Link>
          
          <Link href="/contact">
            <Button 
              size="lg" 
              variant="outline"
              className="text-lg px-8 py-3 border-white text-white hover:bg-white hover:text-blue-600"
            >
              Get in Touch
            </Button>
          </Link>
        </div>

        {/* Additional Features */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div>
            <div className="text-4xl mb-3">⚡</div>
            <h3 className="text-lg font-semibold text-white mb-2">Fast & Easy</h3>
            <p className="text-blue-100">
              Get started in minutes with our streamlined process
            </p>
          </div>
          
          <div>
            <div className="text-4xl mb-3">🎯</div>
            <h3 className="text-lg font-semibold text-white mb-2">AI-Powered</h3>
            <p className="text-blue-100">
              Leverage artificial intelligence for better results
            </p>
          </div>
          
          <div>
            <div className="text-4xl mb-3">🏆</div>
            <h3 className="text-lg font-semibold text-white mb-2">Proven Results</h3>
            <p className="text-blue-100">
              Join our successful community of professionals
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;