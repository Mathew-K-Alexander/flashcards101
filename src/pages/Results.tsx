import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Trophy, RefreshCcw } from 'lucide-react';
import type { FlashCard } from '../types';

export function Results() {
  const location = useLocation();
  const navigate = useNavigate();
  const { correctAnswers, wrongAnswers, wrongQuestions } = location.state as {
    correctAnswers: number;
    wrongAnswers: number;
    wrongQuestions: FlashCard[];
  };

  const total = correctAnswers + wrongAnswers;
  const percentage = Math.round((correctAnswers / total) * 100);

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <div className="flex items-center justify-center mb-6">
            <Trophy className="w-16 h-16 text-yellow-500" />
          </div>
          <h1 className="text-3xl font-bold text-center mb-6">Quiz Results</h1>
          <div className="grid grid-cols-3 gap-4 mb-8">
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600">Total Questions</p>
              <p className="text-2xl font-bold">{total}</p>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <p className="text-sm text-green-600">Correct</p>
              <p className="text-2xl font-bold text-green-600">{correctAnswers}</p>
            </div>
            <div className="text-center p-4 bg-red-50 rounded-lg">
              <p className="text-sm text-red-600">Wrong</p>
              <p className="text-2xl font-bold text-red-600">{wrongAnswers}</p>
            </div>
          </div>
          <div className="text-center mb-8">
            <p className="text-4xl font-bold text-blue-600">{percentage}%</p>
            <p className="text-gray-600">Overall Score</p>
          </div>
          <button
            onClick={() => navigate('/')}
            className="w-full flex items-center justify-center space-x-2 bg-blue-500 text-white py-3 px-6 rounded-lg hover:bg-blue-600 transition-colors"
          >
            <RefreshCcw size={20} />
            <span>Try Another PDF</span>
          </button>
        </div>

        {wrongQuestions.length > 0 && (
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold mb-6">Review Wrong Answers</h2>
            <div className="space-y-6">
              {wrongQuestions.map((q, index) => (
                <div key={index} className="border-b pb-4 last:border-b-0">
                  <p className="font-medium mb-2">{q.question}</p>
                  <p className="text-green-600">Correct Answer: {q.answer}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}