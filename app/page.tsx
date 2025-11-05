'use client';

import { useState } from 'react';

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

const questions: Question[] = [
  {
    id: 1,
    question: 'What does DeFi stand for in the financial technology sector?',
    options: ['Digital Finance', 'Decentralized Finance', 'Direct Finance', 'Distributed Finance'],
    correctAnswer: 1,
    explanation: 'DeFi stands for Decentralized Finance, which refers to financial services using smart contracts on blockchains instead of traditional intermediaries.'
  },
  {
    id: 2,
    question: 'Which payment technology allows contactless transactions using smartphones?',
    options: ['ACH', 'Wire Transfer', 'NFC', 'SWIFT'],
    correctAnswer: 2,
    explanation: 'NFC (Near Field Communication) technology enables contactless payments through smartphones and other devices.'
  },
  {
    id: 3,
    question: 'What is a digital wallet primarily used for?',
    options: ['Mining cryptocurrency', 'Storing payment information electronically', 'Trading stocks', 'Credit score monitoring'],
    correctAnswer: 1,
    explanation: 'A digital wallet stores payment information electronically, allowing users to make transactions without physical cards.'
  },
  {
    id: 4,
    question: 'What does API stand for in fintech?',
    options: ['Automated Payment Integration', 'Application Programming Interface', 'Advanced Payment Infrastructure', 'Automated Processing Interface'],
    correctAnswer: 1,
    explanation: 'API stands for Application Programming Interface, which allows different software applications to communicate and share data.'
  },
  {
    id: 5,
    question: 'What is robo-advisory in fintech?',
    options: ['Robot manufacturing', 'Automated investment management using algorithms', 'Customer service chatbots', 'Fraud detection system'],
    correctAnswer: 1,
    explanation: 'Robo-advisory refers to automated investment management services that use algorithms to create and manage investment portfolios.'
  },
  {
    id: 6,
    question: 'What does KYC stand for in financial services?',
    options: ['Keep Your Cash', 'Know Your Customer', 'Key Yield Calculation', 'Kinetic Yield Coefficient'],
    correctAnswer: 1,
    explanation: 'KYC stands for Know Your Customer, a regulatory requirement for verifying the identity of clients to prevent fraud and money laundering.'
  },
  {
    id: 7,
    question: 'Which technology is commonly used for secure, transparent transaction recording?',
    options: ['Cloud Computing', 'Blockchain', 'Machine Learning', 'Virtual Reality'],
    correctAnswer: 1,
    explanation: 'Blockchain technology provides secure, transparent, and immutable recording of transactions across a distributed network.'
  },
  {
    id: 8,
    question: 'What is peer-to-peer (P2P) lending?',
    options: ['Bank loans to businesses', 'Direct lending between individuals without traditional financial institutions', 'Government subsidized loans', 'Corporate bond trading'],
    correctAnswer: 1,
    explanation: 'P2P lending connects borrowers directly with lenders through online platforms, bypassing traditional financial institutions.'
  },
  {
    id: 9,
    question: 'What does AML stand for in financial compliance?',
    options: ['Automated Money Ledger', 'Anti-Money Laundering', 'Advanced Market Listing', 'Asset Management Logic'],
    correctAnswer: 1,
    explanation: 'AML stands for Anti-Money Laundering, referring to regulations and procedures designed to prevent criminals from disguising illegally obtained funds.'
  },
  {
    id: 10,
    question: 'What is open banking?',
    options: ['Banks open 24/7', 'Sharing financial data through APIs with third-party providers', 'Free banking services', 'Banks without physical branches'],
    correctAnswer: 1,
    explanation: 'Open banking allows third-party financial service providers to access bank data through APIs with customer consent, promoting innovation and competition.'
  }
];

