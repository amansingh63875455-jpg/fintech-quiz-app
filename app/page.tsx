'use client';
// Environment variable configured for Gemini API

import { useEffect, useState } from 'react';

const GEMINI_API_KEY = process.env.NEXT_PUBLIC_GEMINI_KEY || '';

export default function Home() {
  const [activeTab, setActiveTab] = useState('today-news');
  const [newsData, setNewsData] = useState('');
  const [loading, setLoading] = useState(false);

  async function fetchGeminiNews(prompt) {
    setLoading(true);
    try {
      const response = await fetch('/api/gemini', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt })
      });

      const result = await response.json();

      if (result.error) {
        setNewsData(`API Error: ${result.error}`);
        setLoading(false);
        return;
      }

      const output = result?.text || 'No data available.';
      setNewsData(output);
    } catch (error) {
      setNewsData('Error fetching data. Please try again.');
    }
    setLoading(false);
  }

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);

    if (tabName === 'today-news') {
      fetchGeminiNews(
        'Generate top 10 latest FinTech news headlines from India today. Format each as:\n[Date] - [Headline]\n[One-line summary]\n[Source]\nMake it realistic and credible.'
      );
    } else if (tabName === 'historical-news') {
      fetchGeminiNews(
        'Generate top 10 historical FinTech news headlines from 2024 India. Format each as:\n[Date] - [Headline]\n[One-line summary]\n[Source]\nMake it realistic and credible.'
      );
    } else if (tabName === 'jobs') {
      fetchGeminiNews(
        'Generate top 10 FinTech job openings in INDIA ONLY. Include only Indian companies like PhonePe, Paytm, Razorpay, Flipkart, Google India, Amazon Pay, ICICI Bank, HDFC Bank, Digit Insurance, Dukaan etc. Format each as:\n[Company Name (India)]\n[Job Title]\n[Location: City, India]\n[Salary: ₹X-Y LPA]\n[Key Skills]\nMake realistic salaries in INR.'
      );
    } else if (tabName === 'skills') {
      fetchGeminiNews(
        'Generate top 10 in-demand FinTech skills in India 2024. Format each as:\n[Skill Name]\n[Description]\n[Why it matters in Indian FinTech market]\nFocus on India market needs.'
      );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-white mb-4">FinTech Dashboard India 🇮🇳</h1>
          <p className="text-white/90 text-lg">Your Comprehensive FinTech Information Hub</p>
          <p className="text-white/70 text-sm mt-2">Powered by Google Gemini AI</p>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-8 justify-center flex-wrap">
          {['today-news', 'historical-news', 'jobs', 'skills'].map((tab) => (
            <button
              key={tab}
              onClick={() => handleTabClick(tab)}
              className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                activeTab === tab
                  ? 'bg-white text-indigo-600 shadow-lg scale-105'
                  : 'bg-white/20 text-white hover:bg-white/30'
              }`}
            >
              {tab === 'today-news' && "📰 Today's News"}
              {tab === 'historical-news' && '📚 Historical News'}
              {tab === 'jobs' && '💼 Jobs (India)'}
              {tab === 'skills' && '🎯 Top Skills'}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="bg-white rounded-xl shadow-2xl p-8 min-h-96">
          {loading ? (
            <div className="flex flex-col items-center justify-center h-64">
              <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-indigo-600 mb-4"></div>
              <p className="text-gray-600 text-lg">Loading FinTech data...</p>
            </div>
          ) : (
            <div className="prose max-w-none">
              <pre className="whitespace-pre-wrap font-sans text-gray-800">
                {newsData || 'Click a tab above to load FinTech information.'}
              </pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
