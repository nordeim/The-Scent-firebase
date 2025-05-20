
"use client";

import { useAppContext } from '@/contexts/AppContext';
import { QUIZ_QUESTIONS } from '@/lib/constants';
import QuizStep from './QuizStep';
import QuizProgressBar from './QuizProgressBar';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Loader2, RotateCcw } from 'lucide-react';

export default function QuizClient() {
  const { quizStep, quizAnswers, dispatch, isLoadingQuizResults, quizResults, quizActive } = useAppContext();
  const router = useRouter();

  useEffect(() => {
    // If quiz is not active (e.g., direct navigation or after completion), initialize it.
    if (!quizActive && quizResults.length === 0 && !isLoadingQuizResults) {
      dispatch({ type: 'START_QUIZ' });
    }
  }, [quizActive, dispatch, quizResults.length, isLoadingQuizResults]);
  
  useEffect(() => {
    // When quizResults are available and quiz is no longer loading, navigate to results page
    if (quizResults.length > 0 && !isLoadingQuizResults && !quizActive) {
       // Pass quiz answers to results page via query params for context if needed
      const queryParams = new URLSearchParams(quizAnswers).toString();
      router.push(`/quiz/results?${queryParams}`);
    }
  }, [quizResults, isLoadingQuizResults, quizActive, router, quizAnswers]);


  const handleAnswer = (answer: { key: string; value: string }) => {
    dispatch({ type: 'NEXT_STEP', payload: answer });
  };

  const handleResetQuiz = () => {
    dispatch({ type: 'RESET_QUIZ' });
    dispatch({ type: 'START_QUIZ' }); // Restart the quiz immediately
  }

  if (isLoadingQuizResults) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-8">
        <Loader2 className="h-16 w-16 animate-spin text-primary mb-6" />
        <h2 className="text-2xl font-semibold mb-3">Generating Your Scent Profile...</h2>
        <p className="text-muted-foreground max-w-md">Our AI is analyzing your preferences to find the perfect aromatherapy matches for you. This might take a moment.</p>
      </div>
    );
  }
  
  // If quiz is completed and results are ready but user is still on this page (e.g. browser back), show option to view results or retake.
  if (!quizActive && quizResults.length > 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-8">
        <h2 className="text-2xl font-semibold mb-3">Quiz Completed!</h2>
        <p className="text-muted-foreground mb-6">Your personalized recommendations are ready.</p>
        <div className="flex space-x-4">
          <Button onClick={() => router.push(`/quiz/results?${new URLSearchParams(quizAnswers).toString()}`)} size="lg">View My Results</Button>
          <Button onClick={handleResetQuiz} variant="outline" size="lg">
            <RotateCcw className="mr-2 h-4 w-4"/> Retake Quiz
          </Button>
        </div>
      </div>
    );
  }


  if (!quizActive || quizStep >= QUIZ_QUESTIONS.length) {
     // This state should ideally not be reached if navigation to results works.
     // Or if START_QUIZ hasn't run yet
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-8">
        <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
        <p className="text-muted-foreground">Loading quiz...</p>
      </div>
    );
  }

  const currentQuestionData = QUIZ_QUESTIONS[quizStep];

  return (
    <div className="w-full max-w-3xl mx-auto py-8 md:py-12">
      <QuizProgressBar currentStep={quizStep} totalSteps={QUIZ_QUESTIONS.length} />
      <QuizStep
        questionData={currentQuestionData}
        onAnswer={handleAnswer}
        isLastStep={quizStep === QUIZ_QUESTIONS.length - 1}
      />
       <div className="mt-8 text-center">
        <Button onClick={handleResetQuiz} variant="ghost" size="sm" className="text-muted-foreground">
          <RotateCcw className="mr-2 h-3 w-3"/> Reset Quiz
        </Button>
      </div>
    </div>
  );
}