export default function Home() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [answeredQuestions, setAnsweredQuestions] = useState<boolean[]>(new Array(questions.length).fill(false));

  const handleAnswerSelect = (answerIndex: number) => {
    if (!answeredQuestions[currentQuestion]) {
      setSelectedAnswer(answerIndex);
      setShowExplanation(true);
      
      const newAnsweredQuestions = [...answeredQuestions];
      newAnsweredQuestions[currentQuestion] = true;
      setAnsweredQuestions(newAnsweredQuestions);

      if (answerIndex === questions[currentQuestion].correctAnswer) {
        setScore(score + 1);
      }
    }
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    } else {
      setQuizCompleted(true);
    }
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowExplanation(false);
    setScore(0);
    setQuizCompleted(false);
    setAnsweredQuestions(new Array(questions.length).fill(false));
  };

  if (quizCompleted) {
    const percentage = Math.round((score / questions.length) * 100);
    return (
      <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-2xl w-full">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-indigo-600 mb-4">Quiz Completed! 🎉</h1>
            <div className="my-8">
              <div className="text-6xl font-bold text-indigo-600 mb-2">{percentage}%</div>
              <p className="text-2xl text-gray-700 mb-4">Your Score: {score} out of {questions.length}</p>
              {percentage >= 80 && <p className="text-xl text-green-600 font-semibold">Excellent work!</p>}
              {percentage >= 60 && percentage < 80 && <p className="text-xl text-blue-600 font-semibold">Good job!</p>}
              {percentage < 60 && <p className="text-xl text-orange-600 font-semibold">Keep learning!</p>}
            </div>
            <button
              onClick={handleRestart}
              className="bg-indigo-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors duration-200 shadow-lg"
            >
              Restart Quiz
            </button>
          </div>
        </div>
      </main>
    );
  }

  const currentQ = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-3xl w-full">
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <h1 className="text-3xl font-bold text-indigo-600">Fintech Quiz</h1>
            <span className="text-sm font-semibold text-gray-600">
              Question {currentQuestion + 1} of {questions.length}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">{currentQ.question}</h2>
          <div className="space-y-3">
            {currentQ.options.map((option, index) => {
              const isSelected = selectedAnswer === index;
              const isCorrect = index === currentQ.correctAnswer;
              const showResult = showExplanation;

              let buttonClasses = "w-full text-left p-4 rounded-lg border-2 transition-all duration-200 ";
              
              if (showResult) {
                if (isCorrect) {
                  buttonClasses += "border-green-500 bg-green-50 text-green-900";
                } else if (isSelected && !isCorrect) {
                  buttonClasses += "border-red-500 bg-red-50 text-red-900";
                } else {
                  buttonClasses += "border-gray-200 bg-gray-50 text-gray-500";
                }
              } else {
                buttonClasses += "border-gray-300 hover:border-indigo-500 hover:bg-indigo-50 cursor-pointer";
              }

              return (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(index)}
                  disabled={showExplanation}
                  className={buttonClasses}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{option}</span>
                    {showResult && isCorrect && <span className="text-green-600 text-xl">✓</span>}
                    {showResult && isSelected && !isCorrect && <span className="text-red-600 text-xl">✗</span>}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {showExplanation && (
          <div className="mb-6 p-4 bg-blue-50 border-l-4 border-blue-500 rounded">
            <p className="text-sm font-semibold text-blue-900 mb-1">Explanation:</p>
            <p className="text-blue-800">{currentQ.explanation}</p>
          </div>
        )}

        <div className="flex justify-between items-center">
          <div className="text-sm font-semibold text-gray-600">
            Score: {score} / {currentQuestion + (showExplanation ? 1 : 0)}
          </div>
          {showExplanation && (
            <button
              onClick={handleNext}
              className="bg-indigo-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-indigo-700 transition-colors duration-200 shadow-md"
            >
              {currentQuestion < questions.length - 1 ? 'Next Question' : 'Finish Quiz'}
            </button>
          )}
        </div>
      </div>
    </main>
  );
}
