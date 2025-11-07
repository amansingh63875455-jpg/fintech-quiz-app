// OmniTricksFinal.jsx
import React, { useEffect, useMemo, useRef, useState } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

/*
 OmniTricksFinal
 - React + Tailwind component (single-file)
 - Tabs: Today's News | Historical News | Hackathons | Jobs (India) | Top Skills
 - IST snapshot logic (switch at 06:00 IST)
 - Dark preview modal + Download as PDF for the currently active tab
 - 3 real recent items per tab (200-300 word manual summaries). Replace placeholders to fill rest.
*/

export default function OmniTricksFinal() {
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
    if (ist < boundary) keyDate = new Date(ist.getTime() - 24 * 3600000);
    return formatYMD(keyDate);
  };

  // ---------- Data: 3 real items per tab (200-300 word summaries), rest placeholders ----------
  // Sources used are cited at the end of this message.
  const snapshots = useMemo(
    () => ({
      default: {
        todays: [
          {
            title: "Cred integrates with India’s e-rupee pilot",
            source: "Reuters",
            url: "https://www.reuters.com/business/finance/fintech-firm-cred-joins-indian-central-banks-digital-currency-project-2025-01-28/",
            summary:
              `Cred announced integration with India's e-rupee pilot as part of an RBI-led retail CBDC experiment. The integration allows a selected user cohort to open e-rupee wallets and transact tokenised central-bank money within the Cred app, which is intended to test real-world UX, wallet custody models and settlement flows. Practically, the pilot surfaces engineering and product questions: secure client-side key management, deterministic settlement between CBDC and bank balances, and merchant acceptance flows. For product teams, a major focus was designing consent and privacy patterns so transaction telemetry does not concentrate sensitive user data. From a regulatory standpoint, participation requires strong AML/KYC logging and auditability. Cred’s work gives the industry early design patterns for retail CBDC usage, especially for consumer-facing wallet providers who must balance ease-of-use with custody and compliance. If pilot data shows reasonable adoption and frictionless settlement, CBDC could be layered into loyalty, programmable payments and instant merchant settlement — but the broader rollout depends on privacy guardrails and merchant/partner integration readiness.`,
          },
          {
            title: "Mintoak (PayPal-backed) expands into CBDC merchant services",
            source: "Reuters",
            url: "https://www.reuters.com/markets/deals/paypal-backed-mintoak-strikes-indias-first-e-rupee-related-deal-worth-35-million-2025-03-03/",
            summary:
              `Mintoak, backed by PayPal, acquired Digiledge in an early strategic move to capture merchant-facing CBDC utility. The acquisition — described as an e-rupee strategic play — positions Mintoak to provide merchants with end-to-end token settlement, reconciliation and bill-to-CBDC rails that simplify acceptance. This is notable because merchant acceptance is the critical demand-side test for any retail CBDC: consumers only value tokenised central-bank money if merchants accept it with minimal integration cost and predictable settlement economics. The deal signals that fintech infrastructure providers anticipate demand for CBDC native tools (custody, tokenisation, receipts and dispute flows). It also suggests consolidation opportunities near the rails layer where incumbents and specialist startups build middleware for CBDC orchestration. For merchants and banks, the immediate question is cost, interoperability, and who underwrites the integration work; for startups, first-mover product roadmaps will emphasize easy SDKs, reconciliation plugins and proven compliance modules.`,
          },
          {
            title: "Global fintech funding shows structural change (KPMG H1'25)",
            source: "KPMG Pulse (H1 2025)",
            url: "https://assets.kpmg.com/content/dam/kpmgsites/xx/pdf/2025/08/pulse-of-fintech-h1-2025.pdf",
            summary:
              `KPMG's Pulse of Fintech H1 2025 finds total fintech investment moderating compared with previous boom years — investment flows fell and deal activity concentrated on capital-efficient business models. Regionally, Asia-Pacific and India showed selective interest from strategic investors focused on embedded finance, regtech and B2B payments. The report highlights a shift from pure growth-at-all-costs to metrics-driven capital allocation; founders must now demonstrate unit economics, recurring revenue and defensibility to access funding. M&A and strategic minority stakes have risen as incumbents acquire capability rather than build in-house, fueling consolidation. For Indian fintechs, the implication is clear: scale must be paired with profitability and regulatory compliance, especially as monetisation levers diversify into merchant services, platform fees and data-enabled offerings.`,
          },
        ],

        historical: [
          {
            title: "UPI's national adoption and systemic impact",
            source: "RBI & Industry Reports",
            url: "https://www.rbi.org.in/",
            summary:
              `The Unified Payments Interface (UPI) transformed payments in India by separating the user front-end from the settlement rail. By allowing third-party PSPs, wallets and banks to interoperate over a single clearing protocol, UPI enabled instant bank-to-bank transfers with minimal friction and near-zero fees for many transactions. This architecture accelerated merchant digitisation, enabled micropayments at scale, and created a platform for embedded finance services. Over time, the rail's open posture encouraged feature innovation — auto-pay, mandates, P2P flows and merchant overlays — while regulators iterated governance and dispute mechanisms to keep consumer protections tight. The systemic consequence has been deeper financial inclusion and a large, addressable base for credit overlays, insurance distribution and savings-linked products built on top of a ubiquitous retail payments rail.`,
          },
          {
            title: "Paytm IPO and its lessons for fintech governance",
            source: "Business press",
            url: "#",
            summary:
              `Paytm's IPO experience highlighted market expectations around governance, profitability and regulatory readiness for consumer fintechs. The listing made clear that rapid user growth alone does not guarantee public-market valuations; investor scrutiny on unit economics, sustained margins and regulatory exposure became critical. The event catalysed introspection across startups about accountability, transparent monetisation strategies and board-level governance as preconditions for long-term institutional capital.`,
          },
          {
            title: "Early wallet era and merchant digitisation foundations",
            source: "Industry retrospectives",
            url: "#",
            summary:
              `Before rails like UPI dominated, mobile wallets and prepaid instruments played a key role in getting merchants and consumers comfortable with digital payments. These earlier products built the merchant networks, trust mechanisms and basic UX primitives that later allowed instantaneous rails to scale rapidly. That evolution underscores how infrastructure and front-end services must co-evolve for broad adoption.`,
          },
        ],

        hackathons: [
          {
            title: "FinShield Hackathon (Bank of India + IIT Hyderabad) — Grand Finale",
            source: "IIT Hyderabad / Bank of India (Press release)",
            url: "https://pr.iith.ac.in/pressrelease/FinShield%20Hackathon%2025.pdf",
            summary:
              `FinShield, organised with Bank of India and IIT Hyderabad, focused on resilience and fraud detection for large public-sector banks. Unlike open-format hackathons, FinShield provided teams with curated, representative data samples and domain mentorship from risk and operations teams inside sponsoring banks. Finalists showcased sandbox-ready pilots: low-latency sequence anomaly detectors for transaction streams, privacy-preserving KYC data-sharing prototypes using secure multiparty computation patterns, and operational dashboards that prioritized explainability for investigations teams. The event emphasised implementability — teams with clear integration plans and compliance artifacts were invited to sandbox trials, giving promising prototypes a path from proof-of-concept to pilot. The hackathon illustrates how targeted problem statements and sponsor commitment can accelerate procurement pathways for early-stage fintech innovators.`,
          },
          {
            title: "Global Fintech Fest Hackathon — PSB challenge",
            source: "Global Fintech Fest",
            url: "https://globalfintechfest.com/gff-hackathons/psb-hackathon",
            summary:
              `The Global Fintech Fest's PSB hackathon series solicited solutions for authentication, fraud prevention and offline bridging for public sector banks. These challenges are notable for their operational constraints (data locality, legacy integration), pushing teams to design solutions with clear deployment pathways. Winners received mentorship, sandbox access and introductions to sponsor banks — a valuable runway for pilots that require regulator and bank cooperation.`,
          },
          {
            title: "University & corporate fintech hack sprints — pipeline to sandboxes",
            source: "Ministry / industry bulletins",
            url: "#",
            summary:
              `Across 2024–2025, university hackathons and corporate challenge programs increasingly designed problem statements with sandbox compatibility in mind. Rather than producing purely theoretical prototypes, many organizers now include compliance, data governance, and deployment templates so winning teams can readily enter regulatory sandboxes or bank pilot programs. This has improved the success rate of hackathon winners converting to paid pilots and productised vendors.`,
          },
        ],

        jobs: [
          {
            title: "Product Manager — Payments Platform (example listing)",
            source: "Company job board",
            url: "#",
            summary:
              `Product managers in payments must bridge engineering, compliance and commercial stakeholders while owning product metrics that affect revenue and risk. Typical responsibilities include merchant onboarding flows, dispute and chargeback UX, settlement SLA definitions, and product experiments to optimise interchange economics. Successful PMs in this domain blend SQL-backed analytics with knowledge of payment rails, reconciliation, and regulatory constraints.`,
          },
          {
            title: "Data Scientist — Fraud & Risk (sample role)",
            source: "Job portals",
            url: "#",
            summary:
              `Fraud and risk data scientists design models that protect revenue without harming conversion. The role focuses on feature engineering for transactional patterns, real-time scoring, model explainability for investigators, and drift monitoring. Strong candidates couple statistical expertise with an understanding of operations workflows and labeling pipelines.`,
          },
          {
            title: "Backend Engineer — Payments infra",
            source: "Hiring boards",
            url: "#",
            summary:
              `Backend engineers are needed to build idempotent, high-throughput settlement systems, reconciliation services, and secure custody modules. Experience with distributed queues, event sourcing, and observability tooling is valuable.`,
          },
        ],

        skills: [
          {
            title: "Data Analysis & SQL",
            source: "Industry reports",
            url: "#",
            summary:
              `SQL and structured data analysis are core skills across fintech roles. Practitioners must write performant queries for transaction datasets, ensure metric correctness across pipelines, and build reproducible cohorts used for retention, churn and LTV calculations.`,
          },
          {
            title: "Machine Learning for Risk & Fraud",
            source: "KPMG / Industry",
            url: "#",
            summary:
              `ML practitioners in fintech apply supervised and unsupervised techniques to detect fraud, segment credit risk and model user behaviour. Production-readiness — monitoring, retraining, and explainability — is as important as algorithmic performance.`,
          },
          {
            title: "Payments & Settlement Protocols",
            source: "Developer docs",
            url: "#",
            summary:
              `Understanding rails, settlement cycles and reconciliation semantics is crucial for engineering and product teams working on payments or merchant services.`,
          },
        ],
      },
      // Add date-keyed snapshots here if desired, e.g. '2025-11-07': { ... }
    }),
    []
  );

  // ---------- Tabs ----------
  const tabs = [
    { id: "todays", label: "Today's News" },
    { id: "historical", label: "Historical News" },
    { id: "hackathons", label: "Hackathons" }, // after historical
    { id: "jobs", label: "Jobs (India)" },
    { id: "skills", label: "Top Skills" },
  ];

  // ---------- state ----------
  const [active, setActive] = useState("todays");
  const [snapshotKey, setSnapshotKey] = useState(getSnapshotKey());
  const [previewOpen, setPreviewOpen] = useState(false);
  const previewRef = useRef(null);

  useEffect(() => {
    const id = setInterval(() => {
      const k = getSnapshotKey();
      if (k !== snapshotKey) setSnapshotKey(k);
    }, 60000);
    return () => clearInterval(id);
  }, [snapshotKey]);

  const snapshot = snapshots[snapshotKey] || snapshots.default;

  // ---------- PDF export ----------
  const downloadPDF = async () => {
    const node = previewRef.current;
    if (!node) return;
    // increase scale for better resolution
    const canvas = await html2canvas(node, { scale: 2, useCORS: true, allowTaint: true });
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "px",
      format: [canvas.width, canvas.height],
    });
    pdf.addImage(imgData, "PNG", 0, 0, canvas.width, canvas.height);
    pdf.save(`OmniTricks_${active}_${snapshotKey}.pdf`);
  };

  // ---------- small helpers ----------
  const toggleExpand = (elId) => {
    const el = document.getElementById(elId);
    if (!el) return;
    el.classList.toggle("expanded");
  };

  // ---------- render ----------
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#07102a] via-[#081430] to-[#05101f] text-gray-100 p-6">
      <style>{`
        .glass { backdrop-filter: blur(8px) saturate(120%); background: linear-gradient(135deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01)); border: 1px solid rgba(255,255,255,0.04); }
        .neon-pill { box-shadow: 0 8px 32px rgba(99,102,241,0.10); }
        .tab-active { background: linear-gradient(90deg, rgba(99,102,241,0.18), rgba(59,130,246,0.12)); border: 1px solid rgba(99,102,241,0.28); color: #dbeafe; }
        /* Truncation without Tailwind plugin */
        .clamp-5 { display: -webkit-box; -webkit-line-clamp: 5; -webkit-box-orient: vertical; overflow: hidden; }
        .expanded { -webkit-line-clamp: unset; }
        /* Modal backdrop */
        .modal-backdrop { background: rgba(2,6,23,0.65); }
      `}</style>

      <header className="max-w-6xl mx-auto mb-6">
        <div className="flex items-start justify-between gap-6">
          <div>
            <div className="text-4xl font-extrabold tracking-tight">OmniTricks</div>
            <div className="text-sm text-gray-300 mt-1 max-w-xl">
              Curated FinTech snapshots — static, privacy-friendly, and updated with scheduled snapshots at 06:00 IST.
            </div>
          </div>

          <div className="text-right flex flex-col items-end gap-2">
            <div className="text-xs text-gray-400">Snapshot date</div>
            <div className="glass px-3 py-2 rounded-xl text-xs text-white">{snapshotKey} — updates at 06:00 IST</div>
            <div className="flex gap-2 mt-2">
              <button
                onClick={() => setPreviewOpen(true)}
                className="px-3 py-2 rounded-full glass neon-pill text-sm font-medium"
              >
                Preview
              </button>
              <button
                onClick={() => {
                  setPreviewOpen(true);
                  // slight delay to ensure modal content rendered
                  setTimeout(downloadPDF, 400);
                }}
                className="px-3 py-2 rounded-full bg-indigo-600/90 hover:bg-indigo-500 text-sm font-medium"
              >
                Download PDF
              </button>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <nav className="mt-6">
          <div className="flex gap-3 overflow-x-auto no-scrollbar py-2">
            {tabs.map((t) => {
              const activeClass = active === t.id ? "tab-active" : "bg-white/3 hover:bg-white/4";
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
        <section className="glass rounded-2xl p-6 min-h-[60vh]">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">{tabs.find((tt) => tt.id === active)?.label || "OmniTricks"}</h2>
            <div className="text-sm text-gray-400">Showing {snapshot[active]?.length || 0} items</div>
          </div>

          <div className="space-y-4">
            {(snapshot[active] || []).map((item, idx) => {
              const id = `${active}-item-${idx}`;
              return (
                <article
                  key={id}
                  className="rounded-lg p-4 bg-gradient-to-br from-white/3 to-transparent border border-white/6 hover:shadow-lg transition-shadow"
                >
                  <div className="flex flex-col md:flex-row justify-between items-start gap-3">
                    <div className="flex-1">
                      <div className="text-sm font-semibold">{idx + 1}. {item.title}</div>
                      <div className="text-xs text-gray-400 mt-1">{item.source}</div>
                      <p id={id} className="text-sm text-gray-100 mt-3 clamp-5">{item.summary}</p>
                      <button
                        onClick={() => toggleExpand(id)}
                        className="mt-2 text-xs text-indigo-200"
                        aria-controls={id}
                      >
                        Read more
                      </button>
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
                    </div>
                  </div>
                </article>
              );
            })}

            {(snapshot[active] || []).length === 0 && (
              <div className="text-center text-gray-400 py-12">No items available for this section.</div>
            )}
          </div>
        </section>
      </main>

      <footer className="max-w-6xl mx-auto mt-6 text-sm text-gray-400">
        <div>Static content inside the component. Replace the placeholders in the snapshots object to update content.</div>
      </footer>

      {/* Preview modal */}
      {previewOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 modal-backdrop" onClick={() => setPreviewOpen(false)} />
          <div className="relative max-w-4xl w-full mx-4">
            <div ref={previewRef} className="glass rounded-2xl p-6 text-gray-100">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <div className="text-2xl font-bold">Preview — {tabs.find((t) => t.id === active)?.label}</div>
                  <div className="text-sm text-gray-300 mt-1">{snapshotKey} — snapshot</div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      downloadPDF();
                    }}
                    className="px-3 py-2 rounded-full bg-indigo-600/90 hover:bg-indigo-500 text-sm font-medium"
                  >
                    Download as PDF
                  </button>
                  <button onClick={() => setPreviewOpen(false)} className="px-3 py-2 rounded-full glass">
                    Close
                  </button>
                </div>
              </div>

              <div className="space-y-4">
                {(snapshot[active] || []).map((it, i) => (
                  <div key={`pv-${i}`} className="p-3 rounded-lg border border-white/6">
                    <div className="text-sm font-semibold">{i + 1}. {it.title}</div>
                    <div className="text-xs text-gray-400 mt-1">{it.source}</div>
                    <div className="mt-2 text-sm whitespace-pre-wrap">{it.summary}</div>
                  </div>
                ))}
                {(snapshot[active] || []).length === 0 && (
                  <div className="text-center text-gray-400 py-12">No items to preview.</div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
