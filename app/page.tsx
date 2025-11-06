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
    { name: 'Indeed India - FinTech', url: 'https://in.indeed.com/FinTech-jobs', description: 'Wide range of FinTech positions' },
    { name: 'AngelList - India Startups', url: 'https://angel.co/india/fintech/jobs', description: 'FinTech startup jobs in India' },
    { name: 'Instahyre - FinTech', url: 'https://www.instahyre.com/search-jobs/fintech/', description: 'Curated FinTech job opportunities' },
  ],
  learning: [
    { name: 'Coursera - FinTech Courses', url: 'https://www.coursera.org/courses?query=fintech', description: 'Online FinTech courses and certifications' },
    { name: 'edX - Financial Technology', url: 'https://www.edx.org/learn/fintech', description: 'University-level FinTech courses' },
    { name: 'Udemy - FinTech', url: 'https://www.udemy.com/topic/fintech/', description: 'Practical FinTech skill development' },
    { name: 'NPCI - UPI Resources', url: 'https://www.npci.org.in/what-we-do/upi/product-overview', description: 'Learn about India\'s UPI payment system' },
    { name: 'RBI - Financial Inclusion', url: 'https://www.rbi.org.in/', description: 'Reserve Bank of India resources' },
  ]
};

export default function Home() {
  const [activeTab, setActiveTab] = useState('news');
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [lastUpdate, setLastUpdate] = useState<string>('');
    const [expandedNews, setExpandedNews] = useState<number | null>(null);
    const [summaries, setSummaries] = useState<{ [key: number]: string }>({});
    const [loadingSummary, setLoadingSummary] = useState<number | null>(null);

  useEffect(() => {
    if (activeTab === 'news') {
      fetchNews();
    }
  }, [activeTab]);

  const fetchNews = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/news');
      const data = await response.json();
      setNews(data.news || []);
      setLastUpdate(data.lastUpdate);
    } catch (error) {
      console.error('Failed to fetch news:', error);
    } finally {
      setLoading(false);
    }
  };

    const fetchSummary = async (index: number, item: NewsItem) => {
          if (summaries[index]) {
                  setExpandedNews(expandedNews === index ? null : index);
                  return;
                }

          setLoadingSummary(index);
          setExpandedNews(index);

          try {
                  const response = await fetch('/api/news-summary', {
                            method: 'POST',
                            headers: {
                                        'Content-Type': 'application/json',
                                      },
                            body: JSON.stringify({
                                        title: item.title,
                                        description: item.description,
                                        link: item.link,
                                        wordCount: 250,
                                      }),
                          });

                  const data = await response.json();
                  setSummaries(prev => ({ ...prev, [index]: data.summary }));
                } catch (error) {
                  console.error('Failed to fetch summary:', error);
                  setSummaries(prev => ({ ...prev, [index]: 'Failed to generate summary. Please try again.' }));
                } finally {
                  setLoadingSummary(null);
                }
        };

  const renderNews = () => {
    if (loading) {
      return (
        <div className="text-center py-12">
          <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-indigo-600 border-r-transparent"></div>
          <p className="mt-4 text-white text-lg">Loading latest fintech news...</p>
        </div>
      );
    }

    if (news.length === 0) {
      return (
        <div className="text-center py-12 text-white">
          <p className="text-xl">No news available at the moment.</p>
          <button 
            onClick={fetchNews}
            className="mt-4 px-6 py-2 bg-white text-indigo-600 rounded-lg hover:bg-gray-100 transition-colors"
          >
            Retry
          </button>
        </div>
      );
    }

    return (
      <>
        {lastUpdate && (
          <div className="text-center mb-6 text-white/80 text-sm">
            Last updated: {new Date(lastUpdate).toLocaleString('en-IN', { 
              dateStyle: 'medium', 
              timeStyle: 'short',
              timeZone: 'Asia/Kolkata'
            })} IST
          </div>
        )}
        <div className="grid gap-6">
          {news.map((item, index) => (
            <div 
              key={index} 
              className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-6 hover:shadow-lg transition-all border border-purple-100"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-sm font-semibold text-indigo-600 bg-indigo-100 px-2 py-1 rounded">
                      {item.source}
                    </span>
                    <span className="text-xs text-gray-500">
                      {new Date(item.pubDate).toLocaleDateString('en-IN')}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-indigo-800 mb-2">
                    {index + 1}. {item.title}
                  </h3>
                  {item.description && (
                    <p className="text-gray-600 mb-4 line-clamp-3">{item.description}</p>
                  )}
                  <div className="flex gap-3 mb-4">
                <button
                  onClick={() => fetchSummary(index, item)}
                  className="inline-flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium"
                >
                  {loadingSummary === index ? (
                    <>
                      <svg className="animate-spin h-4 w-4 mr-2" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Generating...
                    </>
                  ) : (
                    <>
                      🤖 {expandedNews === index && summaries[index] ? 'Hide' : 'AI'} Summary
                    </>
                  )}
                </button>
                <a 
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                  >
                    Read Full Article →
                  </a>
                </div>

                                {expandedNews === index && summaries[index] && (
                              <div className="mt-4 p-4 bg-white rounded-lg border-2 border-purple-200">
                                                  <div className="flex items-start gap-2">
                                                                        <span className="text-2xl">✨</span>
                                                                        <div>
                                                                                                <h4 className="font-bold text-purple-800 mb-2">AI-Generated Summary</h4>
                                                                                                <p className="text-gray-700 leading-relaxed">{summaries[index]}</p>
                                                                                              </div>
                                                                      </div>
                                                </div>
                            )}
              </div>
            </div>
          ))}
        </div>
    );
  };

  const renderLinks = () => {
    return fintechSources[activeTab].map((source, index) => (
      <div key={index} className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-6 hover:shadow-lg transition-all border border-purple-100">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3 className="text-xl font-bold text-indigo-800 mb-2">
              {index + 1}. {source.name}
            </h3>
            <p className="text-gray-600 mb-4">{source.description}</p>
            <a 
              href={source.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Visit Website →
            </a>
          </div>
        </div>
      </div>
    ));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-white mb-4">FinTech Dashboard India 🇮🇳</h1>
          <p className="text-white/90 text-lg">Your Comprehensive FinTech Information Hub</p>
          <p className="text-white/70 text-sm mt-2">Real-time Indian FinTech AI-Powered Summaries</p>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-8 justify-center flex-wrap">
          {['news', 'international', 'jobs', 'learning'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                activeTab === tab
                  ? 'bg-white text-indigo-600 shadow-lg scale-105'
                  : 'bg-white/20 text-white hover:bg-white/30'
              }`}
            >
              {tab === 'news' && '📰 India News'}
              {tab === 'international' && '🌍 Global News'}
              {tab === 'jobs' && '💼 Jobs'}
              {tab === 'learning' && '📚 Learning'}
            </button>
          ))}
        </div>

        {/* Content Area */}
        {activeTab === 'news' ? renderNews() : <div className="grid gap-6">{renderLinks()}</div>}
      </div>
    </div>
  );
}



