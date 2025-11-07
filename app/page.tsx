'use client';
import React, { useEffect, useMemo, useState } from 'react';

export default function OmniTricks() {
  const nowIST = () => {
    const d = new Date();
    const utc = d.getTime() + d.getTimezoneOffset() * 60000;
    const ist = new Date(utc + 5.5 * 3600000);
    return ist;
  };

  const formatYMD = (d: Date) => {
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
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

  const snapshots: any = useMemo(
    () => ({
      default: {
        todays: [
          {
            title: 'Cred integrates with India\'s e-rupee pilot',
            source: 'Reuters',
            url: 'https://www.reuters.com',
            summary: 'In a notable step toward mainstream testing of central bank digital currencies in India, Cred announced integration with the Reserve Bank of India\'s retail e-rupee pilot during Q1. The integration allows selected Cred users to create CBDC wallets and transact with other pilot participants through the app\'s interface. This initiative is framed as a controlled experiment to observe user experience, settlement behavior and interoperability with existing payment rails. Industry observers highlighted Cred\'s motivation to understand CBDC\'s product implications early particularly how tokenised central bank money might change settlement finality, merchant integration and programmability of payments. From a technical standpoint, the pilot emphasises the need for secure wallet custody, low latency settlement, and clear user flows that preserve privacy while meeting AML/KYC requirements. If successful, such integrations could make CBDC access frictionless for retail customers and encourage wallet providers to upgrade backend infrastructures for token support. Critics emphasise careful privacy safeguards and clear regulatory guidance to prevent concentration of transactional data. Overall, Cred\'s participation signals growing collaboration across startups and regulators to assess CBDC feasibility in real-world retail contexts.',
          },
          {
            title: 'Global fintech investment cools in H1\'25',
            source: 'KPMG Pulse',
            url: 'https://home.kpmg',
            summary: 'KPMG\'s Pulse of Fintech for H1\'25 recorded a slowdown in fintech funding versus previous years a development attributed to higher global interest rates and investor selectivity. The report notes that venture activity has shifted from topline growth playbooks toward capital efficiency and path-to-profitability narratives. Investors are prioritising revenue-generating business models, regulatory clarity and clear unit economics sectors like embedded finance and B2B payments continue attracting strategic corporate capital while later-stage consumer fintech rounds have become rarer. For founders, the message is to demonstrate defensible margins, strong retention, and diversified revenue streams. Regionally, India remained attractive for strategic growth investments due to its digital payments scale and large underbanked segments. The report also highlighted an increase in strategic acquisitions as incumbents look to accelerate capability build-ups in AI, risk, and payments a sign that consolidation may continue if funding conditions remain constrained. In short, the market is maturing capital is still available but at higher discipline and greater scrutiny on returns.',
          },
          ...Array.from({ length: 8 }).map((_, i) => ({ title: `Today's sample item ${i + 3}`, source: 'Various', url: '', summary: 'TO EXPAND - replace this short placeholder with a 200-300 word summary and source URL.' })),
        ],
        historical: [
          { title: 'UPI\'s national adoption transformed payments', source: 'RBI & Industry Reports', url: 'https://www.rbi.org.in', summary: 'Unified Payments Interface (UPI) redefined retail digital payments in India by enabling instant, low-cost bank-to-bank transfers through interoperable identifiers. Launched with a focus on simple UX, open participation and low settlement friction, UPI\'s architecture allowed multiple providers to build compelling user interfaces while relying on common rails for clearing and settlement. The ecosystem benefited from layered innovation fintechs designed convenience features and value-added services, banks provided settlement and compliance controls, and regulators supported an open, interoperable posture. The result was rapid consumer adoption across urban and rural segments, meaningful merchant acceptance, and an explosion of ancillary services like overdrafts, BNPL, and embedded merchant credits. UPI\'s growth created new challenges merchant reconciliation, risk controls, and fee allocation needed refinement but its fundamental success lies in how a standards-based rail, combined with competitive front-end innovation, reshaped everyday payments behavior.' },
          { title: 'Paytm IPO and valuation debate', source: 'Business Press', url: '', summary: 'Paytm\'s initial public offering became a focal point for discussions about fintech valuations and profitability expectations in India. The market reaction highlighted investor concerns over unit economics, regulatory exposure, and customer acquisition costs. For many startups, Paytm\'s listing became a case study that emphasised governance, transparent monetisation strategies, and sustainable margins as prerequisites for public market support. The episode accelerated internal reassessments across companies that had previously prioritised growth at the cost of profitability, nudging founders toward clearer paths for monetisation and operational discipline.' },
          ...Array.from({ length: 8 }).map((_, i) => ({ title: `Historical item ${i + 3}`, source: 'Archives', url: '', summary: 'TO EXPAND - placeholder historical summary. Replace with 200-300 word writeup.' })),
        ],
        jobs: [
          { title: 'Product Manager - Payments Platform (example)', source: 'Company Job Board', url: '', summary: 'Product management roles in payments platforms demand a blend of domain expertise, cross-functional leadership and an obsession with user journeys. A payments product manager typically defines roadmaps for merchant onboarding, settlement improvements, dispute flows and fee structures. They must collaborate across engineering, risk, finance and go-to-market teams to prioritise work that improves conversion and reduces operational cost. Critical skills include understanding payment rails (instant vs deferred settlement), reconciliation pain points, chargeback dynamics, and regulatory constraints impacting product design. In addition, PMs should use data to validate hypotheses, design A/B experiments to improve funnels, and articulate metrics tied to unit economics. For aspirants, demonstrable experience in payments, strong SQL/data literacy and a portfolio of shipped features are competitive advantages.' },
          { title: 'Data Scientist - Fraud Detection', source: 'Multiple Firms', url: '', summary: 'Fraud detection scientists build model pipelines that detect anomalous behaviour while minimising friction for legitimate users. Common techniques include supervised learning for known fraud patterns, unsupervised anomaly detection for novel fraud, and sequence models for session analysis. Practical implementations emphasise feature stability, low latency scoring, explainability for operations teams, and robust monitoring to catch data drift. Data scientists in this area work closely with engineering to deploy models into scoring services, with product teams to design adaptive responses, and with analysts to maintain feature stores and labeling processes. Success depends on balancing precision and recall to protect revenue while preserving user experience.' },
          ...Array.from({ length: 8 }).map((_, i) => ({ title: `Job item ${i + 3}`, source: 'Job Boards', url: '', summary: 'TO EXPAND - placeholder job description + industry context (200-300 word target).' })),
        ],
        skills: [
          { title: 'Data Analysis & SQL', source: 'Industry Reports', url: '', summary: 'Data analysis and SQL are foundational skills for most fintech roles. Analysts and product teams rely on SQL to extract cohorts, compute unit economics, and instrument funnels. Good practitioners understand data lineage, build repeatable queries, and use versioned metrics to avoid conflicting dashboards. In fintech specifically, these skills enable rapid troubleshooting for payment anomalies, churn drivers and retention levers, and serve as a baseline for more advanced work in machine learning and experimentation. Training in data hygiene, structured queries, aggregation efficiency and indexing is essential for high-volume transaction datasets.' },
          { title: 'Machine Learning for Risk & Fraud', source: 'KPMG & Industry', url: '', summary: 'Machine learning applied to credit scoring, fraud detection, and behavioural analytics remains among the highest demand skills in fintech. Practitioners must combine modelling skills with domain knowledge (which features indicate good credit behaviour, how to build guardrails for false positives, and how to design models that degrade gracefully under data drift). Production readiness (such as model monitoring, retraining strategies and explainability) is as important as algorithmic novelty.' },
          ...Array.from({ length: 8 }).map((_, i) => ({ title: `Skill item ${i + 3}`, source: 'Learning resources', url: '', summary: 'TO EXPAND - placeholder skill explanation. Replace with 200-300 word detailed description.' })),
        ],
        hackathons: [
          { title: 'FinShield Hackathon - resilience & risk', source: 'IIT Hyderabad & Partners', url: '', summary: 'FinShield brought together students and early-stage teams to prototype resilience and fraud detection solutions tailored for public sector banks and large financial institutions. The event emphasised pragmatic pilots that could integrate with existing bank testbeds teams focused on anomaly detection for transaction streams, secure multi-party computation for KYC sharing, and UX flows that reduced false positives without harming conversion. Mentors included industry risk leads and academics, and selected prototypes were fast-tracked for sandbox testing. The hackathon highlighted the value of domain mentorship and data realism in producing deployable pilots rather than purely theoretical proofs-of-concept.' },
          { title: 'Global Fintech Fest - PSB challenge', source: 'Global Fintech Fest', url: 'https://www.globalfintechfest.com', summary: 'Part of Global Fintech Fest, the public sector bank hack challenge solicited solutions for fraud prevention, customer authentication and offline payments. Winning teams were awarded mentorship, pilot budgets and introductions to sponsor banks. The event underlined how hackathons can feed sandboxes and influence real procurement decisions when problem statements reflect actual operational constraints and participants have access to representative datasets.' },
          ...Array.from({ length: 8 }).map((_, i) => ({ title: `Hackathon ${i + 3}`, source: 'Various', url: '', summary: 'TO EXPAND - placeholder hackathon detail. Replace with 200-300 word description.' })),
        ],
      },
    }),
    []
  );

  const [snapshotKey, setSnapshotKey] = useState(getSnapshotKey);
  useEffect(() => {
    const id = setInterval(() => {
      const k = getSnapshotKey();
      if (k !== snapshotKey) setSnapshotKey(k);
    }, 60000);
    return () => clearInterval(id);
  }, [snapshotKey]);

  const snapshot = snapshots[snapshotKey] || snapshots.default;
  const columns = [
    { id: 'todays', title: "Today's News" },
    { id: 'historical', title: 'Historical News' },
    { id: 'jobs', title: 'Jobs - India' },
    { id: 'skills', title: 'Top Skills' },
    { id: 'hackathons', title: 'Hackathons' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0b1020] via-[#0b1430] to-[#06102a] text-gray-100 p-8">
      <style jsx>{`
        .glass {
          backdrop-filter: blur(8px) saturate(120%);
          background: linear-gradient(135deg, rgba(255,255,255,0.03), rgba(255,255,255,0.02));
          border: 1px solid rgba(255,255,255,0.06);
        }
        .neon {
          box-shadow: 0 6px 30px rgba(59,130,246,0.08), inset 0 1px 0 rgba(255,255,255,0.02);
        }
      `}</style>
      <header className="max-w-6xl mx-auto mb-8">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-4xl font-extrabold tracking-tight">OmniTricks</div>
            <div className="text-sm text-gray-300 mt-1">
              Your comprehensive FinTech information hub: static snapshots, curated summaries and hackathon highlights.
            </div>
          </div>
          <div className="text-right">
            <div className="text-xs text-gray-400">Snapshot</div>
            <div className="glass px-3 py-2 rounded-xl text-xs text-white">
              {snapshotKey} (updates at 06:00 IST)
            </div>
          </div>
        </div>
        <div className="mt-6 flex gap-3">
          <button className="px-4 py-2 rounded-full glass neon text-sm">Today's News</button>
          <button className="px-4 py-2 rounded-full glass text-sm">Historical</button>
          <button className="px-4 py-2 rounded-full glass text-sm">Jobs - India</button>
          <button className="px-4 py-2 rounded-full glass text-sm">Top Skills</button>
          <button className="px-4 py-2 rounded-full glass text-sm">Hackathons</button>
        </div>
      </header>
      <main className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
        {columns.map((col) => (
          <section key={col.id} className="glass rounded-2xl p-4 min-h-[520px]">
            <h3 className="text-lg font-semibold mb-3">{col.title}</h3>
            <div className="space-y-3 overflow-auto max-h-[64vh] pr-2">
              {snapshot[col.id].map((it: any, idx: number) => (
                <article key={idx} className="bg-transparent border border-transparent hover:border-white/6 rounded-xl p-3">
                  <div className="flex justify-between items-start gap-2">
                    <div className="text-sm font-semibold">{idx + 1}. {it.title}</div>
                    <a className="text-xs text-gray-400 hover:underline" href={it.url} target="_blank" rel="noreferrer">source</a>
                  </div>
                  <div className="text-xs text-gray-400 mt-1">{it.source}</div>
                  <details className="mt-2 text-sm text-gray-100 leading-relaxed">
                    <summary className="cursor-pointer text-indigo-300">Preview</summary>
                    <p className="mt-2 whitespace-pre-wrap">{it.summary}</p>
                  </details>
                </article>
              ))}
            </div>
          </section>
        ))}
      </main>
      <footer className="max-w-6xl mx-auto mt-8 text-sm text-gray-400">
        <div>Static curated sources: Reuters, KPMG, Financial Times, FinTech Global, Global Fintech Fest and industry job boards. Replace placeholders with full 200-300 word summaries in the snapshots object.</div>
        <div className="mt-2">To publish: build with Tailwind and deploy to Vercel/Netlify. This is a static single-page component (no backend required).</div>
      </footer>
    </div>
  );
}
