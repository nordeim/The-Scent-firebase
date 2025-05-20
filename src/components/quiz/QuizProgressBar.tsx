
"use client";

interface QuizProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

export default function QuizProgressBar({ currentStep, totalSteps }: QuizProgressBarProps) {
  const progressPercentage = ((currentStep + 1) / totalSteps) * 100;

  return (
    <div className="mb-8">
      <div className="flex justify-between items-center text-sm text-muted-foreground mb-1">
        <span>Step {currentStep + 1} of {totalSteps}</span>
        <span>{Math.round(progressPercentage)}% Complete</span>
      </div>
      <div className="w-full bg-muted rounded-full h-2.5">
        <div
          className="bg-primary h-2.5 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${progressPercentage}%` }}
        ></div>
      </div>
    </div>
  );
}
