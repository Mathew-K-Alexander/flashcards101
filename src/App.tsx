import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { PDFUploader } from './components/PDFUploader';
import { Quiz } from './pages/Quiz';
import { Results } from './pages/Results';
import type { FlashCard } from './types';

function App() {
  const [flashcards, setFlashcards] = useState<FlashCard[] | null>(null);

  const handlePDFUpload = async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);

    try {
      const webhookUrl = import.meta.env.VITE_N8N_WEBHOOK_URL;
      if (!webhookUrl) {
        throw new Error('N8N webhook URL not configured');
      }

      const response = await fetch(webhookUrl, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to process PDF');
      }

      const data = await response.json();
      
      // Validate the response format
      if (!Array.isArray(data) || !data.every(isValidFlashcard)) {
        throw new Error('Invalid response format from n8n');
      }

      setFlashcards(data);
    } catch (error) {
      console.error('Error processing PDF:', error);
      alert(error instanceof Error ? error.message : 'Failed to process PDF');
    }
  };

  // Validate the structure of a flashcard
  const isValidFlashcard = (card: any): card is FlashCard => {
    return (
      typeof card === 'object' &&
      typeof card.question === 'string' &&
      Array.isArray(card.options) &&
      card.options.length === 4 &&
      card.options.every(option => typeof option === 'string') &&
      typeof card.answer === 'string' &&
      card.options.includes(card.answer)
    );
  };

  return (
    <Router>
      <Routes>
        <Route 
          path="/" 
          element={
            flashcards ? (
              <Navigate to="/quiz" replace />
            ) : (
              <div className="min-h-screen bg-gray-50 p-4">
                <div className="max-w-4xl mx-auto">
                  <h1 className="text-3xl font-bold text-center mb-8">
                    PDF Flashcard Generator
                  </h1>
                  <PDFUploader onUpload={handlePDFUpload} />
                </div>
              </div>
            )
          } 
        />
        <Route 
          path="/quiz" 
          element={
            flashcards ? (
              <Quiz flashcards={flashcards} />
            ) : (
              <Navigate to="/" replace />
            )
          } 
        />
        <Route path="/results" element={<Results />} />
      </Routes>
    </Router>
  );
}

export default App;