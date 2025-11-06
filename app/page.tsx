'use client';

import { useState } from 'react';

const fintechSources = {
  news: [
    { name: 'Economic Times - FinTech', url: 'https://economictimes.indiatimes.com/tech/fintech', description: 'Latest FinTech news and updates from India' },
    { name: 'Inc42', url: 'https://inc42.com/buzz/fintech/', description: 'Indian startup ecosystem and FinTech coverage' },
    { name: 'YourStory', url: 'https://yourstory.com/companies/fintech', description: 'Stories of Indian startups and FinTech companies' },
    { name: 'Money Control - FinTech', url: 'https://www.moneycontrol.com/news/tags/fintech.html', description: 'Financial news and FinTech developments' },
    { name: 'Business Standard - Technology', url: 'https://www.business-standard.com/technology', description: 'Technology and FinTech business news' },
  ],
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
          <p className="text-white/70 text-sm mt-2">Top 10 Curated FinTech Resources</p>
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
        <div className="grid gap-6">
          {renderLinks()}
        </div>
      </div>
    </div>
  );
}
