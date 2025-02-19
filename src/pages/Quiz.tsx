import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FlashCard } from '../components/FlashCard';
import { QuizProgress } from '../components/QuizProgress';
import type { FlashCard as FlashCardType, QuizState } from '../types';

interface QuizProps {
  flashcards: FlashCardType[];
}

export function Quiz({ flashcards }: QuizProps) {
  const navigate = useNavigate();
  const [state, setState] = useState<QuizState>({
    currentQuestion: 0,
    correctAnswers: 0,
    wrongAnswers: 0,
    wrongQuestions: [],
    selectedAnswer: null,
    isAnswered: false,
  });

  const currentCard = flashcards[state.currentQuestion];

  const handleAnswerSelect = (answer: string) => {
    const isCorrect = answer === currentCard.answer;
    
    setState(prev => ({
      ...prev,
      selectedAnswer: answer,
      isAnswered: true,
      correctAnswers: isCorrect ? prev.correctAnswers + 1 : prev.correctAnswers,
      wrongAnswers: isCorrect ? prev.wrongAnswers : prev.wrongAnswers + 1,
      wrongQuestions: isCorrect 
        ? prev.wrongQuestions 
        : [...prev.wrongQuestions, currentCard],
    }));

    setTimeout(() => {
      if (state.currentQuestion === flashcards.length - 1) {
        navigate('/results', { 
          state: { 
            correctAnswers: state.correctAnswers + (isCorrect ? 1 : 0),
            wrongAnswers: state.wrongAnswers + (isCorrect ? 0 : 1),
            wrongQuestions: isCorrect 
              ? state.wrongQuestions 
              : [...state.wrongQuestions, currentCard],
          }
        });
      } else {
        setState(prev => ({
          ...prev,
          currentQuestion: prev.currentQuestion + 1,
          selectedAnswer: null,
          isAnswered: false,
        }));
      }
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <QuizProgress
        currentQuestion={state.currentQuestion}
        totalQuestions={flashcards.length}
        correctAnswers={state.correctAnswers}
        wrongAnswers={state.wrongAnswers}
      />
      <FlashCard
        question={currentCard.question}
        options={currentCard.options}
        selectedAnswer={state.selectedAnswer}
        isAnswered={state.isAnswered}
        correctAnswer={currentCard.answer}
        onSelectAnswer={handleAnswerSelect}
      />
    </div>
  );
}