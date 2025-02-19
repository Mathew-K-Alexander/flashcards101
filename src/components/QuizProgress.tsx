import React from 'react';

interface QuizProgressProps {
  currentQuestion: number;
  totalQuestions: number;
  correctAnswers: number;
  wrongAnswers: number;
}

export function QuizProgress({
  currentQuestion,
  totalQuestions,
  correctAnswers,
  wrongAnswers,
}: QuizProgressProps) {
  const progress = (currentQuestion / totalQuestions) * 100;

  return (
    <div className="w-full max-w-2xl mx-auto mb-8">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm text-gray-600">
          Question {currentQuestion + 1} of {totalQuestions}
        </span>
        <div className="flex space-x-4">
          <span className="text-green-500">Correct: {correctAnswers}</span>
          <span className="text-red-500">Wrong: {wrongAnswers}</span>
        </div>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div
          className="bg-blue-500 h-2.5 rounded-full transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}