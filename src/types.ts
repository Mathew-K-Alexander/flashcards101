export interface FlashCard {
  question: string;
  options: string[];
  answer: string;
}

export interface QuizState {
  currentQuestion: number;
  correctAnswers: number;
  wrongAnswers: number;
  wrongQuestions: FlashCard[];
  selectedAnswer: string | null;
  isAnswered: boolean;
}