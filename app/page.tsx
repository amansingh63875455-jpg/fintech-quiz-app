'use client';

import { useState } from 'react';
import { Calendar, GraduationCap, History, BookOpen, Volume2 } from 'lucide-react';

// Quiz questions data
const quizQuestions = [
  {
    id: 1,
    question: "What does ROI stand for in finance?",
    options: [
      "Return on Investment",
      "Rate of Interest",
      "Revenue on Income",
      "Risk of Inflation"
    ],
    correctAnswer: 0
  },
  {
    id: 2,
    question: "What is a stock split?",
    options: [
      "Selling stocks to multiple buyers",
      "Dividing existing shares into multiple new shares",
      "Combining multiple stocks into one",
      "Transferring stocks between accounts"
    ],
    correctAnswer: 1
  },
  {
    id: 3,
    question: "What is diversification in investing?",
    options: [
      "Investing all money in one stock",
      "Spreading investments across different assets",
      "Only investing in technology stocks",
      "Keeping all money in savings accounts"
    ],
    correctAnswer: 1
  },
  {
    id: 4,
    question: "What is a bear market?",
    options: [
      "Market with rising prices",
      "Market with falling prices",
      "Market with stable prices",
      "Market for animal trading"
    ],
    correctAnswer: 1
  },
  {
    id: 5,
    question: "What does ETF stand for?",
    options: [
      "Electronic Trading Fund",
      "Exchange Traded Fund",
      "Equity Transfer Fund",
      "External Trade Finance"
    ],
    correctAnswer: 1
  }
];

export default function Home() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [answeredQuestions, setAnsweredQuestions] = useState<boolean[]>(new Array(quizQuestions.length).fill(false));

  const handleAnswerClick = (selectedOption: number) => {
    setSelectedAnswer(selectedOption);
    
    if (selectedOption === quizQuestions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }

    const newAnsweredQuestions = [...answeredQuestions];
    newAnsweredQuestions[currentQuestion] = true;
    setAnsweredQuestions(newAnsweredQuestions);
  };

  const handleNextQuestion = () => {
    const nextQuestion = currentQuestion + 1;
    
    if (nextQuestion < quizQuestions.length) {
      setCurrentQuestion(nextQuestion);
      setSelectedAnswer(null);
    } else {
      setShowScore(true);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setSelectedAnswer(null);
    }
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowScore(false);
    setSelectedAnswer(null);
    setAnsweredQuestions(new Array(quizQuestions.length).fill(false));
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-2xl w-full">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-indigo-600 flex items-center gap-2">
            <BookOpen className="w-8 h-8" />
            FinTech Quiz
          </h1>
          <div className="flex items-center gap-2 text-indigo-600">
            <GraduationCap className="w-6 h-6" />
            <span className="font-semibold">Score: {score}/{quizQuestions.length}</span>
          </div>
        </div>

        {showScore ? (
          <div className="text-center space-y-6">
            <div className="flex justify-center">
              <div className="bg-indigo-100 rounded-full p-6">
                <Volume2 className="w-16 h-16 text-indigo-600" />
              </div>
            </div>
            <h2 className="text-2xl font-bold text-gray-800">Quiz Complete!</h2>
            <p className="text-xl text-gray-600">
              You scored {score} out of {quizQuestions.length}
            </p>
            <div className="text-lg text-gray-700">
              {score === quizQuestions.length && "Perfect score! 🎉"}
              {score >= quizQuestions.length * 0.7 && score < quizQuestions.length && "Great job! 👏"}
              {score >= quizQuestions.length * 0.5 && score < quizQuestions.length * 0.7 && "Good effort! 👍"}
              {score < quizQuestions.length * 0.5 && "Keep practicing! 💪"}
            </div>
            <button
              onClick={handleRestart}
              className="bg-indigo-600 text-white px-8 py-3 rounded-lg hover:bg-indigo-700 transition-colors font-semibold"
            >
              Restart Quiz
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-500">
                Question {currentQuestion + 1} of {quizQuestions.length}
              </span>
              <div className="flex gap-1">
                {quizQuestions.map((_, index) => (
                  <div
                    key={index}
                    className={`w-2 h-2 rounded-full ${
                      index === currentQuestion
                        ? 'bg-indigo-600'
                        : answeredQuestions[index]
                        ? 'bg-indigo-300'
                        : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>
            </div>

            <div className="bg-indigo-50 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-indigo-600" />
                {quizQuestions[currentQuestion].question}
              </h2>
            </div>

            <div className="space-y-3">
              {quizQuestions[currentQuestion].options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswerClick(index)}
                  disabled={selectedAnswer !== null}
                  className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                    selectedAnswer === index
                      ? index === quizQuestions[currentQuestion].correctAnswer
                        ? 'border-green-500 bg-green-50'
                        : 'border-red-500 bg-red-50'
                      : selectedAnswer !== null && index === quizQuestions[currentQuestion].correctAnswer
                      ? 'border-green-500 bg-green-50'
                      : 'border-gray-200 hover:border-indigo-300 hover:bg-indigo-50'
                  } disabled:cursor-not-allowed`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-gray-700">{option}</span>
                    {selectedAnswer !== null && (
                      <span>
                        {index === quizQuestions[currentQuestion].correctAnswer ? (
                          <span className="text-green-600 text-xl">✓</span>
                        ) : selectedAnswer === index ? (
                          <span className="text-red-600 text-xl">✗</span>
                        ) : null}
                      </span>
                    )}
                  </div>
                </button>
              ))}
            </div>

            <div className="flex justify-between pt-4">
              <button
                onClick={handlePreviousQuestion}
                disabled={currentQuestion === 0}
                className="flex items-center gap-2 px-6 py-2 rounded-lg border-2 border-gray-300 hover:border-indigo-300 hover:bg-indigo-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <History className="w-5 h-5" />
                Previous
              </button>
              <button
                onClick={handleNextQuestion}
                disabled={selectedAnswer === null}
                className="flex items-center gap-2 px-6 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {currentQuestion === quizQuestions.length - 1 ? 'Finish' : 'Next'}
                <Volume2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
