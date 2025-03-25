// src/components/shared/UserFeedbackWidget.tsx
'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

interface UserFeedbackWidgetProps {
  onClose?: () => void;
  onSubmit?: (rating: number, feedback: string) => void;
}

const UserFeedbackWidget: React.FC<UserFeedbackWidgetProps> = ({
  onClose,
  onSubmit,
}) => {
  const [rating, setRating] = useState<number | null>(null);
  const [feedback, setFeedback] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (rating !== null) {
      if (onSubmit) {
        onSubmit(rating, feedback);
      }
      setSubmitted(true);
      setTimeout(() => {
        if (onClose) onClose();
      }, 2000);
    }
  };

  return (
    <Card className="w-full max-w-md shadow-lg">
      <CardHeader className="relative pb-3">
        <CardTitle className="text-lg">Your Feedback Matters</CardTitle>
        {onClose && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-4 top-4"
            onClick={onClose}
          >
            <X size={18} />
          </Button>
        )}
      </CardHeader>
      <CardContent>
        {submitted ? (
          <div className="py-6 text-center">
            <p className="text-green-600 font-medium text-lg mb-2">
              Thank you for your feedback!
            </p>
            <p className="text-gray-500">
              Your input helps us improve our CRM.
            </p>
          </div>
        ) : (
          <>
            <p className="mb-4 text-sm text-gray-600">
              Rate your experience with our CRM system to help us improve.
            </p>

            <div className="flex justify-between mb-6">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                <button
                  key={num}
                  onClick={() => setRating(num)}
                  className={`w-8 h-8 rounded-full text-sm flex items-center justify-center transition-colors
                    ${
                      rating === num
                        ? 'bg-blue-600 text-white'
                        : 'bg-white border border-gray-300 hover:border-blue-400'
                    }`}
                >
                  {num}
                </button>
              ))}
            </div>

            <textarea
              className="w-full h-20 p-2 border rounded-md mb-4 text-sm"
              placeholder="Tell us what you think (optional)"
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
            ></textarea>

            <div className="flex justify-end">
              <Button onClick={handleSubmit} disabled={rating === null}>
                Submit Feedback
              </Button>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default UserFeedbackWidget;
