"use client";

import { useState } from "react";

const TABS = ["news", "jobs", "skills"];

export default function Home() {
  const [activeTab, setActiveTab] = useState("news");

  // Mock FinTech News Data
  const news = [
    {
      title: "Digital Payments Surge to Record Highs in 2025",
      description: "UPI transactions cross 15 billion monthly mark as India leads fintech revolution.",
      link: "#"
    },
    {
      title: "AI-Powered Fraud Detection Systems Go Mainstream",
      description: "Major banks adopt machine learning to prevent financial fraud in real-time.",
      link: "#"
    },
    {
      title: "Cryptocurrency Regulations Tighten Globally",
      description: "New international framework aims to balance innovation with consumer protection.",
      link: "#"
    },
    {
      title: "Buy Now Pay Later Services Face New Scrutiny",
      description: "Regulators worldwide examine BNPL impact on consumer debt levels.",
      link: "#"
    },
    {
      title: "Blockchain Technology Revolutionizes Cross-Border Payments",
      description: "Transaction times drop from days to minutes as major banks adopt distributed ledger tech.",
      link: "#"
    }
  ];

  // Mock FinTech Job Data
  const jobs = [
    {
      title: "FinTech Data Analyst",
      company: "Paytm",
      location: "Bangalore, India",
      posted: "2 days ago",
      link: "#",
    },
    {
      title: "Blockchain Developer",
      company: "CoinSwitch",
      location: "Remote",
      posted: "3 days ago",
      link: "#",
    },
    {
      title: "Product Manager - Digital Banking",
      company: "Razorpay",
      location: "Bangalore, India",
      posted: "5 days ago",
      link: "#",
    },
  ];

  // Top FinTech Skills (based on 2025 trends)
  const skills = [
    { skill: "Python & Data Analytics", demand: "High" },
    { skill: "Machine Learning (Finance AI)", demand: "Very High" },
    { skill: "Blockchain & DeFi", demand: "Very High" },
    { skill: "Cloud Computing (AWS, GCP)", demand: "High" },
    { skill: "SQL & Database Management", demand: "Medium" },
    { skill: "Financial Modelling", demand: "Medium" },
    { skill: "RegTech & Cybersecurity", demand: "Rising" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 to-pink-500 text-white">
      <div className="max-w-4xl mx-auto py-10 px-6">
        <h1 className="text-4xl font-bold mb-2">FinTech D10</h1>
        <p className="text-lg mb-8">Top FinTech News, Jobs & Skill Insights</p>

        {/* Tabs */}
        <div className="flex justify-around bg-white/10 rounded-xl p-3 mb-6">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-lg font-semibold ${
                activeTab === tab
                  ? "bg-white text-indigo-600"
                  : "text-white hover:bg-white/20"
              }`}
            >
              {tab === "news"
                ? "Today News"
                : tab === "jobs"
                ? "Job Openings"
                : "Top Skills"}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="bg-white text-black rounded-2xl p-6 shadow-lg">
          {activeTab === "news" && (
            <div>
              <h2 className="text-2xl font-semibold mb-4">Latest FinTech Updates</h2>
              {news.map((item, i) => (
                <div key={i} className="border-b py-3 last:border-b-0">
                  <h3 className="font-semibold text-lg">{item.title}</h3>
                  <p className="text-gray-700 mt-1">{item.description}</p>
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-indigo-600 hover:underline text-sm mt-2 inline-block"
                  >
                    Read more →
                  </a>
                </div>
              ))}
            </div>
          )}

          {activeTab === "jobs" && (
            <div>
              <h2 className="text-2xl font-semibold mb-4">Latest FinTech Job Openings</h2>
              {jobs.map((job, i) => (
                <div key={i} className="border-b py-3 last:border-b-0">
                  <h3 className="text-xl font-bold">{job.title}</h3>
                  <p className="text-gray-700 mt-1">
                    {job.company} — {job.location}
                  </p>
                  <p className="text-sm text-gray-500 mt-1">Posted: {job.posted}</p>
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
              <h2 className="text-2xl font-semibold mb-4">Top FinTech Skills in 2025</h2>
              <ul className="space-y-2">
                {skills.map((s, i) => (
                  <li
                    key={i}
                    className="flex justify-between border-b pb-2 text-gray-800 last:border-b-0"
                  >
                    <span>{s.skill}</span>
                    <span className="font-medium text-indigo-600">{s.demand}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-6 bg-indigo-50 p-4 rounded-xl">
                <h3 className="font-semibold text-lg text-indigo-800 mb-2">
                  Skill Analysis:
                </h3>
                <p className="text-gray-700">
                  FinTech in 2025 is heavily driven by AI, data analytics, and blockchain.
                  Professionals with cross-domain skills combining finance, programming,
                  and business understanding are in the highest demand globally.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
