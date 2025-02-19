import React, { useState } from 'react';
import { Upload, FileWarning } from 'lucide-react';

interface PDFUploaderProps {
  onUpload: (file: File) => void;
}

export function PDFUploader({ onUpload }: PDFUploaderProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setIsDragging(true);
    } else if (e.type === "dragleave") {
      setIsDragging(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    const files = e.dataTransfer.files;
    validateAndUpload(files[0]);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files?.length) {
      validateAndUpload(files[0]);
    }
  };

  const validateAndUpload = (file: File) => {
    setError(null);
    if (file.type !== 'application/pdf') {
      setError('Please upload a PDF file');
      return;
    }
    onUpload(file);
  };

  return (
    <div 
      className={`w-full max-w-xl mx-auto mt-10 p-8 border-2 border-dashed rounded-lg 
        ${isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300'} 
        ${error ? 'border-red-500' : ''}`}
      onDragEnter={handleDrag}
      onDragLeave={handleDrag}
      onDragOver={handleDrag}
      onDrop={handleDrop}
    >
      <div className="flex flex-col items-center justify-center space-y-4">
        {error ? (
          <div className="text-red-500 flex items-center space-x-2">
            <FileWarning size={24} />
            <span>{error}</span>
          </div>
        ) : (
          <>
            <Upload className="w-12 h-12 text-gray-400" />
            <p className="text-lg text-gray-600">Drag and drop your PDF here, or</p>
            <label className="cursor-pointer bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors">
              Browse Files
              <input
                type="file"
                className="hidden"
                accept=".pdf"
                onChange={handleFileInput}
              />
            </label>
          </>
        )}
      </div>
    </div>
  );
}