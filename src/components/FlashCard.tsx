import React from 'react';
import clsx from 'clsx';
import { Check, X } from 'lucide-react';

interface FlashCardProps {
  question: string;
  options: string[];
  selectedAnswer: string | null;
  isAnswered: boolean;
  correctAnswer: string;
  onSelectAnswer: (answer: string) => void;
}

export function FlashCard({
  question,
  options,
  selectedAnswer,
  isAnswered,
  correctAnswer,
  onSelectAnswer,
}: FlashCardProps) {
  return (
    <div className="w-full max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-lg">
      <h2 className="text-xl font-semibold mb-6">{question}</h2>
      <div className="space-y-3">
        {options.map((option) => {
          const isSelected = selectedAnswer === option;
          const isCorrect = option === correctAnswer;
          
          return (
            <button
              key={option}
              onClick={() => !isAnswered && onSelectAnswer(option)}
              disabled={isAnswered}
              className={clsx(
                "w-full p-4 rounded-lg text-left transition-all",
                "border-2 hover:border-blue-500",
                {
                  "border-blue-500": isSelected && !isAnswered,
                  "border-green-500 bg-green-50": isAnswered && isCorrect,
                  "border-red-500 bg-red-50": isAnswered && isSelected && !isCorrect,
                  "border-gray-200": !isSelected && !isAnswered,
                  "cursor-default": isAnswered,
                  "hover:border-gray-200": isAnswered,
                }
              )}
            >
              <div className="flex items-center justify-between">
                <span>{option}</span>
                {isAnswered && isCorrect && (
                  <Check className="text-green-500" size={20} />
                )}
                {isAnswered && isSelected && !isCorrect && (
                  <X className="text-red-500" size={20} />
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}