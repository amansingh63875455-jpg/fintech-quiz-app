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
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
          }),
        }
      );

      const result = await response.json();
            console.log('API Response:', JSON.stringify(result, null, 2));
            if (result.error) {
                      console.error('Gemini API Error:', result.error);
                      setNewsData(`API Error: ${result.error.message || JSON.stringify(result.error)}`);
                      setLoading(false);
                      return;
                    }
      const output = result?.candidates?.[0]?.content?.parts?.[0]?.text || 'No data available.';
      setNewsData(output);
    } catch (error) {
      console.error('Gemini API Error:', error);
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
        'Summarize the top 10 most important FinTech events, trends, and breakthroughs in India from 2024. Include:\n[Event Title]\n[Date]\n[Impact/Summary]\nFocus on startups, regulations, and innovation.'
      );
    } else if (tabName === 'jobs') {
      fetchGeminiNews(
        'List top 10 FinTech job openings currently available in India. For each job include:\n[Company Name] ([Location])\n[Job Title]\n[Salary Range in INR]\n[Brief Job Description]\nOnly include real Indian FinTech companies like PhonePe, Paytm, Razorpay, Flipkart, Google India, Amazon Pay, ICICI Bank, HDFC Bank.'
      );
    } else if (tabName === 'skills') {
      fetchGeminiNews(
        'List the top 10 most in-demand FinTech skills in India for 2025. For each skill include:\n[Skill Name]\n[Demand Level: High/Very High/Rising]\n[Why it\'s valuable in FinTech]\nBe specific about Indian market needs.'
      );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 text-white">
          <h1 className="text-5xl font-bold mb-3">FinTech D10 Dashboard 🇮🇳</h1>
          <p className="text-lg opacity-90">India's FinTech News, Jobs & Market Insights</p>
        </div>

        {/* Tabs Navigation */}
        <div className="flex gap-3 mb-8 flex-wrap justify-center">
          {[
            { key: 'today-news', label: '📰 Today News', icon: '' },
            { key: 'historical-news', label: '📚 Historical News', icon: '' },
            { key: 'jobs', label: '💼 Jobs (India)', icon: '' },
            { key: 'skills', label: '⭐ Top Skills', icon: '' },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => handleTabClick(tab.key)}
              className={`px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${
                activeTab === tab.key
                  ? 'bg-white text-indigo-600 shadow-lg transform scale-105'
                  : 'bg-white/20 text-white hover:bg-white/30'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content Section */}
        <div className="bg-white rounded-lg shadow-2xl overflow-hidden">
          <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-6 text-white">
            <h2 className="text-2xl font-bold">
              {activeTab === 'today-news' && '📰 Today\'s FinTech News'}
              {activeTab === 'historical-news' && '📚 Historical FinTech News'}
              {activeTab === 'jobs' && '💼 FinTech Jobs in India'}
              {activeTab === 'skills' && '⭐ Top In-Demand Skills'}
            </h2>
            <p className="text-sm opacity-90 mt-1">Powered by Google Gemini AI</p>
          </div>

          <div className="p-8 min-h-96 bg-white">
            {loading ? (
              <div className="flex items-center justify-center h-full">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
                  <p className="text-gray-600">⏳ Loading {activeTab.replace('-', ' ')}...</p>
                </div>
              </div>
            ) : newsData ? (
              <div className="prose prose-sm max-w-none">
                <div className="whitespace-pre-wrap leading-relaxed text-gray-800 font-sans">
                  {newsData}
                </div>
              </div>
            ) : (
              <p className="text-gray-500 text-center">Click on a tab to view FinTech insights powered by AI</p>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-12 text-center text-white/80 text-sm">
          <p>🤖 Powered by Google Gemini AI</p>
          <p className="mt-2">💡 India-Focused FinTech Insights Dashboard</p>
        </div>
      </div>
    </div>
  );
}



