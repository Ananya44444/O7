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
      title: 'React 19 Features Every Developer Should Know',
      content: 'React 19 introduces exciting new features that will revolutionize how we build web applications...',
      summary: 'Explore the latest React 19 features including Server Components, concurrent rendering, and the new compiler.',
      author: 'Prof. Sarah Johnson',
      category: 'web-development',
      tags: ['react', 'javascript', 'frontend'],
      publishedAt: '2024-11-01',
      readTime: 8,
      isPublished: true,
      featuredImage: '/blog/react-19.jpg'
    },
    {
      _id: '2',
      title: 'Machine Learning Fundamentals for Beginners',
      content: 'Starting your journey in machine learning can seem overwhelming, but with the right foundation...',
      summary: 'A comprehensive guide to machine learning concepts, algorithms, and practical applications for newcomers.',
      author: 'Dr. Michael Chen',
      category: 'data-science',
      tags: ['machine-learning', 'python', 'ai'],
      publishedAt: '2024-10-28',
      readTime: 12,
      isPublished: true,
      featuredImage: '/blog/ml-fundamentals.jpg'
    },
    {
      _id: '3',
      title: 'Building Scalable APIs with Node.js and Express',
      content: 'Creating robust, scalable APIs is crucial for modern web applications...',
      summary: 'Learn best practices for building production-ready APIs using Node.js, Express, and modern development patterns.',
      author: 'Emily Rodriguez',
      category: 'backend',
      tags: ['nodejs', 'express', 'api-design'],
      publishedAt: '2024-10-25',
      readTime: 15,
      isPublished: true,
      featuredImage: '/blog/nodejs-api.jpg'
    },
    {
      _id: '4',
      title: 'UI/UX Design Trends Shaping 2025',
      content: 'The design landscape is constantly evolving, and 2025 brings exciting new trends...',
      summary: 'Discover the latest UI/UX design trends, from AI-assisted design to immersive experiences.',
      author: 'David Kim',
      category: 'design',
      tags: ['ui-ux', 'design-trends', 'user-experience'],
      publishedAt: '2024-10-20',
      readTime: 10,
      isPublished: true,
      featuredImage: '/blog/design-trends.jpg'
    },
    {
      _id: '5',
      title: 'Docker and Kubernetes: Container Orchestration Guide',
      content: 'Container orchestration has become essential for modern application deployment...',
      summary: 'Master containerization and orchestration with Docker and Kubernetes for scalable applications.',
      author: 'Prof. Sarah Johnson',
      category: 'devops',
      tags: ['docker', 'kubernetes', 'containers'],
      publishedAt: '2024-10-15',
      readTime: 7,
      isPublished: true,
      featuredImage: '/blog/docker-k8s.jpg'
    },
    {
      _id: '6',
      title: 'Breaking into Tech: A Bootcamp Graduate\'s Journey',
      content: 'Transitioning from a non-tech background to a successful career in technology...',
      summary: 'Real success story of a bootcamp graduate who landed a senior developer role within 6 months.',
      author: 'Alumni Spotlight',
      category: 'success-stories',
      tags: ['career-change', 'bootcamp', 'success-story'],
      publishedAt: '2024-10-10',
      readTime: 11,
      isPublished: true,
      featuredImage: '/blog/success-story.jpg'
    }
  ];

  const categories = [
    { id: 'all', name: 'All Posts', icon: '📚' },
    { id: 'web-development', name: 'Web Development', icon: '�' },
    { id: 'data-science', name: 'Data Science', icon: '�' },
    { id: 'backend', name: 'Backend', icon: '⚙️' },
    { id: 'design', name: 'UI/UX Design', icon: '�' },
    { id: 'devops', name: 'DevOps', icon: '☁️' },
    { id: 'success-stories', name: 'Success Stories', icon: '🏆' }
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
      <div className="min-h-screen academy-bg flex items-center justify-center relative">
        <div className="academy-bg-pattern"></div>
        <div className="text-center relative z-10">
          <div className="academy-gradient w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
            <svg className="w-8 h-8 text-white animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </div>
          <p className="academy-text-muted">Loading academy insights...</p>
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
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
          </div>
          <h1 className="text-4xl font-bold academy-text-gradient mb-6">Academy Insights</h1>
          <p className="text-lg academy-text-muted mb-8 max-w-3xl mx-auto leading-relaxed">
            Stay ahead in tech with expert insights, industry trends, and practical guides 
            from our academy instructors and successful alumni.
          </p>
          
          {/* Search Bar */}
          <div className="max-w-md mx-auto">
            <input
              type="text"
              placeholder="Search tech articles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="academy-input w-full"
            />
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-8 relative z-10">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-xl font-medium transition-all text-sm ${
                  selectedCategory === category.id
                    ? 'academy-gradient text-white shadow-xl'
                    : 'academy-glass academy-text-muted hover:shadow-lg border academy-border'
                }`}
              >
                <span className="text-lg">{category.icon}</span>
                <span>{category.name}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Post */}
      {filteredPosts.length > 0 && (
        <section className="py-12 relative z-10">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold academy-text-gradient mb-8 text-center">Featured Article</h2>
            <div className="academy-glass overflow-hidden hover:shadow-2xl transition-all duration-300 border academy-border rounded-xl">
              <div className="md:flex">
                <div className="md:w-1/3">
                  <div className="h-64 academy-gradient flex items-center justify-center relative">
                    <div className="absolute inset-0 bg-black/20"></div>
                    <span className="text-4xl relative z-10 text-white">📖</span>
                  </div>
                </div>
                <div className="md:w-2/3 p-8">
                  <div className="flex items-center text-sm academy-text-muted mb-4">
                    <span>{formatDate(filteredPosts[0].publishedAt)}</span>
                    <span className="mx-2">•</span>
                    <span>{filteredPosts[0].readTime} min read</span>
                    <span className="mx-2">•</span>
                    <span>By {filteredPosts[0].author}</span>
                  </div>
                  
                  <h3 className="text-xl font-bold academy-text-primary mb-4">{filteredPosts[0].title}</h3>
                  <p className="academy-text-muted mb-6 text-sm leading-relaxed">{filteredPosts[0].summary}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-6">
                    {filteredPosts[0].tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 academy-glass border academy-border rounded-full text-xs academy-text-primary"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                  
                  <Button className="academy-btn-primary">Read Full Article</Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Blog Posts Grid */}
      <section className="py-16 relative z-10">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold academy-text-gradient mb-8 text-center">Latest Articles</h2>
          
          {filteredPosts.length > 1 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.slice(1).map((post) => (
                <div key={post._id} className="academy-glass overflow-hidden hover:shadow-2xl transition-all duration-300 border academy-border rounded-xl">
                  <div className="h-48 academy-gradient flex items-center justify-center relative">
                    <div className="absolute inset-0 bg-black/20"></div>
                    <span className="text-3xl relative z-10 text-white">
                      {post.category === 'web-development' ? '�' :
                       post.category === 'data-science' ? '�' :
                       post.category === 'backend' ? '⚙️' :
                       post.category === 'design' ? '�' :
                       post.category === 'devops' ? '☁️' :
                       post.category === 'success-stories' ? '🏆' : '📚'}
                    </span>
                  </div>
                  
                  <div className="p-6">
                    <div className="flex items-center text-sm academy-text-muted mb-3">
                      <span>{formatDate(post.publishedAt)}</span>
                      <span className="mx-2">•</span>
                      <span>{post.readTime} min read</span>
                    </div>
                    
                    <h3 className="text-lg font-bold academy-text-primary mb-3 line-clamp-2">{post.title}</h3>
                    <p className="academy-text-muted mb-4 line-clamp-3 text-sm leading-relaxed">{post.summary}</p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {post.tags.slice(0, 2).map((tag, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 academy-glass border academy-border rounded-full text-xs academy-text-primary"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm academy-text-muted">By {post.author}</span>
                      <Button variant="outline" size="sm" className="academy-btn-secondary text-xs">Read More</Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : filteredPosts.length === 0 ? (
            <div className="text-center py-12">
              <p className="academy-text-muted text-lg">No articles found matching your search.</p>
              <Button 
                onClick={() => {setSearchTerm(''); setSelectedCategory('all');}}
                className="mt-4 academy-btn-secondary"
                variant="outline"
              >
                Clear Filters
              </Button>
            </div>
          ) : null}
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-16 relative z-10">
        <div className="container mx-auto px-4">
          <div className="academy-glass max-w-2xl mx-auto p-8 text-center border academy-border rounded-xl">
            <h2 className="text-2xl font-bold academy-text-gradient mb-4">Stay Updated</h2>
            <p className="academy-text-muted mb-6 text-sm leading-relaxed">
              Get the latest tech insights, programming tutorials, and academy updates delivered weekly.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                placeholder="Enter your email address"
                className="academy-input flex-1"
              />
              <Button className="academy-btn-primary">Subscribe</Button>
            </div>
            <p className="text-xs academy-text-muted mt-3">
              No spam, unsubscribe at any time.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}