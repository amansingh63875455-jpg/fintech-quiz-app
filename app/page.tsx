'use client';
import { useState, useEffect } from 'react';

interface NewsItem {
  title: string;
  link: string;
  description: string;
  pubDate: string;
  source: string;
}

const fintechSources = {
  international: [
    { name: 'TechCrunch - FinTech', url: 'https://techcrunch.com/tag/fintech/', description: 'Global FinTech news and insights' },
    { name: 'The Financial Brand', url: 'https://thefinancialbrand.com/', description: 'Digital banking and FinTech trends' },
    { name: 'Finextra', url: 'https://www.finextra.com/', description: 'Financial IT news and analysis' },
    { name: 'Fintechnews', url: 'https://fintechnews.ch/', description: 'Global FinTech news and events' },
    { name: 'Pymnts.com', url: 'https://www.pymnts.com/', description: 'Payment and commerce innovation' },
  ],
  jobs: [
    { name: 'Naukri - FinTech Jobs', url: 'https://www.naukri.com/fintech-jobs', description: 'FinTech job opportunities in India' },
    { name: 'LinkedIn Jobs - FinTech India', url: 'https://www.linkedin.com/jobs/fintech-jobs-india', description: 'Professional FinTech job listings' },
  ],
  listings: [
    { name: 'Indeed India - FinTech', url: 'https://in.indeed.com/FinTech-jobs', description: 'Wide range of FinTech positions' },
    { name: 'AngelList - India Startups', url: 'https://www.angellist.com/india/fintech-startups/jobs', description: 'FinTech startup jobs in India' },
    { name: 'Instahyre - FinTech', url: 'https://www.instahyre.com/search-jobs/fintech/', description: 'Curated FinTech job opportunities' },
  ],
  learning: [
    { name: 'Coursera - FinTech Courses', url: 'https://www.coursera.org/courses?query=fintech', description: 'Online FinTech courses and certifications' },
    { name: 'edX - Financial Technology', url: 'https://www.edx.org/learn/fintech', description: 'University-level FinTech courses' },
    { name: 'Udemy - FinTech', url: 'https://www.udemy.com/topic/fintech/', description: 'Practical FinTech skill development' },
    { name: 'NPCI - UPI Resources', url: 'https://www.npci.org.in/what-we-do/upi/product-overview', description: 'Learn about India\\'s UPI payment system' },
    { name: 'RBI - Financial Inclusion', url: 'https://www.rbi.org.in/', description: 'Reserve Bank of India resources' },
  ],
};

export default function Home() {
  const [activeTab, setActiveTab] = useState('news');
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [lastUpdate, setLastUpdate] = useState<string>('');
  const [expandedNews, setExpandedNews] = useState<number | null>(null);

  const fetchIndiaNews = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/news');
      if (response.ok) {
        const data = await response.json();
        setNews(data.items || []);
        setLastUpdate(new Date().toLocaleString());
      }
    } catch (error) {
      console.error('Failed to fetch news:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (activeTab === 'news') {
      fetchIndiaNews();
    }
  }, [activeTab]);

  const truncateText = (text: string, maxWords: number = 250) => {
    const words = text.split(' ');
    if (words.length <= maxWords) return text;
    return words.slice(0, maxWords).join(' ') + '...';
  };

  const renderNews = () => {
    if (loading) {
      return (
        <div className="text-center py-8">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
          <p className="mt-2 text-gray-600">Loading latest news...</p>
        </div>
      );
    }

    if (news.length === 0) {
      return (
        <div className="text-center py-8 text-gray-600">
          No news available. Click refresh to load latest updates.
        </div>
      );
    }

    return (
      <div className="space-y-4">
        {news.map((item, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow">
            <h3 className="text-xl font-bold text-indigo-600 mb-2">{item.title}</h3>
            <p className="text-sm text-gray-500 mb-2">
              {item.source} • {new Date(item.pubDate).toLocaleDateString()}
            </p>
            <p className="text-gray-700 mb-4 line-clamp-3">{item.description}</p>
            
            <button
              onClick={() => setExpandedNews(expandedNews === index ? null : index)}
              className="inline-flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium mr-3 mb-2"
            >
              {expandedNews === index ? 'Hide Summary' : 'View Summary (200-300 words)'}
            </button>
            
            {expandedNews === index && (
              <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
                <h4 className="font-semibold text-gray-800 mb-2">Summary</h4>
                <p className="text-gray-700 whitespace-pre-wrap">{truncateText(item.description)}</p>
                <p className="text-sm text-gray-500 mt-2">Word count: ~{truncateText(item.description).split(' ').length} words</p>
              </div>
            )}
            
            <a
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium"
            >
              Read Full Article
            </a>
          </div>
        ))}
      </div>
    );
  };

  const renderSources = () => (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {fintechSources[activeTab as keyof typeof fintechSources]?.map((source, index) => (
        <div key={index} className="bg-white p-6 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow">
          <h3 className="text-lg font-bold text-indigo-600 mb-2">{source.name}</h3>
          <p className="text-gray-600 mb-4 text-sm">{source.description}</p>
          <a
            href={source.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors text-sm font-medium"
          >
            Visit Source →
          </a>
        </div>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-12">
          <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 mb-4">
            🏦 FinTech Hub India
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Your comprehensive source for FinTech news, jobs, and learning resources in India
          </p>
        </header>

        <div className="mb-8 flex flex-wrap justify-center gap-4">
          <button
            onClick={() => setActiveTab('news')}
            className={`px-6 py-3 rounded-lg font-semibold transition-all ${
              activeTab === 'news'
                ? 'bg-indigo-600 text-white shadow-lg scale-105'
                : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'
            }`}
          >
            📰 India News
          </button>
          <button
            onClick={() => setActiveTab('international')}
            className={`px-6 py-3 rounded-lg font-semibold transition-all ${
              activeTab === 'international'
                ? 'bg-indigo-600 text-white shadow-lg scale-105'
                : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'
            }`}
          >
            🌍 International
          </button>
          <button
            onClick={() => setActiveTab('jobs')}
            className={`px-6 py-3 rounded-lg font-semibold transition-all ${
              activeTab === 'jobs'
                ? 'bg-indigo-600 text-white shadow-lg scale-105'
                : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'
            }`}
          >
            💼 Jobs
          </button>
          <button
            onClick={() => setActiveTab('listings')}
            className={`px-6 py-3 rounded-lg font-semibold transition-all ${
              activeTab === 'listings'
                ? 'bg-indigo-600 text-white shadow-lg scale-105'
                : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'
            }`}
          >
            📋 Listings
          </button>
          <button
            onClick={() => setActiveTab('learning')}
            className={`px-6 py-3 rounded-lg font-semibold transition-all ${
              activeTab === 'learning'
                ? 'bg-indigo-600 text-white shadow-lg scale-105'
                : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'
            }`}
          >
            📚 Learning
          </button>
        </div>

        {activeTab === 'news' && (
          <div className="mb-6 flex justify-between items-center bg-white p-4 rounded-lg shadow-md">
            <div className="text-sm text-gray-600">
              {lastUpdate && `Last updated: ${lastUpdate}`}
            </div>
            <button
              onClick={fetchIndiaNews}
              disabled={loading}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:bg-gray-400 font-medium"
            >
              {loading ? 'Refreshing...' : '🔄 Refresh News'}
            </button>
          </div>
        )}

        <div className="mt-8">
          {activeTab === 'news' ? renderNews() : renderSources()}
        </div>
      </div>
    </div>
  );
}
