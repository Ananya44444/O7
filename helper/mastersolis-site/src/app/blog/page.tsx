'use client';

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface BlogPost {
  _id: string;
  title: string;
  content: string;
  summary: string;
  author: string;
  category: string;
  tags: string[];
  publishedAt: string;
  readTime: number;
  isPublished: boolean;
  featuredImage?: string;
}

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Mock blog posts data
  const mockPosts: BlogPost[] = [
    {
      _id: '1',
      title: '10 Essential Skills Every Professional Needs in 2025',
      content: 'In today\'s rapidly evolving job market, staying competitive requires continuous skill development...',
      summary: 'Discover the top 10 skills that employers are looking for in 2025 and how to develop them effectively.',
      author: 'Sarah Johnson',
      category: 'career-tips',
      tags: ['skills', 'career-development', '2025-trends'],
      publishedAt: '2024-11-01',
      readTime: 8,
      isPublished: true,
      featuredImage: '/blog/skills-2025.jpg'
    },
    {
      _id: '2',
      title: 'How to Craft the Perfect Resume for ATS Systems',
      content: 'Applicant Tracking Systems (ATS) are used by 90% of large companies to filter resumes...',
      summary: 'Learn the secrets to creating an ATS-friendly resume that gets past automated filters and into human hands.',
      author: 'Michael Chen',
      category: 'resume-tips',
      tags: ['resume', 'ats', 'job-application'],
      publishedAt: '2024-10-28',
      readTime: 12,
      isPublished: true,
      featuredImage: '/blog/ats-resume.jpg'
    },
    {
      _id: '3',
      title: 'The Art of Salary Negotiation: A Complete Guide',
      content: 'Negotiating salary can be intimidating, but with the right approach and preparation...',
      summary: 'Master the art of salary negotiation with proven strategies and real-world examples.',
      author: 'Emily Rodriguez',
      category: 'salary',
      tags: ['negotiation', 'salary', 'career-growth'],
      publishedAt: '2024-10-25',
      readTime: 15,
      isPublished: true,
      featuredImage: '/blog/salary-negotiation.jpg'
    },
    {
      _id: '4',
      title: 'Remote Work: Best Practices for Productivity',
      content: 'Working from home has become the new normal for millions of professionals...',
      summary: 'Maximize your productivity while working remotely with these proven strategies and tools.',
      author: 'David Kim',
      category: 'remote-work',
      tags: ['remote-work', 'productivity', 'work-life-balance'],
      publishedAt: '2024-10-20',
      readTime: 10,
      isPublished: true,
      featuredImage: '/blog/remote-work.jpg'
    },
    {
      _id: '5',
      title: 'LinkedIn Optimization: Stand Out in 2025',
      content: 'Your LinkedIn profile is your digital business card and often the first impression...',
      summary: 'Transform your LinkedIn profile into a powerful career tool with these optimization strategies.',
      author: 'Sarah Johnson',
      category: 'linkedin',
      tags: ['linkedin', 'personal-branding', 'networking'],
      publishedAt: '2024-10-15',
      readTime: 7,
      isPublished: true,
      featuredImage: '/blog/linkedin-tips.jpg'
    },
    {
      _id: '6',
      title: 'Career Change at 40: It\'s Never Too Late',
      content: 'Thinking about changing careers later in life? You\'re not alone...',
      summary: 'Practical advice for professionals considering a career change after 40.',
      author: 'Michael Chen',
      category: 'career-change',
      tags: ['career-change', 'midlife', 'transition'],
      publishedAt: '2024-10-10',
      readTime: 11,
      isPublished: true,
      featuredImage: '/blog/career-change.jpg'
    }
  ];

  const categories = [
    { id: 'all', name: 'All Posts', icon: '📚' },
    { id: 'career-tips', name: 'Career Tips', icon: '💡' },
    { id: 'resume-tips', name: 'Resume Tips', icon: '📄' },
    { id: 'salary', name: 'Salary & Benefits', icon: '💰' },
    { id: 'remote-work', name: 'Remote Work', icon: '🏠' },
    { id: 'linkedin', name: 'LinkedIn', icon: '🔗' },
    { id: 'career-change', name: 'Career Change', icon: '🔄' }
  ];

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setPosts(mockPosts);
      setLoading(false);
    }, 1000);
  }, []);

  const filteredPosts = posts
    .filter(post => {
      const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
      const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           post.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      return matchesCategory && matchesSearch;
    })
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());

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
          <p className="mt-4 text-gray-600">Loading blog posts...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-linear-to-r from-blue-600 to-purple-700 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">Career Insights Blog</h1>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Expert advice, industry insights, and practical tips to accelerate your career growth 
            and navigate today's competitive job market.
          </p>
          
          {/* Search Bar */}
          <div className="max-w-md mx-auto">
            <input
              type="text"
              placeholder="Search articles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-3 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white"
            />
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-8 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-full font-medium transition-all ${
                  selectedCategory === category.id
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <span>{category.icon}</span>
                <span>{category.name}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Post */}
      {filteredPosts.length > 0 && (
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-8 text-center">Featured Article</h2>
            <Card className="overflow-hidden hover:shadow-xl transition-shadow">
              <div className="md:flex">
                <div className="md:w-1/3">
                  <div className="h-64 bg-linear-to-br from-blue-100 to-purple-100 flex items-center justify-center">
                    <span className="text-4xl">📖</span>
                  </div>
                </div>
                <div className="md:w-2/3 p-8">
                  <div className="flex items-center text-sm text-gray-500 mb-4">
                    <span>{formatDate(filteredPosts[0].publishedAt)}</span>
                    <span className="mx-2">•</span>
                    <span>{filteredPosts[0].readTime} min read</span>
                    <span className="mx-2">•</span>
                    <span>By {filteredPosts[0].author}</span>
                  </div>
                  
                  <h3 className="text-2xl font-bold mb-4">{filteredPosts[0].title}</h3>
                  <p className="text-gray-600 mb-6">{filteredPosts[0].summary}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-6">
                    {filteredPosts[0].tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                  
                  <Button>Read Full Article</Button>
                </div>
              </div>
            </Card>
          </div>
        </section>
      )}

      {/* Blog Posts Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8 text-center">Latest Articles</h2>
          
          {filteredPosts.length > 1 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.slice(1).map((post) => (
                <Card key={post._id} className="overflow-hidden hover:shadow-xl transition-shadow">
                  <div className="h-48 bg-linear-to-br from-blue-100 to-purple-100 flex items-center justify-center">
                    <span className="text-3xl">
                      {post.category === 'career-tips' ? '💡' :
                       post.category === 'resume-tips' ? '📄' :
                       post.category === 'salary' ? '💰' :
                       post.category === 'remote-work' ? '🏠' :
                       post.category === 'linkedin' ? '🔗' :
                       post.category === 'career-change' ? '🔄' : '📚'}
                    </span>
                  </div>
                  
                  <div className="p-6">
                    <div className="flex items-center text-sm text-gray-500 mb-3">
                      <span>{formatDate(post.publishedAt)}</span>
                      <span className="mx-2">•</span>
                      <span>{post.readTime} min read</span>
                    </div>
                    
                    <h3 className="text-lg font-semibold mb-3 line-clamp-2">{post.title}</h3>
                    <p className="text-gray-600 mb-4 line-clamp-3">{post.summary}</p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {post.tags.slice(0, 2).map((tag, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">By {post.author}</span>
                      <Button variant="outline" size="sm">Read More</Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          ) : filteredPosts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No articles found matching your search.</p>
              <Button 
                onClick={() => {setSearchTerm(''); setSelectedCategory('all');}}
                className="mt-4"
                variant="outline"
              >
                Clear Filters
              </Button>
            </div>
          ) : null}
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <Card className="max-w-2xl mx-auto p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Stay Updated</h2>
            <p className="text-gray-600 mb-6">
              Get the latest career insights and job market trends delivered to your inbox weekly.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Button>Subscribe</Button>
            </div>
            <p className="text-sm text-gray-500 mt-3">
              No spam, unsubscribe at any time.
            </p>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-linear-to-r from-blue-600 to-purple-700 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Take Action?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Turn insights into results. Get personalized career guidance from our experts.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-white text-blue-600 hover:bg-gray-100">
              Schedule Consultation
            </Button>
            <Button variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
              Explore Services
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}