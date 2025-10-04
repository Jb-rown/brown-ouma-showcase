import React, { useState } from 'react';
import { BookOpen, Calendar, Clock, ExternalLink, Tag } from 'lucide-react';
import { documents as generatedDocuments, Doc as GeneratedDoc } from '../lib/documents';

type Article = {
  id: number;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  tags: string[];
  link?: string;
  featured?: boolean;
};

const BlogSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [viewerUrl, setViewerUrl] = useState<string | null>(null);

  const openViewer = (url: string) => setViewerUrl(url);
  const closeViewer = () => setViewerUrl(null);

  const articles: Article[] = [
    {
      id: 1,
      title: 'Building a Modern Frontend with React & Vite',
      excerpt: 'A walkthrough of setting up a fast developer experience with Vite and React.',
      category: 'Frontend',
      date: '2024-05-01',
      readTime: '6 min',
      tags: ['React', 'Vite'],
      link: '#',
      featured: true,
    },
    {
      id: 2,
      title: 'Intro to Retrieval-Augmented Generation (RAG)',
      excerpt: 'How RAG improves LLM responses by retrieving relevant documents.',
      category: 'AI/ML',
      date: '2024-03-15',
      readTime: '8 min',
      tags: ['RAG', 'LLM'],
      link: '#',
      featured: true,
    },
  ];

  // Use generated documents if available; fall back to empty array
  // generatedDocuments is exported `as const` and therefore readonly; cast via unknown to Article[]
  const documentsFromGenerator: Article[] = (generatedDocuments as unknown as Article[]) || [];
  const allArticles = [...articles, ...documentsFromGenerator];

  const categories = ['all', 'AI/ML', 'Frontend', 'Backend', 'Data Science', 'DevOps', 'Blockchain'];

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      'AI/ML': 'bg-purple-500/20 text-purple-400',
      Frontend: 'bg-blue-500/20 text-blue-400',
      Backend: 'bg-green-500/20 text-green-400',
      'Data Science': 'bg-yellow-500/20 text-yellow-400',
      DevOps: 'bg-red-500/20 text-red-400',
      Blockchain: 'bg-indigo-500/20 text-indigo-400',
    };
    return colors[category] || 'bg-slate-500/20 text-slate-400';
  };

  const filteredArticles = selectedCategory === 'all' ? allArticles : allArticles.filter(a => a.category === selectedCategory);

  return (
    <section id="blog" className="py-20 bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Blog & Articles</span>
          </h2>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto">Sharing insights, tutorials, and experiences from my journey in tech</p>
        </div>

        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map(cat => (
            <button key={cat} onClick={() => setSelectedCategory(cat)} className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${selectedCategory === cat ? 'bg-blue-500 text-white' : 'bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white'}`}>
              {cat === 'all' ? 'All Articles' : cat}
            </button>
          ))}
        </div>

        <div className="mb-12">
          <h3 className="text-2xl font-bold text-white mb-6 flex items-center"><BookOpen className="w-6 h-6 text-blue-400 mr-2"/> Featured Articles</h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {filteredArticles.filter(a => a.featured).map(article => {
              const hasLink = !!article.link && article.link !== '#';
              const isPdf = hasLink && article.link!.toLowerCase().endsWith('.pdf');

              const content = (
                <>
                  <div className="flex items-start justify-between mb-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(article.category)}`}>{article.category}</span>
                    <ExternalLink className="w-5 h-5 text-slate-400 group-hover:text-blue-400 transition-colors" />
                  </div>
                  <h4 className="text-xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors">{article.title}</h4>
                  <p className="text-slate-400 mb-4 leading-relaxed">{article.excerpt}</p>
                  <div className="flex flex-wrap gap-2 mb-4">{article.tags.map(t => <span key={t} className="flex items-center px-2 py-1 bg-slate-700 text-slate-300 text-xs rounded"><Tag className="w-3 h-3 mr-1"/>{t}</span>)}</div>
                  <div className="flex items-center justify-between text-sm text-slate-500"><div className="flex items-center"><Calendar className="w-4 h-4 mr-1"/>{article.date}</div><div className="flex items-center"><Clock className="w-4 h-4 mr-1"/>{article.readTime}</div></div>
                </>
              );

              if (hasLink && isPdf) {
                return (
                  <div key={article.id} role="button" tabIndex={0} onClick={() => openViewer(article.link!)} onKeyDown={(e) => { if (e.key === 'Enter') openViewer(article.link!); }} className="block bg-slate-800 rounded-xl p-8 border border-slate-700 hover:border-blue-500/50 transition-all duration-300 group cursor-pointer">{content}</div>
                );
              }

              if (hasLink) {
                return (
                  <a key={article.id} href={article.link} target="_blank" rel="noopener noreferrer" className="block bg-slate-800 rounded-xl p-8 border border-slate-700 hover:border-blue-500/50 transition-all duration-300 group">{content}</a>
                );
              }

              return (
                <div key={article.id} className="bg-slate-800 rounded-xl p-8 border border-slate-700 hover:border-blue-500/50 transition-all duration-300 group">{content}</div>
              );
            })}
          </div>
        </div>

        <div>
          <h3 className="text-2xl font-bold text-white mb-6">All Articles</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredArticles.map(article => {
              const hasLink = !!article.link && article.link !== '#';
              const isPdf = hasLink && article.link!.toLowerCase().endsWith('.pdf');

              const card = (
                <>
                  <div className="flex items-start justify-between mb-3">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${getCategoryColor(article.category)}`}>{article.category}</span>
                    {article.featured && (<span className="px-2 py-1 bg-yellow-500/20 text-yellow-400 text-xs rounded font-medium">Featured</span>)}
                  </div>
                  <h4 className="text-lg font-semibold text-white mb-2 group-hover:text-blue-400 transition-colors">{article.title}</h4>
                  <p className="text-slate-400 text-sm mb-3 line-clamp-2">{article.excerpt}</p>
                  <div className="flex items-center justify-between text-xs text-slate-500"><div className="flex items-center"><Calendar className="w-3 h-3 mr-1"/>{article.date}</div><div className="flex items-center"><Clock className="w-3 h-3 mr-1"/>{article.readTime}</div></div>
                </>
              );

              if (hasLink && isPdf) {
                return (
                  <div key={article.id} role="button" tabIndex={0} onClick={() => openViewer(article.link!)} onKeyDown={(e) => { if (e.key === 'Enter') openViewer(article.link!); }} className="block bg-slate-800 rounded-xl p-6 border border-slate-700 hover:border-slate-600 transition-all duration-300 group cursor-pointer">{card}</div>
                );
              }

              if (hasLink) {
                return (
                  <a key={article.id} href={article.link} target="_blank" rel="noopener noreferrer" className="block bg-slate-800 rounded-xl p-6 border border-slate-700 hover:border-slate-600 transition-all duration-300 group">{card}</a>
                );
              }

              return (
                <div key={article.id} className="bg-slate-800 rounded-xl p-6 border border-slate-700 hover:border-slate-600 transition-all duration-300 group">{card}</div>
              );
            })}
          </div>
        </div>

        {viewerUrl && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
            <div className="w-full max-w-5xl h-[80vh] bg-slate-900 rounded-lg border border-slate-700 overflow-hidden">
              <div className="flex items-center justify-between p-3 border-b border-slate-700">
                <div className="text-white font-medium">Preview</div>
                <div className="flex items-center gap-2">
                  <a href={viewerUrl} target="_blank" rel="noopener noreferrer" className="text-slate-300 underline text-sm">Open in new tab</a>
                  <button onClick={closeViewer} className="px-3 py-1 bg-slate-700 text-slate-200 rounded">Close</button>
                </div>
              </div>
              <iframe src={viewerUrl!} className="w-full h-full bg-white" title="PDF preview" />
            </div>
          </div>
        )}

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
