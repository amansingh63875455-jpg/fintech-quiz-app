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
          const items = Array.from(xml.querySelectorAll("item")).slice(0, 4);
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
        setNews(allNews.slice(0, 10));
      } catch (err) {
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
    <main className="min-h-screen bg-gray-950 text-gray-100 px-6 py-6">
      <header className="mb-6">
        <h1 className="text-4xl font-extrabold text-white">OmniTricks</h1>
        <p className="text-gray-400 mt-1">
          Curated FinTech snapshots — static, privacy-friendly, and updated daily at 06:00 IST.
        </p>
        <p className="text-gray-500 text-sm mt-1">
          Snapshot date: {new Date().toISOString().split("T")[0]} — updates at 06:00 IST
        </p>
      </header>

      {/* Navigation Tabs */}
      <nav className="flex flex-wrap gap-3 mb-8">
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
      </nav>

      {/* === Today’s News Section === */}
      {activeTab === "today" && (
        <section>
          <h2 className="text-2xl font-bold mb-4">Today's News</h2>
          {loading ? (
            <p>Loading latest FinTech updates...</p>
          ) : (
            <div className="space-y-6">
              {news.map((item, i) => (
                <div
                  key={i}
                  className="bg-gray-900 border border-gray-800 rounded-2xl p-5 hover:bg-gray-800 transition-all"
                >
                  <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                  <p className="text-gray-400 mb-3">
                    {item.description.slice(0, 200)}...
                  </p>
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>{item.source}</span>
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-400 hover:text-blue-300"
                    >
                      View Source →
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      )}

      {/* === Other Tabs (Static Data Placeholders) === */}
      {activeTab === "historical" && (
        <section>
          <h2 className="text-2xl font-bold mb-4">Historical FinTech News</h2>
          <ul className="list-disc pl-6 text-gray-300 space-y-2">
            <li>UPI crossed 10 billion transactions milestone — 2023</li>
            <li>RBI introduced Digital Rupee pilot — 2022</li>
            <li>Paytm IPO marked India’s largest fintech listing — 2021</li>
            <li>PhonePe & Google Pay dominance in digital payments — 2020</li>
            <li>India Stack revolutionized public digital infrastructure — 2016-2019</li>
          </ul>
        </section>
      )}

      {activeTab === "hackathons" && (
        <section>
          <h2 className="text-2xl font-bold mb-4">Upcoming FinTech Hackathons</h2>
          <ul className="list-disc pl-6 text-gray-300 space-y-2">
            <li>RBIH FinTech Innovation Challenge — Dec 2025</li>
            <li>NPCI PayTech Hackathon — Jan 2026</li>
            <li>Google FinTech AI Hack — Open for Registration</li>
            <li>Mastercard Code-4-Inclusion — Global 2026 Edition</li>
            <li>Women in FinTech Hack by FICCI & AWS — Feb 2026</li>
          </ul>
        </section>
      )}

      {activeTab === "jobs" && (
        <section>
          <h2 className="text-2xl font-bold mb-4">FinTech Jobs (India)</h2>
          <ul className="list-disc pl-6 text-gray-300 space-y-2">
            <li>Data Analyst — Razorpay, Bangalore</li>
            <li>Blockchain Engineer — Paytm Labs, Noida</li>
            <li>Financial Data Scientist — Zerodha, Bangalore</li>
            <li>Product Manager — Groww, Bangalore</li>
            <li>Quant Research Intern — Pine Labs, Delhi NCR</li>
          </ul>
        </section>
      )}

      {activeTab === "skills" && (
        <section>
          <h2 className="text-2xl font-bold mb-4">Top Skills in FinTech</h2>
          <ul className="list-disc pl-6 text-gray-300 space-y-2">
            <li>Python for Finance & Data Analytics</li>
            <li>Machine Learning in Financial Modeling</li>
            <li>Blockchain & Smart Contracts</li>
            <li>RegTech & Compliance Automation</li>
            <li>API Development & Cloud Integration</li>
          </ul>
        </section>
      )}
    </main>
  );
}
