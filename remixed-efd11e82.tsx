import React, { useState, useEffect } from 'react';
import { TrendingUp, GraduationCap, ChevronDown, ChevronUp, Award, Calendar, History, Volume2, VolumeX, ExternalLink } from 'lucide-react';

const App = () => {
  const [activeTab, setActiveTab] = useState('news');
  const [answers, setAnswers] = useState({});
  const [historicalAnswers, setHistoricalAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [showHistoricalResults, setShowHistoricalResults] = useState(false);
  const [expandedNews, setExpandedNews] = useState(null);
  const [isReading, setIsReading] = useState(false);
  const [currentReadingIndex, setCurrentReadingIndex] = useState(null);

  useEffect(() => {
    return () => {
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const newsData = {
    today: [
      { title: 'Alkami Appoints Cassandra Hudson as CFO', source: 'FinTech Futures', date: 'Nov 1, 2025', summary: 'Digital banking provider Alkami Technology appointed Cassandra Hudson as Chief Financial Officer.', content: 'Alkami Technology announced the appointment of Cassandra Hudson as CFO. Hudson brings extensive financial management experience from technology companies. Her appointment strengthens Alkami financial strategy as it scales operations. She will oversee financial operations, strategic planning, and investor relations. The company serves hundreds of financial institutions with cloud-based digital banking platforms. This leadership change aligns with Alkami growth trajectory and commitment to innovative banking solutions for community and regional institutions.', category: 'Leadership', url: 'https://fintechfutures.com' },
      { title: 'Ping Identity Acquires Keyless', source: 'FinTech Futures', date: 'Nov 1, 2025', summary: 'Identity security company Ping Identity acquired Keyless for privacy-preserving biometric authentication.', content: 'Ping Identity signed an agreement to acquire Keyless, a London-based biometric authentication innovator. This enables global adoption of advanced biometric authentication with privacy preservation. Keyless technology allows authentication without storing sensitive data in centralized databases. The acquisition integrates privacy-first capabilities into Ping Identity platform. This reflects growing importance of passwordless authentication in fintech. The combined solution helps organizations balance security with privacy compliance requirements.', category: 'M&A', url: 'https://fintechfutures.com' },
      { title: 'HSBC Launches Innovation Banking in Singapore', source: 'FinTech Futures', date: 'Nov 1, 2025', summary: 'HSBC launched Innovation Banking in Singapore to support the innovation ecosystem.', content: 'HSBC officially launched Innovation Banking in Singapore, expanding support for the innovation ecosystem. The proposition serves technology companies, startups, and venture capital firms. Singapore strategically positions HSBC in one of Asia most vibrant fintech hubs. Services include treasury management, foreign exchange, and lending facilities. The bank offers connections to its global network of investors and advisors. This builds on existing innovation banking operations in other markets.', category: 'Banking', url: 'https://fintechfutures.com' },
      { title: 'Citi Partners with Coinbase', source: 'FinTech Futures', date: 'Nov 2025', summary: 'Citigroup partnered with Coinbase to expand digital asset payment services.', content: 'Citigroup announced a strategic partnership with Coinbase for institutional digital asset services. This bridges traditional finance with digital assets. Focus areas include fiat-to-crypto payment processes and payments orchestration. The partnership leverages Citi global banking infrastructure and Coinbase digital asset expertise. This reflects growing institutional adoption of digital assets for cross-border payments. The combined capabilities provide seamless payment rails across traditional and blockchain systems.', category: 'Digital Assets', url: 'https://fintechfutures.com' },
      { title: 'Deel Raises 300M at 17B Valuation', source: 'FinTech Futures', date: 'Oct 2025', summary: 'HR platform Deel raised 300 million dollars in Series E funding at 17.3 billion valuation.', content: 'Deel closed a 300 million dollar Series E round valuing it at 17.3 billion dollars. Led by Ribbit Capital with Andreessen Horowitz and Coatue Management. This increased from 12 billion dollar valuation earlier in 2025. Deel enables companies to hire and manage employees across 150 countries. The platform processes billions in payroll annually. Capital will accelerate product development and market expansion. Success demonstrates the opportunity in solving global employment challenges.', category: 'Funding', url: 'https://fintechfutures.com' },
      { title: 'Wealthsimple Raises 750M CAD', source: 'FinTech Futures', date: 'Oct 2025', summary: 'Canadian fintech Wealthsimple raised 750 million CAD at 10 billion CAD valuation.', content: 'Wealthsimple secured 750 million Canadian dollars in equity funding at 10 billion CAD valuation. Co-led by Dragoneer Investment Group and Singapore GIC. Investment includes 550 million CAD primary and 200 million CAD secondary offerings. Capital accelerates product development across investing, spending, and credit. The company is rolling out its first credit card. Funding supports platform expansion and potential acquisitions. This underscores investor confidence in democratizing financial services in Canada.', category: 'Funding', url: 'https://fintechfutures.com' },
      { title: 'Upgrade Secures 165M Series G', source: 'FinTech Futures', date: 'Oct 2025', summary: 'Fintech Upgrade raised 165 million dollars in Series G at 7.3 billion valuation.', content: 'Upgrade raised 165 million dollars in Series G led by Neuberger Berman. Valuation reached 7.3 billion dollars from 6 billion in 2021. Round included LuminArx Capital and existing investors DST Global and Ribbit Capital. Founded by Renaud Laplanche, former LendingClub founder. Upgrade offers credit cards, personal loans, and financial products. Company serves mainstream consumers with transparent credit products. Capital supports expansion into new categories and technology investment.', category: 'Funding', url: 'https://fintechfutures.com' },
      { title: 'Moniepoint Expands Globally', source: 'FinTech Futures', date: 'Oct 2025', summary: 'African fintech Moniepoint secured funding to expand across Nigeria, Kenya, UK, and US.', content: 'Moniepoint secured significant funding for expansion across multiple markets. The Nigerian-founded platform provides payments, banking, credit, and business tools. Expansion targets Nigeria, Kenya, United Kingdom, and United States. Moniepoint serves small and medium enterprises with accessible financial services. Platform enables businesses to accept payments and access credit. Millions of businesses already use services in Nigeria. Funding supports technology development, market entry, and regulatory compliance.', category: 'Funding', url: 'https://fintechfutures.com' },
      { title: 'Project Nemo Wins Grand Prix', source: 'FinTech Futures', date: 'Nov 2025', summary: 'Project Nemo won Money20/20 Diamond Grand Prix for disability inclusion in fintech.', content: 'Project Nemo won the prestigious Money20/20 Diamond Grand Prix award. The not-for-profit accelerates disability inclusion in fintech. Recognition comes as governments unveil new financial inclusion strategies. Project ensures technology products are accessible to everyone including 1.3 billion people with disabilities. Provides resources, best practices, and advocacy for inclusive product development. Award highlights critical importance of accessibility in financial services. Work encompasses education, tool development, and company collaboration.', category: 'Awards', url: 'https://fintechfutures.com' },
      { title: 'Monmouthshire Partners with Phoebus', source: 'FinTech Futures', date: 'Nov 2025', summary: 'UK building society entered five-year agreement with Phoebus Software.', content: 'Monmouthshire Building Society partnered with Phoebus Software for digital transformation. Five-year agreement delivers account servicing technology for 90,000 members. Partnership modernizes technology infrastructure and enhances customer experience. Phoebus specializes in core banking for building societies. New platform enables streamlined operations and improved data management. Implementation involves migrating customer accounts to the new system. Reflects trend of traditional institutions investing in technology modernization.', category: 'Technology', url: 'https://fintechfutures.com' }
    ],
    historical: [
      { title: 'PayPal Founded 1998', source: 'PayPal History', date: 'Dec 1998', summary: 'PayPal founded as Confinity by Max Levchin, Peter Thiel, and Luke Nosek.', content: 'PayPal began as Confinity in December 1998 in Palo Alto. Initially focused on security software before pivoting to digital wallets. Merged with Elon Musk X.com in March 2000. Adopted PayPal name and focused on money transfers. Went public in February 2002. Acquired by eBay for 1.5 billion dollars in July 2002. Success paved the way for modern fintech industry. Introduced buyer protection which built trust in online transactions. Many early employees became successful entrepreneurs in Silicon Valley.', category: 'Historical', url: 'https://paypal.com' },
      { title: 'Bitcoin Whitepaper 2008', source: 'Bitcoin Archives', date: 'Oct 31, 2008', summary: 'Satoshi Nakamoto published Bitcoin whitepaper introducing blockchain.', content: 'Satoshi Nakamoto published groundbreaking Bitcoin whitepaper on October 31, 2008. Introduced decentralized digital currency without central authority. Described blockchain technology as distributed ledger. Genesis Block mined on January 3, 2009. Innovation sparked revolution in financial technology. Inspired thousands of cryptocurrencies and blockchain applications. Technology explored for smart contracts and supply chain management. Bitcoin challenged traditional financial systems globally. Identity of Satoshi Nakamoto remains a mystery.', category: 'Historical', url: 'https://bitcoin.org' },
      { title: 'Stripe Founded 2010', source: 'Stripe History', date: 'Sep 2010', summary: 'Brothers Patrick and John Collison founded Stripe.', content: 'Stripe founded in September 2010 by Patrick and John Collison. Created developer-friendly API for payment processing. Launched publicly in September 2011 after Y Combinator. Gained traction for elegant API and comprehensive documentation. Processed billions by 2014 and expanded internationally. Launched products like Connect, Atlas, and Capital. Success demonstrated potential of improving financial infrastructure. Today powers payments for millions of businesses worldwide. Valued at over 50 billion dollars.', category: 'Historical', url: 'https://stripe.com' },
      { title: 'Square Launched 2010', source: 'Square History', date: 'Feb 2010', summary: 'Jack Dorsey and Jim McKelvey founded Square.', content: 'Square founded in February 2010 by Jack Dorsey and Jim McKelvey. Created small card reader for smartphone payment acceptance. Launched at TechCrunch Disrupt in May 2010. Offered free reader with 2.75 percent per swipe fee. Simplified payment acceptance for small businesses. Expanded beyond hardware to complete business ecosystem. Launched Cash App for peer-to-peer payments. Company went public in November 2015. Processes hundreds of billions annually.', category: 'Historical', url: 'https://squareup.com' },
      { title: 'M-Pesa Launched 2007', source: 'Vodafone Archives', date: 'Mar 2007', summary: 'Safaricom and Vodafone launched M-Pesa in Kenya.', content: 'M-Pesa launched in Kenya in March 2007 by Safaricom and Vodafone. Enabled money transfer via SMS without bank accounts. Attracted over 1.2 million customers within one year. Addressed critical need where most lacked banking access. Became global model for mobile money and financial inclusion. By 2020 virtually eliminated cash in major Kenyan cities. Expanded to multiple African countries. Proved mobile technology could leapfrog traditional banking. Enabled new economic activities and reduced crime.', category: 'Historical', url: 'https://vodafone.com' },
      { title: 'Robinhood Launched 2014', source: 'Robinhood History', date: 'Dec 2014', summary: 'Robinhood launched commission-free trading app.', content: 'Robinhood launched in December 2014 by Vladimir Tenev and Baiju Bhatt. Eliminated trading commissions for stock market access. Targeted millennials with sleek interface and fractional shares. Sparked retail investing boom among younger demographics. Forced traditional brokerages to eliminate commissions in 2019. Went public in July 2021. Played role in 2021 GameStop phenomenon. Raised questions about democratized trading and financial literacy. Changed investing landscape permanently.', category: 'Historical', url: 'https://robinhood.com' },
      { title: 'Alipay Launched 2004', source: 'Alibaba History', date: 'Dec 2004', summary: 'Alibaba launched Alipay as escrow service.', content: 'Alipay launched in December 2004 by Alibaba Group. Started as escrow payment for Taobao marketplace. Built trust by holding payments until delivery confirmation. Expanded to comprehensive digital wallet. Alibaba spun off financial services as Ant Financial in 2014. Pioneered QR code payments in physical stores. By 2020 eliminated cash usage in major Chinese cities. Integrated with wealth management and lending services. Created world largest mobile payment ecosystem.', category: 'Historical', url: 'https://alipay.com' },
      { title: 'TransferWise Founded 2011', source: 'Wise History', date: 'Jan 2011', summary: 'Kristo Kaarmann and Taavet Hinrikus founded TransferWise.', content: 'TransferWise founded in January 2011 by Kristo Kaarmann and Taavet Hinrikus. Frustrated by high international transfer fees. Developed peer-to-peer model using mid-market rates. Launched publicly in 2011 for expatriates and freelancers. Introduced multi-currency accounts and debit cards. Went public in July 2021. Rebranded to Wise in 2021. Forced traditional banks to lower fees and improve transparency. Challenged century-old money transfer industry.', category: 'Historical', url: 'https://wise.com' },
      { title: 'Coinbase Founded 2012', source: 'Coinbase History', date: 'Jun 2012', summary: 'Brian Armstrong and Fred Ehrsam founded Coinbase.', content: 'Coinbase founded in June 2012 by Brian Armstrong and Fred Ehrsam. Created easy platform for buying and storing cryptocurrency. Participated in Y Combinator summer 2012. Launched consumer service in October 2012. Grew rapidly with Bitcoin mainstream attention. Reached 1 million users by 2014. Became first major crypto company to go public. Listed on Nasdaq in April 2021 at 85 billion valuation. Serves tens of millions of users worldwide.', category: 'Historical', url: 'https://coinbase.com' },
      { title: 'Nubank Launched 2014', source: 'Nubank History', date: 'May 2014', summary: 'Nubank launched no-fee credit card in Brazil.', content: 'Nubank founded in May 2013 and launched product in May 2014. Founded by David Velez, Cristina Junqueira, and Edward Wible. Aimed to create transparent and customer-friendly digital bank. Purple credit card gained popularity among Brazilian millennials. Expanded to checking, loans, insurance, and investments. Went public in December 2021 at 40 billion valuation. Reached over 100 million customers by 2024. Became Latin America most valuable fintech. Demonstrated digital banking success in emerging markets.', category: 'Historical', url: 'https://nubank.com.br' }
    ]
  };

  const quizData = {
    today: [
      { q: 'Who was appointed as Alkami CFO?', opts: ['Sarah Mitchell', 'Cassandra Hudson', 'Jennifer Adams', 'Michelle Roberts'], ans: 1 },
      { q: 'Which company did Ping Identity acquire?', opts: ['BiometricTech', 'SecureAuth', 'Keyless', 'AuthGuard'], ans: 2 },
      { q: 'Where did HSBC launch Innovation Banking?', opts: ['Hong Kong', 'Singapore', 'London', 'New York'], ans: 1 },
      { q: 'Which exchange did Citi partner with?', opts: ['Binance', 'Kraken', 'Coinbase', 'Gemini'], ans: 2 },
      { q: 'What is Deel valuation in billions?', opts: ['12', '15.5', '17.3', '20'], ans: 2 },
      { q: 'How much did Wealthsimple raise in millions CAD?', opts: ['500', '750', '1000', '650'], ans: 1 },
      { q: 'Who led Upgrade Series G?', opts: ['Goldman Sachs', 'Sequoia', 'Neuberger Berman', 'Tiger Global'], ans: 2 },
      { q: 'Where is Moniepoint expanding?', opts: ['Nigeria Ghana', 'Nigeria Kenya UK US', 'Nigeria Egypt', 'Kenya Tanzania'], ans: 1 },
      { q: 'What award did Project Nemo win?', opts: ['Innovation', 'Diamond Grand Prix', 'Excellence', 'Inclusion'], ans: 1 },
      { q: 'Who did Monmouthshire partner with?', opts: ['Oracle', 'SAP', 'Phoebus Software', 'IBM'], ans: 2 }
    ],
    historical: [
      { q: 'When was PayPal founded?', opts: ['1997', '1998', '1999', '2000'], ans: 1 },
      { q: 'When was Bitcoin whitepaper published?', opts: ['Oct 31 2007', 'Oct 31 2008', 'Oct 31 2009', 'Oct 31 2010'], ans: 1 },
      { q: 'Who founded Stripe?', opts: ['Elon Musk', 'Collison Brothers', 'Jack Dorsey', 'Brian Armstrong'], ans: 1 },
      { q: 'What was Square original fee?', opts: ['2.25%', '2.50%', '2.75%', '3.00%'], ans: 2 },
      { q: 'Where did M-Pesa first launch?', opts: ['South Africa', 'Nigeria', 'Kenya', 'Tanzania'], ans: 2 },
      { q: 'When did Robinhood launch?', opts: ['Dec 2013', 'Dec 2014', 'Dec 2015', 'Dec 2016'], ans: 1 },
      { q: 'Which company launched Alipay?', opts: ['Tencent', 'Alibaba', 'Baidu', 'JD'], ans: 1 },
      { q: 'What is TransferWise called now?', opts: ['Transfer', 'Wise', 'WiseTransfer', 'TW'], ans: 1 },
      { q: 'When did Coinbase go public?', opts: ['April 2020', 'April 2021', 'April 2022', 'April 2023'], ans: 1 },
      { q: 'Where was Nubank founded?', opts: ['Argentina', 'Mexico', 'Brazil', 'Colombia'], ans: 2 }
    ]
  };

  const speak = (news, idx, isHist) => {
    const key = `${isHist ? 'h' : 'n'}${idx}`;
    if (isReading && currentReadingIndex === key) {
      window.speechSynthesis.cancel();
      setIsReading(false);
      setCurrentReadingIndex(null);
      return;
    }
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(`${news.title}. ${news.summary}. ${news.content}`);
    const voices = window.speechSynthesis.getVoices();
    const v = voices.find(v => v.lang.startsWith('en-US')) || voices[0];
    if (v) u.voice = v;
    u.rate = 0.95;
    u.pitch = 1.0;
    u.onend = () => { setIsReading(false); setCurrentReadingIndex(null); };
    window.speechSynthesis.speak(u);
    setIsReading(true);
    setCurrentReadingIndex(key);
  };

  const stop = () => {
    window.speechSynthesis.cancel();
    setIsReading(false);
    setCurrentReadingIndex(null);
  };

  const isNews = activeTab === 'news' || activeTab === 'historical';
  const isTodayQuiz = activeTab === 'quiz';
  const isHistQuiz = activeTab === 'historical-quiz';
  const data = activeTab === 'historical' ? newsData.historical : newsData.today;
  const quiz = isTodayQuiz ? quizData.today : quizData.historical;
  const ans = isTodayQuiz ? answers : historicalAnswers;
  const setAns = isTodayQuiz ? setAnswers : setHistoricalAnswers;
  const show = isTodayQuiz ? showResults : showHistoricalResults;
  const setShow = isTodayQuiz ? setShowResults : setShowHistoricalResults;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white shadow-lg">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <h1 className="text-4xl font-bold flex items-center gap-3"><TrendingUp className="w-10 h-10" />FinTech D10</h1>
          <p className="text-purple-100 mt-2 text-lg">Top 10 FinTech News & Knowledge Quiz</p>
          <p className="text-purple-200 text-sm mt-1">November 1, 2025</p>
        </div>
      </div>

      <div className="bg-white shadow-sm border-b sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex gap-1 overflow-x-auto">
            {['news', 'quiz', 'historical', 'historical-quiz'].map(tab => (
              <button key={tab} onClick={() => { setActiveTab(tab); stop(); }} className={`px-6 py-4 font-semibold flex items-center gap-2 border-b-2 transition-colors whitespace-nowrap ${activeTab === tab ? 'border-purple-600 text-purple-600' : 'border-transparent text-gray-600'}`}>
                {tab === 'news' && <><Calendar className="w-5 h-5" />Today News</>}
                {tab === 'quiz' && <><GraduationCap className="w-5 h-5" />Today Quiz</>}
                {tab === 'historical' && <><History className="w-5 h-5" />Historical</>}
                {tab === 'historical-quiz' && <><GraduationCap className="w-5 h-5" />History Quiz</>}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {isNews && (
          <div className="space-y-4">
            <h2 className="text-3xl font-bold mb-6">{activeTab === 'news' ? 'Latest Updates' : 'Historical Milestones'}</h2>
            {data.map((item, i) => {
              const key = `${activeTab === 'historical' ? 'h' : 'n'}${i}`;
              const exp = expandedNews === key;
              return (
                <div key={i} className="bg-white rounded-xl shadow-md border p-6">
                  <div className="flex justify-between mb-3">
                    <div className="flex gap-2 flex-wrap">
                      <span className="bg-purple-100 text-purple-700 text-xs font-semibold px-3 py-1 rounded-full">{item.category}</span>
                      <span className="text-xs text-gray-500">{item.date}</span>
                      <span className="text-xs text-gray-600 flex items-center gap-1"><ExternalLink className="w-3 h-3" />{item.source}</span>
                    </div>
                    <button onClick={() => speak(item, i, activeTab === 'historical')} className="p-2 hover:bg-purple-50 rounded">
                      {isReading && currentReadingIndex === key ? <VolumeX className="w-6 h-6 text-purple-600" /> : <Volume2 className="w-6 h-6 text-gray-400" />}
                    </button>
                  </div>
                  <button onClick={() => setExpandedNews(exp ? null : key)} className="text-left w-full">
                    <h3 className="text-xl font-bold text-gray-900 mb-2 flex items-center gap-2 hover:text-purple-600">{item.title}{exp ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}</h3>
                  </button>
                  <p className="text-gray-600 mb-3">{item.summary}</p>
                  {exp && (
                    <div className="border-t pt-4 mt-4">
                      <h4 className="font-semibold mb-3">Full Story</h4>
                      <p className="text-gray-700 mb-4">{item.content}</p>
                      <a href={item.url} target="_blank" rel="noopener noreferrer" className="text-purple-600 hover:underline flex items-center gap-1"><ExternalLink className="w-4 h-4" />View Source</a>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {(isTodayQuiz || isHistQuiz) && (
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-3xl font-bold mb-6">{isTodayQuiz ? 'Today Quiz' : 'Historical Quiz'}</h2>
            {!show ? (
              <div className="space-y-6">
                {quiz.map((q, i) => (
                  <div key={i} className="border-b pb-6">
                    <p className="font-semibold mb-3">{i + 1}. {q.q}</p>
                    <div className="space-y-2">
                      {q.opts.map((opt, j) => (
                        <button key={j} onClick={() => setAns({...ans, [i]: j})} className={`w-full text-left px-4 py-3 rounded-lg border-2 ${ans[i] === j ? 'border-purple-600 bg-purple-50' : 'border-gray-200'}`}>{opt}</button>
                      ))}
                    </div>
                  </div>
                ))}
                <button onClick={() => setShow(true)} disabled={Object.keys(ans).length !== 10} className="w-full bg-purple-600 text-white py-4 rounded-lg font-semibold hover:bg-purple-700 disabled:bg-gray-300">Submit Quiz</button>
              </div>
            ) : (
              <div className="text-center py-8">
                <Award className="w-20 h-20 text-yellow-500 mx-auto mb-4" />
                <h3 className="text-3xl font-bold mb-2">Quiz Complete!</h3>
                <p className="text-6xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-6">{quiz.filter((q, i) => ans[i] === q.ans).length} / 10</p>
                <button onClick={() => { setAns({}); setShow(false); }} className="bg-purple-600 text-white px-8 py-3 rounded-lg font-semibold">Retake Quiz</button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default App;