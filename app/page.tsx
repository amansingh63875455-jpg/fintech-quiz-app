"use client";

import { useEffect, useState } from "react";

// Simple RSS parser (no API key needed)
const RSS_FEEDS = [
  "https://economictimes.indiatimes.com/markets/finance/rssfeeds/1977021501.cms",
  "https://www.moneycontrol.com/rss/business.xml",
  "https://www.business-standard.com/rss/finance-10301.xml"
];

interface NewsItem {
  title: string;
  link: string;
  description: string;
  source: string;
  pubDate: string;
}

export default function OmniClicks() {
  const [activeTab, setActiveTab] = useState("today");
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRSS = async () => {
      try {
        const allNews: NewsItem[] = [];

        for (const feed of RSS_FEEDS) {
          const res = await fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(feed)}`);
          const data = await res.json();
          const xml = new window.DOMParser().parseFromString(data.contents, "text/xml");
 const items = Array.from(xml.querySelectorAll("item")).slice(0, 10);
          items.forEach((item) => {
            allNews.push({
              title: item.querySelector("title")?.textContent || "",
              link: item.querySelector("link")?.textContent || "#",
              description: item.querySelector("description")?.textContent?.replace(/<[^>]+>/g, "") || "",
              source: new URL(feed).hostname,
              pubDate: item.querySelector("pubDate")?.textContent || "",
            });
          });
        }

 setNews(allNews.slice(0, 50));      } catch (err) {
        console.error("Error fetching RSS:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchRSS();
  }, []);

  const tabs = [
    { id: "today", label: "Today's News" },
    { id: "historical", label: "Historical News" },
    { id: "hackathons", label: "Hackathons" },
    { id: "jobs", label: "Jobs (India)" },
    { id: "skills", label: "Top Skills" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 text-white font-sans overflow-x-hidden">
      <main className="container mx-auto px-4 md:px-6 py-6">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-3 bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-300 bg-clip-text text-transparent">
            OmniTricks
          </h1>
          <p className="text-gray-400 text-sm md:text-base max-w-2xl mx-auto">
            Curated FinTech snapshots — static, privacy-friendly, and updated daily at 06:00 IST.
          </p>
          <p className="text-gray-500 text-xs mt-2">
            Snapshot date: {new Date().toISOString().split("T")[0]} — updates at 06:00 IST
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap justify-center gap-2 md:gap-3 mb-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeTab === tab.id
                  ? "bg-blue-600 text-white"
                  : "bg-gray-800 hover:bg-gray-700 text-gray-300"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* === Today's News Section === */}
        {activeTab === "today" && (
          <div>
            <h2 className="text-3xl font-bold mb-6">Today’s News</h2>
            {loading ? (
              <p className="text-gray-400 text-center py-12">Loading latest FinTech updates...</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
 {news.slice(0, 10).map((item, i) => (                  <div
                    key={i}
                    className="bg-gray-800 hover:bg-gray-750 rounded-lg p-5 shadow-lg transition-all"
                  >
                    <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                    <p className="text-gray-400 text-sm mb-4">
                      {item.description.slice(0, 1500)}...
                    </p>
                    <div className="flex justify-between items-center text-xs text-gray-500">
                      <span>{item.source}</span>
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-cyan-400 hover:underline"
                      >
                        View Source →
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* === Other Tabs (Static Data Placeholders) === */}
        {activeTab === "historical" && (
          <div>
            <h2 className="text-3xl font-bold mb-6">Historical FinTech News</h2>
            <ul className="space-y-3 text-gray-300">
              <li>• UPI crossed 10 billion transactions milestone — 2023</li>
              <li>• RBI introduced Digital Rupee pilot — 2022</li>
              <li>• Paytm IPO marked India’s largest fintech listing — 2021</li>
              <li>• PhonePe & Google Pay dominance in digital payments — 2020</li>
              <li>• India Stack revolutionized public digital infrastructure — 2016-2019</li>
            </ul>
          </div>
        )}

        {activeTab === "hackathons" && (
          <div>
            <h2 className="text-3xl font-bold mb-6">Upcoming FinTech Hackathons</h2>
            <ul className="space-y-3 text-gray-300">
              <li>• RBIH FinTech Innovation Challenge — Dec 2025</li>
              <li>• NPCI PayTech Hackathon — Jan 2026</li>
              <li>• Google FinTech AI Hack — Open for Registration</li>
              <li>• Mastercard Code-4-Inclusion — Global 2026 Edition</li>
              <li>• Women in FinTech Hack by FICCI & AWS — Feb 2026</li>
            </ul>
          </div>
        )}

        {activeTab === "jobs" && (
          <div>
            <h2 className="text-3xl font-bold mb-6">FinTech Jobs (India)</h2>
            <ul className="space-y-3 text-gray-300">
              <li>• Data Analyst — Razorpay, Bangalore</li>
              <li>• Blockchain Engineer — Paytm Labs, Noida</li>
              <li>• Financial Data Scientist — Zerodha, Bangalore</li>
              <li>• Product Manager — Groww, Bangalore</li>
              <li>• Quant Research Intern — Pine Labs, Delhi NCR</li>
            </ul>
          </div>
        )}

        {activeTab === "skills" && (
          <div>
            <h2 className="text-3xl font-bold mb-6">Top Skills in FinTech</h2>
            <ul className="space-y-3 text-gray-300">
              <li>• Python for Finance & Data Analytics</li>
              <li>• Machine Learning in Financial Modeling</li>
              <li>• Blockchain & Smart Contracts</li>
              <li>• RegTech & Compliance Automation</li>
              <li>• API Development & Cloud Integration</li>
            </ul>
          </div>
        )}
      </main>
    </div>
  );
}
