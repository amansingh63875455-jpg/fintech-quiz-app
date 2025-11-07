"use client";
// OmniTricksTabs.jsx
import React, { useEffect, useMemo, useState } from "react";

/*
  OmniTricksTabs — React component (Tailwind required)
  - Tabs: Today's News | Historical News | Hackathons | Jobs (India) | Top Skills
  - Hackathons tab placed immediately after Historical News.
  - IST-aware snapshot logic: uses snapshot keyed by YYYY-MM-DD, switches at 06:00 IST.
  - Replace placeholder summaries with 200-300 word entries in snapshots.default.
*/

export default function OmniTricksTabs() {
  // ---------- IST utilities ----------
  const nowIST = () => {
    const d = new Date();
    const utc = d.getTime() + d.getTimezoneOffset() * 60000;
    const ist = new Date(utc + 5.5 * 3600000);
    return ist;
  };

  const formatYMD = (d) => {
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${y}-${m}-${day}`;
  };

  const getSnapshotKey = () => {
    const ist = nowIST();
    const boundary = new Date(ist.getFullYear(), ist.getMonth(), ist.getDate(), 6, 0, 0);
    let keyDate = ist;
    if (ist < boundary) {
      keyDate = new Date(ist.getTime() - 24 * 3600000);
    }
    return formatYMD(keyDate);
  };

  // ---------- Static snapshots ----------
  // Replace or expand default.* items with full 200-300 word summaries
  const snapshots = useMemo(
    () => ({
      default: {
        todays: [
          {
            title: "Cred integrates with India’s e-rupee pilot",
            source: "Reuters",
            url: "https://www.reuters.com/",
            summary:
              `In a notable step toward mainstream testing of central bank digital currencies in India, Cred announced integration with the Reserve Bank of India's retail e-rupee pilot during Q1. The integration allows selected Cred users to create CBDC wallets and transact with other pilot participants through the app's interface. This initiative is framed as a controlled experiment to observe user experience, settlement behavior and interoperability with existing payment rails. Industry observers highlighted Cred's motivation to understand CBDC's product implications early — particularly how tokenised central bank money might change settlement finality, merchant integration and programmability of payments. From a technical standpoint, the pilot emphasises the need for secure wallet custody, low latency settlement, and clear user flows that preserve privacy while meeting AML/KYC requirements. If successful, such integrations could make CBDC access frictionless for retail customers and encourage wallet providers to upgrade back-end infrastructures for token support. Critics emphasise careful privacy safeguards and clear regulatory guidance to prevent concentration of transactional data. Overall, Cred's participation signals growing collaboration across startups and regulators to assess CBDC feasibility in real-world retail contexts.`,
          },
          {
            title: "Global fintech investment cools in H1'25",
            source: "KPMG Pulse",
            url: "https://home.kpmg/",
            summary:
              `KPMG's Pulse of Fintech for H1’25 recorded a slowdown in fintech funding versus previous years — a development attributed to higher global interest rates and investor selectivity. The report notes that venture activity has shifted from top-line growth playbooks toward capital efficiency and path-to-profitability narratives. Investors are prioritising revenue-generating business models, regulatory clarity and clear unit economics; sectors like embedded finance and B2B payments continue attracting strategic corporate capital while later-stage consumer fintech rounds have become rarer. For founders, the message is to demonstrate defensible margins, strong retention, and diversified revenue streams. Regionally, India remained attractive for strategic growth investments due to its digital payments scale and large underbanked segments. The report also highlighted an increase in strategic acquisitions as incumbents look to accelerate capability buildups in AI, risk, and payments — a sign that consolidation may continue if funding conditions remain constrained. In short, the market is maturing: capital is still available but at higher discipline and greater scrutiny on returns.`,
          },
          // Add 8 more items here (replace placeholders with full 200-300 word summaries)
          ...Array.from({ length: 8 }).map((_, i) => ({
            title: `Today's sample item ${i + 3}`,
            source: "Various",
            url: "#",
            summary:
              "TO EXPAND: Replace this placeholder with a full 200-300 word curated summary and a source URL.",
          })),
        ],

        historical: [
          {
            title: "UPI's national adoption transformed payments",
            source: "RBI & Industry Reports",
            url: "https://www.rbi.org.in/",
            summary:
              `Unified Payments Interface (UPI) redefined retail digital payments in India by enabling instant, low-cost bank-to-bank transfers through interoperable identifiers. Launched with a focus on simple UX, open participation and low settlement friction, UPI's architecture allowed multiple providers to build compelling user interfaces while relying on common rails for clearing and settlement. The ecosystem benefited from layered innovation: fintechs designed convenience features and value-added services, banks provided settlement and compliance controls, and regulators supported an open, interoperable posture. The result was rapid consumer adoption across urban and rural segments, meaningful merchant acceptance, and an explosion of ancillary services like overdrafts, BNPL, and embedded merchant credits.`,
          },
          {
            title: "Paytm IPO and valuation debate",
            source: "Business Press",
            url: "#",
            summary:
              `Paytm's IPO became a focal point for discussions about fintech valuations and profitability expectations in India. The market reaction highlighted investor concerns over unit economics, regulatory exposure, and customer acquisition costs. For many startups, Paytm's listing became a case study that emphasised governance, transparent monetisation strategies, and sustainable margins as prerequisites for public market support.`,
          },
          // placeholders for rest
          ...Array.from({ length: 8 }).map((_, i) => ({
            title: `Historical item ${i + 3}`,
            source: "Archives",
            url: "#",
            summary: "TO EXPAND: placeholder historical summary. Replace with 200-300 word writeup.",
          })),
        ],

        // Hackathons placed immediately after Historical in tab ordering (see tabs array below)
        hackathons: [
          {
            title: "FinShield Hackathon — resilience & risk",
            source: "IIT Hyderabad / Partners",
            url: "#",
            summary:
              `FinShield brought together students and early-stage teams to prototype resilience and fraud detection solutions tailored for public sector banks and large financial institutions. The event emphasised pragmatic pilots that could integrate with existing bank testbeds: teams focused on anomaly detection for transaction streams, secure multi-party computation for KYC sharing, and UX flows that reduced false positives without harming conversion. Mentors included industry risk leads and academics, and selected prototypes were fast-tracked for sandbox testing.`,
          },
          {
            title: "Global Fintech Fest — PSB challenge",
            source: "Global Fintech Fest",
            url: "https://www.globalfintechfest.com/",
            summary:
              `Part of Global Fintech Fest, the public sector bank hack challenge solicited solutions for fraud prevention, customer authentication and offline payments. Winning teams were awarded mentorship, pilot budgets and introductions to sponsor banks.`,
          },
          ...Array.from({ length: 8 }).map((_, i) => ({
            title: `Hackathon ${i + 3}`,
            source: "Various",
            url: "#",
            summary: "TO EXPAND: placeholder hackathon detail. Replace with 200-300 word description.",
          })),
        ],

        jobs: [
          {
            title: "Product Manager — Payments Platform (example)",
            source: "Company Job Board",
            url: "#",
            summary:
              `Product management roles in payments platforms demand a blend of domain expertise, cross-functional leadership and an obsession with user journeys. A payments product manager typically defines roadmaps for merchant onboarding, settlement improvements, dispute flows and fee structures. They must collaborate across engineering, risk, finance and go-to-market teams to prioritise work that improves conversion and reduces operational cost.`,
          },
          {
            title: "Data Scientist — Fraud Detection",
            source: "Multiple Firms",
            url: "#",
            summary:
              `Fraud detection scientists build model pipelines that detect anomalous behaviour while minimising friction for legitimate users. Common techniques include supervised learning for known fraud patterns, unsupervised anomaly detection for novel fraud, and sequence models for session analysis.`,
          },
          ...Array.from({ length: 8 }).map((_, i) => ({
            title: `Job item ${i + 3}`,
            source: "Job Boards",
            url: "#",
            summary: "TO EXPAND: placeholder job description / industry context (200-300 word target).",
          })),
        ],

        skills: [
          {
            title: "Data Analysis & SQL",
            source: "Industry Reports",
            url: "#",
            summary:
              `Data analysis and SQL are foundational skills for most fintech roles. Analysts and product teams rely on SQL to extract cohorts, compute unit economics, and instrument funnels. Good practitioners understand data lineage, build repeatable queries, and use versioned metrics to avoid conflicting dashboards.`,
          },
          {
            title: "Machine Learning for Risk & Fraud",
            source: "KPMG / Industry",
            url: "#",
            summary:
              `Machine learning applied to credit scoring, fraud detection and behavioural analytics remains among the highest demand skills in fintech. Practitioners must combine modelling skills with domain knowledge: which features indicate good credit behaviour, how to build guardrails for false positives, and how to design models that degrade gracefully under data drift.`,
          },
          ...Array.from({ length: 8 }).map((_, i) => ({
            title: `Skill item ${i + 3}`,
            source: "Learning resources",
            url: "#",
            summary: "TO EXPAND: placeholder skill explanation. Replace with 200-300 word detailed description.",
          })),
        ],
      },
      // Add dated snapshots here if you want: '2025-11-07': { todays: [...], historical: [...], ... }
    }),
    []
  );

  // ---------- Tab ordering and state ----------
  // Place hackathons after historical (ordering here)
  const tabs = [
    { id: "todays", label: "Today's News" },
    { id: "historical", label: "Historical News" },
    { id: "hackathons", label: "Hackathons" }, // positioned next after historical
    { id: "jobs", label: "Jobs (India)" },
    { id: "skills", label: "Top Skills" },
  ];

  const [active, setActive] = useState("todays");
  const [snapshotKey, setSnapshotKey] = useState(getSnapshotKey());

  useEffect(() => {
    const id = setInterval(() => {
      const k = getSnapshotKey();
      if (k !== snapshotKey) setSnapshotKey(k);
    }, 60000);
    return () => clearInterval(id);
  }, [snapshotKey]);

  const snapshot = snapshots[snapshotKey] || snapshots.default;

  // small keyboard accessibility: left/right to move tabs
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
        const idx = tabs.findIndex((t) => t.id === active);
        if (idx === -1) return;
        const nextIdx = e.key === "ArrowRight" ? (idx + 1) % tabs.length : (idx - 1 + tabs.length) % tabs.length;
        setActive(tabs[nextIdx].id);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active, tabs]);

  // ---------- Render ----------
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0b1020] via-[#081230] to-[#05101f] text-gray-100 p-6">
      <style>{`
        .glass { backdrop-filter: blur(8px) saturate(120%); background: linear-gradient(135deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01)); border: 1px solid rgba(255,255,255,0.04); }
        .neon-pill { box-shadow: 0 8px 30px rgba(99,102,241,0.12); }
        .tab-active { background: linear-gradient(90deg, rgba(99,102,241,0.18), rgba(59,130,246,0.12)); border: 1px solid rgba(99,102,241,0.28); color: #dbeafe; }
      `}</style>

      <header className="max-w-6xl mx-auto mb-6">
        <div className="flex items-center justify-between gap-6">
          <div>
            <div className="text-4xl font-extrabold tracking-tight">OmniTricks</div>
            <div className="text-sm text-gray-300 mt-1 max-w-xl">
              Curated FinTech snapshots — static, privacy-friendly, and updated with your scheduled snapshots at 06:00 IST.
            </div>
          </div>

          <div className="text-right">
            <div className="text-xs text-gray-400">Snapshot date</div>
            <div className="glass px-3 py-2 rounded-xl text-xs text-white">{snapshotKey} — updates at 06:00 IST</div>
          </div>
        </div>

        {/* Tabs: horizontal glowing pills. Scrollable on mobile */}
        <nav className="mt-6">
          <div className="flex gap-3 overflow-x-auto no-scrollbar py-2">
            {tabs.map((t) => {
              const activeClass = active === t.id ? "tab-active" : "bg-white/2 hover:bg-white/3";
              return (
                <button
                  key={t.id}
                  onClick={() => setActive(t.id)}
                  className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium glass neon-pill ${activeClass} transition-all duration-200`}
                  aria-pressed={active === t.id}
                >
                  {t.label}
                </button>
              );
            })}
          </div>
        </nav>
      </header>

      <main className="max-w-6xl mx-auto">
        {/* Content area */}
        <section className="glass rounded-2xl p-6 min-h-[60vh]">
          {/* section title */}
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">
              {tabs.find((t) => t.id === active)?.label || "OmniTricks"}
            </h2>
            <div className="text-sm text-gray-400">Showing {snapshot[active]?.length || 0} items</div>
          </div>

          {/* content list: only active tab shown */}
          <div className="space-y-4">
            {(snapshot[active] || []).map((item, idx) => (
              <article
                key={idx}
                className="rounded-lg p-4 bg-gradient-to-br from-white/2 to-transparent border border-white/3 hover:shadow-lg transition-shadow"
              >
                <div className="flex justify-between items-start gap-3">
                  <div className="flex-1">
                    <div className="text-sm font-semibold">{idx + 1}. {item.title}</div>
                    <div className="text-xs text-gray-400 mt-1">{item.source}</div>
                    <p className="text-sm text-gray-100 mt-3 line-clamp-5">{item.summary}</p>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    {item.url && (
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noreferrer"
                        className="text-xs px-3 py-1 rounded-full glass hover:underline"
                      >
                        View source
                      </a>
                    )}
                    <details className="text-xs">
                      <summary className="cursor-pointer text-indigo-200">Read more</summary>
                      <div className="mt-2 text-sm text-gray-100 whitespace-pre-wrap">{item.summary}</div>
                    </details>
                  </div>
                </div>
              </article>
            ))}
            {/* fallback if no items */}
            {(snapshot[active] || []).length === 0 && (
              <div className="text-center text-gray-400 py-12">No items available for this section.</div>
            )}
          </div>
        </section>
      </main>

      <footer className="max-w-6xl mx-auto mt-6 text-sm text-gray-400">
        <div>Data is static and embedded in the component. To change the daily snapshot, add a keyed snapshot under the snapshots object (YYYY-MM-DD) or replace the default content.</div>
        <div className="mt-2">To deploy: build a React app with Tailwind and drop this component into your page.</div>
      </footer>
    </div>
  );
}

