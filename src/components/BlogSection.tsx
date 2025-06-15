
import React, { useState } from 'react';
import { BookOpen, Calendar, Clock, ExternalLink, Tag } from 'lucide-react';

const BlogSection = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const articles = [
    {
      id: 1,
      title: 'Building Scalable AI Applications with Python and TensorFlow',
      excerpt: 'A comprehensive guide to developing and deploying machine learning models in production environments.',
      category: 'AI/ML',
      date: '2024-03-15',
      readTime: '8 min read',
      tags: ['Python', 'TensorFlow', 'AI', 'Machine Learning'],
      link: '#',
      featured: true
    },
    {
      id: 2,
      title: 'Modern React Patterns: Hooks, Context, and Performance',
      excerpt: 'Exploring advanced React patterns and best practices for building maintainable applications.',
      category: 'Frontend',
      date: '2024-03-10',
      readTime: '6 min read',
      tags: ['React', 'JavaScript', 'Performance', 'Hooks'],
      link: '#',
      featured: false
    },
    {
      id: 3,
      title: 'Microservices Architecture: Design Patterns and Best Practices',
      excerpt: 'Deep dive into microservices architecture, including communication patterns and deployment strategies.',
      category: 'Backend',
      date: '2024-03-05',
      readTime: '12 min read',
      tags: ['Microservices', 'Architecture', 'Docker', 'Kubernetes'],
      link: '#',
      featured: true
    },
    {
      id: 4,
      title: 'Data Science Pipeline: From Raw Data to Insights',
      excerpt: 'Complete workflow for data processing, analysis, and visualization using modern tools.',
      category: 'Data Science',
      date: '2024-02-28',
      readTime: '10 min read',
      tags: ['Data Science', 'Python', 'Pandas', 'Visualization'],
      link: '#',
      featured: false
    },
    {
      id: 5,
      title: 'DevOps Automation: CI/CD with GitHub Actions',
      excerpt: 'Setting up automated deployment pipelines and infrastructure as code.',
      category: 'DevOps',
      date: '2024-02-20',
      readTime: '7 min read',
      tags: ['DevOps', 'GitHub Actions', 'CI/CD', 'Automation'],
      link: '#',
      featured: false
    },
    {
      id: 6,
      title: 'Blockchain Development: Smart Contracts with Solidity',
      excerpt: 'Introduction to smart contract development and deployment on Ethereum.',
      category: 'Blockchain',
      date: '2024-02-15',
      readTime: '9 min read',
      tags: ['Blockchain', 'Solidity', 'Ethereum', 'Web3'],
      link: '#',
      featured: false
    }
  ];

  const categories = ['all', 'AI/ML', 'Frontend', 'Backend', 'Data Science', 'DevOps', 'Blockchain'];

  const filteredArticles = selectedCategory === 'all' 
    ? articles 
    : articles.filter(article => article.category === selectedCategory);

  const getCategoryColor = (category: string) => {
    const colors = {
      'AI/ML': 'bg-purple-500/20 text-purple-400',
      'Frontend': 'bg-blue-500/20 text-blue-400',
      'Backend': 'bg-green-500/20 text-green-400',
      'Data Science': 'bg-yellow-500/20 text-yellow-400',
      'DevOps': 'bg-red-500/20 text-red-400',
      'Blockchain': 'bg-indigo-500/20 text-indigo-400'
    };
    return colors[category] || 'bg-slate-500/20 text-slate-400';
  };

  return (
    <section id="blog" className="py-20 bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Blog & Articles
            </span>
          </h2>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto">
            Sharing insights, tutorials, and experiences from my journey in tech
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                selectedCategory === category
                  ? 'bg-blue-500 text-white'
                  : 'bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white'
              }`}
            >
              {category === 'all' ? 'All Articles' : category}
            </button>
          ))}
        </div>

        {/* Featured Articles */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
            <BookOpen className="w-6 h-6 text-blue-400 mr-2" />
            Featured Articles
          </h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {filteredArticles
              .filter(article => article.featured)
              .map((article) => (
                <div
                  key={article.id}
                  className="bg-slate-800 rounded-xl p-8 border border-slate-700 hover:border-blue-500/50 transition-all duration-300 group"
                >
                  <div className="flex items-start justify-between mb-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(article.category)}`}>
                      {article.category}
                    </span>
                    <ExternalLink className="w-5 h-5 text-slate-400 group-hover:text-blue-400 transition-colors" />
                  </div>
                  
                  <h4 className="text-xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors">
                    {article.title}
                  </h4>
                  
                  <p className="text-slate-400 mb-4 leading-relaxed">
                    {article.excerpt}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {article.tags.map((tag) => (
                      <span
                        key={tag}
                        className="flex items-center px-2 py-1 bg-slate-700 text-slate-300 text-xs rounded"
                      >
                        <Tag className="w-3 h-3 mr-1" />
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-between text-sm text-slate-500">
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      {article.date}
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {article.readTime}
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>

        {/* All Articles */}
        <div>
          <h3 className="text-2xl font-bold text-white mb-6">All Articles</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredArticles.map((article) => (
              <div
                key={article.id}
                className="bg-slate-800 rounded-xl p-6 border border-slate-700 hover:border-slate-600 transition-all duration-300 group cursor-pointer"
              >
                <div className="flex items-start justify-between mb-3">
                  <span className={`px-2 py-1 rounded text-xs font-medium ${getCategoryColor(article.category)}`}>
                    {article.category}
                  </span>
                  {article.featured && (
                    <span className="px-2 py-1 bg-yellow-500/20 text-yellow-400 text-xs rounded font-medium">
                      Featured
                    </span>
                  )}
                </div>
                
                <h4 className="text-lg font-semibold text-white mb-2 group-hover:text-blue-400 transition-colors">
                  {article.title}
                </h4>
                
                <p className="text-slate-400 text-sm mb-3 line-clamp-2">
                  {article.excerpt}
                </p>
                
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <div className="flex items-center">
                    <Calendar className="w-3 h-3 mr-1" />
                    {article.date}
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-3 h-3 mr-1" />
                    {article.readTime}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-400 mb-2">25+</div>
            <div className="text-slate-400">Articles Published</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-400 mb-2">50K+</div>
            <div className="text-slate-400">Total Reads</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-400 mb-2">6</div>
            <div className="text-slate-400">Categories Covered</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
