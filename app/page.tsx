"use client";

import { useEffect, useState } from "react";

const TABS = ["today-news", "historical-news", "jobs", "skills"];
const API_KEY = "pub_64e9e79f2e348f96f9a6ee9f2e1d4a3b3eff9"; // Free API key for demo

export default function Home() {
  const [activeTab, setActiveTab] = useState("today-news");
  const [todayNews, setTodayNews] = useState([]);
  const [historicalNews, setHistoricalNews] = useState([]);
  const [newsLoading, setNewsLoading] = useState(true);

  // Fetch news from NewsData API
  useEffect(() => {
    const fetchNews = async () => {
      setNewsLoading(true);
      try {
        const today = new Date();
        const sevenDaysAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
        const todayStr = today.toISOString().split('T')[0];
        const weekStr = sevenDaysAgo.toISOString().split('T')[0];

        // Fetch today news
        const todayRes = await fetch(
          `https://newsdata.io/api/1/news?apikey=${API_KEY}&country=in&category=business&language=en&qInTitle=fintech&from=${todayStr}&sortby=publishedAt`
        );
        const todayData = await todayRes.json();
        setTodayNews((todayData.results || []).slice(0, 10));

        // Fetch historical news (past week)
        const histRes = await fetch(
          `https://newsdata.io/api/1/news?apikey=${API_KEY}&country=in&category=business&language=en&qInTitle=fintech&from=${weekStr}&to=${todayStr}&sortby=publishedAt`
        );
        const histData = await histRes.json();
        setHistoricalNews((histData.results || []).slice(0, 10));
      } catch (error) {
        console.error('Error fetching news:', error);
      } finally {
        setNewsLoading(false);
      }
    };

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

  const renderNews = (newsList, showSource = true) => {
    if (!newsList || newsList.length === 0) {
      return <p className="text-gray-500">No news available.</p>;
    }
    return newsList.map((item, i) => (
      <div key={i} className="border-b py-4 last:border-b-0">
        <div className="flex justify-between items-start gap-2">
          <div className="flex-1">
            <h3 className="font-semibold text-lg text-gray-800">{item.title}</h3>
            <p className="text-gray-600 mt-1 text-sm">{item.description}</p>
            <div className="flex gap-3 mt-2 flex-wrap">
              {showSource && item.source_id && (
                <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
                  📰 {item.source_id}
                </span>
              )}
              {item.pubDate && (
                <span className="text-xs text-gray-500">
                  🕐 {new Date(item.pubDate).toLocaleDateString('en-IN')}
                </span>
              )}
            </div>
          </div>
        </div>
        <a
          href={item.link}
          target="_blank"
          rel="noopener noreferrer"
          className="text-indigo-600 hover:underline text-sm mt-2 inline-block"
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
        <p className="text-lg mb-8">Top 10 FinTech News (Today & Historical), Jobs & Skills</p>

        {/* Tabs */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-6">
          {[
            { id: "today-news", label: "📰 Today News" },
            { id: "historical-news", label: "📅 This Week" },
            { id: "jobs", label: "💼 Job Openings" },
            { id: "skills", label: "🎯 Top Skills" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-lg font-semibold transition ${
                activeTab === tab.id
                  ? "bg-white text-indigo-600 shadow-lg"
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
                <div className="flex items-center gap-2"><span className="animate-spin">⏳</span> Loading latest news...</div>
              ) : (
                renderNews(todayNews, true)
              )}
            </div>
          )}

          {activeTab === "historical-news" && (
            <div>
              <h2 className="text-2xl font-semibold mb-6">📅 This Week's FinTech News</h2>
              {newsLoading ? (
                <div className="flex items-center gap-2"><span className="animate-spin">⏳</span> Loading historical news...</div>
              ) : (
                renderNews(historicalNews, true)
              )}
            </div>
          )}

          {activeTab === "jobs" && (
            <div>
              <h2 className="text-2xl font-semibold mb-6">💼 Top 10 FinTech Job Openings</h2>
              {jobs.map((job, i) => (
                <div key={i} className="border-b py-4 last:border-b-0">
                  <h3 className="text-xl font-bold text-gray-800">{job.title}</h3>
                  <p className="text-gray-700 mt-1">
                    <span className="font-semibold">{job.company}</span> — {job.location}
                  </p>
                  <p className="text-sm text-gray-500 mt-1">📅 Posted: {job.posted}</p>
                  <a
                    href={job.link}
                    className="text-indigo-600 hover:underline text-sm mt-2 inline-block"
                  >
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
                    <span className="font-medium">{i + 1}. {s.skill}</span>
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      s.demand === "Very High" ? "bg-red-100 text-red-700" :
                      s.demand === "Rising" ? "bg-yellow-100 text-yellow-700" :
                      "bg-green-100 text-green-700"
                    }`}>
                      {s.demand}
                    </span>
                  </li>
                ))}
              </ul>
              <div className="mt-8 bg-indigo-50 p-4 rounded-xl">
                <h3 className="font-semibold text-lg text-indigo-800 mb-2">💡 Key Insights:</h3>
                <p className="text-gray-700 text-sm leading-relaxed">
                  FinTech in 2025 demands professionals with expertise in AI/ML, blockchain, cloud infrastructure, and cybersecurity. 
                  Those combining finance, programming, and business acumen are highly sought after in the industry.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-white text-sm">
          <p>📊 Data powered by <a href="https://newsdata.io" className="underline hover:text-gray-200">NewsData.io API</a></p>
          <p>Last updated: {new Date().toLocaleString('en-IN')}</p>
        </div>
      </div>
    </div>
  );
}
