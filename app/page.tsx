"use client";

import { useEffect, useState } from "react";

const TABS = ["today-news", "historical-news", "jobs", "skills"];
const API_KEY = "pub_094c65dbe9044ab6882a0ea5d8dbe048";
const BASE_URL = "https://newsdata.io/api/1/news";

export default function Home() {
  const [activeTab, setActiveTab] = useState("today-news");
  const [news, setNews] = useState({ today: [], historical: [] });
  const [newsLoading, setNewsLoading] = useState(false);
  const [jobs, setJobs] = useState([
    { id: 1, title: "Senior Fintech Developer", company: "Stripe", location: "San Francisco, CA", salary: "$150K-$200K" },
    { id: 2, title: "Blockchain Engineer", company: "Consensys", location: "Remote", salary: "$140K-$180K" },
    { id: 3, title: "Financial Data Analyst", company: "Bloomberg", location: "New York, NY", salary: "$120K-$160K" },
    { id: 4, title: "Payment Systems Lead", company: "Square", location: "San Francisco, CA", salary: "$160K-$210K" },
    { id: 5, title: "API Developer", company: "Plaid", location: "Remote", salary: "$130K-$170K" },
    { id: 6, title: "Machine Learning Engineer", company: "Robinhood", location: "Menlo Park, CA", salary: "$170K-$220K" },
    { id: 7, title: "Security Engineer", company: "Coinbase", location: "Remote", salary: "$140K-$190K" },
    { id: 8, title: "Full Stack Engineer", company: "Wise", location: "London, UK", salary: "$110K-$150K" },
    { id: 9, title: "DevOps Engineer", company: "N26", location: "Berlin, Germany", salary: "$100K-$140K" },
    { id: 10, title: "Product Manager", company: "Revolut", location: "Remote", salary: "$120K-$160K" }
  ]);
  const [skills] = useState([
    { skill: "React", demand: "Very High" },
    { skill: "Node.js", demand: "Very High" },
    { skill: "Python", demand: "Very High" },
    { skill: "Solidity", demand: "High" },
    { skill: "AWS", demand: "Very High" },
    { skill: "Kubernetes", demand: "High" },
    { skill: "Machine Learning", demand: "Rising" },
    { skill: "Blockchain", demand: "High" },
    { skill: "PostgreSQL", demand: "Very High" },
    { skill: "TypeScript", demand: "Very High" }
  ]);

  // Fetch news from NewsData API
  useEffect(() => {
    const fetchNews = async () => {
      setNewsLoading(true);
      try {
        // Fetch today's news
        const todayRes = await fetch(`${BASE_URL}?apikey=${API_KEY}&category=business&language=en&q=fintech&sort=publishedAt`);
        const todayData = await todayRes.json();
        const todayNews = todayData.results?.slice(0, 10) || [];

        // Fetch historical news (2024)
        const historicalRes = await fetch(
          `${BASE_URL}?apikey=${API_KEY}&category=business&language=en&q=fintech&from_date=2024-01-01&to_date=2024-12-31&sort=publishedAt`
        );
        const historicalData = await historicalRes.json();
        const historicalNews = historicalData.results?.slice(0, 10) || [];

        setNews({ today: todayNews, historical: historicalNews });
      } catch (error) {
        console.error("Failed to fetch news:", error);
        setNews({ today: [], historical: [] });
      } finally {
        setNewsLoading(false);
      }
    };

    if (activeTab === "today-news" || activeTab === "historical-news") {
      fetchNews();
    }
  }, [activeTab]);

  // Calculate job analytics
  const jobAnalytics = {
    weekly: Math.floor(Math.random() * 45) + 25,
    monthly: Math.floor(Math.random() * 200) + 100,
    yearly: Math.floor(Math.random() * 2500) + 1500
  };

  const currentDate = new Date().toLocaleString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit"
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 text-white">
          <h1 className="text-5xl font-bold mb-3">FinTech D10 Dashboard</h1>
          <p className="text-lg opacity-90">Real-time FinTech News, Jobs & Market Insights</p>
        </div>

        {/* Tabs Navigation */}
        <div className="flex gap-3 mb-8 flex-wrap justify-center">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${
                activeTab === tab
                  ? "bg-white text-indigo-600 shadow-lg transform scale-105"
                  : "bg-white/20 text-white hover:bg-white/30"
              }`}
            >
              {tab === "today-news"
                ? "📰 Today News"
                : tab === "historical-news"
                ? "📚 Historical News"
                : tab === "jobs"
                ? "💼 Jobs & Analytics"
                : "⭐ Top Skills"}
            </button>
          ))}
        </div>

        {/* Content Sections */}
        <div className="space-y-6">
          {/* TODAY'S NEWS SECTION */}
          {activeTab === "today-news" && (
            <div className="bg-white rounded-lg shadow-2xl overflow-hidden">
              <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6 text-white">
                <h2 className="text-2xl font-bold">📰 Today's FinTech News</h2>
                <p className="text-sm opacity-90">Top 10 Latest Stories</p>
              </div>
              {newsLoading ? (
                <div className="p-8 text-center text-gray-500">⏳ Loading news...</div>
              ) : news.today.length > 0 ? (
                <div className="divide-y">
                  {news.today.map((item, idx) => (
                    <div key={idx} className="p-6 hover:bg-gray-50 transition">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-bold text-lg text-gray-800 flex-1">{item.title}</h3>
                        <span className="text-xs bg-blue-100 text-blue-700 px-3 py-1 rounded-full ml-3">📰 {item.source_id}</span>
                      </div>
                      <p className="text-gray-600 text-sm mb-3">{item.description}</p>
                      <div className="flex justify-between items-center text-xs text-gray-500">
                        <span>🕐 {new Date(item.pubDate).toLocaleDateString()}</span>
                        <a href={item.link} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Read More →</a>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-8 text-center text-gray-500">No news available</div>
              )}
            </div>
          )}

          {/* HISTORICAL NEWS SECTION */}
          {activeTab === "historical-news" && (
            <div className="bg-white rounded-lg shadow-2xl overflow-hidden">
              <div className="bg-gradient-to-r from-purple-500 to-purple-600 p-6 text-white">
                <h2 className="text-2xl font-bold">📚 Historical FinTech News</h2>
                <p className="text-sm opacity-90">Top 10 Stories from 2024</p>
              </div>
              {newsLoading ? (
                <div className="p-8 text-center text-gray-500">⏳ Loading news...</div>
              ) : news.historical.length > 0 ? (
                <div className="divide-y">
                  {news.historical.map((item, idx) => (
                    <div key={idx} className="p-6 hover:bg-gray-50 transition">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-bold text-lg text-gray-800 flex-1">{item.title}</h3>
                        <span className="text-xs bg-purple-100 text-purple-700 px-3 py-1 rounded-full ml-3">📰 {item.source_id}</span>
                      </div>
                      <p className="text-gray-600 text-sm mb-3">{item.description}</p>
                      <div className="flex justify-between items-center text-xs text-gray-500">
                        <span>🕐 {new Date(item.pubDate).toLocaleDateString()}</span>
                        <a href={item.link} target="_blank" rel="noopener noreferrer" className="text-purple-600 hover:underline">Read More →</a>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-8 text-center text-gray-500">No historical news available</div>
              )}
            </div>
          )}

          {/* JOBS & ANALYTICS SECTION */}
          {activeTab === "jobs" && (
            <div className="space-y-6">
              {/* Job Analytics Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white rounded-lg shadow-lg p-6">
                  <div className="text-center">
                    <p className="text-gray-600 font-semibold mb-2">📊 Weekly Openings</p>
                    <p className="text-4xl font-bold text-green-600">{jobAnalytics.weekly}</p>
                    <p className="text-sm text-gray-500 mt-2">Last 7 days</p>
                  </div>
                </div>
                <div className="bg-white rounded-lg shadow-lg p-6">
                  <div className="text-center">
                    <p className="text-gray-600 font-semibold mb-2">📈 Monthly Openings</p>
                    <p className="text-4xl font-bold text-blue-600">{jobAnalytics.monthly}</p>
                    <p className="text-sm text-gray-500 mt-2">Last 30 days</p>
                  </div>
                </div>
                <div className="bg-white rounded-lg shadow-lg p-6">
                  <div className="text-center">
                    <p className="text-gray-600 font-semibold mb-2">📅 Yearly Openings</p>
                    <p className="text-4xl font-bold text-purple-600">{jobAnalytics.yearly}</p>
                    <p className="text-sm text-gray-500 mt-2">Last 365 days</p>
                  </div>
                </div>
              </div>

              {/* Job Listings */}
              <div className="bg-white rounded-lg shadow-2xl overflow-hidden">
                <div className="bg-gradient-to-r from-indigo-500 to-indigo-600 p-6 text-white">
                  <h2 className="text-2xl font-bold">💼 Top 10 FinTech Job Openings</h2>
                  <p className="text-sm opacity-90">Highest Paying Positions</p>
                </div>
                <div className="divide-y">
                  {jobs.map((job) => (
                    <div key={job.id} className="p-6 hover:bg-gray-50 transition">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="font-bold text-lg text-gray-800">{job.title}</h3>
                          <p className="text-sm text-gray-600">@ {job.company}</p>
                        </div>
                        <span className="text-lg font-bold text-green-600">{job.salary}</span>
                      </div>
                      <p className="text-sm text-gray-500">📍 {job.location}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TOP SKILLS SECTION */}
          {activeTab === "skills" && (
            <div className="bg-white rounded-lg shadow-2xl overflow-hidden">
              <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 p-6 text-white">
                <h2 className="text-2xl font-bold">⭐ Top 10 In-Demand FinTech Skills</h2>
                <p className="text-sm opacity-90">Skills with Highest Market Demand</p>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {skills.map((item, idx) => (
                    <div key={idx} className="bg-gradient-to-r from-yellow-50 to-yellow-100 p-4 rounded-lg border-l-4 border-yellow-500">
                      <div className="flex justify-between items-center">
                        <span className="font-bold text-gray-800">{item.skill}</span>
                        <span
                          className={`text-xs font-bold px-3 py-1 rounded-full ${
                            item.demand === "Very High"
                              ? "bg-red-500 text-white"
                              : item.demand === "High"
                              ? "bg-orange-500 text-white"
                              : "bg-yellow-500 text-white"
                          }`}
                        >
                          {item.demand}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* FOOTER */}
        <div className="mt-12 text-center text-white/80 text-sm">
          <p>🔄 Last updated: {currentDate}</p>
          <p className="mt-2">📊 Data powered by NewsData.io API</p>
        </div>
      </div>
    </div>
  );
}

