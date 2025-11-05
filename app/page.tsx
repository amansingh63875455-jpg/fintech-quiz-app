"use client";

import { useEffect, useState } from "react";

const TABS = ["today-news", "historical-news", "jobs", "skills"];
const API_KEY = "pub_64e9e79f2e348f96f9a6ee9f2e1d4a3b3eff9";
const BASE_URL = "https://newsdata.io/api/1/news";

export default function Home() {
  const [activeTab, setActiveTab] = useState("today-news");
  const [news, setNews] = useState({ today: [], historical: [] });
  const [newsLoading, setNewsLoading] = useState(false);

  // Fetch news from NewsData API with improved logic
  useEffect(() => {
    const fetchNews = async () => {
      setNewsLoading(true);
      try {
        // Fetch today's news
        const todayRes = await fetch(
          `${BASE_URL}?apikey=${API_KEY}&category=business&language=en&q=fintech&sortby=publishedAt`
        );
        const todayData = await todayRes.json();
        const todayNews = (todayData.results || []).slice(0, 10);

        // Fetch historical news (past year) with date filter
        const histRes = await fetch(
          `${BASE_URL}?apikey=${API_KEY}&category=business&language=en&q=fintech&from_date=2024-01-01&to_date=2024-12-31&sortby=publishedAt`
        );
        const histData = await histRes.json();
        const historicalNews = (histData.results || []).slice(0, 10);

        setNews({
          today: todayNews,
          historical: historicalNews,
        });
      } catch (error) {
        console.error("Error fetching news:", error);
        setNews({ today: [], historical: [] });
      } finally {
        setNewsLoading(false);
      }
    };

    // Only fetch when switching to news tabs
    if (activeTab === "today-news" || activeTab === "historical-news") {
      fetchNews();
    }
  }, [activeTab]);

  // Mock FinTech Job Data (Top 10)
  const jobs = [
    { title: "FinTech Data Analyst", company: "Paytm", location: "Bangalore, India", posted: "2 days ago", link: "#" },
    { title: "Blockchain Developer", company: "CoinSwitch", location: "Remote", posted: "3 days ago", link: "#" },
    { title: "Product Manager - Digital Banking", company: "Razorpay", location: "Bangalore, India", posted: "5 days ago", link: "#" },
    { title: "ML Engineer - Risk Analysis", company: "Nubank", location: "Remote", posted: "1 day ago", link: "#" },
    { title: "Backend Engineer - Payments", company: "Pine Labs", location: "Bangalore", posted: "4 days ago", link: "#" },
    { title: "Security Researcher", company: "CoinDCX", location: "Remote", posted: "6 days ago", link: "#" },
    { title: "QA Engineer - FinTech", company: "Billdesk", location: "Chennai", posted: "3 days ago", link: "#" },
    { title: "DevOps Engineer", company: "Infosys Fintech", location: "Pune", posted: "2 days ago", link: "#" },
    { title: "UI/UX Designer", company: "CRED", location: "Mumbai", posted: "5 days ago", link: "#" },
    { title: "API Specialist", company: "NPCI", location: "New Delhi", posted: "1 day ago", link: "#" },
  ];

  // Top 10 FinTech Skills
  const skills = [
    { skill: "Python & Data Analytics", demand: "Very High" },
    { skill: "Machine Learning (Finance AI)", demand: "Very High" },
    { skill: "Blockchain & DeFi", demand: "Very High" },
    { skill: "Cloud Computing (AWS, GCP, Azure)", demand: "Very High" },
    { skill: "SQL & Database Management", demand: "High" },
    { skill: "Financial Modelling", demand: "High" },
    { skill: "RegTech & Cybersecurity", demand: "Rising" },
    { skill: "API Development & Integration", demand: "High" },
    { skill: "React & Frontend Frameworks", demand: "High" },
    { skill: "DevOps & Containerization", demand: "High" },
  ];

  const renderNews = (newsList) => {
    if (!newsList || newsList.length === 0) {
      return <p className="text-gray-500">📭 No news available at the moment.</p>;
    }
    return newsList.map((item, i) => (
      <div key={i} className="border-b py-4 last:border-b-0">
        <h3 className="font-semibold text-lg text-gray-800">{item.title}</h3>
        <p className="text-gray-600 mt-1 text-sm">{item.description}</p>
        <div className="flex gap-3 mt-2 flex-wrap items-center">
          {item.source_id && (
            <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded font-medium">
              📰 {item.source_id}
            </span>
          )}
          {item.pubDate && (
            <span className="text-xs text-gray-500">
              🕐 {new Date(item.pubDate).toLocaleDateString('en-IN')}
            </span>
          )}
        </div>
        <a
          href={item.link}
          target="_blank"
          rel="noopener noreferrer"
          className="text-indigo-600 hover:underline text-sm mt-2 inline-block font-medium"
        >
          Read full article →
        </a>
      </div>
    ));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 to-pink-500 text-white">
      <div className="max-w-5xl mx-auto py-10 px-6">
        <h1 className="text-4xl font-bold mb-2">FinTech D10</h1>
        <p className="text-lg mb-8">📊 Top 10 FinTech News (Today & Historical), Jobs & Skills</p>

        {/* Tabs */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-6">
          {[
            { id: "today-news", label: "📰 Today" },
            { id: "historical-news", label: "📅 Historical" },
            { id: "jobs", label: "💼 Jobs" },
            { id: "skills", label: "🎯 Skills" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-lg font-semibold transition ${
                activeTab === tab.id
                  ? "bg-white text-indigo-600 shadow-lg scale-105"
                  : "bg-white/20 text-white hover:bg-white/30"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="bg-white text-black rounded-2xl p-8 shadow-lg min-h-96">
          {activeTab === "today-news" && (
            <div>
              <h2 className="text-2xl font-semibold mb-6">🔔 Today's FinTech News</h2>
              {newsLoading ? (
                <div className="flex items-center gap-2"><span className="animate-spin">⏳</span> Fetching latest news...</div>
              ) : (
                renderNews(news.today)
              )}
            </div>
          )}

          {activeTab === "historical-news" && (
            <div>
              <h2 className="text-2xl font-semibold mb-6">📅 Historical FinTech News (2024)</h2>
              {newsLoading ? (
                <div className="flex items-center gap-2"><span className="animate-spin">⏳</span> Loading historical news...</div>
              ) : (
                renderNews(news.historical)
              )}
            </div>
          )}

          {activeTab === "jobs" && (
            <div>
              <h2 className="text-2xl font-semibold mb-6">💼 Top 10 FinTech Job Openings</h2>
              {jobs.map((job, i) => (
                <div key={i} className="border-b py-4 last:border-b-0">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-800">{i + 1}. {job.title}</h3>
                      <p className="text-gray-700 mt-1">
                        <span className="font-semibold">{job.company}</span> • {job.location}
                      </p>
                      <p className="text-sm text-gray-500 mt-1">📅 {job.posted}</p>
                    </div>
                  </div>
                  <a href={job.link} className="text-indigo-600 hover:underline text-sm mt-2 inline-block font-medium">
                    View Details →
                  </a>
                </div>
              ))}
            </div>
          )}

          {activeTab === "skills" && (
            <div>
              <h2 className="text-2xl font-semibold mb-6">🎯 Top 10 FinTech Skills in 2025</h2>
              <ul className="space-y-3">
                {skills.map((s, i) => (
                  <li key={i} className="flex justify-between items-center border-b pb-3 last:border-b-0 text-gray-800">
                    <span className="font-medium text-lg">{i + 1}. {s.skill}</span>
                    <span className={`px-4 py-1.5 rounded-full text-sm font-bold ${
                      s.demand === "Very High" ? "bg-red-100 text-red-700" :
                      s.demand === "Rising" ? "bg-yellow-100 text-yellow-700" :
                      "bg-green-100 text-green-700"
                    }`}>
                      {s.demand}
                    </span>
                  </li>
                ))}
              </ul>
              <div className="mt-8 bg-indigo-50 p-6 rounded-xl border-l-4 border-indigo-600">
                <h3 className="font-bold text-lg text-indigo-800 mb-2">💡 2025 Industry Insights:</h3>
                <p className="text-gray-700 text-sm leading-relaxed">
                  FinTech professionals in 2025 must combine AI/ML expertise with blockchain knowledge and cloud infrastructure skills. 
                  Those who blend financial acumen, programming proficiency, and business strategy are commanding premium salaries globally.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-white text-sm opacity-90">
          <p>📊 Data powered by <a href="https://newsdata.io" target="_blank" rel="noopener noreferrer" className="underline hover:opacity-75">NewsData.io API</a></p>
          <p>⏰ Last updated: {new Date().toLocaleString('en-IN')}</p>
        </div>
      </div>
    </div>
  );
}
